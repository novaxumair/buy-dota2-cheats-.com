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
    role: 'Herbivore main',
    game: 'The Isle',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'Status on the product page matched what I got in menu. Player ESP held after the last Evrima patch — glad I waited for Active before loading.',
  },
  {
    id: '2',
    author: 'nova',
    role: 'Pack hunter',
    game: 'The Isle',
    rating: 5,
    datePublished: '2026-09-13',
    body: 'Corpse ESP stopped us walking into a carnivore ambush twice. Species tags plus distance are why I wanted the isle esp in the first place.',
  },
  {
    id: '3',
    author: 'rift',
    role: 'Squad lead',
    game: 'The Isle',
    rating: 4,
    datePublished: '2026-09-13',
    body: 'No fake multi-game catalog. Honest Updating vs Active flips are what I wanted before I got the isle cheats for our pack.',
  },
  {
    id: '4',
    author: 'kiln',
    role: 'Duos',
    game: 'The Isle',
    rating: 5,
    datePublished: '2026-09-12',
    body: 'Loader came back Active within a day after patch. We check status, then checkout — snapline ESP solid around the lake biome.',
  },
  {
    id: '5',
    author: 'moss',
    role: 'Night growth',
    game: 'The Isle',
    rating: 5,
    datePublished: '2026-09-12',
    body: 'Menu was straightforward. Muted ESP colors, combat assist off by default. Setup forum covered antivirus so first launch worked.',
  },
  {
    id: '6',
    author: 'vale',
    role: 'New buyer',
    game: 'The Isle',
    rating: 5,
    datePublished: '2026-09-11',
    body: 'Monthly first was the right call. Instant delivery and live status sold me before I looked at lifetime the isle cheats plans.',
  },
  {
    id: '7',
    author: 'drake',
    role: 'Solo carnivore',
    game: 'The Isle',
    rating: 4,
    datePublished: '2026-09-11',
    body: 'Distance readouts on player ESP were accurate. Max distance filter took ten minutes to dial — forums helped.',
  },
  {
    id: '8',
    author: 'sora',
    role: 'Evrima regular',
    game: 'The Isle',
    rating: 4,
    datePublished: '2026-09-10',
    body: 'ESP-only most nights — fewer surprises in jungle fights. Would like faster patch notes on site but loader always caught up within a day.',
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
