import { ArrowRight, Clock, Eye, Map, Sparkles, Star, Swords } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { FaqSection } from '../components/FaqSection'
import { guidePath } from '../data/games'
import { CheckoutLink } from '../components/CheckoutLink'
import { HOME_FAQS } from '../data/faqs'
import { HOME_HEADINGS, PRODUCT_LIFETIME_PRICE_USD, PRODUCT_PRICE_USD, SITE_NAME } from '../data/site'
import { articlePath, forumPath } from '../data/blog-paths'
import { ARTICLES } from '../data/articles'
import { BlogArticleCard } from '../components/BlogArticleCard'
import { orderArticlesForGrid } from '../lib/blog-order'
import { FORUM_INDEX } from '../data/forum-index'
import { REVIEWS } from '../data/reviews'

const FEATURES = [
  {
    icon: Eye,
    label: 'Hero ESP',
    desc: 'Items and level on enemy heroes — know who can burst before they show on your lane.',
    href: articlePath('hero-esp-items-levels'),
  },
  {
    icon: Map,
    label: 'Map hack',
    desc: 'Remove fog of war for tactical awareness — pair with ward ESP for smarter rotations.',
    href: articlePath('full-map-hack-fog-of-war'),
  },
  {
    icon: Clock,
    label: 'Timers',
    desc: 'Creep spawn, rune indicators, and roshan timer keep your farm and objective tempo honest.',
    href: articlePath('rune-spawn-indicators'),
  },
  {
    icon: Swords,
    label: 'Teamfight tools',
    desc: 'Cooldown tracker, auto-dodge skillshots, and enemy inventory ESP for cleaner engagements.',
    href: articlePath('ability-cooldown-tracker'),
  },
] as const

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Check loader status',
    text: 'After Dota 2 patches we label builds Active or Updating on buydota2cheats.com — load only when Active matches your client.',
  },
  {
    step: '02',
    title: 'Prep Windows & exclusions',
    text: 'Close overlays, allowlist the delivery folder, and follow the complete setup forum thread so the menu opens on first inject.',
  },
  {
    step: '03',
    title: 'Configure ESP & timers first',
    text: 'Enable hero ESP and ward placement, add creep/rune timers, save a profile, then tune map vision to readable opacity.',
  },
] as const

type HomePageProps = {
  /** `hero` / `main` split so Astro can render native hero video before React loads */
  part?: 'full' | 'hero' | 'main'
}

export function HomePage({ part = 'full' }: HomePageProps) {
  const featuredReviews = REVIEWS.slice(0, 4)
  const forumHighlights = FORUM_INDEX.slice(0, 4)
  const blogHighlights = orderArticlesForGrid(ARTICLES, 4).slice(0, 4)

  const heroContent = (
        <div className="relative z-20 flex h-full min-h-0 flex-1 flex-col">
          <Navbar onVideo currentPath="/" />

          <main className="page-x relative z-0 mt-auto pb-6 sm:pb-8 lg:pb-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
              <div className="max-w-xl lg:max-w-2xl">
                <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-z-soft/80 sm:mb-3 sm:text-xs sm:tracking-[0.2em]">
                  Dota 2 · Steam · Windows PC
                </p>
                <h1 className="text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                  Dota 2 <span className="text-dota-red">Cheats</span>
                </h1>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:mt-3.5 sm:text-[0.95rem]">
                  Buy Dota 2 cheats with hero ESP, full map hack, cooldown tracker, creep and rune
                  timers, last-hit helper, and 24/7 support. Blog guides, forums, reviews, and loader
                  status before you queue.
                </p>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                  <a
                    href={guidePath('dota-2')}
                    className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Explore features
                  </a>
                  <a
                    href="/forums"
                    className="inline-flex items-center justify-center rounded-full border border-z-soft/35 bg-[rgba(28,22,48,0.88)] px-5 py-2.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition-[background-color,border-color] hover:border-z-soft/50 hover:bg-[rgba(36,28,58,0.95)]"
                  >
                    Forums
                  </a>
                </div>
              </div>

              <div className="relative z-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:w-[30rem] lg:shrink-0">
                <div className="glass flex h-full min-h-[140px] flex-col justify-between rounded-2xl p-4 sm:min-h-[160px] sm:p-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-z-soft" strokeWidth={1.75} />
                    <span className="text-sm font-semibold text-white">Patch-synced loader</span>
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-white/70 sm:mt-3 sm:text-sm">
                    <span className="text-glow-active">Active</span> or Updating labels after Dota 2
                    updates — VAC builds tracked before you load.
                  </p>
                </div>

                <div className="glass flex h-full min-h-[140px] flex-col rounded-2xl p-4 sm:min-h-[160px] sm:p-5">
                  <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-z-accent/30 text-[10px] font-bold text-z-soft sm:h-6 sm:w-6 sm:text-xs">
                      D2
                    </div>
                    <span className="text-sm font-semibold text-white">From reviews</span>
                  </div>
                  <p className="flex-1 text-xs leading-relaxed text-white/80 sm:text-sm">
                    “Rosh timer plus ward ESP cleaned up our mid-game calls — map hack opacity took
                    five minutes to dial for trios.”
                  </p>
                  <div className="mt-3 flex items-center gap-2.5 sm:mt-4 sm:gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-z-accent/25 text-xs font-semibold text-z-ink sm:h-9 sm:w-9 sm:text-sm">
                      NV
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">nova</p>
                      <p className="text-xs text-white/60">Stack trio</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
  )

  if (part === 'hero') {
    return heroContent
  }

  const mainContent = (
    <>
      <div className="hero-to-body" aria-hidden />

      <div className="page-body relative z-10">
        <section className="page-band page-x border-t border-z-soft/15 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {HOME_HEADINGS.h2Features}
            </h2>
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
              Hero ESP, map hack, timers, last-hit helper, auto-dodge, and inventory intel — blog
              articles and forum threads cover dota 2 cheats setup without cluttering your HUD.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map(({ icon: Icon, label, desc, href }) => (
                <a
                  key={label}
                  href={href}
                  className="page-card group flex h-full min-h-[168px] flex-col rounded-2xl p-5 transition-colors hover:border-z-soft/25"
                >
                  <div className="icon-well mb-4">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/70 group-hover:text-white">
                    Read guide
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="page-x py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {HOME_HEADINGS.h2HowItWorks}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
              Dota 2 cheats stay maintainable when you treat loader status and configs like part of
              your loadout — same habit as checking patch notes before a ranked session.
            </p>
            <ol className="mt-10 grid gap-4 lg:grid-cols-3">
              {HOW_IT_WORKS.map(({ step, title, text }) => (
                <li key={step} className="page-card rounded-2xl p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-z-soft/80">
                    Step {step}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-white/55">
              Full walkthrough:{' '}
              <a
                href={forumPath('complete-setup')}
                className="font-medium text-white/85 underline-offset-2 hover:underline"
              >
                setup forum thread
              </a>{' '}
              and{' '}
              <a
                href="/status"
                className="font-medium text-white/85 underline-offset-2 hover:underline"
              >
                patch-day status
              </a>
              .
            </p>
          </div>
        </section>

        <section id="reviews" className="page-band page-x border-t border-white/10 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  On-site reviews
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {HOME_HEADINGS.h2Reviews}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                  Feedback on ESP clarity, map vision, timers, and loader updates — no external review
                  links.
                </p>
              </div>
              <a
                href="/reviews"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
              >
                All reviews
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {featuredReviews.map((r) => (
                <blockquote key={r.id} className="page-card rounded-2xl p-6">
                  <div className="flex items-center gap-1 text-z-soft">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{r.body}</p>
                  <footer className="mt-4 text-xs text-white/45">
                    — {r.author}, {r.role}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" className="page-x py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">Blog</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {HOME_HEADINGS.h2Blog}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                  Console commands, cheat lists, lobby guides, HWID safety, 2026 reviews, and feature
                  deep dives — no comment threads on blog posts.
                </p>
              </div>
              <a
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
              >
                All articles
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {blogHighlights.map((post) => (
                <BlogArticleCard key={post.slug} article={post} />
              ))}
            </div>
          </div>
        </section>

        <section id="picks" className="page-band page-x border-t border-white/10 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  Community
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {HOME_HEADINGS.h2Forums}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                  Reddit-style threads with moderators, upvotes, and member replies — VAC safety,
                  setup, ESP configs, and loader help.
                </p>
              </div>
              <a
                href="/forums"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
              >
                All forums
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {forumHighlights.map((post) => (
                <a
                  key={post.slug}
                  href={forumPath(post.slug)}
                  className="page-card group flex h-full flex-col rounded-2xl p-5 sm:p-6"
                >
                  <p className="text-xs uppercase tracking-wider text-orange-200/70">
                    r/{post.community}
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-white">{post.title}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-white/80">
                    {post.commentCount} comments
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.75}
                    />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <FaqSection
          id="faq"
          heading={HOME_HEADINGS.h2Faq}
          intro="Features, loader status, platforms, delivery, and setup — before you buy."
          items={HOME_FAQS}
          moreHref="/faq"
          moreLabel="Full FAQ →"
        />

        <section className="page-band page-x border-t border-white/10 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {HOME_HEADINGS.h2Access}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
              Monthly ${PRODUCT_PRICE_USD} · Lifetime ${PRODUCT_LIFETIME_PRICE_USD}. When loader status is
              Active and your config is saved, continue to checkout for {SITE_NAME} on PC — or read
              the{' '}
              <a
                href="/dota-2-cheats"
                className="text-white/80 underline-offset-2 hover:underline"
              >
                Dota 2 store
              </a>{' '}
              first.
            </p>
            <CheckoutLink className="cta-gradient mt-8 inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
              View plans & checkout
            </CheckoutLink>
          </div>
        </section>

        <SiteFooter currentPath="/" />
      </div>
    </>
  )

  if (part === 'main') {
    return mainContent
  }

  return (
    <div className="overflow-x-hidden text-white">
      <section
        id="home"
        className="hero-panel hero-panel--home relative flex flex-col overflow-hidden"
      >
        {heroContent}
      </section>
      {mainContent}
    </div>
  )
}
