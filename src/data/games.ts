export type GameStatus = 'Active' | 'Updating' | 'Use with caution'

export type Game = {
  slug: string
  name: string
  status: GameStatus
  popular?: boolean
}

/** Site is Dota 2 cheats only — no other titles. */
export const GAMES: Game[] = [
  { slug: 'dota-2', name: 'Dota 2', status: 'Active', popular: true },
]

export function getGame(slug: string) {
  return GAMES.find((g) => g.slug === slug)
}

export function guidePath(slug: string) {
  return `/${slug.toLowerCase()}-cheats`
}

export function parseGuideSlug(param: string) {
  const lower = param.toLowerCase()
  return lower.endsWith('-cheats') ? lower.slice(0, -7) : lower
}

export const PRODUCT_FEATURE_GROUPS = [
  {
    name: 'Dota 2 Cheats modules',
    items: [
      'Hero ESP with items and level',
      'Full map hack - Remove fog of war',
      'Ability cooldown tracker',
      'Creep spawn timers',
      'Rune spawn indicators',
      'Last hit prediction helper',
      'Auto-dodge skillshots',
      'Ward placement ESP',
      'Roshan timer',
      'Enemy inventory ESP',
      'Performance optimized',
      '24/7 Support',
    ],
  },
] as const

export const GUIDE_FEATURES = [
  {
    name: 'Hero ESP',
    text: 'Track enemy heroes with item readouts and level tags so you know power spikes before they walk into your lane.',
  },
  {
    name: 'Full map vision',
    text: 'Remove fog of war for strategic awareness — pair with ward ESP so you still respect true vision and smoke plays.',
  },
  {
    name: 'Timers & prediction',
    text: 'Creep spawn timers, rune indicators, roshan timer, and last-hit prediction helper keep your farm and objective tempo on schedule.',
  },
  {
    name: 'Teamfight tools',
    text: 'Ability cooldown tracker and auto-dodge skillshots widen reaction windows without replacing game sense.',
  },
  {
    name: 'Inventory intel',
    text: 'Enemy inventory ESP surfaces key items (BKB, blink, smoke) before engagements.',
  },
  {
    name: 'Windows PC · Steam',
    text: 'Built for Dota 2 on Windows 10 and 11 via Steam when loader status is Active. Valve Anti-Cheat (VAC) compatibility is tracked on our status threads.',
  },
] as const

/** @deprecated use PRODUCT_PAGE_FAQS from faqs.ts — kept as alias */
export { PRODUCT_PAGE_FAQS as PRODUCT_FAQS } from './faqs'
