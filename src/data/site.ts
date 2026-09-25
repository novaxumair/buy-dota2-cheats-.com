import { WD_OG } from './images'
import { PAGE_OG } from './og'

export const SITE_URL = 'https://buywardogscheat.com'
export const SITE_NAME = 'Wardogs Cheats'
export const SITE_HOST = 'buywardogscheat.com'

/** Stable site identity — Organization, WebSite, and about copy (not per-route). */
export const SITE_PURPOSE =
  'Wardogs Cheats is a single-game site focused on Wardogs cheats, tools, and related gameplay features. The site is dedicated to Wardogs only and does not sell cheats for other games.'

/** Site-wide subject terms for schema knowsAbout (max 6). */
export const SITE_ABOUT = [
  'Wardogs Cheats',
  'Wardogs',
  'Wardogs cheat features',
  'Wardogs ESP',
  'Wardogs gameplay tools',
  'Wardogs cheat setup',
] as const

/** Legitimate brand variants only — not a meta keyword list. */
export const ORGANIZATION_ALTERNATE_NAMES = [
  'Wardogs Cheats',
  'Wardogs cheats',
  'wardogscheats',
  'wardogscheats.org',
] as const

/**
 * Short intent-specific terms per main route (3–6 each). Not rendered as meta keywords.
 * Used for docs, verification, and internal SEO discipline.
 */
export const SEO_ROUTE_INTENTS = {
  home: ['Wardogs Cheats', 'Wardogs cheats', 'Wardogs', 'Wardogs tools'],
  product: ['Wardogs Cheats', 'Wardogs cheat', 'Wardogs features', 'Wardogs setup'],
  featuresHub: ['Wardogs cheat features', 'Wardogs tools', 'Wardogs features', 'Wardogs cheats'],
  reviews: ['Wardogs Cheats reviews', 'Wardogs cheat review', 'Wardogs player feedback'],
  forums: ['Wardogs Cheats forum', 'Wardogs discussions', 'Wardogs cheat discussions'],
  faq: ['Wardogs Cheats FAQ', 'Wardogs cheat questions', 'Wardogs setup questions'],
} as const

/** Product JSON-LD description (features + delivery — distinct from SITE_PURPOSE). */
export const PRODUCT_SCHEMA_DESCRIPTION =
  'Windows PC cheat menu for Wardogs with aimbot, player ESP, vehicle ESP, 2D radar, misc weapon helpers, configs, and digital license delivery.'

/** Offer price shown on product schema + purchase UI. */
export const PRODUCT_PRICE_USD = '35'

export const SEO_REGIONS = [
  { hreflang: 'en', label: 'English' },
  { hreflang: 'x-default', label: 'Default' },
] as const

export const OG_IMAGE = WD_OG

export type PageSeo = {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article' | 'product'
  image?: string
  imageAlt?: string
  robots?: string
}

const INDEX_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export const SEO = {
  home: {
    title: 'Wardogs Cheats | Features, Tools & Updates',
    description:
      'Wardogs Cheats for PC — feature overview, setup forums, player reviews, and loader status. Single-game site dedicated to Wardogs only.',
    path: '/',
    ogType: 'website',
    image: PAGE_OG.home,
    imageAlt: 'Wardogs gameplay with ESP skeleton and aimbot FOV circle on PC',
    robots: INDEX_ROBOTS,
  },
  forums: {
    title: 'Wardogs Cheats Forum | Community Discussions',
    description:
      'Community guides and discussions for Wardogs cheats — setup, ESP, aimbot tuning, vehicle radar, loader help, and patch-day checklists.',
    path: '/forums',
    ogType: 'website',
    image: PAGE_OG.forums,
    imageAlt: 'Wardogs ESP wallhack gameplay screenshot from forum guides',
    robots: INDEX_ROBOTS,
  },
  reviews: {
    title: 'Wardogs Cheats Reviews | Player Feedback',
    description:
      'Player feedback on Wardogs cheats — ESP clarity, aimbot smoothing, vehicle radar, and loader updates after game patches.',
    path: '/reviews',
    ogType: 'website',
    image: PAGE_OG.reviews,
    imageAlt: 'Wardogs aimbot FOV gameplay screenshot referenced in reviews',
    robots: INDEX_ROBOTS,
  },
  faq: {
    title: 'Wardogs Cheats FAQ | Common Questions',
    description:
      'Answers about Wardogs cheats — Windows requirements, ESP and aimbot features, pricing from $35, digital delivery, loader status, and setup steps.',
    path: '/faq',
    ogType: 'website',
    image: PAGE_OG.faq,
    imageAlt: 'Wardogs player ESP overlay screenshot from FAQ',
    robots: INDEX_ROBOTS,
  },
  support: {
    title: 'Wardogs Cheats Support | Loader & Delivery',
    description:
      'Help with Wardogs cheat orders, license delivery, Windows loader steps, antivirus exclusions, and common menu errors.',
    path: '/support',
    ogType: 'website',
    image: PAGE_OG.support,
    imageAlt: 'Wardogs cheat support and loader help',
    robots: INDEX_ROBOTS,
  },
  product: {
    title: 'Wardogs Cheats | Features & Setup',
    description:
      'Wardogs cheat menu for PC — aimbot, player ESP, vehicle ESP, 2D radar, and config tools. System requirements, pricing from $35, and loader status.',
    path: '/wardogs-cheats',
    ogType: 'product',
    image: PAGE_OG.product,
    imageAlt: 'Wardogs product page showing ESP skeleton and aimbot FOV gameplay',
    robots: INDEX_ROBOTS,
  },
} as const satisfies Record<string, PageSeo>

export const HOME_HEADINGS = {
  h1: 'Wardogs Cheats',
  h2Features: 'Wardogs Cheats Features',
  h2HowItWorks: 'How Wardogs Cheats Works',
  h2Reviews: 'Wardogs Cheats Reviews',
  h2Forums: 'Wardogs Cheats Forum',
  h2Faq: 'Wardogs Cheats FAQ',
  h2Access: 'Ready when you are',
} as const

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
