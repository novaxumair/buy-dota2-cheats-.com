/**
 * Auto-generate 1200x630 JPEG Open Graph images for every indexed URL.
 * Google SERP / social crawlers fetch these for right-side thumbnails.
 * Never overwrites battlelog-sourced /media assets.
 */
import { access, mkdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const ogDir = join(root, 'public', 'og')
const mediaDir = join(root, 'public', 'media')
const blogsPath = join(root, 'src', 'data', 'blogs.ts')

await mkdir(ogDir, { recursive: true })
await mkdir(mediaDir, { recursive: true })

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

const requiredMedia = [
  join(mediaDir, 'wd-hero-full.webp'),
  join(mediaDir, 'wd-cover.webp'),
  join(mediaDir, 'wd-menu.webp'),
  join(mediaDir, 'wd-video-thumb.jpg'),
  join(mediaDir, 'wd-screenshot-1.webp'),
]

for (const path of requiredMedia) {
  if (!(await exists(path))) {
    throw new Error(`Missing Wardogs media asset (run scripts/prepare-wardogs-media.mjs): ${path}`)
  }
}

function overlaySvg(width, height, eyebrow, title, subtitle) {
  const titleSize = Math.min(54, Math.round(width * 0.042))
  const lines = String(title).match(/.{1,28}(\s|$)/g)?.map((s) => s.trim()).filter(Boolean) || [
    title,
  ]
  const titleLines = lines.slice(0, 2)
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#08060f" stop-opacity="0.55"/>
          <stop offset="0.45" stop-color="#08060f" stop-opacity="0.72"/>
          <stop offset="1" stop-color="#14081f" stop-opacity="0.88"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#shade)"/>
      <text x="64" y="210" fill="#c084fc" font-size="22" font-family="Arial, sans-serif" font-weight="700" letter-spacing="4">${escapeXml(eyebrow)}</text>
      ${titleLines
        .map(
          (line, i) =>
            `<text x="64" y="${290 + i * 64}" fill="#ffffff" font-size="${titleSize}" font-family="Arial, sans-serif" font-weight="700">${escapeXml(line)}</text>`,
        )
        .join('\n')}
      <text x="64" y="480" fill="#c9bdd2" font-size="26" font-family="Arial, sans-serif">${escapeXml(subtitle)}</text>
      <text x="64" y="560" fill="#9299a3" font-size="20" font-family="Arial, sans-serif">buywardogscheat.com</text>
    </svg>
  `)
}

async function writeOgJpeg(outPath, sourcePath, eyebrow, title, subtitle) {
  const base = sharp(sourcePath).resize(1200, 630, { fit: 'cover', position: 'centre' })
  const overlay = sharp(overlaySvg(1200, 630, eyebrow, title, subtitle))
  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: '#08060f' },
  })
    .composite([
      { input: await base.toBuffer(), top: 0, left: 0 },
      { input: await overlay.png().toBuffer(), top: 0, left: 0 },
    ])
    .jpeg({ quality: 90, chromaSubsampling: '4:4:4', mozjpeg: true })
    .toFile(outPath)
}

function loadBlogsFromSrc(src) {
  const jsonMatch = src.match(
    /export const BLOGS: BlogPost\[\] = (\[[\s\S]*?\n\])\s*\n\s*export function getBlog/,
  )
  if (jsonMatch) return JSON.parse(jsonMatch[1])
  return null
}

function loadForumSlugs(src) {
  const blogs = loadBlogsFromSrc(src)
  if (blogs) return blogs.map((b) => b.slug)
  return [...src.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
}

function loadForumMeta(src) {
  const blogs = loadBlogsFromSrc(src)
  if (blogs) {
    return blogs.map((b) => ({
      slug: b.slug,
      title: b.metaTitle,
      description: b.metaDescription,
    }))
  }
  const pattern =
    /slug:\s*['"]([^'"]+)['"],[\s\S]*?metaTitle:\s*['"]([^'"]+)['"],[\s\S]*?metaDescription:\s*['"]([^'"]+)['"]/g
  return [...src.matchAll(pattern)].map((m) => ({
    slug: m[1],
    title: m[2],
    description: m[3],
  }))
}

const heroFull = join(mediaDir, 'wd-hero-full.webp')
const coverArt = join(mediaDir, 'wd-cover.webp')
const espShot = join(mediaDir, 'wd-screenshot-5.webp')
const menuArt = join(mediaDir, 'wd-menu.webp')
const videoThumb = join(mediaDir, 'wd-video-thumb.jpg')

const staticOg = [
  {
    file: 'home.jpg',
    source: heroFull,
    eyebrow: 'Wardogs Cheats',
    title: 'Wardogs ESP & Aimbot',
    subtitle: 'Wardogs Cheats from $35 ù patch-synced loader',
  },
  {
    file: 'wardogs-cheats.jpg',
    source: coverArt,
    eyebrow: 'PRODUCT DETAILS',
    title: 'Wardogs aimbot, ESP & Wallhack',
    subtitle: 'Features, status and price',
  },
  {
    file: 'forums.jpg',
    source: menuArt,
    eyebrow: 'GUIDES',
    title: 'Wardogs Cheat Forums',
    subtitle: 'Aimbot, ESP, loader and patch guides',
  },
  {
    file: 'reviews.jpg',
    source: espShot,
    eyebrow: 'REVIEWS',
    title: 'Wardogs cheat Buyer Reviews',
    subtitle: 'Real ESP and Aimbot feedback',
  },
  {
    file: 'faq.jpg',
    source: menuArt,
    eyebrow: 'FAQ',
    title: 'Wardogs Cheats FAQ',
    subtitle: 'Price, features and setup answers',
  },
  {
    file: 'support.jpg',
    source: videoThumb,
    eyebrow: 'SUPPORT',
    title: 'Wardogs cheat Support',
    subtitle: 'Loader, delivery and Windows help',
  },
  {
    file: 'privacy.jpg',
    source: heroFull,
    eyebrow: 'POLICY',
    title: 'Privacy Policy',
    subtitle: 'How buywardogscheat.com handles order data',
  },
  {
    file: 'terms.jpg',
    source: heroFull,
    eyebrow: 'POLICY',
    title: 'Terms of Use',
    subtitle: 'License rules for Wardogs Cheats',
  },
  {
    file: 'refunds.jpg',
    source: coverArt,
    eyebrow: 'POLICY',
    title: 'Refund Policy',
    subtitle: 'Digital license refund rules',
  },
]

const created = []

for (const item of staticOg) {
  const out = join(ogDir, item.file)
  await writeOgJpeg(out, item.source, item.eyebrow, item.title, item.subtitle)
  created.push(item.file)
}

const blogsSrc = await readFile(blogsPath, 'utf8')
const forums = loadForumMeta(blogsSrc)
if (!forums.length) {
  // Fallback if regex misses ? at least create from slugs
  for (const slug of loadForumSlugs(blogsSrc)) {
    forums.push({
      slug,
      title: `Wardogs Cheats ${slug}`,
      description: 'Wardogs cheat guide on buywardogscheat.com',
    })
  }
}

for (const forum of forums) {
  const file = `forums-${forum.slug}.jpg`
  const out = join(ogDir, file)
  const source =
    /esp|wallhack|loot|extraction/i.test(forum.slug)
      ? espShot
      : /aimbot|features|hotkeys|setup|windows|antivirus|loader|stream|combat/i.test(forum.slug)
        ? menuArt
        : coverArt
  await writeOgJpeg(
    out,
    source,
    'Wardogs guide',
    forum.title.replace(/\s*\|\s*.*$/, '').slice(0, 48),
    'Wardogs cheats ù buywardogscheat.com',
  )
  created.push(file)
}

// Auxiliary on-page art (only if missing)
async function writeIfMissing(path, factory) {
  if (await exists(path)) return false
  await factory(path)
  return true
}

function fillerSvg(width, height, eyebrow, title, subtitle) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#08060f"/>
      <text x="${width * 0.075}" y="${height * 0.47}" fill="#c084fc" font-size="${width * 0.022}" font-family="Arial, sans-serif" font-weight="700" letter-spacing="6">${escapeXml(eyebrow)}</text>
      <text x="${width * 0.075}" y="${height * 0.64}" fill="#ffffff" font-size="${width * 0.05}" font-family="Arial, sans-serif" font-weight="700">${escapeXml(title)}</text>
      <text x="${width * 0.075}" y="${height * 0.75}" fill="#c9bdd2" font-size="${width * 0.026}" font-family="Arial, sans-serif">${escapeXml(subtitle)}</text>
    </svg>
  `)
}

for (const [name, eyebrow, title, subtitle] of [
  ['wd-tactical-art.jpg', 'WARDOGS', 'Wardogs Cheats', 'Aimbot ù ESP ù Vehicle radar'],
  ['wd-control-art.jpg', 'Wardogs ù WINDOWS PC', 'ESP & Wallhack', 'Built for control-zone fights'],
  ['wd-home-art.jpg', 'buywardogscheat.com', 'Wardogs Cheats', 'Aimbot, ESP, wallhack and radar'],
]) {
  const path = join(mediaDir, name)
  if (
    await writeIfMissing(path, (p) =>
      sharp(fillerSvg(1200, 675, eyebrow, title, subtitle))
        .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
        .toFile(p),
    )
  ) {
    created.push(name)
  }
}

console.log(`SEO OG images ready (${created.length}): ${created.slice(0, 8).join(', ')}?`)
