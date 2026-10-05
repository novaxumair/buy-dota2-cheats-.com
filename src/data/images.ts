import { D2_COVER, D2_GAME_COVER, D2_HERO, D2_MENU } from './media'
import { SITE_OG, getOgImageForPath, PAGE_OG } from './og'

export { SITE_OG, getOgImageForPath, PAGE_OG }
export { forumOgImage } from './og'

export const D2_PRODUCT_HERO = D2_HERO
export const D2_PRODUCT_COVER = D2_COVER

export type ImageSeoFields = {
  alt: string
  title: string
  caption: string
}

export const IMAGE_SEO: Record<
  string,
  ImageSeoFields & {
    heroAlt: string
    heroTitle: string
    heroCaption: string
  }
> = {
  'dota-2': {
    alt: 'Dota 2 official key art on Steam for PC',
    title: 'Dota 2 Cheats Product Details',
    caption: 'Hero ESP, map hack, timers, and inventory intel',
    heroAlt: 'Dota 2 — IGN key art',
    heroTitle: 'Dota 2 Cheats Store',
    heroCaption: 'Premium Dota 2 cheats on Windows PC',
  },
}

type PageImage = ImageSeoFields & { src: string; og: string }

export const PAGE_IMAGES: Record<
  'home' | 'forums' | 'reviews' | 'faq' | 'support' | 'product' | 'blog',
  PageImage
> = {
  home: {
    src: D2_HERO,
    og: PAGE_OG.home,
    alt: 'Dota 2 cheats gameplay artwork for PC',
    title: 'Dota 2 Cheats',
    caption: 'Hero ESP, map hack, and timer overview.',
  },
  blog: {
    src: '/media/d2-screenshot-5.webp',
    og: PAGE_OG.blog,
    alt: 'Dota 2 cheats blog guides screenshot',
    title: 'Dota 2 Cheats Blog',
    caption: 'Console commands, features, and safety articles.',
  },
  forums: {
    src: '/media/d2-screenshot-4.webp',
    og: PAGE_OG.forums,
    alt: 'Dota 2 ESP gameplay screenshot from forums',
    title: 'Dota 2 Cheats Forums',
    caption: 'Setup, VAC, ESP, and loader threads.',
  },
  reviews: {
    src: '/media/d2-screenshot-2.webp',
    og: PAGE_OG.reviews,
    alt: 'Dota 2 cheats review screenshot',
    title: 'Dota 2 Cheats Reviews',
    caption: 'Buyer feedback on ESP and timers.',
  },
  faq: {
    src: '/media/d2-screenshot-8.webp',
    og: PAGE_OG.faq,
    alt: 'Dota 2 hero ESP screenshot for FAQ',
    title: 'Dota 2 Cheats FAQ',
    caption: 'Pricing, features, and setup answers.',
  },
  support: {
    src: '/media/d2-screenshot-6.webp',
    og: PAGE_OG.support,
    alt: 'Dota 2 cheat support screenshot',
    title: 'Dota 2 Cheats Support',
    caption: 'Delivery and loader help.',
  },
  product: {
    src: D2_GAME_COVER,
    og: PAGE_OG.product,
    alt: 'Dota 2 official key art (IGN) — Dota 2 Cheats store',
    title: 'Dota 2 Cheats Store',
    caption: 'Hero ESP, map hack, timers, and support.',
  },
}

export function getGameImage(_slug: string): string {
  return D2_GAME_COVER
}

export function getProductHeroImage(_slug: string): string {
  return D2_GAME_COVER
}

export function getOgImage(path?: string): string {
  return getOgImageForPath(path)
}

export function getPageImage(key: keyof typeof PAGE_IMAGES) {
  return PAGE_IMAGES[key]
}

export function getImageAlt(
  slug: string,
  name: string,
  variant: 'catalog' | 'product' = 'catalog',
): string {
  const seo = IMAGE_SEO[slug]
  if (seo) return variant === 'product' ? seo.heroAlt : seo.alt
  return variant === 'product' ? `${name} product details` : `${name} product artwork`
}

export function getImageTitle(
  slug: string,
  name: string,
  variant: 'catalog' | 'product' = 'catalog',
): string {
  const seo = IMAGE_SEO[slug]
  if (seo) return variant === 'product' ? seo.heroTitle : seo.title
  return `${name} product`
}

/** @deprecated unused menu asset — kept for legacy imports */
export const D2_MENU_ASSET = D2_MENU
