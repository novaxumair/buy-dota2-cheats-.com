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
    name: 'Aimbot options',
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
    name: 'Player visual options',
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
    name: 'Vehicle visual options',
    items: ['Vehicle ESP', 'Vehicle Type', 'Vehicle Distance', 'Occupied / Empty'],
  },
  {
    name: 'Radar options',
    items: ['2D Radar', 'Player Markers', 'Vehicle Markers', 'Radar Range'],
  },
  {
    name: 'Misc options',
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
    name: 'Aimbot & combat assist',
    text: 'Configurable aimbot with FOV, smooth, bone selection, visible check, prediction, and draw overlays — tuned for control-zone firefights when you choose to enable assist.',
  },
  {
    name: 'Player ESP & wallhack visuals',
    text: 'Boxes, skeletons, names, weapon type, health bars, team/squad filters, and OOF arrows — see contacts through buildings and hills before you commit.',
  },
  {
    name: 'Vehicle ESP',
    text: 'Vehicle type, distance, and occupied/empty state for roads and convoys — avoid bait trucks and track rotations across the map.',
  },
  {
    name: '2D radar awareness',
    text: 'Player and vehicle markers with adjustable radar range — pair with sound for third-party timing in 100-player lobbies.',
  },
  {
    name: 'Misc weapon & vision helpers',
    text: 'No recoil, no spread, full bright, and custom crosshair when you want cleaner gunfights without rebuilding sensitivity.',
  },
  {
    name: 'Config profiles',
    text: 'Save and load configs for solo scouting vs trio pushes — swap ESP-only and assist profiles without retuning every login.',
  },
  {
    name: 'Windows PC support',
    text: 'Built for Wardogs on Windows 10 and 11 via Steam when loader status is Active.',
  },
  {
    name: 'Patch-synced loader',
    text: 'We publish Active or Updating status after Wardogs patches so you load only when the current build matches the game client.',
  },
] as const

/** @deprecated use PRODUCT_PAGE_FAQS from faqs.ts — kept as alias */
export { PRODUCT_PAGE_FAQS as PRODUCT_FAQS } from './faqs'
