# Deployment

The website is deployed to GitHub Pages by GitHub Actions.

- Repository: <https://github.com/metur100/Echo.Station.Website>
- Live URL: <https://metur100.github.io/Echo.Station.Website/>
- Workflow: `.github/workflows/deploy.yml`

## Pipeline

On every push to `main` (and on manual "Run workflow"):

1. `actions/checkout`, `actions/setup-node` (Node 22, npm cache)
2. `npm ci` (uses `package-lock.json`; `.npmrc` sets `legacy-peer-deps=true`)
3. `npm run typecheck` - strict TypeScript for the app and `vite.config.ts`
4. `npm run lint` - ESLint (typescript-eslint strict + react-hooks)
5. `npm test` - Vitest + Testing Library
6. `npm run build` - `vite build` (three HTML entries: `index.html`, `privacy.html`, `404.html`) followed by
   `scripts/prerender.mjs`, which server-renders each page into its HTML file
7. `actions/upload-pages-artifact` with `dist/`
8. `actions/deploy-pages` into the `github-pages` environment

Pull requests run steps 1-6 only.

The job needs `pages: write` and `id-token: write`; both are declared in the workflow.

## One-time repository setup

Pages must use GitHub Actions as its source. This was done through the REST API:

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/metur100/Echo.Station.Website/pages -d '{"build_type":"workflow"}'
# if Pages already exists:
curl -X PUT  -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/metur100/Echo.Station.Website/pages -d '{"build_type":"workflow"}'
```

Equivalent in the UI: Settings -> Pages -> Build and deployment -> Source: **GitHub Actions**.

## Base path

The site lives under `/Echo.Station.Website/`, so `vite.config.ts` sets `base` to that path (`BASE_PATH`). All internal
links and assets go through `import.meta.env.BASE_URL` (see `asset()` in `src/content/links.ts`), and Vite rewrites
`/favicon.svg`-style references in the HTML files. Because the built URLs are absolute (`/Echo.Station.Website/...`),
`404.html` works at any depth.

GitHub Pages serves `404.html` automatically for unknown paths.

## Verifying a deployment

```bash
# latest workflow runs
curl -s https://api.github.com/repos/metur100/Echo.Station.Website/actions/runs?per_page=1
# live page
curl -sI https://metur100.github.io/Echo.Station.Website/
curl -s  https://metur100.github.io/Echo.Station.Website/ | grep "<title>"
```

## Custom domain

1. Create `public/CNAME` with the bare domain (e.g. `echostation.example.com`). Vite copies it to `dist/`.
2. DNS records:
   - Subdomain: `CNAME  echostation  metur100.github.io.`
   - Apex domain: `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (optional `AAAA`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`).
   - Optionally verify the domain for your account (Settings -> Pages -> Verified domains) to prevent takeovers.
3. Settings -> Pages -> Custom domain: enter the domain, wait for the DNS check to pass, enable **Enforce HTTPS**.
4. In `vite.config.ts` set `BASE_PATH = '/'`.
5. Replace the old origin `https://metur100.github.io/Echo.Station.Website/` in `index.html`, `privacy.html`, `404.html`
   (canonical, Open Graph and Twitter tags), `public/robots.txt`, `public/sitemap.xml` and `SITE_URL` in
   `src/content/links.ts`.
6. Push to `main`; the workflow redeploys.

## Regenerating raster assets

`public/og-image.png` (1200 x 630) and the PNG icons are rendered from SVG with `npm run assets`, which drives the
locally installed Microsoft Edge through `playwright-core` (no browser download). The OG source is written to
`design/og-image.svg`. Commit the regenerated PNGs; CI does not render them.
