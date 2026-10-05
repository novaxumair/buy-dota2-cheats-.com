/**
 * Post-deploy check: production sitemap must be fetchable like Google Search Console.
 * Usage: npm run verify:live-sitemap
 */
const SITEMAP_URL = (process.env.SITEMAP_URL || 'https://buydota2cheats.com/sitemap.xml').replace(/\/$/, '')
const ALT_URL = SITEMAP_URL.endsWith('.xml')
  ? SITEMAP_URL.replace(/\.xml$/, '')
  : `${SITEMAP_URL}.xml`

const GOOGLEBOT =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

async function check(label, url) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: { 'User-Agent': GOOGLEBOT, Accept: 'application/xml,text/xml,*/*' },
  })
  if (!res.ok) {
    throw new Error(`${label}: HTTP ${res.status} ${res.statusText} for ${url}`)
  }
  const contentType = res.headers.get('content-type') || ''
  if (!/application\/xml|text\/xml/i.test(contentType)) {
    throw new Error(`${label}: expected XML Content-Type, got "${contentType}" (${url})`)
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
  if (!body.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    throw new Error(`${label}: missing standard urlset xmlns (${url})`)
  }
  const locCount = (body.match(/<loc>/g) || []).length
  if (locCount < 50) {
    throw new Error(`${label}: expected ≥50 URLs, found ${locCount} (${url})`)
  }
  return { locCount, bytes: body.length }
}

try {
  const primary = await check('sitemap.xml', SITEMAP_URL)
  const alt = await check('sitemap', ALT_URL)
  if (primary.locCount !== alt.locCount) {
    throw new Error(`/sitemap and /sitemap.xml URL counts differ (${alt.locCount} vs ${primary.locCount})`)
  }
  console.log(
    `Live sitemap OK: ${primary.locCount} URLs, ${primary.bytes} bytes (${SITEMAP_URL} + extensionless mirror)`,
  )
} catch (err) {
  console.error(String(err.message || err))
  process.exit(1)
}
