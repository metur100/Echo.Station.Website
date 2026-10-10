// Inlines server-rendered HTML into the built pages so the site is readable
// without JavaScript and by crawlers. React then hydrates it in the browser.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createServer } from 'vite';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error', optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { render, PAGE_FILES } = await vite.ssrLoadModule('/src/prerender.tsx');
  for (const file of PAGE_FILES) {
    const path = resolve('dist', file);
    const html = readFileSync(path, 'utf8');
    const marker = '<div id="root"><!--app--></div>';
    if (!html.includes(marker)) throw new Error(`Marker not found in ${file}`);
    writeFileSync(path, html.replace(marker, `<div id="root">${render(file)}</div>`));
    console.log(`prerendered ${file}`);
  }
} finally {
  await vite.close();
}
