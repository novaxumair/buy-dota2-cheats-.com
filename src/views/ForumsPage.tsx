import { useMemo, useState } from 'react'
import { ArrowRight, Lock } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { HeroSearch } from '../components/HeroSearch'
import { blogPath } from '../data/blogs'
import { FORUM_INDEX } from '../data/forum-index'
import { guidePath } from '../data/games'
import { SITE_HOST } from '../data/site'

type ForumsPageProps = {
  initialQuery?: string
  /** Hero video is rendered by HeroVideoBg.astro in the page shell */
  bareHero?: boolean
}

export function ForumsPage({ initialQuery = '', bareHero = false }: ForumsPageProps) {
  const [q, setQ] = useState(() => initialQuery)

  function onSearchChange(next: string) {
    setQ(next)
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return FORUM_INDEX
    return FORUM_INDEX.filter((b) => {
      const hay = `${b.title} ${b.excerpt} ${b.tag}`.toLowerCase()
      return hay.includes(term)
    })
  }, [q])

  const heroContent = (
        <div className="relative z-20 flex min-h-[60vh] flex-col sm:min-h-[65vh]">
          <Navbar onVideo currentPath="/forums" />
          <div className="page-x mt-auto pb-10 sm:pb-14">
            <div className="relative z-30 mx-auto max-w-6xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Forums · Setup · {SITE_HOST}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Wardogs Cheats Forum
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
                Informational guides for wardogs esp, wardogs aimbot, vehicle radar, and loader help —
                plus commercial threads when you want to buy wardogs cheats safely.
              </p>
              <div className="relative z-50 mt-7">
                <HeroSearch
                  value={q}
                  onChange={onSearchChange}
                  submitTo="filter"
                  placeholder="Search forums — setup, antivirus, hotkeys…"
                />
              </div>
            </div>
          </div>
        </div>
  )

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      {bareHero ? (
        heroContent
      ) : (
        <section className="relative flex min-h-[60vh] flex-col overflow-x-clip sm:min-h-[65vh]">
          {heroContent}
        </section>
      )}

      <div className="hero-to-body" aria-hidden />

      <main className="page-body relative z-10">
        <section className="page-x py-12">
          <div className="mx-auto max-w-6xl">
            <div className="page-card mb-10 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/45">Product</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Wardogs Cheats</h2>
                <p className="mt-2 max-w-xl text-sm text-white/55">
                  Wardogs ESP, aimbot, and wallhack-style visuals — confirm Active loader status
                  before checkout.
                </p>
              </div>
              <a
                href={guidePath('wardogs')}
                className="cta-gradient inline-flex shrink-0 items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white"
              >
                Product details
              </a>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-white">
                {q.trim() ? 'Search results' : 'All forum threads'}
              </h2>
              <p className="text-sm text-white/40">
                {filtered.length} thread{filtered.length === 1 ? '' : 's'}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="page-card mt-8 rounded-2xl px-6 py-10 text-center">
                <p className="text-sm text-white/55">
                  Nothing matched “{q}”. Try “setup”, “antivirus”, or “hotkeys”.
                </p>
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="mt-4 text-sm font-medium text-white hover:text-white/80"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post) => (
                  <a
                    key={post.slug}
                    href={blogPath(post.slug)}
                    aria-label={`Read forum thread: ${post.title}`}
                    className="page-card group flex h-full flex-col rounded-2xl p-5 sm:p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-white/45">
                        {post.tag}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-amber-100/80">
                        <Lock className="h-3 w-3" strokeWidth={2} aria-hidden />
                        Locked
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold tracking-tight text-white sm:text-lg">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-white/80">
                      Open thread
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={1.75}
                      />
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <SiteFooter currentPath="/forums" />
      </main>
    </div>
  )
}
