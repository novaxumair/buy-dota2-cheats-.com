/**
 * Downloads Dota 2 box art from IGN for the product purchase card.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const brandDir = join(root, 'public', 'brand')
const mediaDir = join(root, 'public', 'media')

mkdirSync(brandDir, { recursive: true })

const page = await fetch('https://www.ign.com/games/dota-2', {
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; buydota2cheats.com asset script)' },
}).then((r) => r.text())

const matches = [...page.matchAll(/https:\/\/assets-prd\.ignimgs\.com\/[^"'\\s>]+\.(?:jpg|jpeg|webp|png)/gi)].map(
  (m) => m[0].replace(/\\u002F/g, '/'),
)
const unique = [...new Set(matches)]
const pick =
  unique.find((u) => /cover|box|hero|thumbnail|game/i.test(u)) ||
  unique.find((u) => /dota/i.test(u)) ||
  unique[0]

if (!pick) {
  console.error('No IGN image URL found on page')
  process.exit(1)
}

console.log('Fetching', pick)
const buf = await fetch(pick, {
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; buydota2cheats.com asset script)' },
}).then((r) => {
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.arrayBuffer()
})

writeFileSync(join(brandDir, 'dota2-ign-cover.jpg'), Buffer.from(buf))
await sharp(Buffer.from(buf)).webp({ quality: 94, effort: 6 }).toFile(join(mediaDir, 'd2-ign-cover.webp'))
await sharp(Buffer.from(buf)).webp({ quality: 94, effort: 6 }).toFile(join(mediaDir, 'd2-game-cover.webp'))

console.log('Saved public/brand/dota2-ign-cover.jpg and public/media/d2-ign-cover.webp + d2-game-cover.webp')
