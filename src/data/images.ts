import { ISLE_COVER, ISLE_HERO, ISLE_MENU } from './media'
import { ISLE_OG, getOgImageForPath, PAGE_OG } from './og'

export { ISLE_OG, getOgImageForPath, PAGE_OG }
export { forumOgImage } from './og'

export const ISLE_PRODUCT_HERO = ISLE_HERO
export const ISLE_PRODUCT_COVER = ISLE_COVER

/** @deprecated */
export const WD_OG = ISLE_OG
export const WD_PRODUCT_HERO = ISLE_PRODUCT_HERO
export const WD_PRODUCT_COVER = ISLE_PRODUCT_COVER

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
  'the-isle': {
    alt: 'The Isle cheats product artwork for Evrima on PC',
    title: 'The Isle Cheats Product Details',
    caption: 'The Isle ESP, visual options, and dinosaur survival overlays',
    heroAlt: 'The Isle ESP and visual options features',
    heroTitle: 'The Isle Cheats Features',
    heroCaption: 'Review The Isle ESP modules and loader status',
  },
}

type PageImage = ImageSeoFields & { src: string; og: string }

export const PAGE_IMAGES: Record<
  'home' | 'forums' | 'reviews' | 'faq' | 'support' | 'product',
  PageImage
> = {
  home: {
    src: ISLE_HERO,
    og: PAGE_OG.home,
    alt: 'The Isle cheats ESP gameplay artwork for PC',
    title: 'The Isle Cheats',
    caption: 'The Isle ESP, visual options, and Evrima survival overview.',
  },
  forums: {
    src: '/media/isle-screenshot-4.webp',
    og: PAGE_OG.forums,
    alt: 'The Isle ESP gameplay screenshot from forums',
    title: 'The Isle Cheat Guides',
    caption: 'Setup, ESP, and misc option forum threads.',
  },
  reviews: {
    src: '/media/isle-screenshot-2.webp',
    og: PAGE_OG.reviews,
    alt: 'The Isle ESP gameplay review screenshot',
    title: 'The Isle Cheat Reviews',
    caption: 'Feature feedback from Evrima players.',
  },
  faq: {
    src: '/media/isle-screenshot-8.webp',
    og: PAGE_OG.faq,
    alt: 'The Isle player ESP screenshot for FAQ',
    title: 'The Isle Cheats FAQ',
    caption: 'Pricing, features, and setup answers.',
  },
  support: {
    src: '/media/isle-screenshot-6.webp',
    og: PAGE_OG.support,
    alt: 'The Isle ESP support screenshot',
    title: 'The Isle Cheat Support',
    caption: 'Delivery, loader, and Windows help.',
  },
  product: {
    src: ISLE_COVER,
    og: PAGE_OG.product,
    alt: 'The Isle ESP and visual options product artwork',
    title: 'The Isle Cheats Features',
    caption: 'Product details for The Isle ESP and misc modules.',
  },
}

export function getGameImage(_slug: string): string {
  return ISLE_PRODUCT_COVER
}

export function getProductHeroImage(_slug: string): string {
  return ISLE_PRODUCT_COVER
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
