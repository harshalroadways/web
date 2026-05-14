import { motion } from 'framer-motion'
import { scrollTransitionWithDelay, scrollViewport } from '../motion/scroll'
import { SectionHeading } from './SectionHeading'

const focusPoints = [
  'Safe and timely transportation services',
  'Efficient logistics and supply chain solutions',
  'Professional and experienced drivers',
  'Customer-focused operations',
  'Reliable nationwide transportation support',
]

const founderPhotoSrc = `${import.meta.env.BASE_URL}founder-shyam-saini.png`.replace(/\/{2,}/g, '/')

/** Shown on the flip-card back (CodePen zQxOXN–style reveal) */
const flipCardTeaser = (
  <>
    <p className="founder-flip__teaser-p">
      <strong>Shyam Saini</strong> is the proud owner and driving force behind{' '}
      <strong>Harshal Roadways</strong>, bringing over{' '}
      <strong>30+ years of experience in transportation and logistics</strong>. With a strong
      commitment to reliability and customer satisfaction, he has built Harshal Roadways into a
      trusted name in the transport sector.
    </p>
    <p className="founder-flip__teaser-p mt-3 text-sm">
      His expertise spans freight, route management, fleet operations, and service—supporting
      long-term client relationships across industries.
    </p>
  </>
)

export function Founder() {
  return (
    <section
      id="about-founder"
      className="relative overflow-hidden border-y border-stone-200 bg-white py-20 dark:border-stone-800 dark:bg-stone-950 md:py-28"
      aria-labelledby="founder-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-brand-50/40 via-transparent to-royal-50/30 dark:from-brand-950/25 dark:via-transparent dark:to-stone-950"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Leadership"
          titleId="founder-heading"
          title="Our Founder"
          subtitle="Experience, integrity, and a long-term commitment to every lane we run."
        />

        <motion.div
          className="mx-auto max-w-5xl rounded-2xl border border-stone-200 bg-stone-50/80 p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900/80 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={scrollTransitionWithDelay(0)}
        >

          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-12">
            <div className="flex w-full shrink-0 flex-col items-center md:w-[300px]">
              <div
                className="founder-flip__card peer/portrait cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-100 dark:focus-visible:ring-offset-stone-900"
                tabIndex={0}
                aria-label="Shyam Saini portrait — hover or focus to reveal a short biography"
              >
                <div className="founder-flip__img-container">
                  <img
                    src={founderPhotoSrc}
                    alt=""
                    width={640}
                    height={640}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                </div>
                <div className="founder-flip__details">
                  <h2 className="founder-flip__title">Shyam Saini</h2>
                  <p className="founder-flip__role">Founder &amp; Owner — Harshal Roadways</p>
                  <div className="founder-flip__body text-stone-800 dark:text-stone-200">
                    {flipCardTeaser}
                  </div>
                </div>
              </div>
              <div
                className="mt-4 w-full text-center transition-opacity duration-500 ease-in-out opacity-100 peer-hover/portrait:pointer-events-none peer-hover/portrait:opacity-0 peer-focus-within/portrait:opacity-0 motion-reduce:transition-none motion-reduce:peer-hover/portrait:opacity-100 motion-reduce:peer-focus-within/portrait:opacity-100"
              >
                <p className="font-display text-lg font-semibold text-stone-900 dark:text-white">
                  Shyam Saini
                </p>
                <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                  Founder &amp; Owner
                </p>
              </div>
            </div>

            <div className="min-w-0 flex-1 space-y-4 text-base leading-relaxed text-stone-600 dark:text-stone-300">
              <p>
                Over the years,{' '}
                <strong className="text-stone-900 dark:text-white">Mr. Shyam Saini</strong> has gained
                deep expertise in freight transportation, route
                management, fleet operations, and customer service. His hands-on industry knowledge and
                dedication to timely deliveries have helped the company establish long-term
                relationships with clients across multiple industries.
              </p>
              <p className="font-medium text-stone-800 dark:text-stone-200">
                Under his leadership, Harshal Roadways focuses on providing:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                {focusPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Mr. Saini believes in maintaining the highest standards of professionalism,
                transparency, and service quality. His vision continues to drive Harshal Roadways toward
                growth, innovation, and excellence in the transportation industry.
              </p>
              <p>
                At Harshal Roadways, we are committed to delivering goods with care, speed, and trust
                — ensuring every shipment reaches its destination safely.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        /* Adapted from CodePen https://codepen.io/sbgoswami/pen/zQxOXN — 3D flip card hover */
        .founder-flip__card {
          position: relative;
          width: 300px;
          height: 400px;
          transform-style: preserve-3d;
          transform: perspective(2000px);
          transition: transform 1s ease, box-shadow 1s ease;
          background: rgb(255 255 255);
          box-shadow: inset 80px 0 50px rgba(0, 0, 0, 0.12);
        }
        .dark .founder-flip__card {
          background: rgb(28 25 23);
          box-shadow: inset 80px 0 50px rgba(0, 0, 0, 0.45);
        }

        .founder-flip__card:hover,
        .founder-flip__card:focus-within {
          z-index: 2;
          transform: perspective(2000px) rotate(-10deg);
          box-shadow: inset 20px 0 50px rgba(0, 0, 0, 0.12);
        }
        .dark .founder-flip__card:hover,
        .dark .founder-flip__card:focus-within {
          box-shadow: inset 20px 0 50px rgba(0, 0, 0, 0.5);
        }

        .founder-flip__img-container {
          position: relative;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border: 1px solid rgb(120 113 108 / 0.35);
          transform-origin: left center;
          z-index: 1;
          transition: transform 1s ease;
          border-radius: 0.75rem;
          overflow: hidden;
          background: rgb(231 229 228);
        }
        .dark .founder-flip__img-container {
          border-color: rgb(87 83 78 / 0.5);
          background: rgb(41 37 36);
        }

        .founder-flip__card:hover .founder-flip__img-container,
        .founder-flip__card:focus-within .founder-flip__img-container {
          transform: rotateY(-135deg);
        }

        .founder-flip__details {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          box-sizing: border-box;
          padding: 1.15rem 1.25rem;
          overflow-y: auto;
          border-radius: 0.75rem;
        }

        .founder-flip__title {
          margin: 0;
          padding: 0.35em 0 0.15em;
          text-transform: uppercase;
          font-family: inherit;
          font-weight: 700;
          font-size: 1.35rem;
          line-height: 1.2;
          letter-spacing: 0.02em;
          color: rgb(126 34 206);
        }
        .dark .founder-flip__title {
          color: rgb(192 132 252);
        }

        .founder-flip__role {
          margin: 0 0 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgb(87 83 78);
        }
        .dark .founder-flip__role {
          color: rgb(168 162 158);
        }

        .founder-flip__teaser-p {
          margin: 0;
          padding: 0;
          line-height: 1.45;
          font-size: 0.82rem;
        }

        @media (prefers-reduced-motion: reduce), (hover: none) and (pointer: coarse) {
          .founder-flip__card {
            height: auto;
            width: 100%;
            max-width: 300px;
            transform: none !important;
            cursor: default;
            box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.18);
          }
          .dark .founder-flip__card {
            box-shadow: 0 12px 40px -8px rgba(0, 0, 0, 0.5);
          }
          .founder-flip__card:hover,
          .founder-flip__card:focus-within {
            transform: none !important;
            box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.18);
          }
          .dark .founder-flip__card:hover,
          .dark .founder-flip__card:focus-within {
            box-shadow: 0 12px 40px -8px rgba(0, 0, 0, 0.5);
          }
          .founder-flip__img-container {
            position: relative;
            height: 220px;
            transform: none !important;
            z-index: auto;
          }
          .founder-flip__details {
            position: relative;
            padding-top: 0.75rem;
          }
        }
      `}</style>
    </section>
  )
}
