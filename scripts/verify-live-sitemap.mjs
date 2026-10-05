/**
 * Post-deploy check: production sitemap must be fetchable like Google Search Console.
 * Usage: npm run verify:live-sitemap
 */
const CANONICAL = (process.env.SITEMAP_URL || 'https://buydota2cheats.com/sitemap').replace(/\/$/, '')
const ALIAS = CANONICAL.endsWith('.xml')
  ? CANONICAL.replace(/\/sitemap\.xml$/, '/sitemap')
  : `${CANONICAL.replace(/\/sitemap$/, '')}/sitemap.xml`

const GOOGLEBOT =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

async function check(label, url) {
  const res = await fetch(url, {
    redirect: 'manual',
    headers: { 'User-Agent': GOOGLEBOT, Accept: 'application/xml,text/xml,*/*' },
  })
  if (res.status === 301 || res.status === 302 || res.status === 307 || res.status === 308) {
    throw new Error(
      `${label}: GSC needs HTTP 200 on the submitted URL, got ${res.status} redirect to "${res.headers.get('location') || ''}" (${url})`,
    )
  }
  if (!res.ok) {
    throw new Error(`${label}: HTTP ${res.status} ${res.statusText} for ${url}`)
  }
  const contentType = res.headers.get('content-type') || ''
  if (!/application\/xml/i.test(contentType)) {
    throw new Error(
      `${label}: must be application/xml — got "${contentType}" (${url}). Purge Cloudflare cache for this path after deploy.`,
    )
  }
  if (res.headers.get('access-control-allow-origin') === '*') {
    throw new Error(
      `${label}: legacy embedded sitemap Function still live — redeploy Worker (${url})`,
    )
  }
  const body = await res.text()
  if (!body.trimStart().startsWith('<?xml')) {
    throw new Error(`${label}: body is not XML (${url})`)
  }
  if (body.includes('<sitemapindex')) {
    throw new Error(`${label}: sitemap index not allowed — use a single urlset (${url})`)
  }
  if (body.includes('<?xml-stylesheet')) {
    throw new Error(`${label}: xml-stylesheet breaks GSC on Cloudflare (${url})`)
  }
  if (/<html[\s>]/i.test(body)) {
    throw new Error(`${label}: response is HTML, not XML — check Worker route / deploy (${url})`)
  }
  if (!body.includes('https://buydota2cheats.com/')) {
    throw new Error(`${label}: missing apex URLs — GSC property must be buydota2cheats.com (${url})`)
  }
  if (!body.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    throw new Error(`${label}: missing standard urlset xmlns (${url})`)
  }
  const locCount = (body.match(/<loc>/g) || []).length
  if (locCount < 50) {
    throw new Error(`${label}: expected ≥50 URLs, found ${locCount} (${url})`)
  }
  return { locCount, bytes: body.length }
}

/** Worker `workers/site.js` must run on www so crawlers get a single apex host. */
async function checkWorkerRoutes() {
  const res = await fetch('https://www.buydota2cheats.com/', {
    redirect: 'manual',
    headers: { 'User-Agent': GOOGLEBOT },
  })
  if (res.status === 301 || res.status === 308) {
    const loc = (res.headers.get('location') || '').toLowerCase()
    if (loc.includes('buydota2cheats.com') && !loc.includes('www.')) return
  }
  console.warn(
    'Warning: www.buydota2cheats.com does not 301 to apex — redeploy Worker (wrangler.worker.toml routes) or add dashboard routes for buy-dota2-cheats--com.',
  )
}

try {
  await checkWorkerRoutes()
  const primary = await check('sitemap', CANONICAL)
  await check('sitemap.xml', ALIAS)
  console.log(`Live sitemap OK: ${primary.locCount} URLs, ${primary.bytes} bytes (${CANONICAL} + ${ALIAS}, both HTTP 200)`)
  console.log('GSC (Domain property): remove failed row, submit full URL https://buydota2cheats.com/sitemap.xml — not URL Inspection.')
} catch (err) {
  console.error(String(err.message || err))
  process.exit(1)
}
