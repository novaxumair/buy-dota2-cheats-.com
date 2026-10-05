# Dota 2 Cheats (buydota2cheats.com)

Static Astro site for **Dota 2 Cheats** on Windows PC — hero ESP, map hack, timers, blog, forums, and loader status. Single-game only; Cloudflare Pages ready.

SEO targets **dota 2 cheats**, **Dota 2 ESP**, **Dota 2 map hack**, and related Dota 2 PC keywords on `https://buydota2cheats.com`.

## Commands

- `npm run dev` — local dev server (port 5174)
- `npm run build` — production build + sitemap + SEO checks
- `npm run generate:content` — regenerate blog articles and forum threads (`scripts/generate-dota2-content.mjs`)
- `npm run generate:seo-assets` — rebuild OG JPEGs from screenshots

Set `SITE_URL=https://buydota2cheats.com` when generating sitemaps outside the default build.

## Cloudflare (Pages)

You deploy via **Workers & Pages → Pages**. Full checklist: **[docs/CLOUDFLARE-PAGES.md](docs/CLOUDFLARE-PAGES.md)**.

- **Build command:** `npm run build` · **Output:** `dist` · **Deploy command:** empty (recommended).
- **`buydota2cheats.com` must point at the Pages project only** — remove any **Worker route** on the same hostname (that conflict breaks GSC sitemap reads).
- **`npm run deploy`** = Pages upload (`deploy:pages`). **`npm run deploy:worker`** is for Worker-only hosting, not Pages.

## Google Search Console sitemap

- Submit **`sitemap.xml`** only (`https://buydota2cheats.com/sitemap.xml`). Extensionless `/sitemap` 301s to it.
- Sitemap bytes live in **`dist/sitemap.xml`** (`<loc>` + `<lastmod>`). `functions/sitemap.xml.js` only proxies that file via `ASSETS.fetch` (never embed XML in JS).
- **Production must redeploy after every sitemap fix.** If `npm run verify:live-sitemap` mentions a legacy Function, Cloudflare is still on an old deployment — trigger **Pages → Deployments → Retry** or push to `main` with GitHub Actions secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`.
- Cloudflare Pages **build command** must be `npm run build` (not `astro build` alone). Disable duplicate deploy if you use `.github/workflows/cloudflare-pages.yml`.
- Do **not** attach the optional Worker in `wrangler.worker.toml` to the same hostname as Pages.
- If GSC shows **“Sitemap could not be read”** but the URL opens in your browser: open Cloudflare → **Security → Events**, filter path `/sitemap.xml`, and add a **WAF skip** or allow rule for verified bots (Googlebot often gets **403** from Bot Fight Mode / managed rules).
- After deploy: `npm run verify:live-sitemap`, delete failed GSC sitemap rows, resubmit `sitemap.xml`.
