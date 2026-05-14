import { motion } from 'framer-motion'
import { HiMoon, HiSun } from 'react-icons/hi2'
import {
  MOBILE_DISPLAY,
  MOBILE_TEL_HREF,
  OFFICE_ADDRESS,
  PHONE_DISPLAY,
  WHATSAPP_URL,
} from '../data/site'
import { useTheme } from '../hooks/useTheme'
import { scrollTransitionWithDelay, scrollViewport } from '../motion/scroll'
import { goToSection } from '../lib/sectionNav'
import { Logo } from './Logo'

/** Footer quick links (Contact & Reviews omitted — available in header / elsewhere) */
const quick = [
  { id: 'about', label: 'About' },
  { id: 'about-founder', label: 'Our Founder' },
  { id: 'services', label: 'Services' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'coverage', label: 'Coverage' },
  { id: 'stats', label: 'Insights' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const { theme, toggleTheme } = useTheme()

  return (
    <footer
      className="border-t border-stone-200 bg-stone-900 text-stone-300 dark:border-stone-800"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={scrollTransitionWithDelay(0)}
          >
            <Logo inverse unifiedInverse />
            <p className="mt-4 text-sm leading-relaxed">
            Providing reliable transportation, packing, and logistics services across Rajasthan with safe, timely, and efficient delivery solutions. We offer transparent pricing, and careful transportation to ensure your goods reach their destination securely.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={scrollTransitionWithDelay(0.06)}
          >
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Quick links
            </h3>
            <ul className="mt-4 space-y-2">
              {quick.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => goToSection(l.id)}
                    className="text-left text-sm hover:text-white"
                    aria-label={`${l.label}: jump to section`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={scrollTransitionWithDelay(0.12)}
          >
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Service areas
            </h3>
            <p className="mt-4 text-sm leading-relaxed">
              Rajasthan statewide—including Jaipur, Jodhpur, Udaipur, Kota, Ajmer, Bikaner, and other
              cities—plus Delhi and Gurgaon in the Delhi NCR. Intercity lanes and connected routes on
              request.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={scrollTransitionWithDelay(0.18)}
          >
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Connect
            </h3>
            <p className="mt-4 text-sm leading-relaxed">
              <span className="text-stone-400">Office: </span>
              {OFFICE_ADDRESS}
            </p>
            <p className="mt-4 text-sm">
              Mobile:{' '}
              <a
                href={MOBILE_TEL_HREF}
                className="text-brand-400 hover:underline"
                aria-label={`Call Harshal Roadways mobile ${MOBILE_DISPLAY}`}
                title={`Call ${MOBILE_DISPLAY}`}
              >
                {MOBILE_DISPLAY}
              </a>
            </p>
            <p className="mt-2 text-sm">
              Phone / WhatsApp:{' '}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:underline"
                aria-label={`WhatsApp or phone Harshal Roadways at ${PHONE_DISPLAY}`}
                title={`WhatsApp ${PHONE_DISPLAY}`}
              >
                {PHONE_DISPLAY}
              </a>
            </p>
          </motion.div>
        </div>
        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-stone-800 pt-8 sm:flex-row sm:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={scrollViewport}
          transition={scrollTransitionWithDelay(0.08)}
        >
          <p className="text-center text-xs text-stone-500">
            © {year} Harshal Roadways. All rights reserved.
          </p>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-stone-600 bg-stone-800 px-3 py-2 text-xs font-medium text-stone-200 shadow-sm transition hover:bg-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Use light theme' : 'Use dark theme'}
          >
            {theme === 'dark' ? (
              <HiSun className="h-5 w-5" aria-hidden />
            ) : (
              <HiMoon className="h-5 w-5" aria-hidden />
            )}
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </motion.div>
      </div>
    </footer>
  )
}
