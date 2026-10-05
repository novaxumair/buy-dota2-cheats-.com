/**
 * Mobile nav toggle — works before and after React hydration (event delegation).
 */
(function () {
  function dedupeMobileNav() {
    var drawer = document.getElementById('mobile-nav-drawer')
    var backdrop = document.getElementById('mobile-nav-backdrop')
    document.querySelectorAll('#mobile-nav-drawer').forEach(function (el) {
      if (el !== drawer) el.remove()
    })
    document.querySelectorAll('#mobile-nav-backdrop').forEach(function (el) {
      if (el !== backdrop) el.remove()
    })
    if (drawer && drawer.parentElement !== document.body) {
      document.body.appendChild(drawer)
    }
    if (backdrop && backdrop.parentElement !== document.body) {
      document.body.appendChild(backdrop)
    }
  }

  function isOpen() {
    return document.documentElement.classList.contains('mobile-nav-open')
  }

  function setOpen(open) {
    document.documentElement.classList.toggle('mobile-nav-open', open)
    document.body.style.overflow = open ? 'hidden' : ''
    document.querySelectorAll('[data-mobile-nav-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false')
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    })
    var drawer = document.getElementById('mobile-nav-drawer')
    if (drawer) drawer.setAttribute('aria-hidden', open ? 'false' : 'true')
    var backdrop = document.getElementById('mobile-nav-backdrop')
    if (backdrop) backdrop.setAttribute('aria-hidden', open ? 'false' : 'true')
  }

  function toggle() {
    setOpen(!isOpen())
  }

  document.addEventListener(
    'click',
    function (e) {
      if (e.target.closest('[data-mobile-nav-toggle]')) {
        e.preventDefault()
        toggle()
        return
      }
      if (e.target.closest('[data-mobile-nav-close]')) {
        setOpen(false)
        return
      }
      if (e.target.closest('#mobile-nav-backdrop')) {
        setOpen(false)
      }
    },
    true,
  )

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) setOpen(false)
  })

  function boot() {
    dedupeMobileNav()
  }

  document.addEventListener('astro:page-load', function () {
    setOpen(false)
    boot()
  })

  document.addEventListener('astro:hydrate', boot)

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
