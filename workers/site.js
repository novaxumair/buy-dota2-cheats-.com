/**
 * Worker entry for Astro static output in ./dist.
 * IMPORTANT: Always fetch assets via https://assets.local — never the request
 * hostname — or Cloudflare returns HTTP 522 on custom domains.
 *
 * Canonical host is apex (no www). Always 301 www → apex so crawlers never
 * see duplicate content or mismatched canonical/hreflang on www.
 */
function assetsFetch(env, request, pathname) {
  return env.ASSETS.fetch(new Request(new URL(pathname, 'https://assets.local'), request))
}

/**
 * Astro `trailingSlash: 'never'` — serve `/page` via `/page/index.html` without a 308 to `/page/`.
 */
async function fetchStatic(env, request, url) {
  const pathname = url.pathname
  const search = url.search

  if (pathname === '/' || pathname.includes('.')) {
    return assetsFetch(env, request, pathname + search)
  }

  const bare = pathname.replace(/\/+$/, '') || '/'
  if (bare !== '/') {
    const indexRes = await assetsFetch(env, request, `${bare}/index.html${search}`)
    if (indexRes.ok) return indexRes
  }

  return assetsFetch(env, request, pathname + search)
}

function withHtmlCharset(response) {
  const contentType = response.headers.get('content-type') || ''
  const primary = contentType.split(',')[0].trim()
  if (!primary.toLowerCase().startsWith('text/html')) return response
  if (/charset=/i.test(primary)) {
    if (contentType.includes(',')) {
      const headers = new Headers(response.headers)
      headers.set('content-type', primary)
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
    }
    return response
  }
  const headers = new Headers(response.headers)
  headers.set('content-type', 'text/html; charset=utf-8')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

/** Prefer apex: https://www.example.com/path → https://example.com/path */
function toApexUrl(url) {
  const host = url.hostname.toLowerCase()
  if (!host.startsWith('www.')) return null
  const next = new URL(url.toString())
  next.hostname = host.slice(4)
  next.protocol = 'https:'
  return next
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.protocol === 'http:') {
      url.protocol = 'https:'
      const apex = toApexUrl(url)
      return Response.redirect((apex || url).toString(), 301)
    }

    const apex = toApexUrl(url)
    if (apex) {
      return Response.redirect(apex.toString(), 301)
    }

    const assetResponse = await fetchStatic(env, request, url)
    let response = withHtmlCharset(assetResponse)

    if (url.pathname === '/sitemap.xml' && response.ok) {
      const headers = new Headers(response.headers)
      headers.set('content-type', 'application/xml; charset=utf-8')
      headers.set('cache-control', 'public, max-age=3600')
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
    }

    // Help crawlers + Seobility: advertise preferred host + self-canonical
    const headers = new Headers(response.headers)
    if (!headers.has('Strict-Transport-Security')) {
      headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    }
    const contentType = headers.get('content-type') || ''
    if (contentType.includes('text/html')) {
      const canonical = `https://${url.hostname}${url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '') || '/'}`
      const existing = headers.get('Link')
      const linkCanonical = `<${canonical}>; rel="canonical"`
      headers.set('Link', existing ? `${existing}, ${linkCanonical}` : linkCanonical)
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  },
}
