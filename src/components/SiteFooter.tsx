import { LogoMark } from './LogoMark'
import { OFFICIAL_GAME_LINKS, SITE_GUIDE_LINKS, SITE_PAGE_LINKS } from '../data/links'
import { SITE_NAME } from '../data/site'
import { isActiveRoute as isCurrent, normalizePath } from '../lib/paths'

type SiteFooterProps = {
  currentPath?: string
}

/**
 * Site footer with page / guide / official The Isle links (crawl-friendly).
 * XML sitemap remains at /sitemap.xml — not shown as an on-page “sitemap” section.
 */
export function SiteFooter({ currentPath }: SiteFooterProps) {
  const path = normalizePath(currentPath || '/')

  return (
    <footer className="page-x border-t border-z-soft/15 bg-z-band py-12 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="w-full max-w-sm shrink-0 lg:max-w-xs">
            <div className="flex items-center gap-2">
              <LogoMark />
              <span className="font-semibold text-z-ink">{SITE_NAME}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              The Isle cheats for PC — aimbot, player ESP, vehicle radar, and patch-synced loader
              status for control-zone fights.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex w-full min-w-0 flex-1 flex-col gap-8 sm:gap-10 lg:grid lg:grid-cols-3 lg:gap-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                Pages
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/65">
                {SITE_PAGE_LINKS.filter(
                  (l) => !['/privacy', '/terms', '/refunds'].includes(l.to),
                ).map((l) => (
                  <li key={l.to}>
                    <a
                      href={l.to}
                      aria-current={isCurrent(l.to, path) ? 'page' : undefined}
                      className={
                        isCurrent(l.to, path)
                          ? 'font-medium text-white'
                          : 'transition-colors hover:text-white'
                      }
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                Guides
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/65">
                {SITE_GUIDE_LINKS.map((l) => (
                  <li key={l.to}>
                    <a
                      href={l.to}
                      aria-current={isCurrent(l.to, path) ? 'page' : undefined}
                      className={
                        isCurrent(l.to, path)
                          ? 'font-medium text-white'
                          : 'transition-colors hover:text-white'
                      }
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/forums"
                    className="font-medium text-white/80 transition-colors hover:text-white"
                  >
                    All guides →
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                Official game
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/65">
                {OFFICIAL_GAME_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-col gap-2 text-sm text-white/55 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
                <li>
                  <a href="/privacy" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="/refunds" className="hover:text-white">
                    Refunds
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <p className="mt-10 border-t border-z-soft/10 pt-6 text-xs text-white/35">
          © {new Date().getFullYear()} {SITE_NAME}. Not affiliated with the The Isle publisher.
          Indexed pages are listed in{' '}
          <a href="/sitemap.xml" className="underline-offset-2 hover:text-white/55 hover:underline">
            sitemap.xml
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
