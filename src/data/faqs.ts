export type FaqItem = { q: string; a: string }

export const HOME_FAQS: FaqItem[] = [
  {
    q: 'What are The Isle cheats?',
    a: 'The Isle cheats on buyislecheats.com are PC overlays with player, NPC, and animal ESP, visual options, and misc utilities — with Active or Updating loader status after Evrima patches.',
  },
  {
    q: 'How much do The Isle cheats cost?',
    a: 'The Isle cheats start from $35 for monthly access. Lifetime plans cost more. Confirm Active status and pricing on buyislecheats.com before checkout.',
  },
  {
    q: 'Do you sell tools for other games?',
    a: 'No. buyislecheats.com covers The Isle Evrima only — one product, no multi-game catalog.',
  },
  {
    q: 'Is combat assist required?',
    a: 'Combat assist is optional. Many players lead with the isle esp — distance, species, and growth readouts — then add misc keys only when they want them.',
  },
  {
    q: 'How do you handle game patches?',
    a: 'We publish Active or Updating labels after Evrima updates. Always check status on buyislecheats.com before you load.',
  },
  {
    q: 'What is The Isle ESP?',
    a: 'The Isle ESP shows players and dinosaurs through foliage with box, snapline, health, stamina, growth, species, corpse, fruit, and water markers — plus max distance filters for clean HUDs.',
  },
]

export const PRODUCT_PAGE_FAQS: FaqItem[] = [
  ...HOME_FAQS,
  {
    q: 'Which features are included?',
    a: 'Visual options cover player, NPC, and animal ESP with box, snapline, name, distance, corpse, health, stamina, growth, species, direction, head dot, visible check, gore, fruit, water, and max distance. Misc options include crosshair, suicide, fullbright, FPS/resolution/time readouts, custom menu and panic keys, and custom ESP colors — Evrima on Windows PC. See the features checklist forum for the full list.',
  },
  {
    q: 'Do The Isle cheats work on Steam Evrima?',
    a: 'Yes. The loader supports The Isle Evrima on Steam when status is Active.',
  },
  {
    q: 'How do I get access?',
    a: 'Start on the homepage, review features and Active status, open product details, then continue to checkout for digital delivery.',
  },
  {
    q: 'How do I load The Isle cheats?',
    a: 'Follow the complete setup forum: exclusions, launch Evrima, run loader, configure ESP with distance caps, save a config. Re-check status after every patch.',
  },
  {
    q: 'Where do I get support?',
    a: 'Use the Support page and your checkout order channel. Include current status and whether you need load, menu, or delivery help.',
  },
  {
    q: 'Where can I read reviews?',
    a: 'Visit the Reviews page for buyer feedback on ESP clarity, misc utilities, and loader updates.',
  },
  {
    q: 'Is this the official The Isle site?',
    a: 'No. We cover third-party overlay software for The Isle only. Buy and play the game from official stores. We are not affiliated with the game publisher.',
  },
]

export const FAQ_PAGE_FAQS: FaqItem[] = PRODUCT_PAGE_FAQS

export const SITE_FAQS = FAQ_PAGE_FAQS
