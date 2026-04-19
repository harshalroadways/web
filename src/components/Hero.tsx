import { motion } from 'framer-motion'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { scrollTransition, scrollViewport } from '../motion/scroll'
import { heroSlides } from '../data/hero-slides'
import { HeroTypewriterTitle } from './HeroTypewriterTitle'
import { Logo } from './Logo'

const textEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[min(92vh,900px)] overflow-hidden pt-[4.5rem]"
      aria-label="Hero"
    >
      <motion.div
        className="h-full min-h-[min(92vh,900px)] w-full"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={scrollViewport}
        transition={scrollTransition}
      >
      <Swiper
        dir="rtl"
        modules={[Autoplay, Navigation, Pagination]}
        speed={700}
        loop
        autoplay={{ delay: 7200, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="hero-swiper h-full min-h-[min(92vh,900px)] w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.title}>
            {({ isActive }) => (
            <div
              dir="ltr"
              className="relative flex min-h-[min(92vh,900px)] items-center overflow-hidden bg-stone-950"
            >
              {/*
                Full-viewport bleed: Swiper/RTL can leave a sliver where `inset-0` on the slide
                does not align with the viewport; centering a 100vw-wide stack fixes the overlay gap.
              */}
              <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-full min-h-full w-[100vw] max-w-[100vw] -translate-x-1/2">
                <div
                  className="hero-slide-bg absolute inset-0 min-h-full w-full origin-center scale-105 bg-cover bg-no-repeat motion-safe:animate-[hero-zoom_18s_ease-in-out_infinite_alternate]"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundPosition: slide.backgroundPosition ?? 'center',
                  }}
                  role="img"
                  aria-label={slide.alt}
                />
                <div
                  className="absolute inset-0 z-[1] bg-linear-to-br from-stone-950/88 via-brand-900/60 to-royal-900/50 dark:from-stone-950/92 dark:via-brand-900/65 dark:to-royal-900/45"
                  aria-hidden
                />
              </div>
              <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 md:flex-row md:items-center md:justify-between md:px-6 md:pb-24 md:pt-12">
                <div className="max-w-xl">
                  <div className="mb-6 md:hidden">
                    <Logo compact />
                  </div>
                  <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
                    Harshal Roadways
                  </p>
                  <p className="mb-3 text-xs font-medium text-brand-200/95">{slide.service}</p>
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 16,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: textEase,
                    }}
                  >
                    <HeroTypewriterTitle
                      text={slide.title}
                      isActive={isActive}
                      className="font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
                    />
                  </motion.div>
                  <motion.p
                    className="mt-4 text-lg text-stone-200 md:text-xl"
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 12,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: textEase,
                      delay: isActive ? 0.1 : 0,
                    }}
                  >
                    {slide.subtitle}
                  </motion.p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <motion.button
                      type="button"
                      className="rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-stone-900 shadow-lg transition hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToId('contact')}
                    >
                      Get free quote
                    </motion.button>
                    <motion.button
                      type="button"
                      className="rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToId('services')}
                    >
                      View services
                    </motion.button>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.45, ease: textEase, delay: isActive ? 0.14 : 0 }}
                >
                  <div className="rounded-2xl border border-white/30 bg-stone-950/65 p-6 shadow-2xl shadow-black/30 ring-1 ring-white/15 backdrop-blur-xl md:p-7">
                    <Logo inverse unifiedInverse />
                    <ul className="mt-6 space-y-3 text-left text-sm font-medium leading-relaxed text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                      {slide.highlights.map((line, i) => (
                        <li key={`${slide.title}-${i}`} className="flex gap-2.5">
                          <span className="mt-0.5 shrink-0 text-emerald-300" aria-hidden>
                            ✓
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      </motion.div>
      <style>{`
        @keyframes hero-zoom {
          from { transform: scale(1.05); }
          to { transform: scale(1.12); }
        }
        @keyframes hero-cursor-blink {
          0%, 45% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .hero-typewriter-cursor {
          animation: hero-cursor-blink 1s step-end infinite;
        }
        .hero-swiper .swiper-pagination-bullet {
          background: rgba(255,255,255,0.5);
          opacity: 1;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #a855f7;
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: #fff;
        }
        .hero-swiper .swiper-slide {
          box-sizing: border-box;
          width: 100%;
        }
        @media (max-width: 768px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev { display: none; }
        }
      `}</style>
    </section>
  )
}
