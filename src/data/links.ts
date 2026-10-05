import { articlePath, forumPath } from './blog-paths'

/** Official Dota 2 destinations for factual game context. */
export const OFFICIAL_GAME_LINKS = [
  {
    label: 'Dota 2 on Steam',
    href: 'https://store.steampowered.com/app/570/Dota_2/',
    description: 'Official PC store page',
  },
] as const

/** Primary internal routes for crawl equity. */
export const SITE_PAGE_LINKS = [
  { label: 'Home', to: '/', description: 'Overview, blog, forums, and checkout' },
  {
    label: 'Store',
    to: '/dota-2-cheats',
    description: 'Hero ESP, map hack, timers, and Dota 2 plans',
  },
  {
    label: 'Blog',
    to: '/blog',
    description: 'Guides — console commands, items, lobbies, features',
  },
  {
    label: 'Forums',
    to: '/forums',
    description: 'Community threads — VAC, setup, ESP, loader help',
  },
  {
    label: 'Reviews',
    to: '/reviews',
    description: 'Buyer reviews and ratings',
  },
  {
    label: 'FAQ',
    to: '/faq',
    description: 'Frequently asked questions',
  },
  {
    label: 'Support',
    to: '/support',
    description: 'Delivery and loader help',
  },
  {
    label: 'Status',
    to: '/status',
    description: 'Loader Active or Updating after Dota 2 patches',
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
  { label: 'Features checklist', to: forumPath('features-list') },
  { label: 'Hero ESP config', to: forumPath('hero-esp-config') },
  { label: 'Map hack defaults', to: forumPath('map-hack-fog-config') },
  { label: 'Complete setup', to: forumPath('complete-setup') },
  { label: 'After a game patch', to: forumPath('game-patch-status') },
  { label: 'Loader errors', to: forumPath('loader-errors') },
  { label: 'Buy safely guide', to: forumPath('buy-dota-2-cheats-safely') },
  { label: 'Lifetime license', to: forumPath('dota-2-cheats-lifetime') },
  { label: 'VAC & safety', to: forumPath('vac-anticheat-safety') },
  { label: 'Ultimate cheats guide', to: articlePath('ultimate-guide-dota-2-cheats') },
  { label: '2026 review', to: articlePath('best-dota-2-cheats-review-2026') },
] as const

/** Outbound checkout (all Get / buy CTAs). */
export const CHECKOUT_OUTBOUND =
  'https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fdota-2'

export const CHECKOUT_URL = CHECKOUT_OUTBOUND

export function getCheckoutUrl(_productSlug?: string): string {
  return CHECKOUT_OUTBOUND
}

export const CHECKOUT_REL = 'nofollow noopener noreferrer'
