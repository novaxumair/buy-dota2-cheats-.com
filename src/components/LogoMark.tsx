type LogoMarkProps = {
  className?: string
  /** Above-the-fold brand mark (header). Footer should omit for lazy load. */
  priority?: boolean
}

export function LogoMark({ className = '', priority = false }: LogoMarkProps) {
  return (
    <img
      src="/logo.png"
      srcSet="/logo.png 1x, /logo.png 2x"
      width={82}
      height={82}
      alt=""
      className={`h-[82px] w-[82px] shrink-0 object-contain ${className}`}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}
