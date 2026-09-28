import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const skip = new Set(['generate-wardogs-forums.mjs', 'prepare-wardogs-media.mjs', 'patch-isle-branding.mjs'])

function walk(dir, out = []) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === 'dist') continue
    const p = join(dir, ent.name)
    if (ent.isDirectory()) walk(p, out)
    else if (/\.(tsx?|astro|mjs|js|toml|css|md)$/.test(ent.name)) out.push(p)
  }
  return out
}

const reps = [
  [/buywardogscheat\.com/g, 'buyislecheats.com'],
  [/\/wardogs-cheats/g, '/the-isle-cheats'],
  [/wardogs-cheats\.jpg/g, 'the-isle-cheats.jpg'],
  [/\/media\/wd-/g, '/media/isle-'],
  [/Wardogs Cheats/g, 'The Isle Cheats'],
  [/Wardogs cheats/g, 'The Isle cheats'],
  [/Wardogs cheat/g, 'The Isle cheat'],
  [/Wardogs/g, 'The Isle'],
  [/wardogs cheats/g, 'the isle cheats'],
  [/wardogs esp/g, 'the isle esp'],
  [/guidePath\('wardogs'\)/g, "guidePath('the-isle')"],
  [/getGame\('wardogs'\)/g, "getGame('the-isle')"],
]

let changed = 0
for (const f of [...walk(join(root, 'src')), ...walk(join(root, 'scripts')), ...walk(join(root, 'public')), ...walk(join(root, 'workers')), ...walk(join(root, 'functions'))]) {
  if (skip.has(f.split(/[/\\]/).pop() ?? '')) continue
  let t = readFileSync(f, 'utf8')
  const o = t
  for (const [a, b] of reps) t = t.replace(a, b)
  if (t !== o) {
    writeFileSync(f, t)
    changed++
  }
}
console.log(`Patched ${changed} files`)
