/**
 * Generates src/data/blogs.ts and forum replies for The Isle Cheats SEO forums.
 */
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { POSTS, HOST } from './isle-forum-posts.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')


const AUTHORS = [
  'ridge_runner',
  'Kestrel_09',
  'm4rtin.l',
  'softpeek',
  'ViktorNorth',
  'ghostloot',
  'PMC_walker',
  'duo_six',
  'LenaIsle',
  'impatient_one',
  'patch_day_survivor',
  'filterking',
  'twitch_isle',
  'solo_q_isle',
  'MoneyKing',
  'irritated_panda',
  'capslock_warrior',
  'newbie_isle',
  'IT_guy_gaming',
  'defender_hater',
]

const HAPPY = [
  'Followed this thread before cranking every toggle — first growth session night actually went smooth.',
  'Visible check + low FOV like you said. Nobody typed a word in post-match chat.',
  'Vehicle occupied flag saved us from a bait truck. Worth reading before enabling everything.',
  'Saved config after first run — second login was two clicks. Wish I did that day one.',
  'Status page said Active, loader matched, ESP came up first try on Win11.',
  'Radar range tip fixed my cluttered minimap. Trios rotate cleaner now.',
  'Monthly sub updates included so far — patch Tuesday to Thursday Active again.',
]

const UNHAPPY = [
  'Expected magic — still died to a sound flank. ESP does not replace headphones.',
  'Skipped antivirus step, menu never opened. My fault but frustrating hour wasted.',
  'Wide FOV got me roasted in squad Discord kill cam. Dialed back per guide.',
  'Thought vehicle ESP would show loot inside — it does not, just the truck.',
  'Forced loader while Updating — instant kick. Read status next time lol.',
  'Skeleton on max brightness looks ridiculous on stream. Muted colors helped.',
  'Prices on lifetime vs monthly confused me until support replied — doc could be clearer.',
]

function hashSlug(slug) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}

function modIndex(n, length) {
  return ((n % length) + length) % length
}

function pickUniqueBody(used, candidates) {
  const valid = candidates.filter((c) => typeof c === 'string' && c.length > 0)
  for (const body of valid) {
    if (!used.has(body)) {
      used.add(body)
      return body
    }
  }
  const fallback = `${valid[0] ?? 'Staff note'} (${valid.length} notes in thread.)`
  used.add(fallback)
  return fallback
}

function staffRepliesFor(post, used) {
  const h = hashSlug(post.slug)
  const staffCount = 1 + (h % 2)
  const shortTitle = post.title.length > 72 ? `${post.title.slice(0, 69)}…` : post.title
  const topic = post.slug.replace(/-/g, ' ')
  const editorPool = [
    `Editor: this ${post.tag} thread is locked read-only. Steps match the live The Isle menu on ${HOST} — confirm Active before you queue.`,
    `Editor update: "${shortTitle}" was refreshed after the latest patch. Archive only — billing and loader keys go through Support.`,
    `Pinned reference for ${topic}. Do not copy old FOV screenshots from Discord; use the checklist in the opening post.`,
  ]
  const modPool = [
    `Moderator: replies are disabled on archive threads. Share loader logs in Support, not in locked forums.`,
    `Mod note — keep ${post.tag} configs conservative in large lobbies. Visible check and distance caps are strongly recommended.`,
    `Moderator reminder: if status shows Updating on ${HOST}, settings changes here will not fix inject failures — wait for Active.`,
  ]
  const out = []
  if (staffCount >= 1) {
    out.push({
      author: 'Isle Guides Editor',
      role: 'editor',
      date: `2026-09-${String(8 + (h % 6)).padStart(2, '0')}`,
      body: pickUniqueBody(used, [
        editorPool[h % editorPool.length],
        editorPool[(h + 1) % editorPool.length],
        `${editorPool[h % editorPool.length]} Thread slug: ${post.slug}.`,
      ]),
    })
  }
  if (staffCount >= 2) {
    out.push({
      author: 'Forum Moderator',
      role: 'moderator',
      date: `2026-09-${String(12 + (h % 8)).padStart(2, '0')}`,
      body: pickUniqueBody(used, [
        modPool[modIndex(h >>> 2, modPool.length)],
        modPool[modIndex((h >>> 2) + 1, modPool.length)],
        `${modPool[modIndex(h >>> 2, modPool.length)]} (${post.tag} archive.)`,
      ]),
    })
  }
  return out
}

function communityRepliesFor(post, used) {
  const h = hashSlug(post.slug)
  const count = 2 + (h % 5)
  const out = []
  for (let i = 0; i < count; i++) {
    const happy = (h + i) % 3 !== 0
    const pool = happy ? HAPPY : UNHAPPY
    const candidates = []
    for (let j = 0; j < pool.length; j++) {
      candidates.push(pool[modIndex(h + i * 7 + j, pool.length)])
    }
    const body = pickUniqueBody(used, candidates)
    out.push({
      author: AUTHORS[modIndex(h + i, AUTHORS.length)],
      role: 'member',
      date: `2026-09-${String(10 + modIndex(h + i, 18)).padStart(2, '0')}`,
      body,
    })
  }
  return out
}

function modSolutionTemplates(author) {
  return [
    {
      test: /antivirus|menu never opened/i,
      text: `@${author} — add the delivery folder to Windows Defender exclusions before the first inject, reboot once, and launch from the The Isle main menu only. If Defender quarantined files, restore them from protection history, then retry.`,
    },
    {
      test: /Updating|Forced loader/i,
      text: `@${author} — loading while status shows Updating will fail every time. Wait until ${HOST} lists Active, fully exit the game, then run the loader once. No menu toggles fix a mismatched build.`,
    },
    {
      test: /Wide FOV|kill cam/i,
      text: `@${author} — wide FOV plus low smooth reads obvious on kill cam. Cut FOV roughly in half, raise smooth, and keep visible check on — the aimbot section in this thread has sane starting numbers.`,
    },
    {
      test: /vehicle ESP would show loot|just the truck/i,
      text: `@${author} — vehicle ESP shows transports and occupied state, not crate loot inside. Use player ESP and radar for pushes; treat empty vehicle markers as bait until you line-of-sight the hull.`,
    },
    {
      test: /sound flank|headphones/i,
      text: `@${author} — ESP does not replace audio. Keep radar range moderate and OOF arrows on so you still rotate when someone sprints your blind side.`,
    },
    {
      test: /Skeleton on max brightness|stream/i,
      text: `@${author} — drop skeleton opacity and switch to a muted color. Box + distance alone are enough for most trios; neon skeletons are what teammates notice on clips.`,
    },
    {
      test: /lifetime vs monthly|support replied/i,
      text: `@${author} — start monthly if you play casually; lifetime makes sense when you queue multiple nights a week. Billing questions go to Support with your order email, not this locked thread.`,
    },
    {
      test: /Expected magic|still died/i,
      text: `@${author} — cheats widen information, they do not auto-win fights. Run ESP + radar first, add aimbot later with conservative FOV, and treat every death as a positioning fix before cranking settings.`,
    },
    {
      test: /Saved config|second login|two clicks/i,
      text: `@${author} — good call saving a profile. Name configs by mode (ESP-only vs full assist) so you are not re-toggling mid-queue when your squad swaps roles.`,
    },
    {
      test: /Radar range|minimap|Trios rotate/i,
      text: `@${author} — if the minimap still feels busy, shorten radar range for urban pushes and widen it only when you hold open ground between zones.`,
    },
    {
      test: /Visible check|low FOV|post-match/i,
      text: `@${author} — visible check plus tighter FOV is the usual fix for quiet kill cams. Screenshot your menu once so you can restore the same numbers after patches.`,
    },
    {
      test: /Status page said Active|Win11/i,
      text: `@${author} — Active on the site plus a clean inject path is the baseline. If anything breaks after a game update, recheck status before you change ESP toggles.`,
    },
    {
      test: /Vehicle occupied|bait truck/i,
      text: `@${author} — occupied/empty flags are hints, not guarantees. Slow peek or have a teammate hard cover before you commit to a truck push.`,
    },
    {
      test: /Monthly sub updates|patch Tuesday/i,
      text: `@${author} — subscription builds track patch days; when status flips Updating, pause ranked-style queues until Active returns instead of forcing the loader.`,
    },
  ]
}

function modAnswerBody(post, target, variant = 0) {
  const solutions = modSolutionTemplates(target.author)
  let body = solutions.find((s) => s.test.test(target.body))?.text
  if (!body) {
    body = `@${target.author} — walk through the ${post.tag} checklist in the opening post, confirm Active on ${HOST}, then retry with a saved config. If the loader still closes instantly, open Support with a screenshot of your status page.`
  }
  if (variant > 0) {
    body = `${body} (Follow-up #${variant + 1} — still locked; use Support for account-specific issues.)`
  }
  return body
}

function pickFollowUpTargets(post, community) {
  const h = hashSlug(post.slug)
  const unhappySet = new Set(UNHAPPY)
  const unhappy = community.filter((r) => unhappySet.has(r.body))
  const rest = community.filter((r) => !unhappySet.has(r.body))

  const first = unhappy[0] ?? community[modIndex(h >>> 1, community.length)]
  const usedKeys = new Set([`${first.author}\0${first.body}`])

  const secondCandidates = [...unhappy.slice(1), ...rest].filter(
    (r) => !usedKeys.has(`${r.author}\0${r.body}`),
  )
  const second =
    secondCandidates[modIndex(h >>> 3, secondCandidates.length)] ??
    community.find((r) => !usedKeys.has(`${r.author}\0${r.body}`))

  const targets = [first]
  if (second) targets.push(second)
  return targets
}

function modFollowUpForTarget(post, target, used, variant) {
  const body = pickUniqueBody(used, [
    modAnswerBody(post, target, variant),
    modAnswerBody(post, target, variant + 1),
    `${modAnswerBody(post, target, 0)} Locked thread — Support handles one-off loader issues.`,
  ])

  const targetDay = Number.parseInt(target.date.slice(8, 10), 10)
  const modDay = Math.min(
    28,
    Number.isFinite(targetDay) ? targetDay + 1 + variant : 20 + variant,
  )

  return {
    author: variant % 2 === 0 ? 'Forum Moderator' : 'Isle Guides Support',
    role: 'moderator',
    date: `2026-09-${String(modDay).padStart(2, '0')}`,
    body,
    replyToAuthor: target.author,
  }
}

function modFollowUpReplies(post, community, used) {
  if (!community.length) return []

  const targets = pickFollowUpTargets(post, community)
  return targets.map((target, variant) => ({
    target,
    reply: modFollowUpForTarget(post, target, used, variant),
  }))
}

function repliesForSlug(post) {
  const used = new Set()
  const staff = staffRepliesFor(post, used)
  const community = communityRepliesFor(post, used)
  const followUps = modFollowUpReplies(post, community, used)
  const followByKey = new Map(
    followUps.map((f) => [`${f.target.author}\0${f.target.body}`, f.reply]),
  )

  const merged = [...staff]
  for (const reply of community) {
    merged.push(reply)
    const mod = followByKey.get(`${reply.author}\0${reply.body}`)
    if (mod) merged.push(mod)
  }
  for (const f of followUps) {
    if (!merged.some((r) => r.body === f.reply.body)) merged.push(f.reply)
  }
  return merged
}

function assertUniqueForums() {
  const slugSet = new Set()
  const titleSet = new Set()
  const excerptSet = new Set()
  for (const p of POSTS) {
    if (slugSet.has(p.slug)) throw new Error(`Duplicate forum slug: ${p.slug}`)
    slugSet.add(p.slug)
    if (titleSet.has(p.title)) throw new Error(`Duplicate forum title: ${p.title}`)
    titleSet.add(p.title)
    if (excerptSet.has(p.excerpt)) throw new Error(`Duplicate forum excerpt: ${p.excerpt}`)
    excerptSet.add(p.excerpt)
  }
}

function assertRepliesForPost(post) {
  const replies = repliesForSlug(post)
  const bodies = new Set()
  for (const r of replies) {
    if (bodies.has(r.body)) throw new Error(`Duplicate reply body in ${post.slug}`)
    bodies.add(r.body)
  }
  const staff = replies.filter((r) => r.role === 'editor' || r.role === 'moderator')
  if (staff.length < 3 || staff.length > 5) {
    throw new Error(`Expected 3–5 staff replies (incl. two @replies) for ${post.slug}, got ${staff.length}`)
  }
  const modAnswers = replies.filter((r) => r.role === 'moderator' && r.replyToAuthor)
  if (modAnswers.length !== 2) {
    throw new Error(`Expected exactly two moderator @replies for ${post.slug}, got ${modAnswers.length}`)
  }
  return replies
}

assertUniqueForums()

function metaTitle(post) {
  if (post.slug === 'features-list') {
    return 'The Isle Cheats Features | Full Feature Overview'
  }
  return `${post.title} | The Isle Cheats Forum`
}

/** Max 4 intent-specific terms — never a synonym wall. */
function searchTermsFor(post) {
  if (post.intentTerms) {
    return post.intentTerms.slice(0, 4).join(', ')
  }
  const fromKw = (post.kw || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4)
  if (fromKw.length) return [...new Set(fromKw)].join(', ')
  const slugWords = post.slug.replace(/-/g, ' ')
  return [`The Isle ${post.tag}`, slugWords, 'The Isle cheats'].slice(0, 3).join(', ')
}

function metaDescription(post) {
  const first = post.excerpt.slice(0, 155)
  return first.endsWith('.') ? first : `${first}.`
}

const blogsTs = `/** Auto-generated by scripts/generate-isle-forums.mjs — edit the script and re-run. */
export type BlogSection = {
  heading: string
  body: string[]
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  searchTerms: string
  date: string
  readMinutes: number
  tag: string
  sections: BlogSection[]
  howTo?: boolean
}

export const BLOGS: BlogPost[] = ${JSON.stringify(
  POSTS.map((p, idx) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    metaTitle: metaTitle(p),
    metaDescription: metaDescription(p),
    searchTerms: searchTermsFor(p),
    date: `2026-09-${String(12 + (idx % 10)).padStart(2, '0')}`,
    readMinutes: 6 + (idx % 5),
    tag: p.tag,
    sections: p.sections,
    ...(p.howTo ? { howTo: true } : {}),
  })),
  null,
  2,
)}

export function getBlog(slug: string) {
  return BLOGS.find((b) => b.slug === slug)
}

/** Related threads for forum footers — never includes the current slug. */
export function getRelatedForumThreads(slug: string, limit = 6): BlogPost[] {
  const current = getBlog(slug)
  if (!current) return []
  return BLOGS.filter((b) => b.slug !== slug)
    .sort((a, b) => {
      const tagRank = (p: BlogPost) => (p.tag === current.tag ? 0 : 1)
      const byTag = tagRank(a) - tagRank(b)
      if (byTag !== 0) return byTag
      return a.title.localeCompare(b.title)
    })
    .slice(0, limit)
}

export { blogPath } from './blog-paths'
`

const repliesObj = Object.fromEntries(POSTS.map((p) => [p.slug, assertRepliesForPost(p)]))

const repliesTs = `/** Auto-generated by scripts/generate-isle-forums.mjs */
export type ForumReplyRole = 'editor' | 'moderator' | 'member'

export type ForumReply = {
  author: string
  date: string
  body: string
  role?: ForumReplyRole
  /** When set, this staff post answers a member reply above. */
  replyToAuthor?: string
}

export const FORUM_REPLIES: Record<string, ForumReply[]> = ${JSON.stringify(repliesObj, null, 2)}

export function getForumReplies(slug: string): ForumReply[] {
  return FORUM_REPLIES[slug] ?? []
}
`

const forumIndexTs = `/** Auto-generated — lightweight list for search & cards (no post bodies). */
export type ForumIndexEntry = {
  slug: string
  title: string
  excerpt: string
  tag: string
}

export const FORUM_INDEX: ForumIndexEntry[] = ${JSON.stringify(
  POSTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    tag: p.tag,
  })),
  null,
  2,
)}
`

writeFileSync(join(root, 'src/data/blogs.ts'), blogsTs)
writeFileSync(join(root, 'src/data/forum-replies.ts'), repliesTs)
writeFileSync(join(root, 'src/data/forum-index.ts'), forumIndexTs)
console.log(`Generated ${POSTS.length} forum posts with replies`)
