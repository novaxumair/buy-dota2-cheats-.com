# Deploy on Cloudflare **Worker** (static assets)

This site can be served by **`buydota2cheats-worker`** (`workers/site.js` + `dist/` assets).  
Pages Functions in `/functions` are **not** used on this path — sitemap comes from `dist/sitemap.xml` via the Worker.

## npm scripts

| Command | When to use |
|---------|-------------|
| **`npm run build`** or **`npm run build:worker`** | Build `dist/` (Astro + sitemap + SEO checks) |
| **`npm run deploy:worker`** | Upload Worker + `dist/` (**run after build**; uses `--no-build`) |
| **`npm run deploy`** | `build` then `deploy:worker` (one shot locally) |
| **`npm run deploy:worker:full`** | `wrangler deploy -c wrangler.worker.toml` (runs `[build]` in config again) |
| **`npm run deploy:pages`** | Cloudflare **Pages** only (different product) |

Requires `CLOUDFLARE_API_TOKEN` (Workers Scripts Edit) or `wrangler login`.

**GitHub Actions:** If you deploy from **Cloudflare Workers Builds** (dashboard), you do **not** need GitHub workflows. The old **Cloudflare Pages** workflow was removed; optional Worker workflow is **manual only** (`workflow_dispatch`).

## Cloudflare dashboard (Workers Builds / Git)

**Workers & Pages → Workers → buydota2cheats-worker → Settings → Builds**

| Setting | Value |
|---------|--------|
| **Build command** | `npm run build` |
| **Deploy command** | `npm run deploy:worker` |
| **Preview command** | `npm run deploy:worker` (not `wrangler preview`) |

Or leave deploy empty and set only:

- **Build command:** `npm run deploy` (build + deploy in one step)

**Node:** match `.node-version` (22.x).

## Custom domain

1. **Workers & Pages → Workers → buydota2cheats-worker → Settings → Domains & routes**
2. Add route: **`buydota2cheats.com/*`** (and optionally **`www.buydota2cheats.com/*`** — Worker 301s www → apex).
3. **Do not** attach the same hostname to a **Pages** project at the same time.

## After deploy

```bash
npm run verify:live-sitemap
```

Response should be **`text/xml`**, **no** `Access-Control-Allow-Origin: *`, and sitemap **`lastmod`** should match your latest build.

## Config file

`wrangler.worker.toml` — Worker name, `[build]`, `[assets]` → `./dist`.
