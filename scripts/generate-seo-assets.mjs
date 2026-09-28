/**
 * Builds 1200x630 OG JPEGs and per-forum OG images from first-party screenshots.
 */
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ogDir = join(root, 'public', 'og')
const mediaDir = join(root, 'public', 'media')

mkdirSync(ogDir, { recursive: true })

const cover = join(mediaDir, 'isle-cover.webp')
const hero = join(mediaDir, 'isle-hero-full.webp')
const menu = join(mediaDir, 'isle-menu.webp')
const shot = (n) => join(mediaDir, `isle-screenshot-${n}.webp`)

async function ogFrom(src, outName, title) {
  const input = existsSync(src) ? src : cover
  await sharp(input)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(ogDir, outName))
  return title
}

const pages = [
  ['home.jpg', hero, 'The Isle Cheats'],
  ['the-isle-cheats.jpg', cover, 'The Isle ESP, Aimbot and Wallhack'],
  ['forums.jpg', shot(4), 'The Isle Cheats Forum'],
  ['reviews.jpg', shot(2), 'The Isle Cheats Reviews'],
  ['faq.jpg', shot(8), 'The Isle Cheats FAQ'],
  ['support.jpg', shot(6), 'The Isle Cheats Support'],
  ['privacy.jpg', menu, 'Privacy Policy'],
  ['terms.jpg', menu, 'Terms of Use'],
  ['refunds.jpg', menu, 'Refund Policy'],
]

for (const [name, src, title] of pages) {
  await ogFrom(src, name, title)
}

const blogsSrc = readFileSync(join(root, 'src', 'data', 'blogs.ts'), 'utf8')
const jsonMatch = blogsSrc.match(
  /export const BLOGS: BlogPost\[\] = (\[[\s\S]*?\n\])\s*\n\s*export function getBlog/,
)
const forums = jsonMatch ? JSON.parse(jsonMatch[1]) : []

for (const forum of forums) {
  let h = 0
  for (let i = 0; i < forum.slug.length; i++) h = (h * 31 + forum.slug.charCodeAt(i)) >>> 0
  const n = 1 + (h % 9)
  const src = shot(n)
  await ogFrom(src, `forums-${forum.slug}.jpg`, forum.title)
}

console.log(`OG images: ${pages.length} pages + ${forums.length} forum threads`)
