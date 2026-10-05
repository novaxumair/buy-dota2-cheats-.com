# Google Search Console — sitemap

## Property (required)

Use **one** of these (not `www` only):

| Type | Value |
|------|--------|
| **Domain** (best) | `buydota2cheats.com` |
| **URL prefix** | `https://buydota2cheats.com` |

Every `<loc>` in the sitemap is **apex** (`https://buydota2cheats.com/...`).

---

## Submit the sitemap (read this if GSC “won’t accept”)

**URL Inspection is not the Sitemaps report.** A green “URL is available to Google” / “Page can be indexed” live test on `/sitemap` only means Googlebot can **fetch** the URL. It does **not** register or validate a sitemap. Use **Indexing → Sitemaps** for submission.

### Domain property (`buydota2cheats.com`) — full URL required

In **Add a new sitemap**, paste the **complete URL** (not a filename alone):

```text
https://buydota2cheats.com/sitemap-index.xml
```

That index lists `sitemap.xml` (all 53 page URLs). Prefer it if URL Inspection succeeds but the Sitemaps row still says “could not be read”.

These often **fail silently** or stay on “Sitemap could not be read” on Domain properties:

| Do not submit only | Why |
|--------------------|-----|
| `sitemap.xml` | No origin for Domain property |
| `sitemap` | Same |
| `https://www.buydota2cheats.com/sitemap.xml` | Wrong host vs `<loc>` URLs |

### URL-prefix property (`https://buydota2cheats.com/`)

You may submit either:

- `sitemap.xml`, or  
- `https://buydota2cheats.com/sitemap.xml`

### Remove the old failed row first

Google **stops retrying** a sitemap after repeated failures. The summary card can keep **Last read 10/6/26** and **0 pages** until you:

1. **Sitemaps** → open the failed row → **⋮ → Remove sitemap**
2. Submit again with the **full URL** above
3. Wait **15 minutes–48 hours** (status updates on the **new** row)

---

## After deploy

```bash
npm run verify:live-sitemap
```

Both `https://buydota2cheats.com/sitemap` and `https://buydota2cheats.com/sitemap.xml` must return **HTTP 200** and **`Content-Type: application/xml`**.

Browser check: [https://buydota2cheats.com/sitemap.xml](https://buydota2cheats.com/sitemap.xml) — XML, not HTML.

---

## If status is **“Couldn’t fetch”** (Type Unknown, empty Last read)

Google **never got an HTTP response** (different from “could not be read”, which is usually parse/format). Your browser can still open the sitemap.

### 1. Test the exact sitemap URL (not `/sitemap` alone)

**URL Inspection** → paste:

```text
https://buydota2cheats.com/sitemap.xml
```

→ **Test live URL** → **Page fetch** must be **Successful**. If it fails here, GSC will show **Couldn’t fetch**.

### 2. Cloudflare WAF (most common fix)

**Security → Events** → resubmit the sitemap → watch for **403 / Block / Managed challenge** on `/sitemap.xml`.

Add a **WAF custom rule**:

| Field | Value |
|--------|--------|
| **Name** | Allow Google sitemap |
| **When** | `(http.request.uri.path eq "/sitemap.xml" or http.request.uri.path eq "/google-sitemap.xml" or http.request.uri.path eq "/robots.txt")` |
| **Then** | **Skip** → *All remaining custom rules* |

Also check **Security → Bots** → turn off **Block** for **Verified bots** (Googlebot must pass).

### 3. Submit a fresh sitemap URL

Remove the failed row, then submit (full URL on Domain property):

```text
https://buydota2cheats.com/google-sitemap.xml
```

(Same 53 URLs as `sitemap.xml`; use this if Google cached a failed fetch on the old path.)

### 4. Worker must be on the domain

After deploy, `https://www.buydota2cheats.com/` must **301** to `https://buydota2cheats.com/`. If both return **200**, add routes for Worker **`buy-dota2-cheats--com`** or redeploy so `wrangler.worker.toml` routes apply.

---

## If status stays “Sitemap could not be read”

1. Confirm you used the **full URL** on a **Domain** property (see above).
2. **Cloudflare → Security → Events** — filter `/sitemap.xml`, user-agent Google. Fix **403** with a WAF skip for verified bots on `/sitemap.xml` and `/robots.txt`.
3. **Workers & Pages → Worker `buy-dota2-cheats--com`** — routes `buydota2cheats.com/*` and `www.buydota2cheats.com/*` (deploy applies routes from `wrangler.worker.toml`).
4. **Caching → Purge** → `/sitemap.xml` and `/sitemap`.
5. Open the **sitemap row details** (not only the summary card) and read the specific error under the red message.

## “Last read” date with 0 pages

That is almost always an **old failed fetch**. Remove the sitemap entry and submit again with `https://buydota2cheats.com/sitemap.xml`.
