import type { APIRoute } from 'astro';
import { initialCeipalJobs, ceipalJobCodeToPortalId, type CeipalJob } from '../../data/ceipalJobs';

export const prerender = false;

const CANDIDATE_PORTAL_URL = 'https://candidateportal.ceipal.com/api/jobs/getJobsList/1';
const CANDIDATE_PORTAL_COMPANY_ID = 'IBNJ4YiY3l5nfn1U2E-wp0CzF4-Gh0pFXtDcBBYKhGU';

const CEIPAL_API_KEY = 'Y2NIOHdvenVQZXNtcndHV0RIZWlSQT09';
const CEIPAL_CP_ID = 'Z3RkUkt2OXZJVld2MjFpOVRSTXoxZz09';

function stripHtml(htmlStr: string): string {
  if (!htmlStr) return '';
  return htmlStr
    .replace(/<(?:br|div|p|h[1-6]|li)[\s/]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractPayRate(desc: string, payInfo?: string): string {
  if (payInfo && payInfo !== 'N/A' && payInfo.trim().length > 0) {
    return payInfo.trim();
  }
  const match = desc.match(/(?:Pay\s*Rate|Rates?|Salary\s*Range?)\s*:\s*([^\r\n;]+)/i);
  if (!match) return '';
  const val = stripHtml(match[1]).replace(/[\.]+$/, '').trim();
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

function extractWorkplace(desc: string, remote_opps?: number): 'Remote' | 'Hybrid' | 'On-site' {
  if (remote_opps === 1 || /100%\s*Remote|Fully\s*Remote|\bRemote\b/i.test(desc)) return 'Remote';
  if (remote_opps === 2 || /Hybrid/i.test(desc)) return 'Hybrid';
  if (/Onsite|On-site|100%\s*Onsite/i.test(desc)) return 'On-site';
  return 'Hybrid';
}

function extractLocation(loc?: string, state?: string): string {
  if (loc && loc !== 'N/A, Location not specified' && loc !== 'N/A') {
    const cleaned = loc.replace(/[\[\]()]/g, '').trim();
    if (cleaned.length > 0) return cleaned;
  }
  if (state && state !== 'N/A') return state;
  return 'Washington, DC Metro';
}

function extractSummary(desc: string): string {
  const lines = desc.split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 15)
    .filter((l) => !/^(Location|Pay Rate|Rates?|Salary|Shift|Travel|Security Clearance|Clearance|Job Title|Position|Job Type|Work Schedule|Work Arrangement|Employment Type|Citizenship):/i.test(l));

  if (lines.length > 0) {
    return lines.slice(0, 2).join(' ').replace(/[\.]+$/, '').slice(0, 200) + '...';
  }
  return desc.replace(/[\.]+$/, '').slice(0, 160) + '...';
}

export const GET: APIRoute = async () => {
  try {
    // --------------------------------------------------------------------------
    // 1. PRIMARY STRATEGY: Live Ceipal Candidate Portal API (Direct Requisitions)
    // --------------------------------------------------------------------------
    // This directly returns each job's candidateportal `id`.
    // When ANY new job is posted tomorrow in Ceipal, it is fetched live here
    // and its applyUrl points straight to https://candidateportal.ceipal.com/job-details/{id}.
    const portalResponse = await fetch(CANDIDATE_PORTAL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Origin': 'https://candidateportal.ceipal.com',
        'Referer': 'https://candidateportal.ceipal.com/career-jobs',
      },
      body: JSON.stringify({
        companyId: CANDIDATE_PORTAL_COMPANY_ID,
        first: 0,
        rows: 100, // Retrieves up to 100 live positions in one high-speed call
        sortField: 'JobPosting.id',
        sortOrder: -1, // Newest postings first
      }),
    });

    if (portalResponse.ok) {
      const portalData = await portalResponse.json();
      const records = portalData?.data?.records;
      const totalCount = portalData?.data?.totalRecords || (Array.isArray(records) ? records.length : 0);

      if (Array.isArray(records) && records.length > 0) {
        const jobs: CeipalJob[] = records.map((r: any): CeipalJob => {
          const desc = stripHtml(r.publicJobDescription || '');
          const stateVal = (r.stateName && r.stateName !== 'N/A') ? r.stateName : 'Maryland';
          const portalId = r.id;
          
          return {
            id: portalId,
            jobCode: r.jobCode || '',
            title: r.positionTitle || 'Federal Contracting Specialist',
            location: extractLocation(r.location, stateVal),
            state: stateVal,
            country: (r.countryName && r.countryName !== 'N/A') ? r.countryName : 'United States',
            employmentType: r.jobType || 'Full Time',
            workplaceType: extractWorkplace(desc),
            clearanceLevel: extractClearance(desc),
            payRate: extractPayRate(desc, r.payRateInfo),
            summary: extractSummary(desc),
            fullDescription: desc,
            updatedDate: r.postedOn || 'Recently Posted',
            // Direct canonical link to this exact requisition in Ceipal:
            applyUrl: `https://candidateportal.ceipal.com/job-details/${portalId}`,
          };
        });

        return new Response(
          JSON.stringify({
            success: true,
            count: totalCount,
            num_pages: Math.ceil(totalCount / 10),
            jobs,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=900, s-maxage=1800', // 15 mins cache
            },
          }
        );
      }
    }
  } catch (err) {
    console.warn('Candidate portal direct fetch unavailable, falling back to ATS feed:', err);
  }

  // --------------------------------------------------------------------------
  // 2. SECONDARY STRATEGY: Ceipal ATS Widget API Fallback with code-to-portal map
  // --------------------------------------------------------------------------
  try {
    const atsResponse = await fetch(
      `https://careerapi.ceipal.com/${CEIPAL_API_KEY}/CareerPortalJobPostings/?page=1`,
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

    if (atsResponse.ok) {
      const data = await atsResponse.json();
      if (Array.isArray(data.results) && data.results.length > 0) {
        const jobs: CeipalJob[] = data.results.map((raw: any): CeipalJob => {
          const desc = stripHtml(raw.public_job_desc || '');
          const code = (raw.job_code || '').trim();
          const portalId = ceipalJobCodeToPortalId[code];
          const directApplyUrl = portalId
            ? `https://candidateportal.ceipal.com/job-details/${portalId}`
            : (raw.apply_job_login || `https://candidateportal.ceipal.com/submit-resume/wnBXqpgx6GIS7DcUrUSC9Kxp7hfuvSNAkWYPXe-Odl0/PQyIYUggnWdV4ut_3CpHn3osOqjfErNC4IFHJThZhoA`);

          return {
            id: raw.id,
            jobCode: raw.job_code || '',
            title: raw.public_job_title || 'Federal Contracting Specialist',
            location: extractLocation(raw.multpile_job_location, raw.state),
            state: raw.state || 'Maryland',
            country: raw.country || 'United States',
            employmentType: raw.tax_terms || 'Full Time',
            workplaceType: extractWorkplace(desc, raw.remote_opportunities),
            clearanceLevel: extractClearance(desc),
            payRate: extractPayRate(desc),
            summary: extractSummary(desc),
            fullDescription: desc,
            updatedDate: raw.updated || 'Recently Posted',
            applyUrl: directApplyUrl,
          };
        });

        return new Response(
          JSON.stringify({
            success: true,
            count: data.count || jobs.length,
            num_pages: Math.ceil((data.count || jobs.length) / 10),
            jobs,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=900, s-maxage=1800',
            },
          }
        );
      }
    }
  } catch (err) {
    console.error('ATS fallback failed:', err);
  }

  // --------------------------------------------------------------------------
  // 3. TERTIARY FAILSAFE: Initial Dataset (Guarantees zero-blank UI)
  // --------------------------------------------------------------------------
  return new Response(
    JSON.stringify({
      success: true,
      count: initialCeipalJobs.length,
      num_pages: Math.ceil(initialCeipalJobs.length / 10),
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
