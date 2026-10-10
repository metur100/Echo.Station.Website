// Renders the raster assets from their SVG sources with the locally installed
// Microsoft Edge (playwright-core, no browser download):
//   design/og-image.svg  -> public/og-image.png (1200 x 630)
//   public/favicon.svg   -> public/favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png
// Usage: npm run assets
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const font = (pkg, file) =>
  readFileSync(resolve('node_modules/@fontsource', pkg, 'files', file)).toString('base64');

const fontCss = `
@font-face { font-family: 'Oxanium'; font-weight: 700; src: url(data:font/woff2;base64,${font('oxanium', 'oxanium-latin-700-normal.woff2')}) format('woff2'); }
@font-face { font-family: 'Oxanium'; font-weight: 600; src: url(data:font/woff2;base64,${font('oxanium', 'oxanium-latin-600-normal.woff2')}) format('woff2'); }
@font-face { font-family: 'Inter'; font-weight: 500; src: url(data:font/woff2;base64,${font('inter', 'inter-latin-500-normal.woff2')}) format('woff2'); }
`;

async function buildOgSvg() {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error', optimizeDeps: { noDiscovery: true, include: [] } });
  try {
    const { ShipArt } = await vite.ssrLoadModule('/src/components/art/ShipArt.tsx');
    const { Starfield } = await vite.ssrLoadModule('/src/components/art/Starfield.tsx');
    const ship = renderToStaticMarkup(createElement(ShipArt, { idPrefix: 'og', decorative: true }))
      .replace('<svg', '<svg x="478" y="96" width="740" height="398"');
    const stars = renderToStaticMarkup(createElement(Starfield, { count: 140, seed: 63 }))
      .replace('<svg', '<svg x="0" y="0" width="1200" height="630"');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="neb-v" cx="72%" cy="40%" r="45%"><stop offset="0" stop-color="#9A84F0" stop-opacity="0.22"/><stop offset="1" stop-color="#9A84F0" stop-opacity="0"/></radialGradient>
    <radialGradient id="neb-t" cx="60%" cy="78%" r="40%"><stop offset="0" stop-color="#24B8A6" stop-opacity="0.16"/><stop offset="1" stop-color="#24B8A6" stop-opacity="0"/></radialGradient>
    <linearGradient id="tag" x1="0" x2="1"><stop offset="0" stop-color="#9A84F0"/><stop offset="1" stop-color="#45E0DC"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#04070F"/>
  <rect width="1200" height="630" fill="url(#neb-v)"/>
  <rect width="1200" height="630" fill="url(#neb-t)"/>
  ${stars}
  ${ship}
  <g font-family="Oxanium, sans-serif">
    <line x1="72" y1="150" x2="94" y2="150" stroke="#45E0DC" stroke-width="1.5"/>
    <text x="104" y="155" font-size="15" font-weight="600" letter-spacing="3.5" fill="#45E0DC">SYS // ESV MERIDIAN</text>
    <text x="68" y="248" font-size="88" font-weight="700" letter-spacing="3" fill="#E6EDF8">ECHO</text>
    <text x="68" y="338" font-size="88" font-weight="700" letter-spacing="3" fill="#E6EDF8">STATION</text>
    <text x="72" y="384" font-size="22" font-weight="600" letter-spacing="8" fill="#93A1BF">THE LIVING SHIP</text>
    <text x="72" y="448" font-size="32" font-weight="600" fill="url(#tag)">The ship remembers.</text>
  </g>
  <g font-family="Inter, sans-serif" font-size="18" font-weight="500" fill="#93A1BF">
    <text x="72" y="560">Android &amp; iOS  ·  In development  ·  by Medin Turkes</text>
  </g>
  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="#1C2A48"/>
</svg>
`;
  } finally {
    await vite.close();
  }
}

async function shoot(page, svg, size, out) {
  await page.setViewportSize({ width: size.w, height: size.h });
  await page.setContent(
    `<!doctype html><html><head><style>${fontCss} html,body{margin:0;background:#04070F} svg{display:block;width:${size.w}px;height:${size.h}px}</style></head><body>${svg}</body></html>`,
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: size.w, height: size.h } });
  console.log(`wrote ${out}`);
}

mkdirSync('design', { recursive: true });
const og = await buildOgSvg();
writeFileSync('design/og-image.svg', og);

const browser = await chromium.launch({ channel: 'msedge' });
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await shoot(page, og, { w: 1200, h: 630 }, 'public/og-image.png');
  const favicon = readFileSync('public/favicon.svg', 'utf8');
  for (const [name, px] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
    await shoot(page, favicon, { w: px, h: px }, `public/${name}`);
  }
} finally {
  await browser.close();
}
