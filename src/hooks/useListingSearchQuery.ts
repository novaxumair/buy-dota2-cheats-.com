import { useEffect, useRef, useState } from 'react'

/** Uncontrolled search input + state; preserves text typed before React hydrates. */
export function useListingSearchQuery(initialQuery = '') {
  const inputRef = useRef<HTMLInputElement>(null)
  const [q, setQ] = useState(initialQuery)

  useEffect(() => {
    const el = inputRef.current
    if (el && el.value !== q) setQ(el.value)
    el?.dispatchEvent(new Event('input', { bubbles: true }))
  }, [])

  return {
    inputRef,
    q,
    onSearchInput: () => setQ(inputRef.current?.value ?? ''),
  }
}
