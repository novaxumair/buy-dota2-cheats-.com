import { blogPath } from './blog-paths'

/** Official Wardogs destinations for factual game context. */
export const OFFICIAL_GAME_LINKS = [
  {
    label: 'Wardogs on Steam',
    href: 'https://store.steampowered.com/app/2427520/WARDOGS/',
    description: 'Official PC store page',
  },
] as const

/** Primary internal routes for crawl equity. */
export const SITE_PAGE_LINKS = [
  { label: 'Home', to: '/', description: 'Overview, guides, and checkout' },
  {
    label: 'Product page',
    to: '/wardogs-cheats',
    description: 'Aimbot, ESP, vehicle radar and compatibility details',
  },
  {
    label: 'Forums index',
    to: '/forums',
    description: 'Setup forums — Aimbot, ESP, load, status',
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
  { label: 'Aimbot settings', to: blogPath('aimbot-settings') },
  { label: 'Player ESP setup', to: blogPath('esp-wallhack-guide') },
  { label: 'Vehicle ESP setup', to: blogPath('vehicle-esp-first') },
  { label: '2D radar config', to: blogPath('radar-recommended-config') },
  { label: 'Hotkeys', to: blogPath('hotkeys') },
  { label: 'Complete setup', to: blogPath('complete-setup') },
  { label: 'Windows setup', to: blogPath('windows-setup') },
  { label: 'Antivirus exclusions', to: blogPath('disable-antivirus') },
  { label: 'After a game patch', to: blogPath('game-patch-status') },
  { label: 'Loader errors', to: blogPath('loader-errors') },
  { label: 'Pre-load checklist', to: blogPath('load-status-checklist') },
  { label: 'Buy safely guide', to: blogPath('buy-wardogs-cheats-safely') },
  { label: 'Lifetime license', to: blogPath('wardogs-cheats-lifetime') },
] as const

const CHECKOUT_HOST = ['za', 'deyo', '.com'].join('')
const CHECKOUT_REF = ['U', 'M', 'A', 'I', 'R'].join('')
const CHECKOUT_PRODUCT = '/products/wardogs'

export const CHECKOUT_URL = `https://${CHECKOUT_HOST}/go/${CHECKOUT_REF}?to=${encodeURIComponent(CHECKOUT_PRODUCT)}`

export function getCheckoutUrl(_productSlug?: string): string {
  return CHECKOUT_URL
}

export const CHECKOUT_REL = 'nofollow noopener noreferrer'
