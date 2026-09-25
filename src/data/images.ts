import { WD_COVER, WD_HERO, WD_MENU } from './media'
import { WD_OG, getOgImageForPath, PAGE_OG } from './og'

export { WD_OG, getOgImageForPath, PAGE_OG }
export { forumOgImage } from './og'

export const WD_PRODUCT_HERO = WD_HERO
export const WD_PRODUCT_COVER = WD_COVER

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
  wardogs: {
    alt: 'Wardogs cheats product artwork for PC',
    title: 'Wardogs Cheats Product Details',
    caption: 'Wardogs aimbot, ESP, vehicle radar, and wallhack-style overlays',
    heroAlt: 'Wardogs ESP and aimbot features',
    heroTitle: 'Wardogs Cheats Features',
    heroCaption: 'Review Wardogs aimbot, ESP, vehicle radar, and loader status',
  },
}

type PageImage = ImageSeoFields & { src: string; og: string }

export const PAGE_IMAGES: Record<
  'home' | 'forums' | 'reviews' | 'faq' | 'support' | 'product',
  PageImage
> = {
  home: {
    src: WD_HERO,
    og: PAGE_OG.home,
    alt: 'Wardogs cheats ESP and aimbot artwork for PC',
    title: 'Wardogs Cheats',
    caption: 'Wardogs aimbot, ESP, vehicle radar, and wallhack-style overview.',
  },
  forums: {
    src: '/media/wd-screenshot-4.webp',
    og: PAGE_OG.forums,
    alt: 'Wardogs wallhack ESP gameplay screenshot',
    title: 'Wardogs Cheat Guides',
    caption: 'Setup, aimbot, and ESP forum threads.',
  },
  reviews: {
    src: '/media/wd-screenshot-2.webp',
    og: PAGE_OG.reviews,
    alt: 'Wardogs aimbot gameplay review screenshot',
    title: 'Wardogs Cheat Reviews',
    caption: 'Feature feedback from Wardogs players.',
  },
  faq: {
    src: '/media/wd-screenshot-8.webp',
    og: PAGE_OG.faq,
    alt: 'Wardogs player ESP screenshot for FAQ',
    title: 'Wardogs Cheats FAQ',
    caption: 'Pricing, features, and setup answers.',
  },
  support: {
    src: '/media/wd-screenshot-6.webp',
    og: PAGE_OG.support,
    alt: 'Wardogs scoped ESP support screenshot',
    title: 'Wardogs Cheat Support',
    caption: 'Delivery, loader, and Windows help.',
  },
  product: {
    src: WD_COVER,
    og: PAGE_OG.product,
    alt: 'Wardogs aimbot ESP and wallhack product artwork',
    title: 'Wardogs Cheats Features',
    caption: 'Product details for Wardogs aimbot and ESP.',
  },
}

export function getGameImage(_slug: string): string {
  return WD_PRODUCT_COVER
}

export function getProductHeroImage(_slug: string): string {
  return WD_PRODUCT_COVER
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
