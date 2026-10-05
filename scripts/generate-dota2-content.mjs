/**
 * Generates articles.ts, forums.ts, forum-replies.ts, and forum-index.ts for Dota 2 Cheats.
 */
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const HOST = 'buydota2cheats.com'
const BRAND = 'Dota 2 Cheats'

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 72)
}

/** One-line focus per article for unique deep-dive intros. */
const ARTICLE_FOCUS = {
  'ultimate-guide-dota-2-cheats':
    'how lobby cheats, sandbox practice, and third-party vision tools differ under VAC',
  'console-commands-cheat-dota-2':
    'binding the developer console and using cheat-gated commands without breaking public lobbies',
  'complete-dota-2-cheats-list':
    'cataloging economy and item commands players look up before custom games',
  'dota-2-cheats-item-commands':
    'spawning and upgrading gear quickly while `-sv_cheats` is enabled',
  'dota-2-cheats-neutral-items':
    'rolling and testing neutral tokens and tier drops in cheat lobbies',
  'cheat-code-dota-2-sandbox':
    '`-wtf`, `-refresh`, and other sandbox toggles for combo rehearsal',
  'cheat-dota-2-bot-commands':
    'populating lobbies with bots and tuning difficulty for last-hit drills',
  'cheat-dota-2-gold':
    '`-gold`, `-lvlup`, and economy shortcuts for item timing practice',
  'cheat-dota-2-lobby':
    'host permissions, cheat checkboxes, and inviting friends to test setups',
  'cheat-engine-dota-2':
    'why memory scanners conflict with VAC and what safer alternatives exist',
  'cheat-lobby-dota-2-training':
    'structuring training sessions so cheats reinforce muscle memory',
  'cheat-money-dota-2':
    'adjusting starting gold and buyback rules for scenario testing',
  'dota-2-cheats-lobby':
    'navigating lobby UI options that gate item and vision experiments',
  'best-dota-2-cheats-review-2026':
    'comparing overlay features, update cadence, and support quality in 2026',
  'hwid-spoofer-safety':
    'hardware ID concepts, ban families, and realistic expectations for PC users',
  'hero-esp-items-levels':
    'reading enemy levels, item timings, and talent spikes through ESP overlays',
  'full-map-hack-fog-of-war':
    'fog-of-war removal, minimap awareness, and vision discipline',
  'ability-cooldown-tracker':
    'tracking ultimate and talent cooldowns during skirmishes',
  'creep-spawn-timers':
    'stack timing, pull windows, and camp respawn math',
  'rune-spawn-indicators':
    'power rune and bounty spawn reminders for mid and off-lane rotations',
  'last-hit-prediction-helper':
    'using hit indicators to tighten last hits without autopiloting every creep',
  'auto-dodge-skillshots':
    'reaction assists, input latency, and when manual play still wins',
  'ward-placement-esp':
    'spotting observer and sentry placements to plan deward routes',
  'roshan-timer':
    'Aegis expiry, respawn windows, and smoke timing around the pit',
  'enemy-inventory-esp':
    'Blink, BKB, and save-item detection before you commit to fights',
  'performance-optimized-overlays':
    'keeping FPS stable while ESP and timers draw on screen',
  'support-24-7-gaming-software':
    'why round-the-clock loader support matters after patches and outages',
}

const TAG_DEEP_HEADING = {
  Guides: 'From guides to live matches',
  Console: 'Console setup and cheat gating',
  Lists: 'Reference lists that actually help',
  Items: 'Items, neutrals, and inventories',
  Sandbox: 'Sandbox toggles and rehearsal',
  Bots: 'Bots and solo drills',
  Economy: 'Gold, levels, and buy timing',
  Lobbies: 'Custom lobby hosting',
  Tools: 'Third-party tools and risk',
  Reviews: 'Choosing software in 2026',
  Safety: 'Account and hardware safety',
  Features: 'Feature depth and defaults',
}

const TAG_DEEP_PARAS = {
  Guides: [
    'Start in a private lobby with cheats enabled before you touch ranked. Valve allows `-sv_cheats 1` only when the server or lobby host permits it; matchmaking servers reject those commands, which is why players confuse "cheat dota 2" searches with illegal ranked tools.',
    'Keep a notebook of which commands you used each session — `-startgame`, `-win`, hero-specific test spawns — so you can reproduce a drill tomorrow without guessing. Pair that with demo files if you want to review positioning without re-hosting.',
    'When you later enable premium overlays from buydota2cheats.com, treat them as a separate layer from console cheats. Overlays read live match state; console cheats mutate lobby rules. Mixing both in one ranked game stacks report risk and performance load.',
    'If a command stops working after a patch, check whether Valve renamed cheat-protected cvars in the patch notes. The forums Game Patch Status thread tracks loader compatibility in parallel.',
  ],
  Console: [
    'Open Steam → Dota 2 → Properties → Launch Options and add `-console` if you want the overlay every boot. In-game, bind a key to `toggleconsole` in the console itself so you are not menu-diving mid-drill.',
    'Cheat commands such as `-gold`, `-item`, `-refresh`, and `-wtf` only execute when the server has cheats enabled. Typing them in ranked produces errors, not advantages — a common misconception from outdated YouTube clips.',
    'Use `dota_bot_practice` and local lobbies to script fights. Alias frequently used commands in `autoexec.cfg` under your Dota cfg folder so training setups take seconds instead of minutes.',
    'Third-party menus on Windows still require an Active loader status on the site dashboard after major patches. Console knowledge helps you verify whether a missed last hit is skill or frame timing, independent of overlay helpers.',
  ],
  Lists: [
    'List articles work best as checklists: economy commands on one monitor, item names on another. Dota item internal names differ from shop labels — `-item blink` vs "Blink Dagger" — so verify in a cheat lobby before you record content.',
    'Group commands by purpose: vision (`-allvision`), movement (`-speed`), spawning (`-createhero`), and match control (`-pause`). That mirrors how coaches structure review sessions.',
    'Do not paste entire command dumps into ranked chat or Discord; moderators on community servers treat that as spam. Keep references offline or in private docs.',
    'Cross-check any list against the current patch on the Dota wiki. Neutrals, talent trees, and Roshan drop rules change often enough to invalidate copy-paste guides within a few months.',
  ],
  Items: [
    'Item cheats accelerate build testing: you can spawn a full six-slot carry in thirty seconds and test burst combos on a dummy or bot. Remember that some items require `-wtf` or zero cooldown toggles to mimic real fight cadence.',
    'Neutral items need the correct tier token commands for the patch you are on. If a token fails, your lobby may be on an older replay version or cheats were disabled mid-session.',
    'Use item cheats to learn power spikes — when Blink completes, when BKB timing wins fights — then turn cheats off and last-hit until you hit those timings manually.',
    'Inventory ESP in the premium menu shows what enemies actually bought in live games; item spawn cheats teach what those items do before you face them in ranked.',
  ],
  Sandbox: [
    'Sandbox-style toggles (`-wtf`, free spells, instant gold) are for muscle memory, not MMR. Limit sessions to fifteen minutes so you do not train lazy cooldown habits.',
    'Alternate sandbox modes with "normal cooldown" rounds in the same lobby. Casters call this "slow mode vs fast mode" drilling — it keeps your finger timing honest.',
    'Record FPS while sandbox effects and particle-heavy spells stack. If frames dip, lower Dota video settings before blaming overlay software.',
    'After sandbox practice, play one bot match with cheats off to transfer combos into last-hit pressure and mana management.',
  ],
  Bots: [
    'Bot lobbies let you control creep equilibrium while cheats handle setup. Use `-createhero` and bot difficulty tweaks to simulate lane pressure without queueing.',
    'Practice last hits against bots with cheats disabled once you have gold for your core items — bots punish missed CS more than empty lobbies.',
    'Bot pathing changes with patches; if bots stop responding to `-bot`, re-host the lobby and confirm you are lobby host.',
    'Combine bot drills with timer overlays later: pull camps on the clock while bots push your tower to mimic real distractions.',
  ],
  Economy: [
    'Gold and level commands reset the economic story of a drill. Use `-gold 99999` sparingly; better to spawn realistic amounts (600, 1500, 4200) tied to item timings you are learning.',
    'Test buyback and death gold scenarios by dying on purpose with cheats on, then replay the fight with different item choices.',
    'Economy cheats do not teach map pressure — pair them with vision toggles or ward ESP later so you know when it is safe to farm.',
    'Document patch-specific starting gold and passive income changes; Valve adjusts bounty runes and lane gold often enough to break old cheat-money scripts.',
  ],
  Lobbies: [
    'Only the lobby host enables cheats for everyone. If friends join before cheats are on, have them reconnect or re-seat so `-sv_cheats` propagates correctly.',
    'Use passworded lobbies when testing overlays or unfamiliar commands so random players do not report odd behavior.',
    'Lobby cheat flags do not grant VAC immunity on matchmaking — never use a public matchmaking queue to "test" third-party tools.',
    'Schedule training lobbies after patch days once loader status returns Active; new hero releases often break old cheat spawn names until hotfixed.',
  ],
  Tools: [
    'Memory editors and Cheat Engine scans trigger VAC signatures on protected games. Dota 2 runs VAC on matchmaking; treat external editing as account-ending risk on mains.',
    'Legitimate practice stays inside Valve-controlled cheats or vendor loaders designed for Dota overlays — not arbitrary process memory writes.',
    'If a YouTube tutorial shows CE tables for "free MMR," assume scam or ban bait. Report those links in forums instead of spreading them.',
    'HWID spoofers and VPNs do not replace good judgment: reports, behavior score, and manual review still apply.',
  ],
  Reviews: [
    'When comparing Dota 2 cheat products in 2026, weigh update speed after patches, transparent status pages, and support response time — not just feature bullet lists.',
    'Map hack and ESP claims should be tested in custom lobbies first on a smurf. Record video proof for yourself, not for public ranked streams.',
    'Price plans ($35 monthly vs $150 lifetime on buydota2cheats.com) matter if you play multiple seasons; lifetime avoids rebilling but still depends on ongoing updates.',
    'Read forum VAC threads alongside marketing copy. Delayed bans mean "I was fine for a week" is not a safety study.',
  ],
  Safety: [
    'HWID bans tie enforcement to hardware fingerprints when Valve and vendors escalate; spoofers may help recovery accounts in niche cases but are not a license to cheat on mains.',
    'Separate Steam accounts for testing reduce the cost of mistakes. Never link payment methods you cannot afford to lose on experimental accounts.',
    'Behavior score and commends affect match quality independent of VAC — playing suspiciously still gets reported.',
    'Official checkout on the site domain avoids reseller scams; Support verifies orders by email, not Discord DMs.',
  ],
  Features: [
    'Each overlay module maps to a skill Dota players already practice: vision, timing, inventory reads, or reaction. Enable one module per game until you understand its false-positive rate.',
    'Map and ESP features consume GPU compositing budget; cap Dota effects quality if you enable multiple draw layers.',
    'Timers (runes, Roshan, creeps) should match your role — mid players need rune clocks; supports need ward and stack timers more often.',
    'After toggling a feature, play a full bot match to see whether it helps decisions or adds noise. Disable anything you stop looking at within ten minutes.',
  ],
}

function deepSectionFor(def) {
  const focus =
    ARTICLE_FOCUS[def.slug] ??
    `${def.tag.toLowerCase()} topics tied to ${def.title.toLowerCase()}`
  const heading = TAG_DEEP_HEADING[def.tag] ?? 'Deep dive'
  const paras = TAG_DEEP_PARAS[def.tag] ?? TAG_DEEP_PARAS.Guides
  return {
    heading,
    body: [
      `This article focuses on ${focus}. Dota 2 remains a VAC-protected title on matchmaking, so treat anything outside host-enabled lobby cheats as high risk on accounts you care about.`,
      ...paras.slice(0, 3),
    ],
  }
}

function practiceWorkflowSection(def) {
  return {
    heading: 'Safe practice workflow',
    body: [
      `Host or join a custom lobby before testing ideas from "${def.title}". Public ranked and Turbo queues are the wrong place for console cheats or new overlay toggles.`,
      'Save an `autoexec.cfg` snippet for the three commands you use most often in drills so setup stays consistent between patches.',
      `Check ${HOST} for Active loader status after every major Dota patch; Updating status means wait rather than reinstalling Windows.`,
      'Finish each practice block with one cheat-off bot or unranked game so muscle memory transfers beyond sandbox shortcuts.',
    ],
  }
}

function wordCount(sections) {
  return sections.flatMap((s) => s.body).join(' ').split(/\s+/).filter(Boolean).length
}

function readMinutesFromSections(sections) {
  return Math.max(9, Math.min(20, Math.round(wordCount(sections) / 200)))
}

function sectionsFor(def) {
  const { title, tag } = def
  const sections = [
    {
      heading: 'Overview',
      body: [
        `${title} — practical notes for Dota 2 players on Windows PC. ${BRAND} focuses on map vision, hero ESP, and match tools; this article covers informational ${tag.toLowerCase()} topics separate from live ranked abuse.`,
        'Matchmaking runs Valve Anti-Cheat on Dota 2 clients. Lobby hosts can enable sanctioned cheats for everyone in that lobby, but those rules never carry into ranked queues — confusing the two is how accounts get reported or banned.',
        `Use official lobbies and sandbox tools when testing console-style commands. For the premium menu on ${HOST}, confirm Active loader status before you queue.`,
      ],
    },
    deepSectionFor(def),
    practiceWorkflowSection(def),
    {
      heading: 'Key takeaways',
      body: [
        'Start with fog-of-war and vision concepts before stacking every overlay toggle in one match.',
        'VAC and Valve Anti-Cheat remain the enforcement layer on Dota 2 — treat any third-party tool as high risk on your main account.',
        `Questions about delivery, billing, or loader errors belong on ${HOST} Support, not blog comments.`,
      ],
    },
  ]
  return sections
}

const ARTICLE_DEFS = [
  {
    title: 'The Ultimate Guide to Dota 2 Cheats: Console Commands and More',
    tag: 'Guides',
    slug: 'ultimate-guide-dota-2-cheats',
  },
  {
    title: 'How to Use Console Commands and Cheat Dota 2 Effectively',
    tag: 'Console',
    slug: 'console-commands-cheat-dota-2',
  },
  {
    title: 'Complete Dota 2 Cheats List for Items and Gold Generation',
    tag: 'Lists',
    slug: 'complete-dota-2-cheats-list',
  },
  {
    title: 'Spawning Items with Every Available Dota 2 Cheats Item Command',
    tag: 'Items',
    slug: 'dota-2-cheats-item-commands',
  },
  {
    title: 'Finding Neutral Equipment Using Dota 2 Cheats Neutral Items',
    tag: 'Items',
    slug: 'dota-2-cheats-neutral-items',
  },
  {
    title: 'Mastering Cheat Code Dota 2 Settings for Sandbox Practice',
    tag: 'Sandbox',
    slug: 'cheat-code-dota-2-sandbox',
  },
  {
    title: 'How to Practice Against Bots Using Cheat Dota 2 Bot Commands',
    tag: 'Bots',
    slug: 'cheat-dota-2-bot-commands',
  },
  {
    title: 'Instantly Adding Gold with Cheat Dota 2 Gold Commands',
    tag: 'Economy',
    slug: 'cheat-dota-2-gold',
  },
  {
    title: 'Setting Up Custom Lobbies with Cheat Dota 2 Lobby Options',
    tag: 'Lobbies',
    slug: 'cheat-dota-2-lobby',
  },
  {
    title: 'Exploring Cheat Engine Dota 2 Tools and Safe Memory Editing',
    tag: 'Tools',
    slug: 'cheat-engine-dota-2',
  },
  {
    title: 'Best Practices for Using Cheat Lobby Dota 2 Features in Training',
    tag: 'Lobbies',
    slug: 'cheat-lobby-dota-2-training',
  },
  {
    title: 'Managing Cheat Money Dota 2 Commands for Fast Testing',
    tag: 'Economy',
    slug: 'cheat-money-dota-2',
  },
  {
    title: 'Navigating Dota 2 Cheats Lobby Options for Custom Matches',
    tag: 'Lobbies',
    slug: 'dota-2-cheats-lobby',
  },
  {
    title: 'Best Dota 2 Cheats Review & Comparison 2026: Features, Safety & Value',
    tag: 'Reviews',
    slug: 'best-dota-2-cheats-review-2026',
  },
  {
    title: 'Discover What an HWID Spoofer Does for Safety',
    tag: 'Safety',
    slug: 'hwid-spoofer-safety',
  },
  {
    title: 'Gaining Map Control: Tracking Enemy Hero ESP, Items, and Levels in Dota 2',
    tag: 'Features',
    slug: 'hero-esp-items-levels',
  },
  {
    title: 'Ultimate Tactical Awareness: Removing Fog of War with Full Map Hacks',
    tag: 'Features',
    slug: 'full-map-hack-fog-of-war',
  },
  {
    title: 'Optimizing Teamfights: Advanced Ability Cooldown Trackers for Dota 2',
    tag: 'Features',
    slug: 'ability-cooldown-tracker',
  },
  {
    title: 'Maximizing Farm Efficiency with Accurate Creep Spawn Timers',
    tag: 'Features',
    slug: 'creep-spawn-timers',
  },
  {
    title: 'Never Miss a Power Spike: Rune Spawn Indicators and Timers Guide',
    tag: 'Features',
    slug: 'rune-spawn-indicators',
  },
  {
    title: 'Perfecting Your Farm: How Last Hit Prediction Helpers Improve GPM',
    tag: 'Features',
    slug: 'last-hit-prediction-helper',
  },
  {
    title: 'Staying Untouchable: Using Auto-Dodge Skillshot Features in Matches',
    tag: 'Features',
    slug: 'auto-dodge-skillshots',
  },
  {
    title: 'Uncovering Vision: Ward Placement ESP and Observer Map Tracking',
    tag: 'Features',
    slug: 'ward-placement-esp',
  },
  {
    title: 'Securing the Aegis: Precise Roshan Timers for Tactical Advantage',
    tag: 'Features',
    slug: 'roshan-timer',
  },
  {
    title: 'Outsmarting Your Opponents with Real-Time Enemy Inventory ESP',
    tag: 'Features',
    slug: 'enemy-inventory-esp',
  },
  {
    title: 'High FPS Gaming: Performance Optimized Overlays and Hacks',
    tag: 'Features',
    slug: 'performance-optimized-overlays',
  },
  {
    title: 'Reliable Assistance: Why 24/7 Support Matters for Gaming Software Users',
    tag: 'Features',
    slug: 'support-24-7-gaming-software',
  },
]

const FORUM_DEFS = [
  {
    slug: 'dota-2-cheats-discussion',
    title: 'Daily thread: dota 2 cheats, map vision, and VAC rumors',
    tag: 'General',
    community: 'dota2cheats',
    author: 'AncientStack',
    kw: 'dota 2 cheats, cheat dota 2',
    excerpt:
      'Open discussion for dota 2 cheats features, loader status, and whether new patches shifted VAC behavior — read the pinned rules first.',
  },
  {
    slug: 'vac-anticheat-safety',
    title: 'VAC bans after third-party tools — what actually triggers reports?',
    tag: 'VAC',
    community: 'VACSafety',
    author: 'mmr_anxious',
    kw: 'dota 2 cheats, tf2 anti cheat',
    excerpt:
      'Valve Anti-Cheat on Dota 2: delayed bans, smurf reports, and why sandbox lobbies are not the same risk as ranked.',
  },
  {
    slug: 'complete-setup',
    title: 'Instructions to use Dota 2 Cheats on Windows (loader + first inject)',
    tag: 'Setup',
    community: 'Dota2Setup',
    author: 'support_fan',
    kw: 'dota 2 cheats, get dota 2 cheat',
    howTo: true,
    excerpt:
      'Step-by-step Dota 2 cheat setup: Active status on buydota2cheats.com, Defender exclusions, Steam launch order, first ESP profile.',
  },
  {
    slug: 'hero-esp-config',
    title: 'Hero ESP with items and level — recommended first toggles',
    tag: 'ESP',
    community: 'HeroESP',
    author: 'pos4_vision',
    kw: 'dota 2 cheats, cheat dota 2',
    howTo: true,
    excerpt:
      'Configure hero ESP, item readouts, and level tags without cluttering teamfight vision on Dota 2.',
  },
  {
    slug: 'map-hack-fog-config',
    title: 'Full map hack / fog removal — sane defaults for trios',
    tag: 'Map',
    community: 'MapVision',
    author: 'fog_breaker',
    kw: 'dota 2 cheats',
    howTo: true,
    excerpt:
      'Remove fog of war responsibly: pair map vision with ward ESP so you still respect true vision mechanics.',
  },
  {
    slug: 'buy-dota-2-cheats-safely',
    title: 'Buying dota 2 cheats safely — checkout, delivery, and scams',
    tag: 'Buying',
    community: 'Dota2Deals',
    author: 'MoneyKing',
    kw: 'dota 2 cheats, buy dota 2 cheats',
    excerpt:
      'Use only the official checkout URL, verify buydota2cheats.com in the address bar, and ignore random Discord DMs selling keys.',
  },
  {
    slug: 'game-patch-status',
    title: 'Patch day: Dota 2 update vs loader Active / Updating',
    tag: 'Patches',
    community: 'PatchWatch',
    author: 'patch_day_survivor',
    kw: 'dota 2 cheats, dota 2 patch',
    excerpt:
      'When Valve ships a Dota 2 patch, loader status may flip Updating — queue ranked only after Active returns.',
  },
  {
    slug: 'loader-errors',
    title: 'Loader closes instantly / menu never opens — fix checklist',
    tag: 'Support',
    community: 'LoaderHelp',
    author: 'defender_hater',
    kw: 'dota 2 cheats',
    howTo: true,
    excerpt:
      'Menu not opening, antivirus quarantine, wrong game build — confirm Active status before tweaking ESP toggles.',
  },
  {
    slug: 'dota-2-cheats-lifetime',
    title: 'Lifetime vs monthly ($150 vs $35) — which plan for you?',
    tag: 'Plans',
    community: 'Dota2Deals',
    author: 'longterm_core',
    kw: 'dota 2 cheats lifetime',
    excerpt:
      'Compare monthly (P30D) and lifetime (P99Y) access for Dota 2 Cheats — billing questions go to Support with order email.',
  },
  {
    slug: 'hwid-spoofer-thread',
    title: 'HWID spoofer basics — does it replace safe loader habits?',
    tag: 'Safety',
    community: 'VACSafety',
    author: 'hardware_reset',
    kw: 'hwid spoofer, dota 2 cheats',
    excerpt:
      'What HWID spoofers claim to do, why they are not a substitute for conservative settings, and Support boundaries.',
  },
  {
    slug: 'console-lobby-commands',
    title: 'cheat dota 2 lobby / dota 2 cheats lobby — custom game setup',
    tag: 'Lobbies',
    community: 'LobbyLab',
    author: 'sandbox_only',
    kw: 'cheat dota 2 lobby, dota 2 cheats lobby, cheat lobby dota 2',
    excerpt:
      'Custom lobby cheats for practice: bots, gold, items — not the same as ranked matchmaking overlays.',
  },
  {
    slug: 'cheat-engine-memory',
    title: 'cheat engine dota 2 — memory editing risks on VAC',
    tag: 'Tools',
    community: 'CheatEngine',
    author: 'memory_curious',
    kw: 'cheat engine dota 2, cheat dota 2',
    excerpt:
      'Why Cheat Engine threads get nuked by moderators: VAC scans and ToS violations on live accounts.',
  },
  {
    slug: 'last-hit-farm-tools',
    title: 'Last hit prediction helper + creep timers — lane efficiency',
    tag: 'Farm',
    community: 'LastHitClub',
    author: 'mid_gpm',
    kw: 'dota 2 cheats, last hit',
    excerpt:
      'Stack creep spawn timers with last-hit helpers — still need mouse discipline; tools widen timing windows only.',
  },
  {
    slug: 'features-list',
    title: 'Dota 2 Cheats feature list (ESP, map hack, timers, support)',
    tag: 'Features',
    community: 'dota2cheats',
    author: 'Dota2CheatsMod',
    kw: 'dota 2 cheats, dota 2 hacks',
    excerpt:
      'Official module checklist: hero ESP, fog removal, cooldown tracker, rune/rosh timers, auto-dodge, 24/7 support.',
  },
  {
    slug: 'ranked-mmr-discussion',
    title: 'Using overlays in ranked — reports, behavior score, smurf risk',
    tag: 'Ranked',
    community: 'RankedEthics',
    author: 'behavior_score_1',
    kw: 'dota 2 cheats, cheat dota 2',
    excerpt:
      'Ranked matchmaking plus obvious map vision equals reports. Community norms and why moderators lock flame threads.',
  },
]

const AUTHORS = [
  'AncientStack',
  'pos4_vision',
  'fog_breaker',
  'mmr_anxious',
  'support_fan',
  'MoneyKing',
  'patch_day_survivor',
  'defender_hater',
  'longterm_core',
  'sandbox_only',
  'memory_curious',
  'mid_gpm',
  'behavior_score_1',
  'AncientApparition',
  'offlane_tank',
  'rune_greedy',
  'Dota2CheatsMod',
  'LoaderGhost',
  'IT_guy_gaming',
  'irritated_panda',
]

const HAPPY = [
  'Followed the setup thread — hero ESP and ward timers came up first try after Defender exclusion.',
  'Map hack on low opacity plus ward ESP feels readable. Nobody flamed in all-chat yet.',
  'Lifetime plan paid off after the third month — still on Active after last Dota patch.',
  'Moderator @reply fixed my Updating loader mistake. Waited for Active like they said.',
  'Creep timer + last hit helper bumped my GPM in unranked testing — not magic but consistent.',
  'VAC thread scared me straight — staying on smurf for overlay testing only.',
  'Rosh timer callouts synced with our discord; fewer throw fights at 25 min.',
]

const UNHAPPY = [
  'Loaded during Updating after a patch — instant close. Status page was right.',
  'Wide map vision on stream looks obvious. Dialed opacity down per ESP thread.',
  'Expected cheat engine tips here — mod locked it and pointed to VAC FAQ. Fair.',
  'Ranked thread is depressing but accurate. Reports stack if you play blatant.',
  'Thought HWID spoofer replaces a ban — it does not. Read the safety blog.',
  'Menu never opened until I restored Defender quarantine. Skipped that step first time.',
  'Monthly vs lifetime pricing confused me until Support replied same day.',
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
  for (const body of candidates) {
    if (body && !used.has(body)) {
      used.add(body)
      return body
    }
  }
  const fallback = candidates[0] ?? 'Thanks for posting.'
  used.add(fallback)
  return fallback
}

function staffRepliesFor(post, used) {
  const h = hashSlug(post.slug)
  const editorPool = [
    `Editor: pinned ${post.tag} reference for r/${post.community}. Matches ${HOST} menu — confirm Active before ranked.`,
    `Editor: thread locked read-only. Billing and loader keys go through Support, not replies here.`,
    `Mod team: "${post.title.slice(0, 60)}…" refreshed after latest Dota patch notes.`,
  ]
  const modPool = [
    `Moderator: no key selling or Discord scams in replies. Official checkout only via ${HOST}.`,
    `Mod note — conservative ESP + timers beat blatant map hack in ranked. VAC delays exist.`,
    `Moderator: if status shows Updating, menu toggles will not fix inject — wait for Active.`,
  ]
  return [
    {
      author: 'Dota2Cheats Editor',
      role: 'editor',
      date: `2026-03-${String(8 + (h % 6)).padStart(2, '0')}`,
      body: pickUniqueBody(used, editorPool),
    },
    {
      author: 'Forum Moderator',
      role: 'moderator',
      date: `2026-03-${String(12 + (h % 8)).padStart(2, '0')}`,
      body: pickUniqueBody(used, modPool),
    },
  ]
}

function communityRepliesFor(post, used) {
  const h = hashSlug(post.slug)
  const count = 2 + (h % 4)
  const out = []
  for (let i = 0; i < count; i++) {
    const pool = (h + i) % 3 !== 0 ? HAPPY : UNHAPPY
    out.push({
      author: AUTHORS[modIndex(h + i, AUTHORS.length)],
      role: 'member',
      date: `2026-03-${String(10 + modIndex(h + i, 18)).padStart(2, '0')}`,
      body: pickUniqueBody(used, [pool[modIndex(h + i * 3, pool.length)]]),
    })
  }
  return out
}

function modFollowUpReplies(post, community, used) {
  if (!community.length) return []
  const h = hashSlug(post.slug)
  const targets = [community[0], community[modIndex(h >>> 2, community.length)]].filter(Boolean)
  const unique = []
  const seen = new Set()
  for (const t of targets) {
    const k = `${t.author}\0${t.body}`
    if (!seen.has(k)) {
      seen.add(k)
      unique.push(t)
    }
  }
  return unique.slice(0, 2).map((target, variant) => ({
    author: variant % 2 === 0 ? 'Forum Moderator' : 'Dota 2 Cheats Support',
    role: 'moderator',
    date: `2026-03-${String(18 + variant).padStart(2, '0')}`,
    body: pickUniqueBody(used, [
      `@${target.author} — walk the ${post.tag} checklist in the OP, confirm Active on ${HOST}, then retry. Loader logs go to Support.`,
      `@${target.author} — VAC risk is real on mains. Test overlays on smurf or sandbox lobbies first.`,
    ]),
    replyToAuthor: target.author,
  }))
}

function repliesForSlug(post) {
  const used = new Set()
  const staff = staffRepliesFor(post, used)
  const community = communityRepliesFor(post, used)
  const followUps = modFollowUpReplies(post, community, used)
  return [...staff, ...community, ...followUps]
}

function metaDescription(text) {
  const first = text.slice(0, 155)
  return first.endsWith('.') ? first : `${first}.`
}

function buildArticle(def, idx) {
  const excerpt = `${def.title} — ${BRAND} blog for Dota 2 players worldwide (USD plans, Windows PC).`
  const sections = sectionsFor(def)
  return {
    slug: def.slug,
    title: def.title,
    excerpt,
    metaTitle: `${def.title} | ${BRAND}`,
    metaDescription: metaDescription(excerpt),
    searchTerms: 'dota 2 cheats, cheat dota 2',
    date: `2026-03-${String(1 + (idx % 28)).padStart(2, '0')}`,
    readMinutes: readMinutesFromSections(sections),
    tag: def.tag,
    sections,
  }
}

function buildForum(def, idx) {
  const sections = [
    {
      heading: def.howTo ? '1) Check status' : 'Opening post',
      body: [
        def.excerpt,
        `Community: r/${def.community} · Game: Dota 2 · Anti-cheat: Valve Anti-Cheat (VAC). Official product: ${HOST}.`,
      ],
    },
    {
      heading: def.howTo ? '2) Configure modules' : 'Discussion norms',
      body: [
        'Hero ESP, fog removal, cooldown tracker, creep/rune timers, last-hit helper, ward ESP, roshan timer, and inventory ESP are documented on the features thread.',
        'Moderators may lock threads that share crack links, stolen keys, or Cheat Engine tutorials aimed at live ranked.',
      ],
    },
  ]
  return {
    slug: def.slug,
    title: def.title,
    excerpt: def.excerpt,
    metaTitle: `${def.title} | ${BRAND} Forums`,
    metaDescription: metaDescription(def.excerpt),
    searchTerms: (def.kw || 'dota 2 cheats').split(',').slice(0, 4).join(', '),
    date: `2026-03-${String(5 + (idx % 20)).padStart(2, '0')}`,
    readMinutes: 6 + (idx % 4),
    tag: def.tag,
    community: def.community,
    author: def.author,
    score: 120 + (hashSlug(def.slug) % 880),
    sections,
    ...(def.howTo ? { howTo: true } : {}),
  }
}

const ARTICLES = ARTICLE_DEFS.map(buildArticle)
const FORUMS = FORUM_DEFS.map(buildForum)

const repliesObj = Object.fromEntries(FORUMS.map((p) => [p.slug, repliesForSlug(p)]))

const forumIndex = FORUMS.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  tag: p.tag,
  community: p.community,
  author: p.author,
  score: p.score,
  commentCount: repliesObj[p.slug]?.length ?? 0,
}))

const articleTs = `/** Auto-generated by scripts/generate-dota2-content.mjs */
import { orderArticlesForGrid } from '../lib/blog-order'

export type ArticleSection = {
  heading: string
  body: string[]
}

export type Article = {
  slug: string
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  searchTerms: string
  date: string
  readMinutes: number
  tag: string
  sections: ArticleSection[]
}

export const ARTICLES: Article[] = ${JSON.stringify(ARTICLES, null, 2)}

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getRelatedArticles(slug: string, limit = 6): Article[] {
  const current = getArticle(slug)
  if (!current) return []
  const pool = ARTICLES.filter((a) => a.slug !== slug).sort((a, b) => {
    const tagRank = (p: Article) => (p.tag === current.tag ? 0 : 1)
    return tagRank(a) - tagRank(b) || a.title.localeCompare(b.title)
  })
  return orderArticlesForGrid(pool.slice(0, Math.max(limit, 12)), 4).slice(0, limit)
}

export { articlePath } from './blog-paths'
`

const forumsTs = `/** Auto-generated by scripts/generate-dota2-content.mjs */
export type ForumSection = {
  heading: string
  body: string[]
}

export type ForumThread = {
  slug: string
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  searchTerms: string
  date: string
  readMinutes: number
  tag: string
  community: string
  author: string
  score: number
  sections: ForumSection[]
  howTo?: boolean
}

export const FORUM_THREADS: ForumThread[] = ${JSON.stringify(FORUMS, null, 2)}

export function getForumThread(slug: string) {
  return FORUM_THREADS.find((f) => f.slug === slug)
}

export function getRelatedForumThreads(slug: string, limit = 6): ForumThread[] {
  const current = getForumThread(slug)
  if (!current) return []
  return FORUM_THREADS.filter((f) => f.slug !== slug)
    .sort((a, b) => {
      const tagRank = (p: ForumThread) => (p.tag === current.tag ? 0 : 1)
      return tagRank(a) - tagRank(b) || a.title.localeCompare(b.title)
    })
    .slice(0, limit)
}

export { forumPath } from './blog-paths'
`

const repliesTs = `/** Auto-generated by scripts/generate-dota2-content.mjs */
export type ForumReplyRole = 'editor' | 'moderator' | 'member'

export type ForumReply = {
  author: string
  date: string
  body: string
  role?: ForumReplyRole
  replyToAuthor?: string
}

export const FORUM_REPLIES: Record<string, ForumReply[]> = ${JSON.stringify(repliesObj, null, 2)}

export function getForumReplies(slug: string): ForumReply[] {
  return FORUM_REPLIES[slug] ?? []
}
`

const forumIndexTs = `/** Auto-generated — forum list for Reddit-style UI */
export type ForumIndexEntry = {
  slug: string
  title: string
  excerpt: string
  tag: string
  community: string
  author: string
  score: number
  commentCount: number
}

export const FORUM_INDEX: ForumIndexEntry[] = ${JSON.stringify(forumIndex, null, 2)}

export const FORUM_MODERATORS = [
  { name: 'Dota2CheatsMod', community: 'dota2cheats', flair: 'Head Mod' },
  { name: 'Forum Moderator', community: 'VACSafety', flair: 'Mod' },
  { name: 'Dota2Cheats Editor', community: 'Dota2Setup', flair: 'Editor' },
  { name: 'Dota2Cheats Support', community: 'LoaderHelp', flair: 'Support' },
] as const
`

writeFileSync(join(root, 'src/data/articles.ts'), articleTs)
writeFileSync(join(root, 'src/data/forums.ts'), forumsTs)
writeFileSync(join(root, 'src/data/forum-replies.ts'), repliesTs)
writeFileSync(join(root, 'src/data/forum-index.ts'), forumIndexTs)

console.log(`Generated ${ARTICLES.length} blog articles and ${FORUMS.length} forum threads`)
