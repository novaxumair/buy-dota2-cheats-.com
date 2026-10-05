/**
 * Notify Google that sitemap.xml changed (after deploy).
 * Usage: npm run ping:google-sitemap
 */
const url = encodeURIComponent(
  (process.env.SITEMAP_URL || 'https://buydota2cheats.com/sitemap').replace(/\/$/, ''),
)
const ping = `https://www.google.com/ping?sitemap=${url}`
const res = await fetch(ping, { redirect: 'follow' })
const text = await res.text()
console.log(`Google ping: HTTP ${res.status} ${res.statusText}`)
if (res.status === 404 || /deprecated/i.test(text)) {
  console.log('Google deprecated sitemap ping (2023). Use GSC → Sitemaps → delete old row → submit sitemap.xml after deploy.')
  process.exit(0)
}
if (!res.ok) {
  console.error(text.slice(0, 500))
  process.exit(1)
}
console.log('Sitemap ping accepted (Google may take hours to re-fetch).')
