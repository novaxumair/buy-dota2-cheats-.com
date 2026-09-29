export type GameStatus = 'Active' | 'Updating' | 'Use with caution'

export type Game = {
  slug: string
  name: string
  status: GameStatus
  popular?: boolean
}

/** Site is Wardogs cheats only — no other titles. */
export const GAMES: Game[] = [
  { slug: 'wardogs', name: 'Wardogs', status: 'Active', popular: true },
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
    name: 'Aimbot Options',
    items: [
      'Enable Aimbot',
      'FOV',
      'Smooth',
      'Bone Selection',
      'Visible Check',
      'Prediction',
      'Draw FOV',
      'Draw Target Line',
    ],
  },
  {
    name: 'Player Visual Options',
    items: [
      'Box',
      'Skeleton',
      'Head Circle',
      'Health Bar',
      'Distance',
      'Name',
      'Team / Squad',
      'Weapon',
      'View Direction',
      'OOF Arrows',
      'Max Distance',
    ],
  },
  {
    name: 'Vehicle Visual Options',
    items: ['Vehicle ESP', 'Vehicle Type', 'Vehicle Distance', 'Occupied / Empty'],
  },
  {
    name: 'Radar Options',
    items: ['2D Radar', 'Player Markers', 'Vehicle Markers', 'Radar Range'],
  },
  {
    name: 'Misc Options',
    items: [
      'No Recoil',
      'No Spread',
      'Full Bright',
      'Custom Crosshair',
      'Config System (Save / Load)',
    ],
  },
] as const

export const GUIDE_FEATURES = [
  {
    name: 'Precision aimbot',
    text: 'Enable aimbot with FOV, smooth, bone selection, visible check, prediction, draw FOV, and draw target line for control-zone fights.',
  },
  {
    name: 'Player ESP stack',
    text: 'Box, skeleton, head circle, health bar, distance, name, team/squad, weapon, view direction, OOF arrows, and max distance for three-team lobbies.',
  },
  {
    name: 'Vehicle intel',
    text: 'Vehicle ESP with type labels, distance readouts, and occupied/empty state before you push a mountain road or extract lane.',
  },
  {
    name: '2D radar',
    text: 'Player and vehicle markers with adjustable radar range — pair with ESP when vehicles rotate around the control zone.',
  },
  {
    name: 'Misc combat tuning',
    text: 'No recoil, no spread, full bright, custom crosshair, and save/load configs for different squad roles.',
  },
  {
    name: 'Windows PC · Steam',
    text: 'Built for Wardogs on Windows 10 and 11 via Steam when loader status is Active. Elytra Anti-Cheat compatibility is tracked on our status page.',
  },
] as const

/** @deprecated use PRODUCT_PAGE_FAQS from faqs.ts — kept as alias */
export { PRODUCT_PAGE_FAQS as PRODUCT_FAQS } from './faqs'
