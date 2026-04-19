import { animate } from 'framer-motion'
import { useEffect, useState } from 'react'

type AnimatedCounterProps = {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  duration = 1.6,
  className = '',
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [value, duration])

  return (
    <span className={className}>
      {display}
      {suffix}
    </span>
  )
}
