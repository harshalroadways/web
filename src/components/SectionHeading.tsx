import { motion, useReducedMotion } from 'framer-motion'
import { scrollEase, scrollTransition, scrollViewport } from '../motion/scroll'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  titleId?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  titleId,
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`mb-10 md:mb-14 ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={scrollViewport}
      transition={
        reduceMotion ? { duration: 0.15, ease: scrollEase } : scrollTransition
      }
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          {eyebrow}
        </p>
      )}
      <h2
        id={titleId}
        className="font-display text-3xl font-bold tracking-tight text-stone-900 md:text-4xl dark:text-white"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-stone-600 dark:text-stone-400">{subtitle}</p>
      )}
    </motion.div>
  )
}
