# Google Search Console — sitemap

## Property (required)

Use **one** of these (not `www` only):

| Type | Value |
|------|--------|
| **Domain** (best) | `buydota2cheats.com` |
| **URL prefix** | `https://buydota2cheats.com` |

Do **not** use only `https://www.buydota2cheats.com` as the property: every `<loc>` in the sitemap is **apex** (`https://buydota2cheats.com/...`).

## Submit the sitemap

1. **Indexing → Sitemaps**
2. Remove any old failed `sitemap.xml` row (⋮ → Delete).
3. Submit **`sitemap`** or **`sitemap.xml`** (both return **HTTP 200** + `application/xml` after deploy). **Delete** the old failed row first — GSC keeps showing “could not be read” until you remove and resubmit.
4. Wait **15 minutes to 48 hours** after a **successful** Cloudflare deploy before judging status.

## After deploy

```bash
npm run verify:live-sitemap
```

Must show **≥50 URLs** and **no** legacy Function / CORS error.

Open in a browser (logged out): [https://buydota2cheats.com/sitemap](https://buydota2cheats.com/sitemap) — must be XML with **`Content-Type: application/xml`**, not HTML.

Optional:

```bash
npm run ping:google-sitemap
```

## If status stays “Sitemap could not be read”

**First:** run `npm run verify:live-sitemap`. If it fails on **Worker routes missing**, fix routes before resubmitting in GSC.

The sitemap file can look fine in your browser while GSC still shows **0 pages** and **“could not be read”** — that usually means Google’s last fetch failed (broken deploy, 403, or wrong property). After production is healthy, you **must delete** the sitemap row and **submit again**; the card often keeps the old error until you do.

1. **Cloudflare → Security → Events** — filter path `/sitemap.xml`, user-agent Google. If you see **403 / block**, add a **WAF custom rule** → Skip → for **Verified bots** when URI path equals `/sitemap.xml` or `/robots.txt`.
2. **Workers & Pages → Routes** — `buydota2cheats.com/*` and **`www.buydota2cheats.com/*`** must point at Worker **`buy-dota2-cheats--com`**. Quick test: open `https://www.buydota2cheats.com/` — it must **301** to `https://buydota2cheats.com/` (if both return **200**, the Worker is not on the domain).
3. Remove **Pages** custom domain on the same hostname if both Pages and Worker are attached.
4. **Successful deploy** after `npm run build` (green Workers Builds). Then **Caching → Purge** → Custom URL → `/sitemap` if headers look stale.
5. In GSC, open the sitemap row → check the **detailed error** (not only the summary card). Use **URL Inspection** on `https://buydota2cheats.com/sitemap` → **Test live URL** — must be fetchable as Googlebot with **application/xml**.

## “Last read” date with 0 pages

That usually means Google **attempted** a read during a **broken deploy** (empty/error response). After a green Cloudflare build, **delete** the sitemap entry and **submit again** — the summary card does not always refresh until you resubmit.
