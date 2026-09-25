import { mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const assetsDir =
  'C:/Users/Bader/.cursor/projects/c-Users-Bader-Desktop-test-buy-wardogs-cheat-com/assets'
const mediaDir = join(root, 'public', 'media')

await mkdir(mediaDir, { recursive: true })

const files = (await readdir(assetsDir)).filter((f) => f.endsWith('.png') || f.endsWith('.jpg'))
const nums = files
  .map((f) => {
    const m = f.match(/images_(\d+)-/)
    return { n: m ? parseInt(m[1], 10) : 99, f }
  })
  .sort((a, b) => a.n - b.n)

for (const { n, f } of nums) {
  const src = join(assetsDir, f)
  await sharp(src).webp({ quality: 82 }).toFile(join(mediaDir, `wd-screenshot-${n}.webp`))
}

const pick = (n) => join(assetsDir, nums.find((x) => x.n === n)?.f ?? nums[0].f)

await sharp(pick(5))
  .webp({ quality: 85 })
  .resize(1920, 1080, { fit: 'cover' })
  .toFile(join(mediaDir, 'wd-hero-full.webp'))
await sharp(pick(5))
  .webp({ quality: 85 })
  .resize(1440, 810, { fit: 'cover' })
  .toFile(join(mediaDir, 'wd-cover.webp'))
await sharp(pick(5))
  .jpeg({ quality: 88 })
  .resize(1280, 720, { fit: 'cover' })
  .toFile(join(mediaDir, 'wd-video-thumb.jpg'))
await sharp(pick(8)).webp({ quality: 82 }).toFile(join(mediaDir, 'wd-menu.webp'))

console.log(`Prepared ${nums.length} Wardogs screenshots in public/media`)
