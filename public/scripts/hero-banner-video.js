/**
 * Hero banner autoplay — keep hero.webm moving (no scroll observer that pauses early).
 */
;(function () {
  var WEBM = '/videos/hero.webm'
  var MP4 = '/videos/hero.mp4'

  function bindVideo(video) {
    if (!video || video.dataset.heroPlaybackBound === '1') return
    video.dataset.heroPlaybackBound = '1'

    var wrap = video.closest('[data-hero-video]')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      video.removeAttribute('autoplay')
      return
    }

    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.playsInline = true
    video.autoplay = true
    video.loop = true

    if (!video.getAttribute('src')) {
      video.src = WEBM
    }

    function markPlaying() {
      if (wrap) wrap.setAttribute('data-playing', 'true')
    }

    function tryPlay() {
      if (video.error) return
      var p = video.play()
      if (p && p.then) {
        p.then(markPlaying).catch(function () {})
      } else if (!video.paused) {
        markPlaying()
      }
    }

    function useMp4Fallback() {
      if (video.dataset.fallbackUsed === '1') return
      video.dataset.fallbackUsed = '1'
      video.src = MP4
      video.load()
      tryPlay()
    }

    video.addEventListener('error', useMp4Fallback)
    video.addEventListener('loadeddata', tryPlay)
    video.addEventListener('canplay', tryPlay)
    video.addEventListener('canplaythrough', tryPlay)
    video.addEventListener('playing', markPlaying)
    video.addEventListener('ended', function () {
      video.currentTime = 0
      tryPlay()
    })
    video.addEventListener('pause', function () {
      if (!document.hidden && video.readyState >= 2) {
        window.requestAnimationFrame(tryPlay)
      }
    })

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) tryPlay()
    })

    video.load()
    tryPlay()

    var ticks = 0
    var retry = window.setInterval(function () {
      ticks += 1
      if (!video.paused) {
        window.clearInterval(retry)
        return
      }
      tryPlay()
      if (ticks > 30) window.clearInterval(retry)
    }, 300)

    var lastT = -1
    var stuck = 0
    window.setInterval(function () {
      if (video.paused || document.hidden) return
      var t = video.currentTime
      if (t === lastT) {
        stuck += 1
        if (stuck >= 2) {
          video.currentTime = t + 0.001
          tryPlay()
          stuck = 0
        }
      } else {
        stuck = 0
        lastT = t
      }
    }, 900)
  }

  function boot() {
    document.querySelectorAll('[data-hero-video] video').forEach(bindVideo)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
