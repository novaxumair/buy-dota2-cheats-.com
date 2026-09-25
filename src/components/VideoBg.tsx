import { useEffect, useRef } from 'react'
import { WD_HERO, WD_HOME_VIDEO } from '../data/media'

type VideoBgProps = {
  /** Poster while video loads */
  image?: string
  imageAlt?: string
}

/** Full-bleed hero video — muted loop, cover fit. Poster only when reduced motion / save-data. */
export function VideoBg({
  image = WD_HERO,
  imageAlt = 'Wardogs gameplay with ESP and aimbot overlay',
}: VideoBgProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = (navigator.connection as { saveData?: boolean } | undefined)?.saveData === true

    if (reduceMotion || saveData) {
      video.pause()
      video.removeAttribute('autoplay')
      return
    }

    const play = () => {
      void video.play().catch(() => {})
    }

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      play()
    } else {
      video.addEventListener('loadeddata', play, { once: true })
      video.load()
    }

    return () => video.removeEventListener('loadeddata', play)
  }, [])

  return (
    <div className="hero-video-wrap absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 z-0 bg-z-bg" aria-hidden />
      <video
        ref={videoRef}
        className="hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={image}
        aria-label={WD_HOME_VIDEO.title}
      >
        <source src={WD_HOME_VIDEO.src} type="video/webm" />
      </video>
      <span className="sr-only">{imageAlt}</span>
      <div className="hero-video-tint pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="hero-video-tint-glow pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-z-bg via-z-bg/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-[3] h-24 bg-gradient-to-b from-z-bg/70 to-transparent" />
    </div>
  )
}
