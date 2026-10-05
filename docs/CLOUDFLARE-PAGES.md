# Deploy on Cloudflare (Workers & Pages → **Pages**)

This site is meant to run as a **Pages project**, not a zone Worker on the same domain.

## Dashboard settings

In **Workers & Pages** → your **Pages** project (e.g. `buydota2cheats`) → **Settings** → **Build & deployments**:

| Setting | Value |
|--------|--------|
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (repo root) |
| **Deploy command** | **Leave empty** (Cloudflare uploads `dist` + `/functions` from the repo) |

Optional: if you must use a deploy command, use `npm run deploy:pages` **after** the build step (not `npm run deploy:worker`).

**Node:** match `.node-version` (22.x).

## Custom domain (one host only)

1. **Pages** project → **Custom domains** → add `buydota2cheats.com` (and optionally `www`, which 301s to apex via `_redirects`).
2. **Workers** → **Routes**: there must be **no** route like `buydota2cheats.com/*` pointing at `buydota2cheats-worker` or `workers/site.js`. If both Pages and a Worker serve the same hostname, Search Console often fails on `sitemap.xml`.

## What gets deployed

- **Static files:** everything in `dist/` (including `sitemap.xml`, `_headers`, `_redirects`, `robots.txt`).
- **Pages Functions:** `functions/sitemap.xml.js` (proxies `dist/sitemap.xml`) and `functions/sitemap.js` (301 → `/sitemap.xml`).
- **No** `public/_routes.json` — do not force old embedded sitemap Functions.

## After each push

1. Wait for the Pages deployment to finish (green **Success**).
2. Locally: `npm run verify:live-sitemap`  
   - Must **not** mention “legacy embedded sitemap Function” or `Access-Control-Allow-Origin: *`.
3. Google Search Console: delete the old sitemap entry → submit **`sitemap.xml`**.

## CLI deploy (same as dashboard build + upload)

```bash
npm run build
npm run deploy:pages
```

Requires `CLOUDFLARE_API_TOKEN` (Pages Edit) when not using Git auto-deploy.

## Worker deploy (`wrangler.worker.toml`) — different product

Use **only** if the domain is **not** on Pages:

```bash
npm run build
npm run deploy:worker
```

Do not use Worker + Pages on **buydota2cheats.com** at the same time.
