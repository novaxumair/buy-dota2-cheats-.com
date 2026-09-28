/** Forum thread definitions for The Isle Cheats — imported by generate-isle-forums.mjs */
export const HOST = 'buyislecheats.com'

function feature(slug, title, tag, kw) {
  return {
    slug,
    title,
    tag,
    intent: 'informative',
    kw,
    excerpt: `${title} for The Isle Evrima — overlay toggles, distance filters, and survival habits without spamming your HUD.`,
    sections: [
      {
        heading: 'Thread overview',
        body: [
          `This guide maps "${title}" to the live visual and misc menu on ${HOST}.`,
          'Test in safe zones first: Evrima forests hide ambushes, and max-distance filters keep night hunts readable.',
        ],
      },
    ],
  }
}

const FEATURE_POSTS = [
  feature('complete-visual-options-breakdown', 'Complete Visual Options Breakdown for The Isle', 'Visuals'),
  feature('player-esp-tracking', 'Player ESP Tracking: Never Get Ambushed in The Isle', 'ESP', 'the isle esp, esp the isle'),
  feature('npc-esp-guide', 'NPC ESP Guide: Locating AI Dinosaurs Quickly', 'ESP'),
  feature('animal-esp-features', 'Animal ESP Features: Finding Food and Prey Easily', 'ESP'),
  feature('box-esp-overlays', 'Box ESP Overlays for Clear Target Distances', 'Visuals'),
  feature('snapline-overlays', 'Snapline Overlays: Instantly Spot Player Directions', 'Visuals'),
  feature('player-name-tags', 'Player Name Tags: Identifying Species and Players at Range', 'Visuals'),
  feature('distance-indicators', 'Distance Indicators for Strategic Survival Positioning', 'Visuals'),
  feature('corpse-esp', 'Corpse ESP: Locating Food Sources Across the Map', 'Visuals'),
  feature('health-tracking-overlays', 'Health Tracking Overlays for Combat Advantage', 'Visuals'),
  feature('stamina-status-display', 'Stamina Status Display for Predator Pursuits', 'Visuals'),
  feature('growth-tracker', 'Growth Tracker: Monitoring Your Dinosaur Maturation Stage', 'Visuals'),
  feature('species-identification-esp', 'Species Identification ESP: Know Your Threat Level', 'Visuals'),
  feature('player-direction-indicators', 'Player Direction Indicators to Anticipate Flanks', 'Visuals'),
  feature('head-dot-precision', 'Head Dot Precision Overlay for Accurate Targeting', 'Visuals'),
  feature('visible-check-settings', 'Visible Check Settings to Avoid Wall Detection Issues', 'Visuals'),
  feature('gore-visual-options', 'Gore Visual Options for Immersive Dinosaur Combat', 'Visuals'),
  feature('fruit-esp', 'Fruit ESP: Herbivore Food Hunting Made Simple', 'Visuals'),
  feature('water-source-esp', 'Water Source ESP: Never Die of Dehydration Again', 'Visuals'),
  feature('optimizing-max-distance-filters', 'Optimizing Max Distance Filters to Clear Your HUD', 'Visuals'),
  feature('miscellaneous-utility-settings', 'Miscellaneous Utility Settings for Optimized Gameplay', 'Misc'),
  feature('custom-crosshair-overlays', 'Custom Crosshair Overlays for Aiming Assistance', 'Misc'),
  feature('quick-suicide-command', 'Quick Suicide Command for Fast Respawns', 'Misc'),
  feature('fullbright-visuals', 'Fullbright Visuals: See Clearly in Dark Night Cycles', 'Misc'),
  feature('performance-monitoring-fps', 'Performance Monitoring: Displaying FPS In-Game', 'Misc'),
  feature('resolution-display-tool', 'Resolution Display Tool for Custom Overlays', 'Misc'),
  feature('in-game-time-display', 'In-Game Time Display for Environmental Tracking', 'Misc'),
  feature('custom-menu-hotkey', 'Setting Up Your Custom Menu Hotkey for Quick Toggles', 'Misc'),
  feature('panic-key-configuration', 'Panic Key Configuration for Instant Overlay Hiding', 'Misc'),
  feature('customizing-esp-colors', 'Customizing ESP Colors for Personal Visual Preference', 'Misc'),
]

/** Unique excerpts — append index suffix in generator if collision */
FEATURE_POSTS.forEach((p, i) => {
  p.excerpt = `${p.excerpt} Thread ${i + 1}.`
})

export const CORE_POSTS = [
  {
    slug: 'features-list',
    title: 'The Isle Cheats Features',
    tag: 'Features',
    intent: 'commercial',
    intentTerms: ['the isle cheats', 'the isle game cheat', 'the isle evrima cheats', 'the isle esp'],
    kw: 'the isle cheats, the isle game cheat',
    excerpt:
      'Full visual and misc module checklist for the isle cheats on PC — player ESP, NPC and animal overlays, snaplines, growth readouts, and misc utilities before checkout.',
    sections: [
      {
        heading: 'What the menu includes',
        body: [
          `This thread mirrors the live module list on ${HOST}. Compare player ESP, corpse and water markers, misc crosshair and fullbright toggles against how you survive in Evrima.`,
          'The Isle is a dinosaur survival sim — awareness overlays matter more than arcade aim helpers. Start ESP-first, then tune misc keys.',
        ],
      },
      {
        heading: 'Visual and misc stacks',
        body: [
          'Visual options cover player, NPC, and animal ESP with box, snapline, name, distance, corpse, health, stamina, growth, species, direction, head dot, visible check, gore, fruit, water, and max distance.',
          'Misc options include crosshair, suicide, fullbright, FPS/resolution/time readouts, custom menu and panic keys, and custom ESP colors.',
        ],
      },
    ],
  },
  {
    slug: 'complete-setup',
    title: 'Instructions to Use the Cheats',
    tag: 'Setup',
    intent: 'commercial',
    howTo: true,
    kw: 'the isle cheats, the isle evrima cheats',
    excerpt:
      'Step-by-step the isle cheats setup on Windows: confirm Active status, exclusions, load order, first ESP profile, save config, and Evrima branch notes.',
    sections: [
      {
        heading: '1) Confirm status and checkout',
        body: [
          `Open ${HOST} and check Active on the product card. When Updating after an Evrima patch, wait — loading early wastes a growth session.`,
          'Plans start from $35 monthly with lifetime options; use only the delivery link from your order email.',
        ],
      },
      {
        heading: '2) Windows prep',
        body: [
          'Close Discord overlay, GeForce overlay, and RGB hooks. Add the delivery folder to Defender exclusions before first inject.',
        ],
      },
      {
        heading: '3) Load order',
        body: [
          'Launch The Isle Evrima, reach the menu, run the loader, open the overlay menu, enable player ESP with distance caps, then add misc toggles only if you need them.',
        ],
      },
    ],
  },
  {
    slug: 'the-isle-cheats-guide',
    title: 'The Isle Cheats Guide: Safety, Features, and Survival Tips',
    tag: 'Guide',
    intent: 'informative',
    kw: 'the isle cheats, the isle game cheat',
    excerpt:
      'Core the isle cheats guide — safe setup habits, ESP-first survival, growth pacing, and when to pause after Evrima updates.',
    sections: [
      {
        heading: 'Safety and habits',
        body: [
          'Read loader status before every session. Conservative ESP distance and visible check reduce noisy reports in crowded herbivore beaches.',
          'This site covers The Isle only — no multi-game catalog.',
        ],
      },
    ],
  },
  {
    slug: 'the-isle-evrima-cheats-recode',
    title: 'The Isle Evrima Cheats: What You Need to Know for the Recode',
    tag: 'Evrima',
    intent: 'informative',
    kw: 'the isle cheats evrima, the isle evrima cheats, the isle evrima cheat',
    excerpt:
      'the isle cheats evrima and the isle evrima cheats explained — branch differences, overlay compatibility, and patch-day checklists for the recode client.',
    sections: [
      {
        heading: 'Evrima-only focus',
        body: [
          'Modules target the Evrima branch on Windows PC. Legacy legacy branch players should verify server rules before loading any overlay.',
          `Status labels on ${HOST} track Evrima builds — do not inject while Updating.`,
        ],
      },
    ],
  },
  {
    slug: 'advanced-esp-tactics',
    title: 'Advanced ESP Tactics: Using The Isle ESP to Survive',
    tag: 'ESP',
    intent: 'informative',
    howTo: true,
    kw: 'the isle esp, esp the isle, the isle esp cheat, the isle evrima esp',
    excerpt:
      'Advanced the isle esp tactics — layering player, NPC, and animal ESP with snaplines, species tags, and max distance for Evrima hunts.',
    sections: [
      {
        heading: 'ESP layering',
        body: [
          'Enable player ESP with distance and species first. Add corpse and water markers when you play herbivore growth paths.',
          'the isle esp cheat searches often mean wallhack-style awareness — keep visible check on when peeking through dense foliage.',
        ],
      },
    ],
  },
  {
    slug: 'best-the-isle-cheats-review-2026',
    title: 'Best The Isle Cheats Review & Comparison 2026: Features, Safety & Value',
    tag: 'Review',
    intent: 'commercial',
    kw: 'the isle cheats, the isle game cheat, the isle cheats evrima',
    excerpt:
      '2026 the isle cheats comparison — ESP clarity, Evrima maintenance, pricing from $35, config save habits, and loader transparency.',
    sections: [
      {
        heading: 'What we compared',
        body: [
          'Module depth for dinosaur ESP, misc utility keys, status pages, and how fast overlays recovered after Evrima patches — not hype claims.',
        ],
      },
    ],
  },
  {
    slug: 'hwid-spoofer-safety',
    title: 'Discover What an HWID Spoofer Does for Safety',
    tag: 'Safety',
    intent: 'informative',
    excerpt:
      'HWID spoofer basics for PC gamers — hardware IDs, why some players research them, and realistic limits alongside loader discipline.',
    sections: [
      {
        heading: 'Plain-language overview',
        body: [
          'A spoofer changes how your PC fingerprint appears to some anti-cheat stacks. It is not a substitute for reading loader status or playing conservatively.',
        ],
      },
    ],
  },
  {
    slug: 'buy-the-isle-cheats-safely',
    title: 'Where to Buy The Isle Cheats Safely: Plans and Delivery',
    tag: 'Buying',
    intent: 'transactional',
    kw: 'the isle cheats, the isle evrima cheat',
    excerpt:
      'How to buy the isle cheats with clear pricing, digital delivery, and Active status labels before you load into Evrima.',
    sections: [
      {
        heading: 'Before checkout',
        body: [
          `Use ${HOST} for live Active/Updating status. Monthly and lifetime licenses include loader updates when status allows.`,
        ],
      },
    ],
  },
  {
    slug: 'the-isle-cheats-lifetime',
    title: 'The Isle Cheats Lifetime License: Is Permanent Access Worth It?',
    tag: 'Pricing',
    intent: 'transactional',
    kw: 'the isle cheats, the isle evrima cheats',
    excerpt:
      'Lifetime vs monthly the isle cheats access — when permanent makes sense for regular Evrima survival players.',
    sections: [
      {
        heading: 'Who lifetime fits',
        body: [
          'If you grow dinosaurs multiple nights per week through seasons, lifetime offsets monthly renewals. Casual players often start monthly first.',
        ],
      },
    ],
  },
  {
    slug: 'player-esp-first',
    title: 'Player ESP Settings: What to Enable First',
    tag: 'ESP',
    intent: 'informative',
    howTo: true,
    kw: 'the isle esp, the isle esp cheat',
    excerpt:
      'Configure the isle esp player overlays — box, snapline, distance, species, and growth tags without cluttering jungle fights.',
    sections: [
      {
        heading: 'Recommended first toggles',
        body: [
          'Enable box, distance, and species. Add stamina readouts when you hunt apex predators — tire them before you commit.',
          'Cap max distance around 200–300m so tags stay readable during beach spawns.',
        ],
      },
    ],
  },
  {
    slug: 'silent-aim-overview',
    title: 'Silent Aim and Combat Assist for The Isle',
    tag: 'Combat',
    intent: 'informative',
    excerpt:
      'Overview of silent aim style assist on The Isle — when to keep combat modules off and rely on ESP awareness instead.',
    sections: [
      {
        heading: 'Combat assist reality',
        body: [
          'Many players run ESP-only for growth. If you enable assist, keep settings conservative — dinosaur fights are slow and highly visible.',
        ],
      },
    ],
  },
  {
    slug: 'game-patch-status',
    title: 'The Isle Cheats After a Game Patch — What to Do',
    tag: 'Status',
    intent: 'informative',
    kw: 'the isle evrima cheats, the isle cheats evrima',
    excerpt:
      'What Active vs Updating means after Evrima patches — and why loading early wastes your dinosaur growth session.',
    sections: [
      {
        heading: 'Status labels',
        body: [
          `Active means the loader matches the live client. Updating means wait — check ${HOST} before every session.`,
        ],
      },
    ],
  },
  {
    slug: 'windows-setup',
    title: 'The Isle Cheats on Windows 10 and 11',
    tag: 'Windows',
    intent: 'informative',
    howTo: true,
    excerpt: 'Windows prep for the isle cheats — overlays, Defender, and Evrima Steam launch order.',
    sections: [
      {
        heading: 'Supported systems',
        body: ['Windows 10/11 with The Isle Evrima on Steam — close overlays before inject.'],
      },
    ],
  },
  {
    slug: 'disable-antivirus',
    title: 'Antivirus Exclusions for The Isle Cheats',
    tag: 'Antivirus',
    intent: 'informative',
    howTo: true,
    excerpt: 'Allowlist loaders in Defender so files are not quarantined mid-setup.',
    sections: [
      {
        heading: 'Defender',
        body: ['Folder exclusion before first run — restore quarantines if you retried blindly.'],
      },
    ],
  },
  {
    slug: 'hotkeys',
    title: 'The Isle Cheat Hotkeys After Load',
    tag: 'Hotkeys',
    intent: 'informative',
    howTo: true,
    excerpt: 'Menu, panic, and ESP master hotkeys — custom menu key and panic key configuration.',
    sections: [
      {
        heading: 'Suggested binds',
        body: [
          'Menu toggle, ESP master, panic hide — write them down once and mirror the misc options forum.',
        ],
      },
    ],
  },
  {
    slug: 'loader-errors',
    title: 'Fix The Isle Cheat Loader Errors',
    tag: 'Support',
    intent: 'informative',
    howTo: true,
    excerpt: 'Menu not opening, instant close, antivirus quarantine, failed inject on Evrima.',
    sections: [
      {
        heading: 'Check status first',
        body: ['Updating builds fail for reasons settings cannot fix — confirm Active.'],
      },
    ],
  },
  {
    slug: 'load-status-checklist',
    title: 'Pre-Load Checklist Before You Buy or Queue',
    tag: 'Status',
    intent: 'informative',
    excerpt: 'Confirm Active status, game version, and config before long Evrima growth sessions.',
    sections: [
      {
        heading: 'Before checkout',
        body: [`Confirm Active on ${HOST}. If Updating, wait or read refunds policy.`],
      },
    ],
  },
]

export const POSTS = [...CORE_POSTS, ...FEATURE_POSTS]
