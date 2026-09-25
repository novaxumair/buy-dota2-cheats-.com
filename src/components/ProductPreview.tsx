import { WD_HOME_VIDEO } from '../data/media'

type ProductPreviewProps = {
  className?: string
}

/** Muted loop preview for product sections (cover fit). */
export function ProductPreview({ className = '' }: ProductPreviewProps) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-z-soft/15 bg-black/40 ${className}`}>
      <div className="relative aspect-video w-full">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={WD_HOME_VIDEO.poster}
          aria-label={WD_HOME_VIDEO.title}
        >
          <source src={WD_HOME_VIDEO.src} type="video/webm" />
        </video>
      </div>
      <p className="sr-only">{WD_HOME_VIDEO.title}</p>
    </div>
  )
}
