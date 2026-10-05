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

- Canonical sitemap URLs: `https://buydota2cheats.com/sitemap` and `https://buydota2cheats.com/sitemap.xml` (plain `urlset`, no index/stylesheet).
- Cloudflare Pages **build command** must be `npm run build` (not `astro build` alone) so `functions/sitemap*.js` and `dist/_routes.json` stay in sync.
- Do **not** attach the optional Worker in `wrangler.worker.toml` to the same hostname as Pages — it breaks GSC sitemap fetch.
- After deploy: `npm run verify:live-sitemap`, then in GSC ( **Domain** or **URL prefix** `https://buydota2cheats.com` ) remove failed entries and submit `sitemap` again.
