import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const publicDir = fileURLToPath(new URL('../public/', import.meta.url))
const srcCandidates = [
  process.argv[2],
  `${publicDir}brand/logo-source.png`,
  `${publicDir}brand/navbar logo and favicon.jpg`,
  `${publicDir}brand/logo-source.jpg`,
].filter(Boolean)
const src = srcCandidates.find((p) => existsSync(p)) ?? srcCandidates[1]

/** Remove near-black background; keep white/grunge artwork with soft edges. */
async function makeTransparent(input, output, size) {
  const { data, info } = await sharp(input)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const bgCutoff = 42
  const edgeBand = 38

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b

    if (lum <= bgCutoff) {
      data[i + 3] = 0
      continue
    }

    if (lum < bgCutoff + edgeBand) {
      const t = (lum - bgCutoff) / edgeBand
      data[i + 3] = Math.round(255 * Math.min(1, Math.max(0, t)))
    } else {
      data[i + 3] = 255
    }
  }

  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(output)
}

await makeTransparent(src, `${publicDir}logo.png`, 512)
await makeTransparent(src, `${publicDir}favicon-32.png`, 32)
await makeTransparent(src, `${publicDir}apple-touch-icon.png`, 180)

const png = readFileSync(`${publicDir}logo.png`)
const b64 = png.toString('base64')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Wardogs Cheats"><image width="512" height="512" href="data:image/png;base64,${b64}"/></svg>`
writeFileSync(`${publicDir}favicon.svg`, svg)

console.log('Logo assets written to public/ (transparent background)')
