import { motion } from 'framer-motion'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { FaStar } from 'react-icons/fa'
import { transportImages } from '../data/transport-images'
import { scrollTransition, scrollViewport } from '../motion/scroll'
import { SectionHeading } from './SectionHeading'

const reviews = [
  {
    name: 'Priya Sharma',
    place: 'Jaipur → Udaipur',
    text:
      'Office move completed over a weekend. Labeling was meticulous and our desks were usable Monday morning.',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    place: 'Jodhpur local',
    text:
      'Household shifting with fragile decor. Crew used padding everywhere and communicated delays clearly.',
    rating: 5,
  },
  {
    name: 'Meera & Rahul',
    place: 'Kota intercity',
    text:
      'Fair quote upfront and no bargaining at the gate. Tracking updates on WhatsApp were helpful.',
    rating: 5,
  },
  {
    name: 'Anil Traders',
    place: 'Commercial goods',
    text:
      'Regular goods runs to Ajmer. Loads are secured well and invoices match the agreed scope.',
    rating: 4,
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.18] dark:opacity-[0.12]"
        style={{ backgroundImage: `url(${transportImages.bgTestimonials})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-linear-to-b from-brand-50/85 via-white/92 to-white dark:from-stone-900/95 dark:via-[#0f0618]/92 dark:to-[#0f0618]" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="Customers who moved with confidence"
          subtitle="Feedback from families and businesses—we refine routes and crew briefings from every job."
        />

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.15 },
            900: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 6000, disableOnInteraction: true }}
          loop
          className="!pb-2"
        >
          {reviews.map((r) => (
            <SwiperSlide key={r.name}>
              <motion.article
                className="h-full rounded-2xl border border-stone-200 bg-white p-6 shadow-md dark:border-stone-800 dark:bg-stone-900"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={scrollViewport}
                transition={scrollTransition}
                whileHover={{ y: -3 }}
              >
                <div className="flex gap-1 text-brand-500" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < r.rating ? 'opacity-100' : 'opacity-25'}
                    />
                  ))}
                </div>
                <p className="mt-4 text-stone-700 dark:text-stone-300">&ldquo;{r.text}&rdquo;</p>
                <footer className="mt-6 border-t border-stone-100 pt-4 dark:border-stone-800">
                  <p className="font-semibold text-stone-900 dark:text-white">{r.name}</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">{r.place}</p>
                </footer>
              </motion.article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
