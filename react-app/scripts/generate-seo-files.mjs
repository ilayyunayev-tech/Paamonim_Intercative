import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_SITE_URL = 'https://example.com';

const ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/#/wants-vs-needs', changefreq: 'weekly', priority: '0.9' },
  { path: '/#/compound-savings-investment-age', changefreq: 'weekly', priority: '0.8' },
  { path: '/#/index-investing', changefreq: 'weekly', priority: '0.8' },
  { path: '/#/ikigai-personality-onboarding', changefreq: 'weekly', priority: '0.7' },
  { path: '/#/cv-template-israeli', changefreq: 'monthly', priority: '0.5' },
];

function normalizeSiteUrl(raw) {
  const trimmed = raw.trim();
  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
}

function createSitemap(siteUrl) {
  const urls = ROUTES.map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function createRobots(siteUrl) {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

async function main() {
  const siteUrl = normalizeSiteUrl(process.env.SITE_URL ?? DEFAULT_SITE_URL);
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const publicDir = path.resolve(dirname, '..', 'public');

  await mkdir(publicDir, { recursive: true });
  await writeFile(path.join(publicDir, 'sitemap.xml'), createSitemap(siteUrl), 'utf8');
  await writeFile(path.join(publicDir, 'robots.txt'), createRobots(siteUrl), 'utf8');

  if (siteUrl === DEFAULT_SITE_URL) {
    console.warn('[seo] SITE_URL is not set. Using fallback:', DEFAULT_SITE_URL);
  } else {
    console.log('[seo] Generated sitemap.xml and robots.txt for:', siteUrl);
  }
}

main().catch((error) => {
  console.error('[seo] Failed to generate SEO files', error);
  process.exit(1);
});
