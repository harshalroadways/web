import { motion } from 'framer-motion'
import { FaBuilding, FaHome, FaPeopleCarry, FaTruckMoving } from 'react-icons/fa'
import { transportImages } from '../data/transport-images'
import { scrollEase, scrollViewport } from '../motion/scroll'
import { SectionHeading } from './SectionHeading'

const services = [
  {
    title: 'House shifting',
    description:
      'Room-by-room packing, loading, and setup at your new address with floor and furniture protection.',
    icon: FaHome,
  },
  {
    title: 'Office relocation',
    description:
      'IT-safe moves, after-hours slots, and labeled cartons so teams return to a ready workspace.',
    icon: FaBuilding,
  },
  {
    title: 'Goods transportation',
    description:
      'Full and shared load options for retail, industrial, and time-sensitive consignments.',
    icon: FaTruckMoving,
  },
  {
    title: 'Loading and unloading',
    description:
      'Experienced crews with equipment for heavy lifts, narrow entries, and multi-floor buildings.',
    icon: FaPeopleCarry,
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center motion-safe:animate-[section-pan_28s_ease-in-out_infinite_alternate]"
        style={{ backgroundImage: `url(${transportImages.bgServices})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-white/88 backdrop-blur-[1px] dark:bg-stone-950/92 dark:backdrop-blur-sm" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Services"
          titleId="services-heading"
          title="Everything your move needs, in one place"
          subtitle="Pick a service or combine options—we tailor crew size, vehicle type, and timeline to your shipment."
        />

        <motion.ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
        >
          {services.map((s) => (
            <motion.li
              key={s.title}
              variants={item}
              transition={{ duration: 0.4, ease: scrollEase }}
            >
              <div className="group h-full rounded-2xl border border-brand-100/90 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:border-stone-800 dark:bg-stone-900/50 dark:hover:border-brand-500/50">
                <div className="mb-4 inline-flex rounded-xl bg-linear-to-br from-brand-500/15 to-royal-600/15 p-3 text-brand-600 dark:text-brand-400">
                  <s.icon className="h-7 w-7 transition group-hover:scale-110" aria-hidden />
                </div>
                <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {s.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <style>{`
        @keyframes section-pan {
          from { transform: scale(1.06); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </section>
  )
}
