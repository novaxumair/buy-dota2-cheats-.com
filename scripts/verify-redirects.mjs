import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const failures = []

function fail(message) {
  failures.push(message)
}

/** Strip trailing slash except for root. */
function stripTrailingSlash(path) {
  if (!path || path === '/') return '/'
  return path.replace(/\/+$/, '') || '/'
}

function splitHash(path) {
  const [pathname, hash = ''] = path.split('#')
  return { pathname, hash }
}

function parseRedirects(file) {
  const rules = []
  for (const line of file.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const parts = trimmed.split(/\s+/)
    if (parts.length < 2) continue
    const status = parts.at(-1)
    const to = parts.at(-2)
    const from = parts.slice(0, -2).join(' ')
    if (!/^\d+$/.test(status)) continue
    rules.push({ from, to, status: Number(status) })
  }
  return rules
}

function htmlRoutes(directory, base = '') {
  const routes = new Set()
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      for (const r of htmlRoutes(path, `${base}/${entry.name}`)) routes.add(r)
    } else if (entry.name.endsWith('.html')) {
      if (entry.name === '404.html') continue
      if (entry.name === 'index.html') {
        routes.add(stripTrailingSlash(base || '/'))
      } else {
        routes.add(stripTrailingSlash(`${base}/${entry.name.slice(0, -5)}`))
      }
    }
  }
  return routes
}

function staticAssetRoutes(directory, base = '') {
  const routes = new Set()
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      for (const r of staticAssetRoutes(path, `${base}/${entry.name}`)) routes.add(r)
    } else if (!entry.name.endsWith('.html')) {
      routes.add(stripTrailingSlash(`${base}/${entry.name}`))
    }
  }
  return routes
}

function slugFromBlogSource(from, pattern) {
  if (!pattern.includes(':slug')) return undefined
  const fromParts = from.replace(/\/+$/, '').split('/')
  const patternParts = pattern.replace(/\/+$/, '').split('/')
  const slugIndex = patternParts.indexOf(':slug')
  if (slugIndex === -1) return undefined
  return fromParts[slugIndex]
}

function resolveTarget(to, slug) {
  if (to.includes(':slug')) {
    if (!slug) return null
    return to.replace(':slug', slug)
  }
  return to
}

function lookupRedirect(pathname, redirectMap) {
  return redirectMap.get(pathname)
}

function followRedirects(startPathname, redirectMap, maxHops = 20) {
  const chain = [startPathname]
  let current = startPathname
  const seen = new Set([current])

  for (let hop = 0; hop < maxHops; hop++) {
    const next = lookupRedirect(current, redirectMap)
    if (!next) {
      return { finalPath: current, chain, loop: false }
    }
    const { pathname, hash } = splitHash(next)
    const resolved = stripTrailingSlash(pathname) + (hash ? `#${hash}` : '')
    if (seen.has(resolved)) {
      chain.push(resolved)
      return { finalPath: resolved, chain, loop: true }
    }
    chain.push(resolved)
    seen.add(resolved)
    current = stripTrailingSlash(pathname)
  }
  return { finalPath: current, chain, loop: true }
}

const blogsTs = readFileSync(join(root, 'src', 'data', 'blogs.ts'), 'utf8')
const slugs = [...blogsTs.matchAll(/"slug": "([^"]+)"/g)].map((m) => m[1])

const redirectsRaw = readFileSync(join(root, 'public', '_redirects'), 'utf8')
const rules = parseRedirects(redirectsRaw)

const redirectMap = new Map()
for (const rule of rules) {
  const entries = rule.from.includes(':slug')
    ? slugs.flatMap((slug) => {
        const from = rule.from.replace(':slug', slug)
        const to = resolveTarget(rule.to, slug)
        return to ? [[from, to]] : []
      })
    : [[rule.from, rule.to]]

  for (const [from, to] of entries) {
    if (redirectMap.has(from) && redirectMap.get(from) !== to) {
      fail(`Conflicting redirect sources for ${from}`)
    }
    redirectMap.set(from, to)
  }
}

if (!existsSync(dist)) {
  fail('dist/ missing — run `npm run build` before verify-redirects')
} else {
  const pageRoutes = htmlRoutes(dist)
  const assetRoutes = staticAssetRoutes(dist)
  const validDestinations = new Set([...pageRoutes, ...assetRoutes])

  for (const rule of rules) {
    if (rule.from.includes(':slug')) {
      for (const slug of slugs) {
        const from = rule.from.replace(':slug', slug)
        const to = resolveTarget(rule.to, slug)
        if (!to) {
          fail(`Could not resolve redirect target for ${from}`)
          continue
        }
        const { chain, loop } = followRedirects(stripTrailingSlash(from), redirectMap)
        if (loop) fail(`Redirect loop: ${chain.join(' → ')}`)
        const dest = stripTrailingSlash(splitHash(chain.at(-1)).pathname)
        if (!validDestinations.has(dest)) {
          fail(`Redirect target missing: ${from} → ${chain.join(' → ')} (${dest})`)
        }
      }
      continue
    }

    const fromPath = stripTrailingSlash(splitHash(rule.from).pathname)
    const toPath = stripTrailingSlash(splitHash(rule.to).pathname)
    const trailingSlashOnly =
      fromPath === toPath && rule.from !== rule.to && rule.from.endsWith('/')
    if (fromPath === toPath && !rule.to.includes('#') && !trailingSlashOnly) {
      fail(`Self redirect: ${rule.from} → ${rule.to}`)
    }

    const startPath = rule.from.endsWith('/') ? rule.from : fromPath
    const { chain, loop } = followRedirects(startPath, redirectMap)
    if (loop) fail(`Redirect loop: ${chain.join(' → ')}`)
    const dest = stripTrailingSlash(splitHash(chain.at(-1)).pathname)
    if (!validDestinations.has(dest)) {
      fail(`Redirect target missing: ${rule.from} → ${chain.join(' → ')} (${dest})`)
    }
  }

  const srcFiles = []
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name)
      if (entry.isDirectory()) walk(p)
      else if (/\.(tsx|astro|ts|jsx|js|mjs)$/.test(entry.name)) srcFiles.push(p)
    }
  }
  walk(join(root, 'src'))

  const hrefRe = /href=["'{]([^"'{}]+)["'}]/g
  for (const file of srcFiles) {
    const text = readFileSync(file, 'utf8')
    let match
    while ((match = hrefRe.exec(text))) {
      let href = match[1]
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#') || href.includes('${')) {
        continue
      }
      const { pathname } = splitHash(href)
      if (!pathname.startsWith('/')) continue
      const norm = stripTrailingSlash(pathname)
      const { chain, loop } = followRedirects(norm, redirectMap)
      if (loop) {
        fail(`Internal href resolves to loop ${chain.join(' → ')} (${relative(root, file)})`)
      }
      const dest = stripTrailingSlash(splitHash(chain.at(-1)).pathname)
      if (!validDestinations.has(dest)) {
        fail(`Internal href missing destination ${norm} → ${dest} (${relative(root, file)})`)
      }
    }
  }
}

if (failures.length) {
  console.error(`Redirect verification failed (${failures.length} issues):\n- ${failures.join('\n- ')}`)
  process.exit(1)
}

console.log(
  `Redirect verification passed: ${rules.length} rules, ${slugs.length} forum slugs checked`,
)
