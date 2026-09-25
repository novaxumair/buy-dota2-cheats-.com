/**
 * Flatten hero.webm (remove VP9 alpha) and refresh hero.mp4.
 * Requires: npm install @ffmpeg-installer/ffmpeg
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const dir = join(root, 'public', 'videos')
const input = join(dir, 'hero.webm')
const webmOut = join(dir, 'hero.webm.next')
const mp4Out = join(dir, 'hero.mp4.next')

const pkg = require('@ffmpeg-installer/ffmpeg')
const ffmpeg = pkg.path

if (!existsSync(input)) {
  console.error('Missing', input)
  process.exit(1)
}

function run(args) {
  const r = spawnSync(ffmpeg, args, { stdio: 'inherit' })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

run([
  '-y',
  '-f',
  'lavfi',
  '-i',
  'color=c=black:s=1170x658:d=8',
  '-i',
  input,
  '-filter_complex',
  '[1:v]scale=1170:658,format=yuva420p[fg];[0:v][fg]overlay=shortest=1,format=yuv420p[v]',
  '-map',
  '[v]',
  '-an',
  '-c:v',
  'libvpx-vp9',
  '-pix_fmt',
  'yuv420p',
  '-crf',
  '32',
  '-b:v',
  '0',
  '-row-mt',
  '1',
  webmOut,
])

run([
  '-y',
  '-i',
  webmOut,
  '-an',
  '-c:v',
  'libx264',
  '-pix_fmt',
  'yuv420p',
  '-movflags',
  '+faststart',
  '-crf',
  '23',
  mp4Out,
])

console.log('Wrote', webmOut, 'and', mp4Out, '— review, then replace hero.webm / hero.mp4')
