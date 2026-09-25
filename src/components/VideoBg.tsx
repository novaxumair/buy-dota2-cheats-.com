import { useEffect, useRef, useState } from 'react'
import { WD_HERO, WD_HOME_VIDEO } from '../data/media'

type VideoBgProps = {
  /** Poster while video loads */
  image?: string
  imageAlt?: string
}

function prefersStaticHero() {
  if (typeof window === 'undefined') return false
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  const saveData = conn?.saveData === true
  return reduceMotion || saveData
}

/** Full-bleed hero video — muted loop, cover fit. Poster only when reduced motion / save-data. */
export function VideoBg({
  image = WD_HERO,
  imageAlt = 'Wardogs gameplay with ESP and aimbot overlay',
}: VideoBgProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (prefersStaticHero()) {
      video.pause()
      video.removeAttribute('autoplay')
      return
    }

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const tryPlay = () => {
      if (prefersStaticHero()) return
      void video.play().then(
        () => setPlaying(true),
        () => {
          /* Autoplay blocked — keep poster until a later retry */
        },
      )
    }

    const onPlaying = () => {
      setPlaying(true)
      video.removeAttribute('poster')
    }

    const onCanPlay = () => tryPlay()

    const onVisibility = () => {
      if (!document.hidden) tryPlay()
    }

    const onEnded = () => {
      video.currentTime = 0
      tryPlay()
    }

    video.addEventListener('playing', onPlaying)
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('ended', onEnded)
    document.addEventListener('visibilitychange', onVisibility)

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      tryPlay()
    }

    return () => {
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('ended', onEnded)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="hero-video-wrap absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 z-0 bg-z-bg" aria-hidden />
      <video
        ref={videoRef}
        className={`hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-center transition-opacity duration-700 ${
          playing ? 'opacity-100' : 'opacity-0'
        }`}
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
      {!playing ? (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 z-[1] h-full w-full object-cover object-center"
          fetchPriority="high"
        />
      ) : null}
      <span className="sr-only">{imageAlt}</span>
      <div className="hero-video-tint pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="hero-video-tint-glow pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-z-bg via-z-bg/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-[3] h-24 bg-gradient-to-b from-z-bg/70 to-transparent" />
    </div>
  )
}
