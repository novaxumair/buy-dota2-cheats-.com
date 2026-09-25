import { useEffect, useRef } from 'react'
import { WD_HOME_VIDEO } from '../data/media'

type HeroPanelVideoProps = {
  variant?: 'home' | 'forums'
}

/** Plays hero.webm only inside the hero panel (absolute fill, pauses off-screen). */
export function HeroPanelVideo({ variant = 'home' }: HeroPanelVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const video = videoRef.current
    if (!root || !video) return

    const panel = root.closest('.hero-panel') ?? root

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (reduceMotion || conn?.saveData) {
      video.pause()
      video.removeAttribute('autoplay')
      return
    }

    video.muted = true
    video.defaultMuted = true

    const markPlaying = () => {
      root.setAttribute('data-playing', 'true')
    }

    const tryPlay = () => {
      if (video.paused) void video.play().then(markPlaying).catch(() => {})
      else markPlaying()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting && e.intersectionRatio > 0.02)
        if (visible) tryPlay()
        else video.pause()
      },
      { root: null, threshold: [0, 0.02, 0.25] },
    )
    observer.observe(panel)

    tryPlay()
    video.addEventListener('canplay', tryPlay)
    video.addEventListener('loadeddata', tryPlay, { once: true })
    video.addEventListener('playing', markPlaying)

    return () => {
      observer.disconnect()
      video.removeEventListener('canplay', tryPlay)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="hero-video-wrap pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      data-hero-video
      aria-hidden
    >
      <video
        ref={videoRef}
        className="hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={WD_HOME_VIDEO.title}
      >
        <source src={WD_HOME_VIDEO.src} type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-tint pointer-events-none absolute inset-0 z-[2]" />
      <div className="hero-video-tint-glow pointer-events-none absolute inset-0 z-[2]" />
      <div className="absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-z-bg via-z-bg/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-[3] h-24 bg-gradient-to-b from-z-bg/70 to-transparent" />
    </div>
  )
}
