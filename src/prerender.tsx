import { StrictMode, type ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';

/** Used at build time by scripts/prerender.mjs to inline static HTML into each page. */
const PAGES: Record<string, () => ReactElement> = {
  'index.html': () => <App />,
  'privacy.html': () => <PrivacyPage />,
  '404.html': () => <NotFoundPage />,
};

export function render(page: string): string {
  const make = PAGES[page];
  if (!make) throw new Error(`Unknown page ${page}`);
  return renderToString(<StrictMode>{make()}</StrictMode>);
}

export const PAGE_FILES = Object.keys(PAGES);
