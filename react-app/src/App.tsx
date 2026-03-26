import { useEffect, useState } from 'react';

const LEGACY_STYLES = ['/legacy/ikigai-personality.css'];

const LEGACY_SCRIPTS = [
  'https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js',
  'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js',
  '/legacy/ikigai-personality.js',
  '/legacy/legacy-app.js',
];

function appendStylesheet(href: string): void {
  const existing = document.querySelector(`link[data-legacy-href="${href}"]`);
  if (existing) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.dataset.legacyHref = href;
  document.head.appendChild(link);
}

function appendScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-legacy-src="${src}"]`) as HTMLScriptElement | null;
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.dataset.legacySrc = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed loading ${src}`));
    document.body.appendChild(script);
  });
}

export function App() {
  const [markup, setMarkup] = useState('');

  useEffect(() => {
    LEGACY_STYLES.forEach(appendStylesheet);
    let active = true;
    fetch('/legacy/markup.html')
      .then((res) => res.text())
      .then((text) => {
        if (active) setMarkup(text);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!markup) return;
    const run = async () => {
      for (const src of LEGACY_SCRIPTS) {
        await appendScript(src);
      }
    };
    run();
  }, [markup]);

  useEffect(() => {
    const scrollTopOnRouteChange = () => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', scrollTopOnRouteChange);
    return () => {
      window.removeEventListener('hashchange', scrollTopOnRouteChange);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
