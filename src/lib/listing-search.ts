/** Build a lowercase haystack string for client + inline listing search. */
export function blogSearchHaystack(article: {
  title: string
  excerpt: string
  tag: string
  searchTerms: string
  slug: string
}) {
  return `${article.title} ${article.excerpt} ${article.tag} ${article.searchTerms} ${article.slug}`.toLowerCase()
}

export function forumSearchHaystack(thread: {
  title: string
  excerpt: string
  tag: string
  community: string
  slug: string
}) {
  return `${thread.title} ${thread.excerpt} ${thread.tag} r/${thread.community} ${thread.slug}`.toLowerCase()
}
