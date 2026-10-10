// Visual QA: renders the built site with the locally installed Microsoft Edge
// and writes per-section screenshots to ./qa (gitignored).
// Usage: npm run build && npm run qa:screens [-- --only=hero]
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';
import { preview } from 'vite';

const outDir = resolve('qa');
mkdirSync(outDir, { recursive: true });

const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7);
const widths = (process.argv.find((a) => a.startsWith('--widths='))?.slice(9) ?? '390,1440').split(',').map(Number);
const reduced = process.argv.includes('--reduced');

const server = await preview({ preview: { port: 4179, strictPort: true }, logLevel: 'warn' });
const base = 'http://localhost:4179/Echo.Station.Website/';
const browser = await chromium.launch({ channel: 'msedge' });

const sections = ['top', 'about', 'gameplay', 'features', 'echo-memory', 'crew', 'anomalies', 'screenshots', 'trailer', 'get-the-game', 'faq', 'support'];

try {
  for (const width of widths) {
    const page = await browser.newPage({
      viewport: { width, height: width < 600 ? 844 : 900 },
      deviceScaleFactor: 1,
      reducedMotion: reduced ? 'reduce' : 'no-preference',
    });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(`[${width}] horizontal overflow: ${overflow}px`);
    await page.screenshot({ path: resolve(outDir, `${width}-viewport.png`) });
    await page.addStyleTag({ content: '.site-header{position:relative!important}' });
    for (const id of sections) {
      if (only && only !== id) continue;
      const el = page.locator(`#${id}`);
      await el.scrollIntoViewIfNeeded();
      await el.screenshot({ path: resolve(outDir, `${width}-${id}.png`) });
    }
    if (!only) {
      await page.locator('footer').screenshot({ path: resolve(outDir, `${width}-footer.png`) });
      if (width < 1000) {
        await page.reload({ waitUntil: 'networkidle' });
        await page.click('.menu-toggle');
        await page.screenshot({ path: resolve(outDir, `${width}-menu.png`) });
      }
      for (const extra of ['privacy.html', '404.html']) {
        await page.goto(base + extra, { waitUntil: 'networkidle' });
        await page.screenshot({ path: resolve(outDir, `${width}-${extra.replace('.html', '')}.png`), fullPage: extra === 'privacy.html' });
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
  await new Promise((done) => server.httpServer.close(done));
}
