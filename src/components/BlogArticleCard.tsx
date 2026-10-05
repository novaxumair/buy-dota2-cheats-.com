import { ArrowRight, Clock } from 'lucide-react'
import { articlePath } from '../data/blog-paths'
import type { Article } from '../data/articles'

type BlogArticleCardProps = {
  article: Article
}

export function BlogArticleCard({ article }: BlogArticleCardProps) {
  return (
    <a
      href={articlePath(article.slug)}
      className="page-card group flex h-full flex-col rounded-2xl p-4 transition-[border-color,transform] hover:-translate-y-0.5 sm:p-5"
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45 sm:text-xs">
        {article.tag}
      </p>
      <h3 className="mt-2 line-clamp-3 text-sm font-semibold leading-snug tracking-tight text-white sm:text-base">
        {article.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-white/55 sm:text-sm">
        {article.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between gap-2 text-xs text-white/45">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          {article.readMinutes} min
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-white/75 transition-colors group-hover:text-white">
          Read
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </span>
      </div>
    </a>
  )
}
