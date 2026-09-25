export const SUPPORT_INTRO =
  'Support for Wardogs cheat buyers on buywardogscheat.com — loader setup, Active status, menu config and delivery help after purchase.'

export const SUPPORT_HIGHLIGHTS = [
  {
    title: 'Loader & menu',
    text: 'Menu not opening, inject failures, and overlay conflicts — we walk through exclusions and load order.',
  },
  {
    title: 'Patch windows',
    text: 'Game patches can invalidate yesterday’s build. Status honesty matters more than rushing a queue.',
  },
  {
    title: 'Delivery',
    text: 'Digital licenses arrive via checkout email. Use only the official delivery link from your order.',
  },
] as const

export const SUPPORT_FAQ = [
  {
    q: 'What do you support?',
    a: 'Supported: Wardogs on Windows PC (Steam), loader and menu help for paid licenses.',
  },
  {
    q: 'How do I contact support?',
    a: 'Open your order on buywardogscheat.com and use the checkout support channel tied to your purchase. Include a status screenshot (Active / Updating) and whether you need load, menu or delivery help.',
  },
  {
    q: 'Loader fails after exclusions',
    a: 'Do not spam launch. Restart the game, confirm antivirus exclusions, re-check status, then try one clean load. If it still fails, contact support with your order ID.',
  },
  {
    q: 'Which clients are supported?',
    a: 'Steam when loader status is Active.',
  },
  {
    q: 'Delivery safety',
    a: 'Delivery is digital after checkout on buywardogscheat.com. Use only that loader link. Third-party mirrors are unsupported and unsafe.',
  },
] as const

export const SUPPORT_TOPICS = SUPPORT_HIGHLIGHTS.map(({ title, text }) => ({
  heading: title,
  body: [text],
}))

export const SUPPORT_FAQS = [...SUPPORT_FAQ]
