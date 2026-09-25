export type Review = {
  id: string
  author: string
  role: string
  game: string
  rating: number
  datePublished: string
  body: string
}

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'jayk',
    role: 'Trios main',
    game: 'Wardogs',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'Status on the product page matched what I got in menu. Player ESP held after the last Wardogs patch — glad I waited for Active before loading.',
  },
  {
    id: '2',
    author: 'nova',
    role: 'Control zone',
    game: 'Wardogs',
    rating: 5,
    datePublished: '2026-09-13',
    body: 'Vehicle occupied flag stopped us pushing a bait truck twice. Radar + ESP combo is why I bought wardogs esp in the first place.',
  },
  {
    id: '3',
    author: 'rift',
    role: 'Squad lead',
    game: 'Wardogs',
    rating: 4,
    datePublished: '2026-09-13',
    body: 'No fake multi-game catalog. Honest Updating vs Active flips are what I wanted before I got wardogs cheats for our trio.',
  },
  {
    id: '4',
    author: 'kiln',
    role: 'Duos',
    game: 'Wardogs',
    rating: 5,
    datePublished: '2026-09-12',
    body: 'Loader came back Active within a day after patch. We check status, then checkout — skeleton ESP solid around industrial hills.',
  },
  {
    id: '5',
    author: 'moss',
    role: 'Night queues',
    game: 'Wardogs',
    rating: 5,
    datePublished: '2026-09-12',
    body: 'Menu was straightforward. Muted skeleton colors, aimbot off by default. Setup forum covered antivirus so first launch worked.',
  },
  {
    id: '6',
    author: 'vale',
    role: 'New buyer',
    game: 'Wardogs',
    rating: 5,
    datePublished: '2026-09-11',
    body: 'Monthly first was the right call. Instant delivery and live status sold me before I looked at wardogs cheats lifetime.',
  },
  {
    id: '7',
    author: 'drake',
    role: 'Solo',
    game: 'Wardogs',
    rating: 4,
    datePublished: '2026-09-11',
    body: 'Distance readouts on player ESP were accurate. Aimbot smooth took ten minutes to dial — forums helped.',
  },
  {
    id: '8',
    author: 'sora',
    role: 'Ranked-style',
    game: 'Wardogs',
    rating: 4,
    datePublished: '2026-09-10',
    body: 'ESP + radar only most nights — fewer reports. Would like faster patch notes on site but loader always caught up within a day.',
  },
]

export function getReviewsAggregate() {
  const count = REVIEWS.length
  const sum = REVIEWS.reduce((acc, r) => acc + r.rating, 0)
  const avg = count ? (sum / count).toFixed(1) : '5.0'
  return {
    ratingValue: avg,
    reviewCount: String(count),
    bestRating: '5',
    worstRating: '1',
  }
}
