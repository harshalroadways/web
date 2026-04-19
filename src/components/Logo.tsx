import { motion, useReducedMotion } from 'framer-motion'

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

/** Pointy-top hexagon vertices, center (50,50), radius R */
function hexPoints(cx: number, cy: number, R: number): string {
  const pts: string[] = []
  for (let i = 0; i < 6; i++) {
    const ang = (-90 + i * 60) * (Math.PI / 180)
    const x = cx + R * Math.cos(ang)
    const y = cy + R * Math.sin(ang)
    pts.push(`${x.toFixed(3)},${y.toFixed(3)}`)
  }
  return pts.join(' ')
}

/**
 * HR monogram in a hex frame — navy field, white inner ring, dark outer stroke.
 * Serif “HR” (Georgia) with tight spacing to echo a monogram.
 */
function LogoMark() {
  const outer = hexPoints(50, 50, 49.2)
  const inner = hexPoints(50, 50, 42.5)

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      {/* Outer hex: deep field + dark outline */}
      <polygon
        points={outer}
        fill="#1a2744"
        stroke="#070b14"
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
      {/* Inner hex: white ring + slightly lighter face */}
      <polygon
        points={inner}
        fill="#243056"
        stroke="#f8fafc"
        strokeWidth={2.35}
        strokeLinejoin="round"
      />
      <text
        x={50}
        y={59}
        textAnchor="middle"
        fill="#ffffff"
        fontSize={26}
        fontWeight={700}
        fontFamily="Georgia, 'Times New Roman', Times, serif"
        letterSpacing="-0.2em"
        style={{ paintOrder: 'stroke fill', stroke: 'rgba(0,0,0,0.06)', strokeWidth: 0.35 }}
      >
        HR
      </text>
    </svg>
  )
}

/** Clip for pointy-top hex (matches SVG geometry) */
const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

export function Logo({
  className = '',
  compact = false,
  inverse = false,
  unifiedInverse = false,
}: LogoProps) {
  const reduceMotion = useReducedMotion()

  const floatLoop = reduceMotion
    ? false
    : {
        y: [0, -4, 0],
        scale: [1, 1.03, 1],
        boxShadow: [
          '0 10px 28px -6px rgba(30, 58, 138, 0.45)',
          '0 18px 44px -8px rgba(15, 23, 42, 0.5)',
          '0 10px 28px -6px rgba(30, 58, 138, 0.45)',
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
            className="pointer-events-none absolute -inset-1 opacity-80 blur-[2px]"
            style={{
              background:
                'linear-gradient(135deg, rgba(96, 165, 250, 0.35), rgba(30, 64, 175, 0.35), rgba(99, 102, 241, 0.3))',
              clipPath: HEX_CLIP,
              willChange: 'transform',
            }}
            animate={spinLoop}
            transition={spinTransition}
          />
        )}
        <motion.div
          className="relative flex h-11 w-11 items-center justify-center overflow-hidden p-[3px] shadow-lg shadow-slate-900/35 ring-2 ring-white/30 dark:ring-stone-600/45"
          style={{ clipPath: HEX_CLIP }}
          animate={floatLoop || undefined}
          transition={floatTransition}
        >
          {!reduceMotion && (
            <motion.div
              className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/22 to-transparent"
              style={{ clipPath: HEX_CLIP }}
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
            className="relative z-[1] h-[2.125rem] w-[2.125rem]"
            animate={
              reduceMotion ? undefined : { x: [0, 1, 0], y: [0, -0.5, 0] }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <LogoMark />
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
