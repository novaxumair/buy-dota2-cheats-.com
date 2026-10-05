export type FaqItem = { q: string; a: string }

export const HOME_FAQS: FaqItem[] = [
  {
    q: 'What are Dota 2 cheats?',
    a: 'Dota 2 cheats on buydota2cheats.com are Windows PC tools with hero ESP, map hack, cooldown tracker, creep and rune timers, last-hit helper, ward ESP, roshan timer, and enemy inventory ESP — with Active or Updating loader status after Valve patches.',
  },
  {
    q: 'How much do Dota 2 cheats cost?',
    a: 'Dota 2 cheats start at $35 for monthly access (30 days). Lifetime access is $150. Confirm Active status and pricing on buydota2cheats.com before checkout.',
  },
  {
    q: 'Do you sell tools for other games?',
    a: 'No. buydota2cheats.com covers Dota 2 only — one product, no multi-game catalog.',
  },
  {
    q: 'Is map hack required?',
    a: 'Map hack is optional. Many players lead with hero ESP and timers first — then tune fog removal opacity so the overlay stays readable in teamfights.',
  },
  {
    q: 'How do you handle game patches?',
    a: 'We publish Active or Updating labels after Dota 2 updates. Valve Anti-Cheat (VAC) and game builds change — always check status on buydota2cheats.com before you load.',
  },
  {
    q: 'What is hero ESP?',
    a: 'Hero ESP shows enemy heroes with item readouts, level tags, and positioning intel so you can track power spikes and rotations before engagements.',
  },
]

export const PRODUCT_PAGE_FAQS: FaqItem[] = [
  ...HOME_FAQS,
  {
    q: 'Which features are included?',
    a: 'Hero ESP with items and level, full map hack (fog removal), ability cooldown tracker, creep spawn timers, rune spawn indicators, last hit prediction helper, auto-dodge skillshots, ward placement ESP, roshan timer, enemy inventory ESP, performance optimized overlays, and 24/7 support on Windows PC.',
  },
  {
    q: 'Do Dota 2 cheats work on Steam?',
    a: 'Yes. The loader supports Dota 2 on Steam for Windows PC when status is Active.',
  },
  {
    q: 'How do I get access?',
    a: 'Start on the homepage, review features and Active status, open the Dota 2 store page, then continue to checkout for digital delivery.',
  },
  {
    q: 'How do I load Dota 2 cheats?',
    a: 'Follow the complete setup forum thread: exclusions, launch Dota 2, run the loader, configure hero ESP and timers, save a profile. Re-check status after every patch.',
  },
  {
    q: 'Where do I get support?',
    a: 'Use the Support page and channels linked after purchase. Include current status and whether you need load, menu, or delivery help.',
  },
  {
    q: 'Where can I read reviews?',
    a: 'Visit the Reviews page for buyer feedback on ESP clarity, map vision, timers, and loader updates.',
  },
  {
    q: 'Is this the official Dota 2 site?',
    a: 'No. We cover third-party software for Dota 2 only. Buy and play the game from Valve on Steam. We are not affiliated with Valve Corporation.',
  },
]

export const FAQ_PAGE_FAQS: FaqItem[] = PRODUCT_PAGE_FAQS

export const SITE_FAQS = FAQ_PAGE_FAQS
