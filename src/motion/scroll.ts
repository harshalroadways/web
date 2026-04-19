import type { Transition } from 'framer-motion'

/** Shared easing for scroll-reveal (matches SectionHeading feel). */
export const scrollEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Fire slightly before the section hits center for a natural feel. */
export const scrollViewport = {
  once: true,
  margin: '-72px' as const,
}

export const scrollTransition: Transition = {
  duration: 0.5,
  ease: scrollEase,
}

export function scrollTransitionWithDelay(delay: number): Transition {
  return { ...scrollTransition, delay }
}
