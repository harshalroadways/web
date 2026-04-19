import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const CHAR_MS = 38
const START_DELAY_MS = 100

type HeroTypewriterTitleProps = {
  text: string
  isActive: boolean
  className?: string
}

export function HeroTypewriterTitle({
  text,
  isActive,
  className,
}: HeroTypewriterTitleProps) {
  const [display, setDisplay] = useState('')
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isActive) {
      setDisplay('')
      return
    }

    if (reduceMotion) {
      setDisplay(text)
      return
    }

    setDisplay('')
    let intervalId: ReturnType<typeof setInterval> | undefined
    let charIndex = 0

    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        charIndex += 1
        setDisplay(text.slice(0, charIndex))
        if (charIndex >= text.length && intervalId) {
          clearInterval(intervalId)
          intervalId = undefined
        }
      }, CHAR_MS)
    }, START_DELAY_MS)

    return () => {
      clearTimeout(startId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [isActive, text, reduceMotion])

  return (
    <h1 className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
      {!reduceMotion && (
        <span
          className="hero-typewriter-cursor ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-px bg-brand-300 align-middle md:ml-1"
          aria-hidden="true"
        />
      )}
    </h1>
  )
}
