/** Blog and forum path helpers — keep post bodies out of shared chunks. */

export function articlePath(slug: string) {
  return `/blog/${slug}`
}

export function forumPath(slug: string) {
  return `/forums/${slug}`
}

export function forumsPath() {
  return '/forums'
}

export function blogListingPath() {
  return '/blog'
}

/** @deprecated use forumPath */
export function blogPath(slug: string) {
  return forumPath(slug)
}
