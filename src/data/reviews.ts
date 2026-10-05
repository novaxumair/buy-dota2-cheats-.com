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
    role: 'Position 4',
    game: 'Dota 2',
    rating: 5,
    datePublished: '2026-03-14',
    body: 'Status on the store page matched what I got in menu. Hero ESP and ward timers held after the last patch — glad I waited for Active before loading.',
  },
  {
    id: '2',
    author: 'nova',
    role: 'Stack trio',
    game: 'Dota 2',
    rating: 5,
    datePublished: '2026-03-13',
    body: 'Rosh timer plus inventory ESP cleaned up our mid-game calls. Map hack on low opacity is why I wanted dota 2 cheats in the first place.',
  },
  {
    id: '3',
    author: 'rift',
    role: 'Captain',
    game: 'Dota 2',
    rating: 4,
    datePublished: '2026-03-13',
    body: 'No fake multi-game catalog. Honest Updating vs Active flips after Valve patches are what I wanted before checkout.',
  },
  {
    id: '4',
    author: 'kiln',
    role: 'Mid',
    game: 'Dota 2',
    rating: 5,
    datePublished: '2026-03-12',
    body: 'Loader came back Active within a day after patch. Cooldown tracker plus rune indicators feel natural in review — hero ESP is clean.',
  },
  {
    id: '5',
    author: 'moss',
    role: 'Offlane',
    game: 'Dota 2',
    rating: 5,
    datePublished: '2026-03-12',
    body: 'Creep spawn timers took ten minutes to dial for my lane. Setup forum thread covered antivirus so first launch worked.',
  },
  {
    id: '6',
    author: 'vale',
    role: 'New buyer',
    game: 'Dota 2',
    rating: 5,
    datePublished: '2026-03-11',
    body: 'Monthly first was the right call. Instant delivery and live status sold me before I looked at lifetime dota 2 cheats plans.',
  },
  {
    id: '7',
    author: 'drake',
    role: 'Carry',
    game: 'Dota 2',
    rating: 4,
    datePublished: '2026-03-11',
    body: 'Last-hit helper and auto-dodge are subtle with timer overlays. Saved profiles make swapping between unranked and party queue easy.',
  },
  {
    id: '8',
    author: 'sora',
    role: 'Steam regular',
    game: 'Dota 2',
    rating: 4,
    datePublished: '2026-03-10',
    body: 'ESP-first most nights — fewer surprise ganks in side lanes. Would like faster patch notes on site but loader always caught up within a day.',
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
