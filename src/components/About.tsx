import { motion } from 'framer-motion'
import { transportImages } from '../data/transport-images'
import { scrollTransitionWithDelay, scrollViewport } from '../motion/scroll'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-brand-50/90 py-20 dark:bg-transparent md:py-28"
      aria-labelledby="about-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:hidden"
        style={{
          backgroundImage: `url(${transportImages.aboutBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-white/88 backdrop-blur-[2px] dark:hidden" />

      {/* Dark mode: animated cloud-style gradients */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-stone-950 dark:block"
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[length:420%_420%] motion-safe:animate-[about-cloud-flow_40s_ease-in-out_infinite_alternate] motion-reduce:animate-none dark:block"
        style={{
          backgroundImage: `linear-gradient(
            125deg,
            rgb(15 23 42) 0%,
            rgb(30 27 75 / 0.55) 18%,
            rgb(49 46 129 / 0.4) 38%,
            rgb(30 58 138 / 0.35) 55%,
            rgb(51 65 85 / 0.45) 72%,
            rgb(15 23 42) 100%
          )`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[length:160%_160%] opacity-[0.95] motion-safe:animate-[about-cloud-puffs_52s_ease-in-out_infinite_alternate] motion-reduce:animate-none dark:block"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 85% 70% at 18% 28%, rgba(139, 92, 246, 0.28) 0%, transparent 52%),
            radial-gradient(ellipse 75% 60% at 82% 18%, rgba(59, 130, 246, 0.22) 0%, transparent 48%),
            radial-gradient(ellipse 100% 75% at 52% 88%, rgba(30, 41, 59, 0.55) 0%, transparent 58%),
            radial-gradient(ellipse 65% 50% at 68% 52%, rgba(168, 85, 247, 0.18) 0%, transparent 45%)
          `,
        }}
      />
      {/* Extra slow-moving gradient “wave” for depth (dark only) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[length:280%_280%] opacity-70 mix-blend-screen motion-safe:animate-[about-gradient-wave_36s_ease-in-out_infinite_alternate] motion-reduce:animate-none dark:block"
        style={{
          backgroundImage: `linear-gradient(
            100deg,
            transparent 0%,
            rgba(124, 58, 237, 0.2) 35%,
            rgba(59, 130, 246, 0.15) 50%,
            rgba(167, 139, 250, 0.18) 65%,
            transparent 100%
          )`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="dark:[&_p:last-of-type]:text-stone-200">
          <SectionHeading
            eyebrow="About us"
            title="Trusted logistics partner across Rajasthan"
            subtitle="Harshal Roadways combines local expertise with disciplined operations—so families and businesses get predictable moves, clear communication, and careful handling from pickup to delivery."
          />
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <motion.div
            className="rounded-2xl border border-brand-100 bg-white/95 p-8 shadow-xl shadow-brand-900/5 backdrop-blur dark:border-stone-700 dark:bg-stone-950/90"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={scrollTransitionWithDelay(0)}
          >
            <h3 id="about-heading" className="font-display text-xl font-semibold text-stone-900 dark:text-white">
              Solid service for factories, households, and more
            </h3>
            <p className="mt-4 text-stone-600 dark:text-stone-300">
              Whether you are moving a home, shifting a small office, or moving raw materials and finished goods from factories and warehouses, we match vehicles, crew, and packing to your load—not one-size-fits-all runs. The same care applies to household furniture and factory pallets alike.
            </p>
            <ul className="mt-6 space-y-3 text-stone-700 dark:text-stone-300">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                Factory & industrial: timed pickups, dock-friendly loading, and full or part truckload options
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-royal-500" />
                Household & residential: packing, careful handling, and room-by-room support for local and intercity moves
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                Offices, retail, and mixed jobs: clear quotes, supervised crews, and routes planned across Rajasthan and Delhi NCR
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="group relative overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={scrollTransitionWithDelay(0.08)}
          >
            <img
              src={transportImages.aboutIndianTruck}
              alt="Decorated Indian heavy-duty cargo truck on the road — regional transport and logistics"
              className="about-truck-img h-full min-h-[280px] w-full scale-110 object-cover object-center motion-safe:animate-[about-truck-kenburns_26s_ease-in-out_infinite_alternate] motion-reduce:animate-none motion-reduce:scale-100 transition-[filter] duration-700 group-hover:brightness-110"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-sm text-white">
              On-site coordination for households, factories, offices, and commercial cargo.
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes about-cloud-flow {
          0% {
            background-position: 0% 42%;
          }
          100% {
            background-position: 100% 58%;
          }
        }
        @keyframes about-cloud-puffs {
          0% {
            background-position: 10% 15%;
          }
          100% {
            background-position: 90% 85%;
          }
        }
        @keyframes about-gradient-wave {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .about-truck-img {
          transform-origin: 55% 45%;
        }
        @keyframes about-truck-kenburns {
          0% {
            transform: scale(1.1) translate(0%, 0.5%);
          }
          100% {
            transform: scale(1.16) translate(-2.5%, -1.5%);
          }
        }
      `}</style>
    </section>
  )
}
