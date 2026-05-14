/** Smooth-scroll to a section by DOM id (expects matching `id` on a landmark). */
export function scrollToSectionId(id: string, behavior: ScrollBehavior = 'smooth') {
  document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
}

/** Sets `location` hash (e.g. `#about`) via `history.pushState`, then smooth-scrolls. */
export function goToSection(id: string) {
  const hash = `#${id}`
  if (window.location.hash !== hash) {
    window.history.pushState(null, '', hash)
  }
  scrollToSectionId(id)
}

function getHashId(): string {
  return decodeURIComponent(window.location.hash.replace(/^#/, '')).trim()
}

/**
 * Full-page open with a hash (e.g. paste `/#testimonials`): cancel the browser's instant jump,
 * then smooth-scroll once the target section exists in the DOM.
 */
export function startSmoothScrollToUrlHash(): () => void {
  const id = getHashId()
  if (!id) return () => {}

  window.scrollTo(0, 0)

  let cancelled = false
  let attempts = 0
  const maxAttempts = 80

  function tick() {
    if (cancelled) return
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    attempts += 1
    if (attempts < maxAttempts) {
      requestAnimationFrame(tick)
    }
  }

  requestAnimationFrame(tick)

  return () => {
    cancelled = true
  }
}

/** Scroll to the current URL hash if present (hashchange / popstate). */
export function scrollToCurrentHash() {
  const id = getHashId()
  if (id) scrollToSectionId(id)
}
