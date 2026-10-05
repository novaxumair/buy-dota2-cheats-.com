import { Search } from 'lucide-react'
import type { RefObject } from 'react'

type ListingSearchFieldProps = {
  id: string
  label: string
  placeholder: string
  defaultValue?: string
  inputRef: RefObject<HTMLInputElement | null>
  onInput: () => void
}

export function ListingSearchField({
  id,
  label,
  placeholder,
  defaultValue = '',
  inputRef,
  onInput,
}: ListingSearchFieldProps) {
  return (
    <div className="listing-search-field">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <Search className="listing-search-field__icon h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
      <input
        ref={inputRef}
        id={id}
        type="search"
        name="q"
        defaultValue={defaultValue}
        onInput={onInput}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        suppressHydrationWarning
        className="listing-search-field__input"
        aria-label={label}
      />
    </div>
  )
}
