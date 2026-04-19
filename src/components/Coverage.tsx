import { motion } from 'framer-motion'
import { transportImages } from '../data/transport-images'
import { scrollTransition, scrollViewport } from '../motion/scroll'
import { SectionHeading } from './SectionHeading'

const cities = [
  'Jaipur',
  'Jodhpur',
  'Udaipur',
  'Kota',
  'Ajmer',
  'Bikaner',
  'Alwar',
  'Bharatpur',
  'Pali',
  'Sikar',
  'Jhunjhunu',
  'Churu',
  'Ganganagar',
  'Barmer',
  'Nagaur',
  'Tonk',
  'Delhi',
  'Gurgaon',
]

export function Coverage() {
  return (
    <section
      id="coverage"
      className="relative overflow-hidden py-20 md:py-28"
      aria-labelledby="coverage-heading"
    >
      {/* Photo — very subtle in dark mode so text stays readable */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-100 motion-safe:animate-[coverage-pan_32s_ease-in-out_infinite_alternate] dark:opacity-[0.18]"
        style={{ backgroundImage: `url(${transportImages.bgCoverage})` }}
        aria-hidden
      />
      {/* Light: scrim */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/93 via-brand-50/78 to-royal-100/88 backdrop-blur-[0.5px] dark:hidden"
        aria-hidden
      />
      {/* Dark: solid base + animated gradient (replaces washed-out photo + thin scrim) */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-stone-950 dark:block"
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[length:420%_420%] motion-safe:animate-[coverage-grad-dark_30s_ease-in-out_infinite_alternate] motion-reduce:animate-none dark:block"
        style={{
          backgroundImage: `linear-gradient(
            125deg,
            rgb(12 10 9) 0%,
            rgb(28 25 23) 20%,
            rgb(49 46 129 / 0.5) 42%,
            rgb(30 27 75 / 0.45) 58%,
            rgb(28 25 23) 80%,
            rgb(12 10 9) 100%
          )`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="dark:[&_p:last-of-type]:text-stone-200">
          <SectionHeading
            eyebrow="Service coverage"
            titleId="coverage-heading"
            title="Serving key cities and corridors across Rajasthan and Delhi NCR"
            subtitle="Local runs, intercity lanes, and connected routes—including Delhi and Gurgaon—tell us your pickup and drop, and we propose the right vehicle and crew."
          />
        </div>

        <motion.ul
          className="flex flex-wrap justify-center gap-3"
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.03 } },
          }}
        >
          {cities.map((city) => (
            <motion.li
              key={city}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
              className="rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-medium text-stone-800 shadow-sm dark:border-brand-600/40 dark:bg-stone-900/95 dark:text-stone-100 dark:shadow-md dark:shadow-black/40"
            >
              {city}
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          className="mx-auto mt-10 max-w-2xl text-center text-sm text-stone-600 dark:text-stone-200 dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={scrollTransition}
        >
          Not listed? We still may serve your route—share locations in the contact form and we will confirm feasibility within one business day.
        </motion.p>
      </div>
      <style>{`
        @keyframes coverage-pan {
          from {
            transform: scale(1.05);
          }
          to {
            transform: scale(1.1);
          }
        }
        @keyframes coverage-grad-dark {
          0% {
            background-position: 0% 40%;
          }
          100% {
            background-position: 100% 60%;
          }
        }
      `}</style>
    </section>
  )
}
