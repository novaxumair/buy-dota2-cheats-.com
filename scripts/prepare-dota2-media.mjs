/**
 * Converts user-provided Dota 2 screenshots into public/media d2-* assets (high-quality WebP).
 * Re-run when replacing gameplay art. Sources: Cursor assets folder or paths passed as argv.
 */
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const mediaDir = join(root, 'public', 'media')

const WEBP = { quality: 94, effort: 6, smartSubsample: true }
const THUMB_JPG = { quality: 92, mozjpeg: true }

function assetsDirDefault() {
  const base = join(
    process.env.USERPROFILE || process.env.HOME || '',
    '.cursor',
    'projects',
    'c-Users-iamanigger-Desktop-website-buy-dota2-cheats-com',
    'assets',
  )
  return existsSync(base) ? base : join(root, 'assets')
}

function findAsset(dir, pattern) {
  const files = readdirSync(dir)
  const hit = files.find((f) => pattern.test(f))
  if (!hit) throw new Error(`Missing asset matching ${pattern} in ${dir}`)
  return join(dir, hit)
}

async function toWebp(input, output) {
  await sharp(input).webp(WEBP).toFile(output)
  const meta = await sharp(output).metadata()
  console.log('wrote', output.replace(root, ''), `${meta.width}x${meta.height}`)
}

async function triptychSlices(input, out8, out9, out10) {
  const meta = await sharp(input).metadata()
  const w = meta.width
  const h = meta.height
  const third = Math.floor(w / 3)
  for (const [i, out] of [
    [0, out8],
    [1, out9],
    [2, out10],
  ]) {
    const left = i * third
    const width = i === 2 ? w - left : third
    await sharp(input).extract({ left, top: 0, width, height: h }).webp(WEBP).toFile(out)
    console.log('wrote', out.replace(root, ''), `slice ${i + 1}`)
  }
}

async function main() {
  const srcDir = process.argv[2] || assetsDirDefault()
  if (!existsSync(srcDir)) {
    console.error('Assets directory not found:', srcDir)
    process.exit(1)
  }

  mkdirSync(mediaDir, { recursive: true })

  const img = {
    combat: findAsset(srcDir, /_images_7-/),
    s1: findAsset(srcDir, /_images_1-/),
    s2: findAsset(srcDir, /_images_2-/),
    s3: findAsset(srcDir, /_images_3-/),
    s4: findAsset(srcDir, /_images_4-/),
    s5: findAsset(srcDir, /_images_5-/),
    s6: findAsset(srcDir, /_images_6-/),
    triptych: findAsset(srcDir, /_images_8-/),
  }

  const shots = [
    img.combat,
    img.s2,
    img.s4,
    img.s3,
    img.s6,
    img.s5,
    img.s1,
  ]

  for (let n = 1; n <= 7; n++) {
    await toWebp(shots[n - 1], join(mediaDir, `d2-screenshot-${n}.webp`))
  }

  await triptychSlices(
    img.triptych,
    join(mediaDir, 'd2-screenshot-8.webp'),
    join(mediaDir, 'd2-screenshot-9.webp'),
    join(mediaDir, 'd2-screenshot-10.webp'),
  )

  await toWebp(img.s5, join(mediaDir, 'd2-hero-full.webp'))
  await toWebp(img.s4, join(mediaDir, 'd2-cover.webp'))
  await toWebp(img.combat, join(mediaDir, 'd2-game-cover.webp'))
  await toWebp(img.s1, join(mediaDir, 'd2-menu.webp'))

  await sharp(img.s5).jpeg(THUMB_JPG).toFile(join(mediaDir, 'd2-video-thumb.jpg'))
  console.log('wrote public/media/d2-video-thumb.jpg')

  console.log('Dota 2 media assets updated (no downscale; WebP q94).')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
