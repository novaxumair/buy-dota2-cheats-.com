import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = dirname(fileURLToPath(import.meta.url))
const src = readFileSync(join(dir, 'generate-wardogs-forums.mjs'), 'utf8')
const tail = src.split('\n').slice(638).join('\n')
const head = `/**
 * Generates src/data/blogs.ts and forum replies for The Isle Cheats SEO forums.
 */
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { POSTS, HOST } from './isle-forum-posts.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
`

let out = `${head}\n${tail}`
out = out.replaceAll('buyislecheats.com', '${HOST}')
out = out.replaceAll('The Isle Editor', 'Isle Guides Editor')
out = out.replaceAll('The Isle Support', 'Isle Guides Support')
out = out.replaceAll(
  'The Isle Cheats Features | Full Feature Overview',
  'The Isle Cheats Features | Full Feature Overview',
)
out = out.replaceAll('| The Isle Cheats Forum', '| The Isle Cheats Forum')
out = out.replaceAll('generate-wardogs-forums.mjs', 'generate-isle-forums.mjs')

const happy = [
  'Followed this thread before cranking every toggle — first adult rex night actually went smooth.',
  'Visible check + distance cap like you said. Fewer surprise ambushes at the lake.',
  'Corpse ESP flag saved us from walking into a carnivore camp. Worth reading before enabling everything.',
  'Saved config after first run — second login was two clicks. Wish I did that day one.',
  'Status page said Active, loader matched, ESP came up first try on Win11.',
  'Max distance tip fixed my cluttered HUD. Pack hunts read cleaner now.',
  'Monthly sub updates included so far — patch week back to Active by Thursday.',
]
const unhappy = [
  'Expected magic — still got jumped from the treeline. ESP does not replace sound.',
  'Skipped antivirus step, menu never opened. My fault but frustrating hour wasted.',
  'Max brightness ESP looks ridiculous on stream. Muted colors helped.',
  'Thought fruit ESP would show every bush — still need to move.',
  'Forced loader while Updating — instant close. Read status next time.',
  'Wide snaplines everywhere made night hunts unreadable. Dialed back per guide.',
  'Lifetime vs monthly confused me until support replied — doc could be clearer.',
]

out = out.replace(
  /const HAPPY = \[[\s\S]*?\]\n\nconst UNHAPPY = \[[\s\S]*?\]\n\nfunction hashSlug/,
  `const HAPPY = ${JSON.stringify(happy, null, 2)}\n\nconst UNHAPPY = ${JSON.stringify(unhappy, null, 2)}\n\nfunction hashSlug`,
)

out = out.replaceAll('The Isle menu', 'The Isle menu')
out = out.replaceAll('The Isle main menu', 'The Isle main menu')
out = out.replaceAll('Launch The Isle', 'Launch The Isle')
out = out.replaceAll('The Isle patches', 'Evrima patches')
out = out.replaceAll('The Isle patch', 'Evrima patch')
out = out.replaceAll('The Isle update', 'Evrima update')
out = out.replaceAll('The Isle Cheats', 'The Isle Cheats')
out = out.replaceAll('The Isle cheats', 'The Isle cheats')
out = out.replaceAll('The Isle cheat', 'The Isle cheat')
out = out.replaceAll('The Isle', 'The Isle')
out = out.replaceAll('control zone', 'growth session')
out = out.replaceAll('control-zone', 'Evrima')
out = out.replaceAll('100-player lobby', 'crowded beach spawn')
out = out.replaceAll('solo_q_wd', 'solo_q_isle')
out = out.replaceAll('twitch_wd', 'twitch_isle')
out = out.replaceAll('newbie_wd', 'newbie_isle')
out = out.replaceAll('LenaWD', 'LenaIsle')

writeFileSync(join(dir, 'generate-isle-forums.mjs'), out)
console.log('Built generate-isle-forums.mjs')
