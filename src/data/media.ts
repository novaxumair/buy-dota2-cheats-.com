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
export const WD_MENU = '/media/wd-menu.webp'
export const WD_VIDEO_THUMB = '/media/wd-video-thumb.jpg'

export const WD_HOME_VIDEO = {
  src: '/videos/hero.webm',
  poster: WD_VIDEO_THUMB,
  title: 'Wardogs cheat gameplay preview with ESP and aimbot FOV',
  caption: 'Preview of Wardogs ESP skeleton overlays, aimbot FOV circle, and 2D radar during control-zone gameplay on PC.',
} as const

function shot(n: number) {
  return `/media/wd-screenshot-${n}.webp`
}

/** Product page gameplay preview carousel (screenshots 1–9). */
export const PRODUCT_PREVIEW_GALLERY = [
  { src: shot(1), alt: 'Wardogs aimbot FOV circle with skeleton ESP through cover on PC' },
  { src: shot(2), alt: 'Wardogs player ESP wallhack on industrial stairs gameplay' },
  { src: shot(3), alt: 'Wardogs ESP skeleton markers through metal structure' },
  { src: shot(4), alt: 'Wardogs aimbot FOV with green box ESP on enemy behind van' },
  { src: shot(5), alt: 'Wardogs skeleton ESP and purple player chams in control zone' },
  { src: shot(6), alt: 'Wardogs warehouse fight with skeleton ESP and health bar overlay' },
  { src: shot(7), alt: 'Wardogs autumn map player ESP and aimbot FOV circle' },
  { src: shot(8), alt: 'Wardogs alley ESP skeleton through brick wall gameplay' },
  { src: shot(9), alt: 'Wardogs open yard aimbot FOV with tactical HUD on PC' },
] as const

export const PAGE_MEDIA = {
  home: {
    image: WD_HERO,
    alt: 'Wardogs ESP and aimbot gameplay banner on PC',
    title: 'Wardogs Cheats',
    caption: 'ESP, aimbot, vehicle radar, and wallhack-style visuals for control-zone fights.',
  },
  product: {
    image: WD_COVER,
    video: WD_HOME_VIDEO.src,
    alt: 'Wardogs cheats product — player ESP, vehicle ESP, and aimbot features',
    title: 'Wardogs ESP, Aimbot & Wallhack',
    caption: 'Full module list for Wardogs on Windows PC.',
    videoTitle: WD_HOME_VIDEO.title,
    videoDescription: WD_HOME_VIDEO.caption,
  },
  forums: {
    image: shot(4),
    alt: 'Wardogs player ESP wallhack gameplay screenshot',
    title: 'Wardogs Cheat Forums',
    caption: 'Setup threads for aimbot, ESP, vehicle radar, and loader help.',
  },
  reviews: {
    image: shot(2),
    alt: 'Wardogs aimbot FOV gameplay screenshot for reviews',
    title: 'Wardogs Cheat Reviews',
    caption: 'Buyer feedback on ESP, aimbot, and radar modules.',
  },
  faq: {
    image: shot(8),
    alt: 'Wardogs ESP skeleton overlay screenshot for FAQ',
    title: 'Wardogs Cheats FAQ',
    caption: 'Compatibility, pricing, and setup answers for Wardogs.',
  },
  support: {
    image: shot(6),
    alt: 'Wardogs scoped ESP target tracking screenshot',
    title: 'Wardogs Cheat Support',
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
    alt: `Wardogs cheats forum guide — ${title} gameplay screenshot`,
    title: `Wardogs forum — ${title}`,
    caption: 'In-game ESP and aimbot overlay reference for this guide.',
  }
}

export function getForumMedia(slug: string): SeoMediaItem {
  return forumMediaFromSlug(slug)
}
