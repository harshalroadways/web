import { motion, useReducedMotion } from 'framer-motion'
import { useId } from 'react'

type LogoProps = {
  className?: string
  compact?: boolean
  /** Light text for dark backgrounds (e.g. footer) */
  inverse?: boolean
  /** Full name in one white line (matches brand lockups on dark panels) */
  unifiedInverse?: boolean
}

const wordContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
}

const wordItem = {
  hidden: { opacity: 0, x: -8, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/** HR initials + road line — ties the mark to “Harshal Roadways” */
function LogoMark({ gradientId }: { gradientId: string }) {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill={`url(#${gradientId})`} />
      <text
        x="20"
        y="25.5"
        textAnchor="middle"
        fill="#fff"
        fontSize="14.5"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        letterSpacing="-0.07em"
      >
        HR
      </text>
      <rect x="7" y="32.5" width="26" height="2" rx="1" fill="#fff" opacity="0.38" />
    </svg>
  )
}

export function Logo({
  className = '',
  compact = false,
  inverse = false,
  unifiedInverse = false,
}: LogoProps) {
  const reduceMotion = useReducedMotion()
  const gradId = useId().replace(/:/g, '')

  const floatLoop = reduceMotion
    ? false
    : {
        y: [0, -4, 0],
        scale: [1, 1.03, 1],
        boxShadow: [
          '0 10px 28px -6px rgba(168, 85, 247, 0.45)',
          '0 18px 44px -8px rgba(124, 58, 237, 0.5)',
          '0 10px 28px -6px rgba(168, 85, 247, 0.45)',
        ],
      }

  const floatTransition = reduceMotion
    ? undefined
    : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' as const }

  const spinLoop = reduceMotion ? undefined : { rotate: 360 }
  const spinTransition = reduceMotion
    ? undefined
    : { duration: 22, repeat: Infinity, ease: 'linear' as const }

  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      initial={reduceMotion ? false : { opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative h-11 w-11 shrink-0" aria-hidden>
        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute -inset-1 rounded-2xl bg-linear-to-br from-brand-400/40 via-royal-500/30 to-brand-600/40 opacity-80 blur-[2px]"
            animate={spinLoop}
            transition={spinTransition}
            style={{ willChange: 'transform' }}
          />
        )}
        <motion.div
          className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-brand-500 to-royal-600 p-1 shadow-lg shadow-brand-500/30 ring-2 ring-white/35 dark:ring-stone-700/50"
          animate={floatLoop || undefined}
          transition={floatTransition}
        >
          {!reduceMotion && (
            <motion.div
              className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                repeatDelay: 4,
                ease: 'easeInOut',
              }}
            />
          )}
          <motion.div
            className="relative z-[1] h-9 w-9"
            animate={
              reduceMotion
                ? undefined
                : { x: [0, 1, 0], y: [0, -0.5, 0] }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <LogoMark gradientId={`hr-grad-${gradId}`} />
          </motion.div>
        </motion.div>
      </div>
      {!compact && (
        <motion.div
          className="min-w-0 text-left leading-none"
          variants={wordContainer}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={wordItem}
            className="font-display block text-[1.05rem] font-bold tracking-tight sm:text-xl"
          >
            {inverse && unifiedInverse ? (
              <span className="text-white">Harshal Roadways</span>
            ) : (
              <>
                <span className={inverse ? 'text-white' : 'text-stone-900 dark:text-white'}>
                  Harshal
                </span>{' '}
                <span
                  className={
                    inverse ? 'text-brand-200' : 'text-brand-700 dark:text-brand-300'
                  }
                >
                  Roadways
                </span>
              </>
            )}
          </motion.span>
          <motion.span
            variants={wordItem}
            className={`mt-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${inverse ? 'text-brand-200' : 'text-brand-600 dark:text-brand-400'}`}
          >
            Transport Services
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  )
}
