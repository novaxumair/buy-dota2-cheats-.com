/**
 * Post-deploy check: production sitemap must be fetchable like Google Search Console.
 * Usage: npm run verify:live-sitemap
 */
const SITEMAP_URL = (process.env.SITEMAP_URL || 'https://buydota2cheats.com/sitemap.xml').replace(/\/$/, '')
const EXTENSIONLESS = SITEMAP_URL.replace(/\/sitemap\.xml$/, '/sitemap')

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
  if (!/text\/xml|application\/xml/i.test(contentType)) {
    throw new Error(`${label}: expected text/xml Content-Type, got "${contentType}" (${url})`)
  }
  if (res.headers.get('access-control-allow-origin') === '*') {
    throw new Error(`${label}: still served by Pages Function (static sitemap required) (${url})`)
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

async function checkRedirect(fromUrl, toUrl) {
  const res = await fetch(fromUrl, {
    redirect: 'manual',
    headers: { 'User-Agent': GOOGLEBOT },
  })
  if (res.status !== 301 && res.status !== 308) {
    throw new Error(`/sitemap redirect: expected 301, got ${res.status} for ${fromUrl}`)
  }
  const location = res.headers.get('location') || ''
  if (!location.includes('/sitemap.xml')) {
    throw new Error(`/sitemap redirect: Location must be sitemap.xml, got "${location}"`)
  }
}

try {
  const primary = await check('sitemap.xml', SITEMAP_URL)
  await checkRedirect(EXTENSIONLESS, SITEMAP_URL)
  console.log(`Live sitemap OK: ${primary.locCount} URLs, ${primary.bytes} bytes (${SITEMAP_URL}, static)`)
} catch (err) {
  console.error(String(err.message || err))
  process.exit(1)
}
