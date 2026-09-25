import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { SITE_HOST, SITE_NAME } from '../data/site'
import type { PolicyPageContent } from '../data/policies'

type PolicyPageProps = {
  page: PolicyPageContent
}

export function PolicyPage({ page }: PolicyPageProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <div className="border-b border-z-soft/15 bg-z-bg/90 backdrop-blur-xl">
        <Navbar currentPath={page.path} />
      </div>

      <main className="page-body">
        <section className="page-x pt-12 sm:pt-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              {SITE_NAME} · Policy · {SITE_HOST}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/55">{page.intro}</p>
          </div>
        </section>

        <section className="page-x py-12 sm:py-16">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {page.sections.map((section) => (
              <article key={section.heading} className="page-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/65">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-band page-x border-t border-z-soft/15 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-lg font-semibold text-white">Related policies</h2>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/65">
              {page.related.map((link) => (
                <li key={link.to}>
                  <a href={link.to} className="hover:text-z-soft">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <SiteFooter currentPath={page.path} />
      </main>
    </div>
  )
}
