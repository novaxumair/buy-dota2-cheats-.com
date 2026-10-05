import type { Article } from '../data/articles'

/**
 * Reorders articles so horizontal neighbors in a grid never share the same tag.
 * (For `cols` columns, indices i and i+1 must differ when i+1 is not the first column.)
 */
export function orderArticlesForGrid(articles: readonly Article[], cols = 4): Article[] {
  if (articles.length <= 1) return [...articles]

  const remaining = new Map<string, Article[]>()
  for (const a of articles) {
    const list = remaining.get(a.tag) ?? []
    list.push(a)
    remaining.set(a.tag, list)
  }

  const tags = [...remaining.keys()]
  const out: Article[] = []

  while (out.length < articles.length) {
    const leftTag = out.length % cols !== 0 ? out[out.length - 1]?.tag : undefined

    const candidates = tags.filter((t) => {
      const bucket = remaining.get(t)
      return bucket && bucket.length > 0 && t !== leftTag
    })

    let pickTag: string | undefined
    if (candidates.length > 0) {
      pickTag = candidates.sort(
        (a, b) => (remaining.get(b)?.length ?? 0) - (remaining.get(a)?.length ?? 0),
      )[0]
    } else {
      pickTag = tags.find((t) => (remaining.get(t)?.length ?? 0) > 0)
    }

    if (!pickTag) break

    const bucket = remaining.get(pickTag)!
    const next = bucket.shift()!
    if (bucket.length === 0) remaining.delete(pickTag)
    out.push(next)
  }

  return out
}
