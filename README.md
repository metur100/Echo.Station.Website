# ECHO STATION - The Living Ship (website)

Official marketing website for **ECHO STATION - The Living Ship**, a sci-fi ship management game for Android and iOS
by **Medin Turkes**.

- Live site: <https://metur100.github.io/Echo.Station.Website/>
- Game repository: <https://github.com/metur100/Echo.Station.Game>
- Support / issues: <https://github.com/metur100/Echo.Station.Game/issues>

The site is a static Vite + React + TypeScript build with plain CSS. It has a one-page landing site (`index.html`), a
privacy policy (`privacy.html`) and a styled `404.html`. All three pages are prerendered to static HTML at build time and
hydrated by React in the browser, so they also read correctly without JavaScript. Fonts (Oxanium, Inter, SIL OFL) are
self-hosted via `@fontsource`; the site loads nothing from third-party servers.

## Local development

Requires Node 20.19+ (Node 22 recommended) and npm 10.

```bash
npm install        # .npmrc sets legacy-peer-deps (works around an npm peer-resolution bug)
npm run dev        # http://localhost:5173/Echo.Station.Website/
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload |
| `npm run build` | Production build to `dist/` + prerender of all pages |
| `npm run preview` | Serves `dist/` locally |
| `npm run typecheck` | TypeScript (strict) for app and config |
| `npm run lint` | ESLint |
| `npm test` | Vitest + Testing Library |
| `npm run check` | All of the above in CI order |
| `npm run assets` | Re-renders `public/og-image.png` and the PNG icons from SVG (needs Microsoft Edge installed) |
| `npm run qa:screens` | Renders 390 px and 1440 px QA screenshots of the built site into `qa/` (gitignored, needs Edge) |

## Project layout

```
index.html, privacy.html, 404.html   page entries (meta tags live here)
public/                              copied as-is: favicons, og-image.png, robots.txt, sitemap.xml, site.webmanifest, screenshots/
design/og-image.svg                  source of the social sharing image
src/content/links.ts                 every external link, store URLs, trailer URL, support e-mail
src/content/screenshots.ts           screenshot manifest for the gallery
src/content/game.ts                  game facts (modules, crew, research, FAQ ...)
src/components/                      header, footer, sections, SVG artwork
src/pages/                           privacy and 404 pages
src/styles/global.css                design tokens and all styles
scripts/                             prerender, asset rendering, QA screenshots
```

## Adding screenshots

The gallery reads from `src/content/screenshots.ts`. While the list is empty the site shows a "Screenshots from the
current build arrive with the first test release" panel. Only add real captures from the game.

1. Export screenshots from the current build (PNG, JPEG or WebP, ideally WebP under ~400 KB each, e.g. 2340 x 1080).
2. Put the files in `public/screenshots/`, e.g. `public/screenshots/reactor-bay.webp`.
3. Add one entry per file:

   ```ts
   export const SCREENSHOTS: readonly Screenshot[] = [
     {
       file: 'reactor-bay.webp',          // file name inside public/screenshots/
       caption: 'Rerouting power around an unstable reactor',
       alt: 'Isometric ship view with the reactor glowing amber and a warning panel open',
       width: 2340,                       // real pixel size of the file
       height: 1080,
     },
   ];
   ```

4. Commit and push. Images are lazy-loaded and keep their aspect ratio from `width`/`height`.
5. Update the gallery test (`src/test/gallery.test.tsx`), which asserts that the manifest ships empty.

## Store links and trailer

All are in `src/content/links.ts`. `null` means "coming soon":

```ts
googlePlay: 'https://play.google.com/store/apps/details?id=com.certidevelopment.echostation',
appStore: 'https://apps.apple.com/app/idXXXXXXXXXX',
trailer: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
```

Setting a URL turns the disabled "Coming soon" button into a link (the button is a neutral design, not official badge
artwork; if you switch to official badges, follow Google's and Apple's badge guidelines). Update
`src/test/stores.test.tsx`, which asserts the coming-soon state.

## TODO for the owner

- [ ] **Support e-mail:** set up a dedicated support address and put it in `LINKS.supportEmail` in
      `src/content/links.ts`. It is `null` today, so no address is shown on the site. Update the test in
      `src/test/content.test.ts` accordingly.
- [ ] Add real screenshots once the first test build exists (see above).
- [ ] Add store URLs when the listings are live, then update `sitemap.xml` `lastmod` if content changes.
- [ ] Add the trailer URL when it is published.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`: `npm ci`, typecheck, lint, tests, build, then
`actions/upload-pages-artifact` and `actions/deploy-pages`. Pull requests run the same checks without deploying.
GitHub Pages is configured with **Source: GitHub Actions**. Details, including how to move to a custom domain, are in
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

### Custom domain (later)

1. Add `public/CNAME` containing just the domain, e.g. `echostation.example.com`.
2. DNS: for a subdomain create a `CNAME` record pointing to `metur100.github.io`; for an apex domain create `A` records to
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (and optionally the matching `AAAA` records).
3. Repository Settings -> Pages -> Custom domain: enter the domain, wait for the DNS check, then enable "Enforce HTTPS".
4. Change `BASE_PATH` in `vite.config.ts` to `'/'`, and replace `https://metur100.github.io/Echo.Station.Website/` in
   `index.html`, `privacy.html`, `404.html`, `public/robots.txt`, `public/sitemap.xml` and `src/content/links.ts`
   (`SITE_URL`) with the new origin.

## Credits

Design, code and artwork: Medin Turkes. ECHO STATION is an independent game, not affiliated with any other franchise.
All illustrations on the site are original SVG artwork.
