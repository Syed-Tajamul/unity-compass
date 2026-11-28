import type { APIRoute } from 'astro';
import { blogPosts } from '../data/blogPosts';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { getCeipalJobs } from './api/jobs';

export const prerender = false;

const siteUrl = 'https://unitycompass.com';
const staticPaths = [
  '/',
  '/about-us',
  '/proposal-development-services',
  '/recruitment-services',
  '/staffing',
  '/information-technology-and-business-consulting',
  '/customized-support-services',
  '/contact',
  '/career',
  '/blog',
  '/editorial-policy',
  '/privacy-policy',
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toIsoDate(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export const GET: APIRoute = async () => {
  const urls = new Map<string, string | undefined>();
  const { jobs } = await getCeipalJobs();

  staticPaths.forEach((path) => urls.set(`${siteUrl}${path === '/' ? '/' : path}`, undefined));
  jobs.forEach((job) => urls.set(`${siteUrl}/career/${encodeURIComponent(job.id)}`, undefined));
  blogPosts.forEach((post) => {
    urls.set(`${siteUrl}/blog/${post.slug}`, post.metadata?.dateModified || toIsoDate(post.date));
  });

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('slug, updated_at, created_at')
        .eq('is_published', true);

      if (!error && data) {
        data.forEach((post) => {
          if (post.slug) {
            urls.set(`${siteUrl}/blog/${post.slug}`, post.updated_at || post.created_at || undefined);
          }
        });
      }
    } catch (error) {
      console.error('Unable to add Supabase articles to sitemap:', error);
    }
  }

  const body = Array.from(urls.entries())
    .map(([url, lastmod]) => {
      const modified = toIsoDate(lastmod);
      return `  <url>\n    <loc>${escapeXml(url)}</loc>${modified ? `\n    <lastmod>${modified}</lastmod>` : ''}\n  </url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
};
