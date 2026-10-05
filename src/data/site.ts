import { SITE_OG } from './images'
import { PAGE_OG } from './og'

export const SITE_URL = 'https://buydota2cheats.com'
export const SITE_NAME = 'Dota 2 Cheats'
export const SITE_HOST = 'buydota2cheats.com'

/** Stable site identity — Organization, WebSite, and about copy (not per-route). */
export const SITE_PURPOSE =
  'Dota 2 Cheats is a single-game site focused on Dota 2 map vision, hero ESP, timers, and related PC tools. The site is dedicated to Dota 2 only and does not sell cheats for other games.'

/** Site-wide subject terms for schema knowsAbout (max 6). */
export const SITE_ABOUT = [
  'Dota 2 cheats',
  'Dota 2',
  'Dota 2 ESP',
  'Dota 2 map hack',
  'Valve Anti-Cheat',
  'Dota 2 cheat setup',
] as const

/** Legitimate brand variants only — not a meta keyword list. */
export const ORGANIZATION_ALTERNATE_NAMES = [
  'Dota 2 Cheats',
  'Dota 2 cheats',
  'buydota2cheats',
  'buydota2cheats.com',
] as const

/**
 * Short intent-specific terms per main route (3–6 each). Not rendered as meta keywords.
 */
export const SEO_ROUTE_INTENTS = {
  home: ['dota 2 cheats', 'Dota 2 ESP', 'Dota 2 map hack', 'cheat dota 2'],
  product: ['dota 2 cheats', 'Dota 2 features', 'Dota 2 store', 'Dota 2 setup'],
  featuresHub: ['Dota 2 cheat features', 'hero ESP', 'fog of war hack'],
  reviews: ['Dota 2 Cheats reviews', 'Dota 2 buyer feedback'],
  blog: ['dota 2 cheats', 'dota 2 cheats list', 'cheat dota 2', 'cheat code dota 2'],
  forums: ['dota 2 cheats', 'cheat dota 2', 'VAC Dota 2', 'Dota 2 setup'],
  faq: ['Dota 2 Cheats FAQ', 'Dota 2 setup questions'],
} as const

/** Product JSON-LD description (features + delivery — distinct from SITE_PURPOSE). */
export const PRODUCT_SCHEMA_DESCRIPTION =
  'Windows PC menu for Dota 2 with hero ESP, full map hack, ability cooldown tracker, creep and rune timers, last-hit helper, auto-dodge, ward ESP, roshan timer, enemy inventory ESP, and digital license delivery.'

/** Offer price shown on product schema + purchase UI (lowest plan). */
export const PRODUCT_PRICE_USD = '35'

export const PRODUCT_LIFETIME_PRICE_USD = '150'

export const SEO_REGIONS = [
  { hreflang: 'en', label: 'English' },
  { hreflang: 'x-default', label: 'English' },
] as const

export const OG_IMAGE = SITE_OG

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
    title: 'Dota 2 Cheats | ESP, Map Hack & Timers',
    description:
      'Buy Dota 2 cheats for Windows PC. Hero ESP, full map hack, cooldown tracker, creep and rune timers, last-hit helper, ward ESP, roshan timer, and 24/7 support.',
    path: '/',
    ogType: 'website',
    image: PAGE_OG.home,
    imageAlt: 'Dota 2 cheats gameplay with hero ESP, map vision, and timers on PC',
    robots: INDEX_ROBOTS,
  },
  blog: {
    title: 'Dota 2 Cheats Blog | Guides & Features',
    description:
      'Dota 2 cheats blog with console command guides, item lists, lobby setup, feature deep dives, HWID safety, and 2026 product comparisons.',
    path: '/blog',
    ogType: 'website',
    image: PAGE_OG.blog,
    imageAlt: 'Dota 2 cheats blog guides and feature articles',
    robots: INDEX_ROBOTS,
  },
  forums: {
    title: 'Dota 2 Cheats Forums | Community Threads',
    description:
      'Reddit-style Dota 2 cheats forums — VAC safety, setup, hero ESP, map hack configs, loader help, and patch-day status from moderators.',
    path: '/forums',
    ogType: 'website',
    image: PAGE_OG.forums,
    imageAlt: 'Dota 2 cheats community forum threads',
    robots: INDEX_ROBOTS,
  },
  reviews: {
    title: 'Dota 2 Cheats Reviews | Buyer Feedback',
    description:
      'Read Dota 2 cheats reviews covering ESP clarity, map vision, timer accuracy, loader stability, and overall value on Windows PC.',
    path: '/reviews',
    ogType: 'website',
    image: PAGE_OG.reviews,
    imageAlt: 'Dota 2 cheats review screenshot with ESP overlays',
    robots: INDEX_ROBOTS,
  },
  faq: {
    title: 'Dota 2 Cheats FAQ',
    description:
      'Frequently asked questions about Dota 2 cheats covering VAC, features, Windows setup, monthly and lifetime plans, and support.',
    path: '/faq',
    ogType: 'website',
    image: PAGE_OG.faq,
    imageAlt: 'Dota 2 hero ESP overlay screenshot from FAQ',
    robots: INDEX_ROBOTS,
  },
  support: {
    title: 'Dota 2 Cheats Support',
    description:
      'Get support for Dota 2 cheats including loader setup, configuration help, troubleshooting, and feature guidance after purchase.',
    path: '/support',
    ogType: 'website',
    image: PAGE_OG.support,
    imageAlt: 'Dota 2 cheat support and loader help',
    robots: INDEX_ROBOTS,
  },
  product: {
    title: 'Dota 2 Cheats Store',
    description:
      'Dota 2 cheats store — hero ESP, map hack, timers, last-hit helper, auto-dodge, and inventory ESP. Monthly $35 and lifetime $150 with instant delivery.',
    path: '/dota-2-cheats',
    ogType: 'product',
    image: PAGE_OG.product,
    imageAlt: 'Dota 2 store page showing ESP, map hack, and timer modules',
    robots: INDEX_ROBOTS,
  },
  features: {
    title: 'Dota 2 Cheats Features',
    description:
      'Dota 2 cheats features include hero ESP, fog removal, ability cooldown tracker, creep spawn timers, rune indicators, and roshan timer.',
    path: '/forums/features-list',
    ogType: 'article',
    image: PAGE_OG.forums,
    imageAlt: 'Dota 2 cheat feature list with ESP and map hack modules',
    robots: INDEX_ROBOTS,
  },
  setup: {
    title: 'Dota 2 Cheats Setup',
    description:
      'Learn how Dota 2 cheats work, configure ESP and map vision, and optimize your loader setup on Windows PC.',
    path: '/forums/complete-setup',
    ogType: 'article',
    image: PAGE_OG.forums,
    imageAlt: 'Dota 2 cheat setup guide on Windows PC',
    robots: INDEX_ROBOTS,
  },
  status: {
    title: 'Dota 2 Cheats Status | Loader Active or Updating',
    description:
      'Live loader status for Dota 2 cheats on buydota2cheats.com. Active means ready to load; Updating means wait after a Valve patch.',
    path: '/status',
    ogType: 'website',
    image: PAGE_OG.status,
    imageAlt: 'Dota 2 Cheats loader status — Active or Updating',
    robots: INDEX_ROBOTS,
  },
  preview: {
    title: 'Dota 2 Cheats Preview',
    description:
      'Preview Dota 2 cheats with hero ESP, map hack, and timer overlays before checkout.',
    path: '/dota-2-cheats',
    ogType: 'website',
    image: PAGE_OG.product,
    imageAlt: 'Dota 2 cheats preview with ESP and map vision',
    robots: INDEX_ROBOTS,
  },
} as const satisfies Record<string, PageSeo>

export const HOME_HEADINGS = {
  h1: 'Dota 2 Cheats',
  h2Features: 'Dota 2 Cheats Features',
  h2HowItWorks: 'How Dota 2 Cheats Work',
  h2Reviews: 'Dota 2 Cheats Reviews',
  h2Blog: 'Dota 2 Cheats Blog',
  h2Forums: 'Community Forums',
  h2Faq: 'Dota 2 Cheats FAQ',
  h2Access: 'Ready when you are',
} as const

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
