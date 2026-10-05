# Dota 2 Cheats (buydota2cheats.com)

Static Astro site for **Dota 2 Cheats** on Windows PC — hero ESP, map hack, timers, blog, forums, and loader status. Single-game only; Cloudflare Pages ready.

SEO targets **dota 2 cheats**, **Dota 2 ESP**, **Dota 2 map hack**, and related Dota 2 PC keywords on `https://buydota2cheats.com`.

## Commands

- `npm run dev` — local dev server (port 5174)
- `npm run build` — production build + sitemap + SEO checks
- `npm run generate:content` — regenerate blog articles and forum threads (`scripts/generate-dota2-content.mjs`)
- `npm run generate:seo-assets` — rebuild OG JPEGs from screenshots

Set `SITE_URL=https://buydota2cheats.com` when generating sitemaps outside the default build.

## Google Search Console sitemap

- Submit **`sitemap.xml`** only (`https://buydota2cheats.com/sitemap.xml`). Extensionless `/sitemap` 301s to it.
- Sitemap is a **static file** in `dist/sitemap.xml` (`<loc>` + `<lastmod>` only). Do not use Pages Functions or `_routes.json` for sitemap paths.
- Cloudflare Pages **build command** must be `npm run build` (not `astro build` alone).
- Do **not** attach the optional Worker in `wrangler.worker.toml` to the same hostname as Pages.
- If GSC shows **“Sitemap could not be read”** but the URL opens in your browser: open Cloudflare → **Security → Events**, filter path `/sitemap.xml`, and add a **WAF skip** or allow rule for verified bots (Googlebot often gets **403** from Bot Fight Mode / managed rules).
- After deploy: `npm run verify:live-sitemap`, delete failed GSC sitemap rows, resubmit `sitemap.xml`.
