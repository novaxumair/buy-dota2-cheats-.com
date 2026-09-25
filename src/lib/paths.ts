export function normalizePath(path?: string) {
  if (!path) return ''
  return path.replace(/\/+$/, '') || '/'
}

/** True when `currentPath` is the route or a child of it (e.g. /forums/slug). */
export function isActiveRoute(to: string, currentPath?: string) {
  const path = normalizePath(currentPath)
  if (!path) return false
  const target = normalizePath(to)
  if (target === '/') return path === '/'
  return path === target || path.startsWith(`${target}/`)
}
