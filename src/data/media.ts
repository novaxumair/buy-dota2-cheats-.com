/**
 * First-party Dota 2 Cheats media paths and page SEO fields.
 */

export const D2_HERO = '/media/d2-hero-full.webp'
export const D2_COVER = '/media/d2-cover.webp'
/** Dota 2 key art from IGN — store / purchase card. */
export const D2_IGN_COVER = '/media/d2-ign-cover.webp'
export const D2_GAME_COVER = D2_IGN_COVER
export const D2_MENU = '/media/d2-menu.webp'
export const D2_VIDEO_THUMB = '/media/d2-video-thumb.jpg'

export const D2_HOME_VIDEO = {
  src: '/videos/hero.webm',
  poster: D2_VIDEO_THUMB,
  title: 'Dota 2 cheats gameplay preview with hero ESP, map hack, and timers',
  caption:
    'Preview of Dota 2 hero ESP, fog removal, rune timers, and teamfight overlays on Windows PC.',
} as const

export function shot(n: number) {
  return `/media/d2-screenshot-${n}.webp`
}

/** Stable gameplay thumb per blog slug (screenshots 1–10). */
export function articleThumbnail(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return shot(1 + (h % 10))
}

export const GALLERY_SHOTS = [
  { src: shot(1), alt: 'Dota 2 hero ESP with item and level tags on enemy offlaner' },
  { src: shot(2), alt: 'Dota 2 map vision and ward ESP during mid-game rotation' },
  { src: shot(3), alt: 'Dota 2 ability cooldown tracker in a teamfight' },
  { src: shot(4), alt: 'Dota 2 rune spawn indicator and creep timer overlay' },
  { src: shot(5), alt: 'Dota 2 last-hit helper and GPM-focused lane farm' },
  { src: shot(6), alt: 'Dota 2 roshan timer callout with inventory ESP' },
  { src: shot(7), alt: 'Dota 2 fog removal with readable map hack opacity' },
  { src: shot(8), alt: 'Dota 2 autohook script assist during lane skirmish' },
  { src: shot(9), alt: 'Dota 2 skillshot dodger overlay in teamfight' },
  { src: shot(10), alt: 'Dota 2 rune and objective timer abuse helper in match' },
] as const

/** Product page marquee gallery */
export const PRODUCT_PREVIEW_GALLERY = GALLERY_SHOTS

export const PAGE_MEDIA = {
  home: {
    image: D2_HERO,
    alt: 'Dota 2 cheats gameplay with hero ESP and map vision overlays',
    title: 'Dota 2 Cheats',
    caption: 'Hero ESP, map hack, timers, and inventory intel for Dota 2 on PC.',
  },
  product: {
    image: D2_COVER,
    video: D2_HOME_VIDEO.src,
    alt: 'Dota 2 Cheats store — ESP, map hack, and timers in live matches',
    title: 'Dota 2 Cheats Store',
    caption: 'Full module list and plans for Dota 2 on Windows PC.',
    videoTitle: D2_HOME_VIDEO.title,
    videoDescription: D2_HOME_VIDEO.caption,
  },
  forums: {
    image: shot(4),
    alt: 'Dota 2 ESP gameplay screenshot from community forums',
    title: 'Dota 2 Cheats Forums',
    caption: 'VAC safety, setup, ESP configs, and loader help.',
  },
  reviews: {
    image: shot(2),
    alt: 'Dota 2 cheats review screenshot with ESP overlays',
    title: 'Dota 2 Cheats Reviews',
    caption: 'Buyer feedback on map vision, timers, and loader stability.',
  },
  faq: {
    image: shot(8),
    alt: 'Dota 2 hero ESP overlay screenshot for FAQ',
    title: 'Dota 2 Cheats FAQ',
    caption: 'Compatibility, pricing, VAC notes, and setup answers.',
  },
  support: {
    image: shot(6),
    alt: 'Dota 2 cheat support screenshot with menu HUD',
    title: 'Dota 2 Cheats Support',
    caption: 'Delivery, loader errors, and configuration help.',
  },
} as const

export function getForumMedia(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  const n = 1 + (h % 10)
  const title = slug.replace(/-/g, ' ')
  return {
    image: shot(n),
    alt: `Dota 2 cheats guide — ${title} gameplay screenshot`,
    title: `Dota 2 Cheats — ${title}`,
    caption: `Forum thread imagery for ${title} on buydota2cheats.com.`,
  }
}
