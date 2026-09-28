import { blogPath } from './blog-paths'

/** Official The Isle destinations for factual game context. */
export const OFFICIAL_GAME_LINKS = [
  {
    label: 'The Isle on Steam',
    href: 'https://store.steampowered.com/app/376210/The_Isle/',
    description: 'Official PC store page',
  },
] as const

/** Primary internal routes for crawl equity. */
export const SITE_PAGE_LINKS = [
  { label: 'Home', to: '/', description: 'Overview, guides, and checkout' },
  {
    label: 'Product page',
    to: '/the-isle-cheats',
    description: 'ESP, visual options, and Evrima compatibility',
  },
  {
    label: 'Forums index',
    to: '/forums',
    description: 'Setup forums — ESP, misc options, load, status',
  },
  {
    label: 'Player reviews',
    to: '/reviews',
    description: 'Player reviews and ratings',
  },
  {
    label: 'FAQ answers',
    to: '/faq',
    description: 'Frequently asked questions',
  },
  {
    label: 'Support desk',
    to: '/support',
    description: 'Delivery, loader and setup help',
  },
  {
    label: 'Privacy policy',
    to: '/privacy',
    description: 'Order data and site privacy',
  },
  {
    label: 'Terms of use',
    to: '/terms',
    description: 'License rules and risk disclaimer',
  },
  {
    label: 'Refund policy',
    to: '/refunds',
    description: 'When digital license refunds apply',
  },
] as const

export const SITE_GUIDE_LINKS = [
  { label: 'Features checklist', to: blogPath('features-list') },
  { label: 'Player ESP setup', to: blogPath('player-esp-first') },
  { label: 'Advanced ESP tactics', to: blogPath('advanced-esp-tactics') },
  { label: 'Evrima recode notes', to: blogPath('the-isle-evrima-cheats-recode') },
  { label: 'Visual options breakdown', to: blogPath('complete-visual-options-breakdown') },
  { label: 'Hotkeys', to: blogPath('hotkeys') },
  { label: 'Complete setup', to: blogPath('complete-setup') },
  { label: 'Windows setup', to: blogPath('windows-setup') },
  { label: 'Antivirus exclusions', to: blogPath('disable-antivirus') },
  { label: 'After a game patch', to: blogPath('game-patch-status') },
  { label: 'Loader errors', to: blogPath('loader-errors') },
  { label: 'Pre-load checklist', to: blogPath('load-status-checklist') },
  { label: 'Buy safely guide', to: blogPath('buy-the-isle-cheats-safely') },
  { label: 'Lifetime license', to: blogPath('the-isle-cheats-lifetime') },
] as const

/** Outbound checkout (all Get / buy CTAs). */
export const CHECKOUT_OUTBOUND =
  'https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fthe-isle-novaxware'

export const CHECKOUT_URL = CHECKOUT_OUTBOUND

export function getCheckoutUrl(_productSlug?: string): string {
  return CHECKOUT_OUTBOUND
}

export const CHECKOUT_REL = 'nofollow noopener noreferrer'
