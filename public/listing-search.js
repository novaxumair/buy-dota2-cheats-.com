/**
 * Blog/forums listing filter — works before and after React hydration (event delegation).
 */
(function () {
  var PAIRS = [
    { inputId: 'blog-search', rootId: 'blog-listing' },
    { inputId: 'forums-search', rootId: 'forums-listing' },
  ]

  function apply(input, root) {
    if (!input || !root) return
    var term = (input.value || '').trim().toLowerCase()
    var items = root.querySelectorAll('[data-listing-item]')
    var visible = 0
    items.forEach(function (el) {
      var hay = (el.getAttribute('data-search') || '').toLowerCase()
      var show = !term || hay.indexOf(term) !== -1
      el.hidden = !show
      if (show) visible++
    })
    var count = root.querySelector('[data-listing-count]')
    if (count) {
      var unit = count.getAttribute('data-count-unit') || 'item'
      var plural = count.getAttribute('data-count-plural') || unit + 's'
      count.textContent = visible + ' ' + (visible === 1 ? unit : plural)
    }
    var heading = root.querySelector('[data-listing-heading]')
    if (heading) {
      heading.textContent = term
        ? 'Search results'
        : heading.getAttribute('data-default-heading') || 'All items'
    }
    var empty = root.querySelector('[data-listing-empty]')
    if (empty) empty.hidden = visible !== 0
  }

  function pairForTarget(target) {
    if (!target || !target.id) return null
    for (var i = 0; i < PAIRS.length; i++) {
      if (PAIRS[i].inputId === target.id) return PAIRS[i]
    }
    return null
  }

  function runForInput(input) {
    var pair = pairForTarget(input)
    if (!pair) return
    apply(input, document.getElementById(pair.rootId))
  }

  function runAll() {
    for (var i = 0; i < PAIRS.length; i++) {
      var input = document.getElementById(PAIRS[i].inputId)
      if (input) runForInput(input)
    }
  }

  document.addEventListener(
    'input',
    function (e) {
      runForInput(e.target)
    },
    true,
  )

  document.addEventListener(
    'search',
    function (e) {
      runForInput(e.target)
    },
    true,
  )

  function boot() {
    runAll()
    document.addEventListener('astro:hydrate', runAll)
    document.addEventListener('astro:page-load', runAll)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
