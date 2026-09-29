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
    role: 'Control-zone main',
    game: 'Wardogs',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'Status on the store page matched what I got in menu. Player ESP and radar held after the last patch — glad I waited for Active before loading.',
  },
  {
    id: '2',
    author: 'nova',
    role: 'Vehicle squad',
    game: 'Wardogs',
    rating: 5,
    datePublished: '2026-09-13',
    body: 'Vehicle ESP with occupied/empty tags saved us twice on mountain rotates. Distance plus type labels are why I wanted wardogs cheats in the first place.',
  },
  {
    id: '3',
    author: 'rift',
    role: 'Squad lead',
    game: 'Wardogs',
    rating: 4,
    datePublished: '2026-09-13',
    body: 'No fake multi-game catalog. Honest Updating vs Active flips after Elytra updates are what I wanted before checkout.',
  },
  {
    id: '4',
    author: 'kiln',
    role: 'Duos',
    game: 'Wardogs',
    rating: 5,
    datePublished: '2026-09-12',
    body: 'Loader came back Active within a day after patch. Aimbot smooth plus visible check feels natural in kill cam review — skeleton ESP is clean.',
  },
  {
    id: '5',
    author: 'moss',
    role: 'Radar caller',
    game: 'Wardogs',
    rating: 5,
    datePublished: '2026-09-12',
    body: '2D radar range took ten minutes to dial for control zone. Setup intel covered antivirus so first launch worked.',
  },
  {
    id: '6',
    author: 'vale',
    role: 'New buyer',
    game: 'Wardogs',
    rating: 5,
    datePublished: '2026-09-11',
    body: 'Monthly first was the right call. Instant delivery and live status sold me before I looked at lifetime wardogs cheats plans.',
  },
  {
    id: '7',
    author: 'drake',
    role: 'Solo flank',
    game: 'Wardogs',
    rating: 4,
    datePublished: '2026-09-11',
    body: 'No recoil and no spread misc options are subtle with custom crosshair. Config save/load makes swapping profiles easy between nights.',
  },
  {
    id: '8',
    author: 'sora',
    role: 'Steam regular',
    game: 'Wardogs',
    rating: 4,
    datePublished: '2026-09-10',
    body: 'ESP-first most nights — fewer third parties in ridge fights. Would like faster patch notes on site but loader always caught up within a day.',
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
