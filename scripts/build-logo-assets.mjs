import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const publicDir = fileURLToPath(new URL('../public/', import.meta.url))
const src = process.argv[2] || `${publicDir}brand/logo-source.jpg`

async function makeTransparent(input, output, size) {
  const { data, info } = await sharp(input)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    if (lum < 40) {
      data[i + 3] = 0
    } else {
      data[i] = 255
      data[i + 1] = 255
      data[i + 2] = 255
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
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Wardogs"><image width="512" height="512" href="data:image/png;base64,${b64}"/></svg>`
writeFileSync(`${publicDir}favicon.svg`, svg)

console.log('Logo assets written to public/')
