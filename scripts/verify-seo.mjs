import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const site = 'https://buyislecheats.com'
const failures = []

function fail(message) {
  failures.push(message)
}

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : []
  })
}

function pageUrl(file) {
  const page = relative(dist, file).replaceAll('\\', '/')
  if (page === 'index.html') return `${site}/`
  if (page.endsWith('/index.html')) return `${site}/${page.slice(0, -11)}`
  return `${site}/${page.slice(0, -5)}`
}

const files = htmlFiles(dist)
const titles = new Map()
const descriptions = new Map()

for (const file of files) {
  const html = readFileSync(file, 'utf8')
  const page = relative(dist, file).replaceAll('\\', '/')
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1]
  const canonicalUrl = pageUrl(file)

  if (h1Count !== 1) fail(`${page}: expected one H1, found ${h1Count}`)
  if (!title) fail(`${page}: missing title`)
  else if (titles.has(title)) fail(`${page}: duplicate title also used by ${titles.get(title)}`)
  else titles.set(title, page)
  if (!description) fail(`${page}: missing description`)
  else if (descriptions.has(description)) {
    fail(`${page}: duplicate description also used by ${descriptions.get(description)}`)
  } else descriptions.set(description, page)

  if (page !== '404.html') {
    if (!html.includes(`rel="canonical" href="${canonicalUrl}"`)) {
      fail(`${page}: missing self-referencing canonical ${canonicalUrl}`)
    }
    const hasHreflangEn =
      html.includes(`hreflang="en" href="${canonicalUrl}"`) ||
      html.includes(`href="${canonicalUrl}" hreflang="en"`)
    const hasHreflangDefault =
      html.includes(`hreflang="x-default" href="${canonicalUrl}"`) ||
      html.includes(`href="${canonicalUrl}" hreflang="x-default"`)
    if (!hasHreflangEn) {
      fail(`${page}: missing self-referencing hreflang=en`)
    }
    if (!hasHreflangDefault) {
      fail(`${page}: missing self-referencing hreflang=x-default`)
    }
  }

  if (html.includes('assets-prd.ignimgs.com')) fail(`${page}: contains third-party IGN image`)
  if (html.includes('cdn.cosmocheats.com')) fail(`${page}: contains third-party media hotlink`)
  if (html.includes('SearchAction')) fail(`${page}: contains invalid SearchAction`)
  if (html.includes('"keywords"')) fail(`${page}: contains keyword-list structured data`)
  if (/forums\/(instructions|how-to-load)/.test(html)) {
    fail(`${page}: links to a retired forum route`)
  }
}

const home = readFileSync(join(dist, 'index.html'), 'utf8')
const product = readFileSync(join(dist, 'the-isle-cheats', 'index.html'), 'utf8')
const reviews = readFileSync(join(dist, 'reviews', 'index.html'), 'utf8')
const faq = readFileSync(join(dist, 'faq', 'index.html'), 'utf8')
const support = readFileSync(join(dist, 'support', 'index.html'), 'utf8')
const forums = readFileSync(join(dist, 'forums', 'index.html'), 'utf8')
const siteTs = readFileSync(join(root, 'src', 'data', 'site.ts'), 'utf8')

if (!home.includes('<title>The Isle Cheats | Evrima ESP, Guides &amp; Community</title>')) {
  fail('Homepage does not own the exact title')
}
if (!product.includes('<title>The Isle ESP, Aimbot &amp; Wallhack | Features &amp; Plans</title>')) {
  fail('Product page title must match SEO.product')
}
if (!forums.includes('<title>The Isle Cheats Forum | Guides &amp; Discussions</title>')) {
  fail('Forums index title must match SEO.forums')
}
if (!siteTs.includes('The Isle survival overlays')) {
  fail('SITE_ABOUT must include The Isle survival overlays (6-term cap)')
}
if (!siteTs.includes('buyislecheats.com')) {
  fail('ORGANIZATION_ALTERNATE_NAMES must include buyislecheats.com')
}
if (/name="keywords"/.test(home + product + forums)) {
  fail('Pages must not use meta keywords')
}
const purposeMatch = siteTs.match(/export const SITE_PURPOSE =\s*\n\s*'([^']+)'/)
const sitePurpose = purposeMatch?.[1] ?? ''
if (!sitePurpose.includes('does not sell cheats for other games')) {
  fail('SITE_PURPOSE must state single-game The Isle focus')
}
if ((siteTs.match(/SITE_ABOUT = \[[\s\S]*?\] as const/)?.[0].match(/'/g) || []).length !== 12) {
  fail('SITE_ABOUT must contain exactly 6 terms')
}
if (!home.includes(JSON.stringify(sitePurpose).slice(1, -1))) {
  fail('Homepage JSON-LD must include stable SITE_PURPOSE on Organization/WebSite')
}
if (product.includes('<title>Buy ')) fail('Product details page competes with homepage buy title')
if ((faq.match(/"@type":"FAQPage"/g) || []).length !== 1) fail('/faq must own one FAQPage')
for (const [name, html] of [
  ['home', home],
  ['product', product],
  ['reviews', reviews],
  ['support', support],
]) {
  if (html.includes('"@type":"FAQPage"')) fail(`${name}: duplicate FAQPage schema`)
}
for (const [name, html] of [
  ['home', home],
  ['product', product],
  ['reviews', reviews],
]) {
  if (!html.includes('"@id":"https://buyislecheats.com/#product"')) {
    fail(`${name}: missing shared Product ID`)
  }
}
if ((reviews.match(/"@type":"Review"/g) || []).length !== 8) {
  fail('Reviews schema must contain exactly 8 visible buyer reviews')
}
if (
  !reviews.includes('"reviewCount":"8"') ||
  !reviews.includes('"ratingValue":"4.6"')
) {
  fail('Reviews AggregateRating must report 8 reviews averaging 4.6')
}
if (support.includes('noindex')) fail('Support page must be indexable')
if (!forums.includes('"@type":"BreadcrumbList"')) {
  fail('/forums must expose BreadcrumbList schema')
}
function decodeEntities(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&#38;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

for (const file of files) {
  const page = relative(dist, file).replaceAll('\\', '/')
  if (page === '404.html' || page === 'checkout/index.html') continue
  const html = readFileSync(file, 'utf8')
  if (html.includes('content="noindex')) fail(`${page}: content page must not be noindex`)

  const title = decodeEntities(html.match(/<title>(.*?)<\/title>/)?.[1])
  const description = decodeEntities(html.match(/<meta name="description" content="([^"]+)"/)?.[1])
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1]
  const ogTitle = decodeEntities(html.match(/<meta property="og:title" content="([^"]+)"/)?.[1])
  const ogDesc = decodeEntities(html.match(/<meta property="og:description" content="([^"]+)"/)?.[1])
  const twImage = html.match(/<meta name="twitter:image" content="([^"]+)"/)?.[1]
  const robotsMeta = html.match(/<meta name="robots" content="([^"]+)"/)?.[1]

  if (!ogImage?.startsWith('https://buyislecheats.com/og/') || !ogImage.endsWith('.jpg')) {
    fail(`${page}: og:image must be https://buyislecheats.com/og/*.jpg for SERP thumbnails`)
  }
  if (!twImage || twImage !== ogImage) {
    fail(`${page}: twitter:image must match og:image`)
  }
  if (ogTitle !== title) fail(`${page}: og:title must match <title>`)
  if (ogDesc !== description) fail(`${page}: og:description must match meta description`)
  if (!html.includes('property="og:image:width" content="1200"')) {
    fail(`${page}: og:image:width must be 1200`)
  }
  if (!html.includes('property="og:image:height" content="630"')) {
    fail(`${page}: og:image:height must be 630`)
  }
  if (!robotsMeta?.includes('max-image-preview:large')) {
    fail(`${page}: robots must allow max-image-preview:large`)
  }
  if (!html.includes('rel="image_src"')) {
    fail(`${page}: missing link rel=image_src for thumbnail crawlers`)
  }
}
for (const [name, html] of [
  ['home', home],
  ['product', product],
  ['forums', forums],
]) {
  if (!html.includes('/media/isle-') && !html.includes('/videos/hero.webm')) {
    fail(`${name}: missing visible The Isle media in page body`)
  }
}
for (const [name, html, og] of [
  ['reviews', reviews, '/og/reviews.jpg'],
  ['faq', faq, '/og/faq.jpg'],
  ['support', support, '/og/support.jpg'],
]) {
  if (!html.includes(og)) {
    fail(`${name}: missing Open Graph image ${og}`)
  }
}
if (!product.includes('preview-marquee-track') || !product.includes('/media/isle-screenshot-1.webp')) {
  fail('Product page is missing the gameplay preview image carousel')
}
if (home.includes('iframe.mediadelivery.net') || product.includes('iframe.mediadelivery.net')) {
  fail('Pages still embed blocked mediadelivery video (403 off-domain)')
}
if (
  /tarkovcheats|Escape from Tarkov|tarkov-reaper|warzonecheats|buywardogscheat|wardogshacks|arena breakout|\.uk\/|Delta Product|Auron Product/i.test(
    home + product,
  )
) {
  fail('Built pages still contain legacy Tarkov/Warzone branding')
}

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8')
if (sitemap.includes('<sitemapindex')) fail('sitemap.xml must be a single urlset, not an index')
if (/forums\/(instructions|how-to-load)/.test(sitemap)) fail('Retired forum remains in sitemap.xml')
if (!sitemap.includes('https://buyislecheats.com/')) {
  fail('sitemap.xml must use https://buyislecheats.com URLs')
}
if (!sitemap.includes('/videos/hero.webm')) {
  fail('sitemap.xml missing The Isle preview video entry')
}
if (!sitemap.includes('xmlns:video=')) {
  fail('sitemap.xml missing video namespace for Google video indexing')
}
if (/tarkovcheats|Tarkov|warzonecheats|Delta Product|Auron Product|Ricochet/i.test(sitemap)) {
  fail('sitemap.xml still contains legacy Tarkov/Warzone branding')
}
const expectedUrls = new Set(
  files
    .filter((file) => relative(dist, file).replaceAll('\\', '/') !== '404.html')
    .map(pageUrl),
)
const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || []
const pageLocs = urlBlocks.map((block) => block.match(/<loc>([^<]+)<\/loc>/)?.[1]).filter(Boolean)
const uniqueSitemapUrls = new Set(pageLocs)
const imageLocs = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1])
const requiredImages = [
  '/og/home.jpg',
  '/og/the-isle-cheats.jpg',
  '/og/forums.jpg',
  '/og/reviews.jpg',
  '/og/faq.jpg',
  '/og/support.jpg',
  '/media/isle-hero-full.webp',
  '/media/isle-cover.webp',
  '/media/isle-screenshot-5.webp',
  '/media/isle-menu.webp',
  '/media/isle-video-thumb.jpg',
]

for (const url of expectedUrls) {
  if (!uniqueSitemapUrls.has(url)) fail(`sitemap.xml missing built page ${url}`)
}
for (const url of uniqueSitemapUrls) {
  if (!expectedUrls.has(url)) fail(`sitemap.xml contains URL without a built page: ${url}`)
}
if (uniqueSitemapUrls.size !== pageLocs.length) fail('sitemap.xml contains duplicate URLs')
if (urlBlocks.length !== expectedUrls.size) {
  fail(`sitemap.xml must contain exactly ${expectedUrls.size} built page URLs`)
}
if ((sitemap.match(/<image:image>/g) || []).length < expectedUrls.size) {
  fail('Every sitemap URL must include at least one image entry')
}
for (const block of urlBlocks) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] || '(unknown)'
  if (!block.includes('<image:image>') || !block.includes('<image:loc>')) {
    fail(`sitemap URL missing image entry: ${loc}`)
  }
}
for (const image of requiredImages) {
  if (!imageLocs.some((loc) => loc.endsWith(image))) {
    fail(`sitemap.xml missing required image ${image}`)
  }
}
if (!sitemap.trimStart().startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
  fail('sitemap.xml must start with an XML declaration')
}
if (!sitemap.includes('<?xml-stylesheet type="text/css" href="/sitemap.css"?>')) {
  fail('sitemap.xml must reference /sitemap.css for readable browser view (Googlebot ignores the PI)')
}
if (sitemap.includes('xmlns:xhtml=') || sitemap.includes('hreflang=')) {
  fail('sitemap.xml must not duplicate hreflang entries (single-locale site; use HTML link tags)')
}
for (const stale of [
  'sitemap-pages.xml',
  'sitemap-products.xml',
  'sitemap-forums.xml',
  'sitemap-images.xml',
  'sitemap-blogs.xml',
  'sitemap-regions.xml',
  'sitemap-index.xml',
  'sitemap_index.xml',
]) {
  if (existsSync(join(dist, stale))) fail(`Stale split sitemap still published: ${stale}`)
}

if (!existsSync(join(dist, 'sitemap.xml'))) fail('dist/sitemap.xml is missing')
if (!existsSync(join(dist, 'robots.txt'))) fail('dist/robots.txt is missing')
if (!existsSync(join(dist, '_routes.json'))) fail('dist/_routes.json is missing')

const robots = readFileSync(join(dist, 'robots.txt'), 'utf8')
if (!robots.includes('Sitemap: https://buyislecheats.com/sitemap.xml')) {
  fail('robots.txt must point at the canonical HTTPS sitemap')
}
if (!robots.includes('Allow: /sitemap.xml')) {
  fail('robots.txt must explicitly allow /sitemap.xml')
}
if (!robots.includes('Allow: /videos/')) {
  fail('robots.txt must allow /videos/ for preview crawlability')
}
if (!robots.includes('User-agent: Googlebot')) {
  fail('robots.txt must explicitly allow Googlebot')
}

const routes = JSON.parse(readFileSync(join(dist, '_routes.json'), 'utf8'))
if (!routes.exclude?.includes('/sitemap.xml') || !routes.exclude?.includes('/robots.txt')) {
  fail('_routes.json must exclude /sitemap.xml and /robots.txt from Functions')
}

for (const asset of [
  'public/og/home.jpg',
  'public/og/the-isle-cheats.jpg',
  'public/og/forums.jpg',
  'public/og/reviews.jpg',
  'public/og/faq.jpg',
  'public/og/support.jpg',
  'public/media/isle-hero-full.webp',
  'public/media/isle-cover.webp',
  'public/media/isle-menu.webp',
  'public/media/isle-video-thumb.jpg',
  'public/media/isle-screenshot-1.webp',
  'public/videos/hero.webm',
  'public/sitemap.css',
  'public/_routes.json',
  'functions/_middleware.js',
]) {
  if (!existsSync(join(root, asset))) fail(`Missing first-party asset: ${asset}`)
}
if (existsSync(join(root, 'public/videos/dayz-preview.mp4'))) {
  fail('Remove unused legacy asset: public/videos/dayz-preview.mp4')
}

const redirects = readFileSync(join(root, 'public', '_redirects'), 'utf8')
if (!redirects.includes('/sitemap-pages.xml')) {
  fail('_redirects missing legacy sitemap -> /sitemap.xml redirects')
}
if (!redirects.includes('/sitemap-index.xml')) {
  fail('_redirects missing sitemap-index.xml -> /sitemap.xml redirect')
}
if (!redirects.includes('/buy-the-isle-cheats')) {
  fail('_redirects must map buy-the-isle-cheats keyword alias')
}
if (!redirects.includes('/abi-cheats')) {
  fail('_redirects must map legacy /abi-cheats to /the-isle-cheats')
}
if (/^\/the-isle-cheats\s+\/the-isle-cheats\s/m.test(redirects)) {
  fail('_redirects must not 301 /the-isle-cheats to itself (redirect loop)')
}

const worker = readFileSync(join(root, 'workers', 'site.js'), 'utf8')
if (!worker.includes("startsWith('www.')") && !worker.includes('startsWith("www.")')) {
  fail('workers/site.js must detect www. hostnames for apex redirect')
}
if (!worker.includes('301')) {
  fail('workers/site.js must 301 www ? apex for a single canonical host')
}

const middleware = readFileSync(join(root, 'functions', '_middleware.js'), 'utf8')
if (!middleware.includes("startsWith('www.')") && !middleware.includes('startsWith("www.")')) {
  fail('functions/_middleware.js must 301 www ? apex')
}

if (site.includes('://www.')) {
  fail('Canonical SITE_URL must be apex (no www) Â www redirects to apex')
}

for (const file of files) {
  if (file.endsWith('404.html')) continue
  const html = readFileSync(file, 'utf8')
  if (/rel="canonical" href="https:\/\/www\./.test(html)) {
    fail(`${relative(dist, file)}: canonical must not use www`)
  }
  if (/hreflang="en" href="https:\/\/www\./.test(html)) {
    fail(`${relative(dist, file)}: hreflang must not use www`)
  }
}

const headers = readFileSync(join(root, 'public', '_headers'), 'utf8')
if (!headers.includes('Content-Type: text/html; charset=utf-8')) {
  fail('_headers missing HTML charset Content-Type')
}
if (!headers.includes('/sitemap.xml')) {
  fail('_headers missing /sitemap.xml Content-Type')
}
if (!headers.includes('application/xml; charset=utf-8')) {
  fail('_headers missing application/xml charset Content-Type for /sitemap.xml')
}

if (failures.length) {
  throw new Error(`SEO verification failed:\n- ${failures.join('\n- ')}`)
}

console.log(`SEO verification passed: ${files.length} HTML files, 14 forums, 8 reviews`)
