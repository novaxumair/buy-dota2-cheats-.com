export type GameStatus = 'Active' | 'Updating' | 'Use with caution'

export type Game = {
  slug: string
  name: string
  status: GameStatus
  popular?: boolean
}

/** Site is The Isle cheats only — no other titles. */
export const GAMES: Game[] = [
  { slug: 'the-isle', name: 'The Isle', status: 'Active', popular: true },
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
    name: 'Visual options',
    items: [
      'Player ESP',
      'NPC ESP',
      'Animal ESP',
      'Box',
      'Snapline',
      'Name',
      'Distance',
      'Corpse',
      'Health',
      'Stamina',
      'Growth',
      'Species',
      'Player Direction',
      'Head Dot',
      'Visible Check',
      'Gore',
      'Fruit',
      'Water',
      'Max Distance',
    ],
  },
  {
    name: 'Misc options',
    items: [
      'Crosshair',
      'Suicide',
      'Fullbright',
      'Show FPS',
      'Show Resolution',
      'Show Time',
      'Custom Menu Key',
      'Custom Panic Key',
      'Custom ESP Colors',
    ],
  },
] as const

export const GUIDE_FEATURES = [
  {
    name: 'Player, NPC & animal ESP',
    text: 'Layer player ESP with NPC and animal markers — species, growth, health, stamina, and distance readouts before you commit to a fight or migration.',
  },
  {
    name: 'Visual overlays',
    text: 'Box, snapline, name tags, head dot, player direction, corpse, fruit, water, and gore toggles — tune max distance so jungles stay readable at night.',
  },
  {
    name: 'Misc survival utilities',
    text: 'Crosshair, fullbright, FPS/resolution/time readouts, suicide for fast respawns, and custom menu or panic keys when you need quick control.',
  },
  {
    name: 'Color and config discipline',
    text: 'Custom ESP colors plus saved profiles for herbivore growth vs carnivore hunts — swap overlays without retuning every login.',
  },
  {
    name: 'Evrima on Windows PC',
    text: 'Built for The Isle Evrima on Windows 10 and 11 via Steam when loader status is Active.',
  },
  {
    name: 'Patch-synced loader',
    text: 'We publish Active or Updating status after Evrima patches so you load only when the current build matches the game client.',
  },
] as const

/** @deprecated use PRODUCT_PAGE_FAQS from faqs.ts — kept as alias */
export { PRODUCT_PAGE_FAQS as PRODUCT_FAQS } from './faqs'
