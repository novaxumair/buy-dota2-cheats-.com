import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, SyntheticEvent } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { blogPath } from '../data/blogs'
import { FORUM_INDEX } from '../data/forum-index'
import { GAMES, guidePath } from '../data/games'

/** ~2.625rem per row — list max-height shows five rows then scrolls */
const SUGGESTION_LIST_MAX_CLASS = 'max-h-[calc(2.625rem*5+0.5rem)]'

type HeroSearchProps = {
  /** Controlled value when parent owns the query (e.g. Articles page) */
  value?: string
  onChange?: (value: string) => void
  /** filter = update parent list; forums = navigate to /forums?q= on Go */
  submitTo?: 'forums' | 'filter'
  placeholder?: string
  autoFocus?: boolean
  className?: string
}

export function HeroSearch({
  value,
  onChange,
  submitTo = 'forums',
  placeholder = 'Search Wardogs cheat guides…',
  autoFocus = false,
  className = '',
}: HeroSearchProps) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [internal, setInternal] = useState(value ?? '')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  const q = value !== undefined ? value : internal

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const forumMatches = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return []
    return FORUM_INDEX.filter((post) => post.title.toLowerCase().includes(term))
  }, [q])

  useEffect(() => {
    setActive(0)
  }, [forumMatches.length, q])

  function setQuery(next: string) {
    if (value === undefined) setInternal(next)
    onChange?.(next)
    setOpen(true)
    setActive(0)
  }

  function goToForum(index = active) {
    const post = forumMatches[index]
    if (!post) return
    setOpen(false)
    window.location.assign(blogPath(post.slug))
  }

  function submit(e?: SyntheticEvent) {
    e?.preventDefault()
    const term = q.trim()

    if (open && forumMatches[active]) {
      goToForum(active)
      return
    }

    const exactForum = forumMatches.find(
      (post) => post.title.toLowerCase() === term.toLowerCase(),
    )
    if (exactForum) {
      window.location.assign(blogPath(exactForum.slug))
      return
    }

    const exactGame = GAMES.find(
      (g) =>
        g.name.toLowerCase() === term.toLowerCase() ||
        g.slug === term.toLowerCase().replace(/\s+/g, '-'),
    )
    if (exactGame) {
      window.location.assign(guidePath(exactGame.slug))
      return
    }

    if (submitTo === 'forums') {
      setOpen(false)
      window.location.assign(term ? `/forums?q=${encodeURIComponent(term)}` : '/forums')
      return
    }
    setOpen(false)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp') && forumMatches.length) {
      setOpen(true)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, Math.max(forumMatches.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && open && forumMatches[active]) {
      e.preventDefault()
      goToForum(active)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const showList = open && forumMatches.length > 0

  return (
    <div ref={rootRef} className={`relative z-50 w-full ${className || 'max-w-xl'}`.trim()}>
      <form
        onSubmit={submit}
        className="relative z-50 flex w-full max-w-full flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:bg-white sm:p-1"
        role="search"
      >
        <div className="flex w-full min-w-0 items-center gap-2 rounded-full bg-white px-3.5 py-2.5 sm:flex-1 sm:rounded-none sm:bg-transparent sm:px-3.5 sm:py-1.5">
          <Search className="h-4 w-4 shrink-0 text-gray-400" strokeWidth={1.75} aria-hidden />
          <input
            type="search"
            role="combobox"
            value={q}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => q.trim() && setOpen(true)}
            onKeyDown={onKeyDown}
            autoFocus={autoFocus}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-controls={showList ? listId : undefined}
            aria-expanded={showList}
            className="w-full min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <button
          type="submit"
          className="cta-gradient inline-flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-auto sm:shrink-0 sm:py-2"
        >
          Go
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </form>

      {showList ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Forum threads matching your search"
          className={`search-results absolute left-0 right-0 top-full z-[60] mt-2 overflow-y-auto overscroll-contain rounded-2xl border border-z-soft/20 bg-z-card py-1 ${SUGGESTION_LIST_MAX_CLASS}`}
        >
          {forumMatches.map((post, i) => (
            <li key={post.slug} role="option" aria-selected={i === active}>
              <button
                type="button"
                aria-label={`Open forum thread: ${post.title}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => goToForum(i)}
                className={`flex min-h-[2.625rem] w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm transition-colors ${
                  i === active ? 'bg-z-accent/20 text-z-ink' : 'text-white/75 hover:bg-z-accent/10'
                }`}
              >
                <span className="truncate font-medium">{post.title}</span>
                <span className="ml-3 shrink-0 text-xs text-z-soft/70">Open thread</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
