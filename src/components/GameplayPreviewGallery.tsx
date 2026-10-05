import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { PRODUCT_PREVIEW_GALLERY } from '../data/media'

type GameplayPreviewGalleryProps = {
  className?: string
}

export function GameplayPreviewGallery({ className = '' }: GameplayPreviewGalleryProps) {
  const [lightbox, setLightbox] = useState<(typeof PRODUCT_PREVIEW_GALLERY)[number] | null>(null)

  const items = [...PRODUCT_PREVIEW_GALLERY, ...PRODUCT_PREVIEW_GALLERY]

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox])

  return (
    <>
      <div className={`preview-marquee-root group ${className}`.trim()}>
        <div className="preview-marquee-fade preview-marquee-fade--left" aria-hidden />
        <div className="preview-marquee-fade preview-marquee-fade--right" aria-hidden />
        <div className="preview-marquee-track">
          {items.map((item, i) => (
            <button
              key={`${item.src}-${i}`}
              type="button"
              className="preview-marquee-item"
              onClick={() => setLightbox(item)}
              aria-label={`View larger: ${item.alt}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                width={640}
                height={360}
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                className="preview-marquee-img"
              />
            </button>
          ))}
        </div>
      </div>

      {lightbox ? (
        <div
          className="preview-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gameplay preview enlarged"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="preview-lightbox-close"
            aria-label="Close preview"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="preview-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  )
}
