import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const springFast = { stiffness: 520, damping: 32, mass: 0.4 }
const springSlow = { stiffness: 96, damping: 22, mass: 0.55 }

function useCursorEnabled() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mqFine = window.matchMedia('(pointer: fine)')
    const mqWide = window.matchMedia('(min-width: 1024px)')
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => {
      setEnabled(mqFine.matches && mqWide.matches && !mqReduce.matches)
    }
    sync()
    mqFine.addEventListener('change', sync)
    mqWide.addEventListener('change', sync)
    mqReduce.addEventListener('change', sync)
    return () => {
      mqFine.removeEventListener('change', sync)
      mqWide.removeEventListener('change', sync)
      mqReduce.removeEventListener('change', sync)
    }
  }, [])

  return enabled
}

export function AnimatedCursor() {
  const enabled = useCursorEnabled()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const dotX = useSpring(x, springFast)
  const dotY = useSpring(y, springFast)
  const ringX = useSpring(x, springSlow)
  const ringY = useSpring(y, springSlow)

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('custom-cursor-on')

    const interactive =
      'a[href],button,input,textarea,select,label,[role="button"],[tabindex]:not([tabindex="-1"])'

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)

      const el = document.elementFromPoint(e.clientX, e.clientY)
      setHovering(Boolean(el?.closest(interactive)))
    }

    const onLeave = () => {
      setVisible(false)
      setHovering(false)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.documentElement.classList.remove('custom-cursor-on')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-normal"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.45 : 1,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { type: 'spring', stiffness: 400, damping: 28 } }}
        aria-hidden
      >
        <div className="h-10 w-10 rounded-full border-2 border-brand-400/85 bg-brand-500/10 shadow-[0_0_20px_rgba(168,85,247,0.35)] dark:border-brand-300/90 dark:bg-brand-400/10" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full bg-brand-400 shadow-sm ring-2 ring-white/40 dark:bg-brand-300 dark:ring-brand-900/30"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0.85 : 1 }}
        transition={{ duration: 0.15 }}
        aria-hidden
      />
    </>
  )
}
