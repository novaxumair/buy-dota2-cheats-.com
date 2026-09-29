export type SeoMediaItem = {
  image: string
  video?: string
  alt: string
  title: string
  caption: string
  videoTitle?: string
  videoDescription?: string
}

export const WD_HERO = '/media/wd-hero-full.webp'
export const WD_COVER = '/media/wd-cover.webp'
/** Official WARDOGS key art (first-party hosted copy for the store card). */
export const WD_GAME_COVER = '/media/wd-game-cover.webp'
export const WD_MENU = '/media/wd-menu.webp'
export const WD_VIDEO_THUMB = '/media/wd-video-thumb.jpg'

export const WD_HOME_VIDEO = {
  src: '/videos/hero.webm',
  poster: WD_VIDEO_THUMB,
  title: 'Wardogs cheats gameplay preview with aimbot, player ESP, and 2D radar',
  caption:
    'Preview of Wardogs aimbot, player ESP, vehicle ESP, radar markers, and control-zone fights on Windows PC.',
} as const

export const SCREENSHOT_COUNT = 10

function shot(n: number) {
  return `/media/wd-screenshot-${n}.webp`
}

/** Product page gameplay preview carousel. */
export const PRODUCT_PREVIEW_GALLERY = [
  { src: shot(1), alt: 'Wardogs player ESP box and skeleton through doorway at 20m' },
  { src: shot(2), alt: 'Wardogs ESP on train yard with box, skeleton, and distance tags' },
  { src: shot(3), alt: 'Wardogs indoor fight with green box ESP and health bar' },
  { src: shot(4), alt: 'Wardogs aimbot view through optic with multi-target ESP labels' },
  { src: shot(5), alt: 'Wardogs warehouse fight with purple and green player boxes' },
  { src: shot(6), alt: 'Wardogs ADS with skeleton ESP and radar mini-map' },
  { src: shot(7), alt: 'Wardogs outdoor control zone with name and distance ESP' },
  { src: shot(8), alt: 'Wardogs red-dot sight tracking enemies with team ESP colors' },
  { src: shot(9), alt: 'Wardogs stone wall peek with cyan and green player ESP' },
  { src: shot(10), alt: 'Wardogs headshot kill with box ESP and 2D radar' },
] as const

export const PAGE_MEDIA = {
  home: {
    image: WD_HERO,
    alt: 'Wardogs cheats gameplay with aimbot, box ESP, and skeleton overlays',
    title: 'Wardogs Cheats',
    caption: 'Aimbot, player ESP, vehicle ESP, and 2D radar for control-zone fights.',
  },
  product: {
    image: WD_COVER,
    video: WD_HOME_VIDEO.src,
    alt: 'Wardogs cheats store — aimbot, ESP, and radar in live matches',
    title: 'Wardogs Store',
    caption: 'Full module list and plans for Wardogs on Windows PC.',
    videoTitle: WD_HOME_VIDEO.title,
    videoDescription: WD_HOME_VIDEO.caption,
  },
  forums: {
    image: shot(4),
    alt: 'Wardogs ESP and aimbot gameplay screenshot from intel guides',
    title: 'Wardogs Intel',
    caption: 'Setup threads for aimbot, ESP, radar, and loader help.',
  },
  reviews: {
    image: shot(2),
    alt: 'Wardogs cheats review screenshot with box and skeleton ESP',
    title: 'Wardogs Cheats Reviews',
    caption: 'Buyer feedback on aimbot, ESP, and radar after patches.',
  },
  faq: {
    image: shot(9),
    alt: 'Wardogs player ESP overlay screenshot for FAQ',
    title: 'Wardogs FAQ',
    caption: 'Compatibility, pricing, Elytra updates, and setup answers.',
  },
  support: {
    image: shot(6),
    alt: 'Wardogs cheat support screenshot with ESP and radar HUD',
    title: 'Wardogs Support',
    caption: 'Discord support, delivery, and Windows troubleshooting.',
  },
} as const satisfies Record<string, SeoMediaItem>

function forumMediaFromSlug(slug: string): SeoMediaItem {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  const n = 1 + (h % SCREENSHOT_COUNT)
  const title = slug.replace(/-/g, ' ')
  return {
    image: shot(n),
    alt: `Wardogs intel guide — ${title} gameplay screenshot`,
    title: `Wardogs intel — ${title}`,
    caption: 'In-game ESP and radar reference for this guide.',
  }
}

export function getForumMedia(slug: string): SeoMediaItem {
  return forumMediaFromSlug(slug)
}
