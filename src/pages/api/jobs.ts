import type { APIRoute } from 'astro';
import { initialCeipalJobs, ceipalJobCodeToPortalId, type CeipalJob } from '../../data/ceipalJobs';

export const prerender = false;

const CEIPAL_API_KEY = 'Y2NIOHdvenVQZXNtcndHV0RIZWlSQT09';
const CEIPAL_CP_ID = 'Z3RkUkt2OXZJVld2MjFpOVRSTXoxZz09';

function cleanText(str: string): string {
  if (!str) return '';
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\r\n/g, '\n')
    .replace(/\n+/g, '\n')
    .trim();
}

function extractPayRate(desc: string): string {
  const match = desc.match(/(?:Pay\s*Rate|Rates?|Salary\s*Range?)\s*:\s*([^\r\n;]+)/i);
  if (!match) return '';
  const val = cleanText(match[1]).replace(/[\.]+$/, '').trim();
  if (val.length > 35) return '';
  return val;
}

function extractClearance(desc: string): CeipalJob['clearanceLevel'] {
  if (/TS\/SCI|Top Secret\/SCI|SCI with Polygraph|CI Poly|Full Scope Poly/i.test(desc)) {
    if (/Polygraph|Poly/i.test(desc)) return 'TS/SCI with Polygraph';
    return 'TS/SCI';
  }
  if (/Top Secret|TS\b/i.test(desc)) return 'Top Secret';
  if (/Secret\b/i.test(desc)) return 'Secret';
  if (/Public Trust/i.test(desc)) return 'Public Trust';
  return 'Clearance Eligible';
}

function extractWorkplace(remote_opps: number, desc: string): 'Remote' | 'Hybrid' | 'On-site' {
  if (remote_opps === 1 || /100%\s*Remote|Fully\s*Remote/i.test(desc)) return 'Remote';
  if (remote_opps === 2 || /Hybrid/i.test(desc)) return 'Hybrid';
  if (/Onsite|On-site|100%\s*Onsite/i.test(desc)) return 'On-site';
  return 'Hybrid';
}

function extractLocation(rawLoc?: string, state?: string): string {
  if (rawLoc) {
    const cleaned = rawLoc.replace(/[()]/g, '').trim();
    if (cleaned.length > 0) return cleaned;
  }
  if (state) return state;
  return 'Washington, DC Metro';
}

function extractSummary(desc: string): string {
  const lines = desc.split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 15)
    .filter((l) => !/^(Location|Pay Rate|Rates?|Salary|Shift|Travel|Security Clearance|Clearance|Job Title|Position|Job Type|Work Schedule|Work Arrangement|Employment Type):/i.test(l));

  if (lines.length > 0) {
    return lines.slice(0, 2).join(' ').replace(/[\.]+$/, '').slice(0, 200) + '...';
  }
  return desc.replace(/[\.]+$/, '').slice(0, 160) + '...';
}

export const GET: APIRoute = async ({ url }) => {
  const pageParam = url.searchParams.get('page') || 'all';

  try {
    // Helper to fetch a single page from Ceipal API
    const fetchCeipalPage = async (p: number) => {
      const response = await fetch(
        `https://careerapi.ceipal.com/${CEIPAL_API_KEY}/CareerPortalJobPostings/?page=${p}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Referer-Host': 'https://jobsapi.ceipal.com/',
            'Referer': 'https://jobsapi.ceipal.com/APISource/v3/index.html',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: `cp_id=${CEIPAL_CP_ID}`,
        }
      );
      if (!response.ok) return null;
      return await response.json();
    };

    const parseRawJob = (raw: any): CeipalJob => {
      const desc = cleanText(raw.public_job_desc || '');
      const code = (raw.job_code || '').trim();
      const portalId = ceipalJobCodeToPortalId[code];
      const directApplyUrl = portalId
        ? `https://candidateportal.ceipal.com/job-details/${portalId}`
        : (raw.apply_job_login || 'https://candidateportal.ceipal.com/submit-resume/wnBXqpgx6GIS7DcUrUSC9Kxp7hfuvSNAkWYPXe-Odl0/PQyIYUggnWdV4ut_3CpHn3osOqjfErNC4IFHJThZhoA');

      return {
        id: raw.id,
        jobCode: raw.job_code || '',
        title: raw.public_job_title || 'Federal Contracting Specialist',
        location: extractLocation(raw.multpile_job_location, raw.state),
        state: raw.state || 'Maryland',
        country: raw.country || 'United States',
        employmentType: raw.tax_terms || 'Full Time',
        workplaceType: extractWorkplace(raw.remote_opportunities, desc),
        clearanceLevel: extractClearance(desc),
        payRate: extractPayRate(desc),
        summary: extractSummary(desc),
        fullDescription: desc,
        updatedDate: raw.updated || 'Recently Posted',
        applyUrl: directApplyUrl,
      };
    };

    const fetchedResults: CeipalJob[] = [];
    let totalCount = 0;
    let numPages = 1;

    // Fetch initial page (Page 1) to determine actual total count and dynamic num_pages
    const page1Data = await fetchCeipalPage(1);
    if (page1Data && Array.isArray(page1Data.results)) {
      totalCount = page1Data.count || page1Data.results.length;
      numPages = page1Data.num_pages || Math.ceil(totalCount / 20) || 1;

      for (const r of page1Data.results) {
        fetchedResults.push(parseRawJob(r));
      }

      // If user requested all pages, dynamically fetch remaining pages concurrently
      if (pageParam === 'all' && numPages > 1) {
        const remainingPagePromises = [];
        for (let p = 2; p <= numPages; p++) {
          remainingPagePromises.push(fetchCeipalPage(p));
        }

        const remainingResults = await Promise.all(remainingPagePromises);
        for (const pageData of remainingResults) {
          if (pageData && Array.isArray(pageData.results)) {
            for (const r of pageData.results) {
              fetchedResults.push(parseRawJob(r));
            }
          }
        }
      } else if (pageParam !== 'all' && parseInt(pageParam, 10) > 1) {
        // Requested a specific single page other than 1
        const singlePage = parseInt(pageParam, 10);
        const specificPageData = await fetchCeipalPage(singlePage);
        fetchedResults.length = 0; // reset
        if (specificPageData && Array.isArray(specificPageData.results)) {
          for (const r of specificPageData.results) {
            fetchedResults.push(parseRawJob(r));
          }
        }
      }
    }

    if (fetchedResults.length > 0) {
      return new Response(
        JSON.stringify({
          success: true,
          count: totalCount || fetchedResults.length,
          num_pages: numPages,
          jobs: fetchedResults,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=1800, s-maxage=3600', // 30 mins cache
          },
        }
      );
    }
  } catch (err) {
    console.error('Error fetching live Ceipal jobs in API route:', err);
  }

  // Graceful fallback to initial dataset
  return new Response(
    JSON.stringify({
      success: true,
      count: initialCeipalJobs.length,
      num_pages: Math.ceil(initialCeipalJobs.length / 20),
      jobs: initialCeipalJobs,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    }
  );
};
