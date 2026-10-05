/**
 * Post-deploy check: production sitemap must be fetchable like Google Search Console.
 * Usage: npm run verify:live-sitemap
 */
const SITEMAP_URL = (process.env.SITEMAP_URL || 'https://buydota2cheats.com/sitemap').replace(/\/$/, '')

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
    throw new Error(`${label}: expected XML Content-Type, got "${contentType}" (${url})`)
  }
  if (!/application\/xml/i.test(contentType)) {
    throw new Error(
      `${label}: must be application/xml (Cloudflare .xml URLs often break GSC) — got "${contentType}" (${url})`,
    )
  }
  if (res.headers.get('access-control-allow-origin') === '*') {
    throw new Error(
      `${label}: legacy embedded sitemap Function still live — redeploy Cloudflare Pages (Git push or npm run deploy:pages) (${url})`,
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

async function checkXmlAliasRedirects() {
  const res = await fetch('https://buydota2cheats.com/sitemap.xml', {
    redirect: 'manual',
    headers: { 'User-Agent': GOOGLEBOT },
  })
  if (res.status !== 301 && res.status !== 308) {
    throw new Error(`/sitemap.xml alias: expected 301, got ${res.status}`)
  }
  const location = (res.headers.get('location') || '').toLowerCase()
  if (!location.includes('/sitemap') || location.includes('sitemap.xml')) {
    throw new Error(`/sitemap.xml alias: Location must point at /sitemap, got "${location}"`)
  }
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
  throw new Error(
    'Worker routes missing: www.buydota2cheats.com must 301 to apex (Cloudflare → Workers & Pages → Routes → buy-dota2-cheats--com on buydota2cheats.com/* and www.buydota2cheats.com/*).',
  )
}

try {
  await checkWorkerRoutes()
  await checkXmlAliasRedirects()
  const primary = await check('sitemap', SITEMAP_URL)
  console.log(`Live sitemap OK: ${primary.locCount} URLs, ${primary.bytes} bytes (${SITEMAP_URL})`)
  console.log('GSC: delete old sitemap rows, submit "sitemap" only (not sitemap.xml).')
} catch (err) {
  console.error(String(err.message || err))
  process.exit(1)
}
