import { motion } from 'framer-motion'
import { HiClock, HiCurrencyRupee, HiShieldCheck, HiUserGroup } from 'react-icons/hi2'
import { MdHeadsetMic } from 'react-icons/md'
import { transportImages } from '../data/transport-images'
import { scrollTransitionWithDelay, scrollViewport } from '../motion/scroll'
import { SectionHeading } from './SectionHeading'

const points = [
  {
    title: 'Affordable pricing',
    text: 'Transparent quotes with line items—no surprise surcharges after loading.',
    icon: HiCurrencyRupee,
  },
  {
    title: 'On-time delivery',
    text: 'Route planning and buffer windows that respect your handover deadlines.',
    icon: HiClock,
  },
  {
    title: 'Professional staff',
    text: 'Uniformed crews trained on packing standards and safe lifting.',
    icon: HiUserGroup,
  },
  {
    title: 'Safe handling',
    text: 'Padding, straps, and checks at every stage from door to door.',
    icon: HiShieldCheck,
  },
  {
    title: '24/7 support',
    text: 'Reach us for rescheduling, live location updates, and escalation.',
    icon: MdHeadsetMic,
  },
]

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25 dark:opacity-20"
        style={{ backgroundImage: `url(${transportImages.bgWhyUs})` }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/92 via-white/88 to-brand-50/80 dark:from-[#0f0618]/95 dark:via-[#0f0618]/90 dark:to-stone-950/95" />
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl dark:bg-brand-500/10" />
      <div className="pointer-events-none absolute -left-24 bottom-20 h-72 w-72 rounded-full bg-royal-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Why choose us"
          title="Built for reliability on Rajasthan roads"
          subtitle="We invest in people, process, and communication—so your shipment feels controlled even when the route is not."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <motion.article
              key={p.title}
              className="rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-stone-800 dark:bg-stone-900/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={scrollTransitionWithDelay(i * 0.05)}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <p.icon className="h-8 w-8 text-brand-600 dark:text-brand-400" aria-hidden />
              <h3 className="mt-4 font-display text-lg font-semibold text-stone-900 dark:text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-stone-600 dark:text-stone-400">{p.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
