import { ISLE_OG } from './images'
import { PAGE_OG } from './og'

export const SITE_URL = 'https://buyislecheats.com'
export const SITE_NAME = 'The Isle Cheats'
export const SITE_HOST = 'buyislecheats.com'

/** Stable site identity — Organization, WebSite, and about copy (not per-route). */
export const SITE_PURPOSE =
  'The Isle Cheats is a single-game site focused on The Isle Evrima overlays, survival tools, and related gameplay features. The site is dedicated to The Isle only and does not sell cheats for other games.'

/** Site-wide subject terms for schema knowsAbout (max 6). */
export const SITE_ABOUT = [
  'The Isle Cheats',
  'The Isle Evrima',
  'The Isle ESP',
  'The Isle survival overlays',
  'The Isle cheat setup',
  'The Isle dinosaur ESP',
] as const

/** Legitimate brand variants only — not a meta keyword list. */
export const ORGANIZATION_ALTERNATE_NAMES = [
  'The Isle Cheats',
  'The Isle cheats',
  'buyislecheats',
  'buyislecheats.com',
] as const

/**
 * Short intent-specific terms per main route (3–6 each). Not rendered as meta keywords.
 */
export const SEO_ROUTE_INTENTS = {
  home: ['the isle cheats', 'The Isle Evrima', 'The Isle ESP', 'The Isle guides'],
  product: ['the isle cheats', 'the isle esp', 'The Isle features', 'The Isle setup'],
  featuresHub: ['The Isle cheat features', 'The Isle ESP', 'The Isle visual options'],
  reviews: ['The Isle Cheats reviews', 'The Isle player feedback'],
  forums: ['The Isle Cheats forum', 'the isle esp', 'the isle evrima cheats'],
  faq: ['The Isle Cheats FAQ', 'The Isle setup questions'],
} as const

/** Product JSON-LD description (features + delivery — distinct from SITE_PURPOSE). */
export const PRODUCT_SCHEMA_DESCRIPTION =
  'Windows PC overlay menu for The Isle Evrima with player, NPC, and animal ESP, visual options, misc utilities, configs, and digital license delivery.'

/** Offer price shown on product schema + purchase UI. */
export const PRODUCT_PRICE_USD = '35'

export const SEO_REGIONS = [
  { hreflang: 'en', label: 'English' },
  { hreflang: 'x-default', label: 'Default' },
] as const

export const OG_IMAGE = ISLE_OG

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
    title: 'The Isle Cheats | Evrima Overlays, Features & Setup Guides',
    description:
      'Survival overlays for The Isle Evrima on Windows PC — player ESP, dinosaur stat readouts, visual options, and wallhack-style awareness. Loader status, setup forums, reviews, and guides.',
    path: '/',
    ogType: 'website',
    image: PAGE_OG.home,
    imageAlt: 'The Isle Evrima gameplay with player ESP, snaplines, and dinosaur stat overlays',
    robots: INDEX_ROBOTS,
  },
  forums: {
    title: 'The Isle Cheats Forum | Guides & Discussions',
    description:
      'Informational guides for the isle esp, the isle cheats evrima, and Evrima setup — player ESP, misc keys, growth sessions, and patch-day checklists.',
    path: '/forums',
    ogType: 'website',
    image: PAGE_OG.forums,
    imageAlt: 'The Isle ESP gameplay screenshot from forum guides',
    robots: INDEX_ROBOTS,
  },
  reviews: {
    title: 'The Isle Cheats Reviews | Player Feedback',
    description:
      'Player feedback on the isle cheats — ESP clarity, Evrima loader updates, misc utilities, and growth-night reliability after patches.',
    path: '/reviews',
    ogType: 'website',
    image: PAGE_OG.reviews,
    imageAlt: 'The Isle dinosaur ESP gameplay screenshot referenced in reviews',
    robots: INDEX_ROBOTS,
  },
  faq: {
    title: 'The Isle Cheats FAQ | Common Questions',
    description:
      'Answers about the isle cheats — Windows requirements, ESP and visual options, pricing from $35, digital delivery, loader status, and setup steps for Evrima.',
    path: '/faq',
    ogType: 'website',
    image: PAGE_OG.faq,
    imageAlt: 'The Isle player ESP overlay screenshot from FAQ',
    robots: INDEX_ROBOTS,
  },
  support: {
    title: 'The Isle Cheats Support | Loader & Delivery',
    description:
      'Help with The Isle cheat orders, license delivery, Windows loader steps, antivirus exclusions, and common menu errors on Evrima.',
    path: '/support',
    ogType: 'website',
    image: PAGE_OG.support,
    imageAlt: 'The Isle cheat support and loader help',
    robots: INDEX_ROBOTS,
  },
  product: {
    title: 'The Isle ESP, Aimbot & Wallhack | Features & Plans',
    description:
      'The Isle cheats for Evrima — ESP, aimbot-style assist, and wallhack-style player overlays. Visual and misc modules, pricing from $35, and loader status on PC.',
    path: '/the-isle-cheats',
    ogType: 'product',
    image: PAGE_OG.product,
    imageAlt: 'The Isle product page showing dinosaur ESP, snaplines, and stat overlays',
    robots: INDEX_ROBOTS,
  },
} as const satisfies Record<string, PageSeo>

export const HOME_HEADINGS = {
  h1: 'The Isle Cheats',
  h2Features: 'What The Isle Cheats Includes',
  h2HowItWorks: 'How It Works on Evrima',
  h2Reviews: 'The Isle Cheats Reviews',
  h2Forums: 'The Isle Cheats Forum',
  h2Faq: 'The Isle Cheats FAQ',
  h2Access: 'Ready when you are',
} as const

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
