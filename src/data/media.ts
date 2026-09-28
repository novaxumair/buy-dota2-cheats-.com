export type SeoMediaItem = {
  image: string
  video?: string
  alt: string
  title: string
  caption: string
  videoTitle?: string
  videoDescription?: string
}

export const ISLE_HERO = '/media/isle-hero-full.webp'
export const ISLE_COVER = '/media/isle-cover.webp'
export const ISLE_MENU = '/media/isle-menu.webp'
export const ISLE_VIDEO_THUMB = '/media/isle-video-thumb.jpg'

export const ISLE_HOME_VIDEO = {
  src: '/videos/hero.webm',
  poster: ISLE_VIDEO_THUMB,
  title: 'The Isle Evrima gameplay preview with dinosaur ESP and snaplines',
  caption:
    'Preview of The Isle player ESP, species tags, health bars, and jungle overlays during Evrima survival on PC.',
} as const

function shot(n: number) {
  return `/media/isle-screenshot-${n}.webp`
}

/** Product page gameplay preview carousel (screenshots 1–9). */
export const PRODUCT_PREVIEW_GALLERY = [
  { src: shot(1), alt: 'The Isle ESP snapline and player stat overlay at night on Evrima' },
  { src: shot(2), alt: 'The Isle wallhack-style foliage ESP with dinosaur health readouts' },
  { src: shot(3), alt: 'The Isle silent aim assist banner with skeleton ESP on Stegosaurus' },
  { src: shot(4), alt: 'The Isle real speed overlay with minimap and MY DINO stat panel' },
  { src: shot(5), alt: 'The Isle ESP tags across open plains showing species and distance' },
  { src: shot(6), alt: 'The Isle silent aim overlay with skeleton ESP on Tyrannosaurus corpse' },
  { src: shot(7), alt: 'The Isle fly hack preview with Deinonychus ESP distance markers' },
  { src: shot(8), alt: 'The Isle T-Rex box ESP and silent aim snapline on beach map' },
  { src: shot(9), alt: 'The Isle silent aim with snapline targeting on distant carnivore' },
] as const

export const PAGE_MEDIA = {
  home: {
    image: ISLE_HERO,
    alt: 'The Isle cheats ESP gameplay banner on PC',
    title: 'The Isle Cheats',
    caption: 'ESP, visual options, and Evrima survival overlays.',
  },
  product: {
    image: ISLE_COVER,
    video: ISLE_HOME_VIDEO.src,
    alt: 'The Isle cheats product — player ESP, NPC ESP, and visual options',
    title: 'The Isle ESP, Aimbot & Wallhack',
    caption: 'Full module list for The Isle Evrima on Windows PC.',
    videoTitle: ISLE_HOME_VIDEO.title,
    videoDescription: ISLE_HOME_VIDEO.caption,
  },
  forums: {
    image: shot(4),
    alt: 'The Isle ESP gameplay screenshot for forums',
    title: 'The Isle Cheat Forums',
    caption: 'Setup threads for ESP, misc options, and loader help.',
  },
  reviews: {
    image: shot(2),
    alt: 'The Isle ESP gameplay screenshot for reviews',
    title: 'The Isle Cheat Reviews',
    caption: 'Buyer feedback on ESP and Evrima loader updates.',
  },
  faq: {
    image: shot(8),
    alt: 'The Isle ESP overlay screenshot for FAQ',
    title: 'The Isle Cheats FAQ',
    caption: 'Compatibility, pricing, and setup answers for Evrima.',
  },
  support: {
    image: shot(6),
    alt: 'The Isle ESP target tracking screenshot for support',
    title: 'The Isle Cheat Support',
    caption: 'Loader, delivery, and Windows troubleshooting.',
  },
} as const satisfies Record<string, SeoMediaItem>

function forumMediaFromSlug(slug: string): SeoMediaItem {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  const n = 1 + (h % 9)
  const title = slug.replace(/-/g, ' ')
  return {
    image: shot(n),
    alt: `The Isle cheats forum guide — ${title} Evrima gameplay screenshot`,
    title: `The Isle forum — ${title}`,
    caption: 'In-game ESP overlay reference for this guide.',
  }
}

export function getForumMedia(slug: string): SeoMediaItem {
  return forumMediaFromSlug(slug)
}

/** @deprecated legacy alias */
export const WD_HERO = ISLE_HERO
export const WD_COVER = ISLE_COVER
export const WD_MENU = ISLE_MENU
export const WD_VIDEO_THUMB = ISLE_VIDEO_THUMB
export const WD_HOME_VIDEO = ISLE_HOME_VIDEO
