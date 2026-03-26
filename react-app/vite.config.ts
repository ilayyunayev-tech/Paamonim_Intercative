import { defineConfig, type Plugin } from 'vite';

const DEFAULT_SITE_URL = 'https://example.com';

function normalizeSiteUrl(raw: string): string {
  const trimmed = raw.trim();
  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
}

function injectSiteUrlPlugin(siteUrl: string): Plugin {
  return {
    name: 'inject-site-url',
    transformIndexHtml(html) {
      return html.replace(/__SITE_URL__/g, siteUrl);
    },
  };
}

const siteUrl = normalizeSiteUrl(process.env.SITE_URL ?? DEFAULT_SITE_URL);

export default defineConfig({
  plugins: [injectSiteUrlPlugin(siteUrl)],
});
