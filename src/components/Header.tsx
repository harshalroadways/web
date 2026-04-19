import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import { PHONE_DISPLAY, WHATSAPP_URL } from '../data/site'
import { Logo } from './Logo'

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'coverage', label: 'Coverage' },
  { id: 'stats', label: 'Insights' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
]

function scrollToId(id: string) {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-brand-100/90 bg-white/95 shadow-sm shadow-brand-900/5 backdrop-blur-md dark:border-brand-900/30 dark:bg-[#0f0618]/95'
          : 'border-b border-transparent bg-white/80 backdrop-blur-sm dark:bg-[#0f0618]/75'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a
          href="#top"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('top')
          }}
        >
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToId(link.id)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white/90 px-2.5 py-2 text-xs font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 dark:border-stone-600 dark:bg-stone-900/90 dark:text-brand-300 dark:hover:bg-stone-800 dark:focus-visible:ring-offset-stone-950 sm:px-3 sm:text-sm"
            aria-label={`Chat on WhatsApp at ${PHONE_DISPLAY}`}
          >
            <FaWhatsapp className="h-4 w-4 shrink-0 text-[#25D366] sm:h-[1.125rem] sm:w-[1.125rem]" aria-hidden />
            <span className="hidden min-[375px]:inline">{PHONE_DISPLAY}</span>
          </a>
          <button
            type="button"
            className="hidden rounded-xl bg-linear-to-r from-brand-500 to-royal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 lg:inline-flex"
            onClick={() => scrollToId('contact')}
          >
            Get quote
          </button>
          <button
            type="button"
            className="rounded-xl bg-linear-to-r from-brand-500 to-royal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 lg:hidden"
            onClick={() => {
              setOpen(false)
              scrollToId('contact')
            }}
          >
            Get quote
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-stone-800 lg:hidden dark:text-stone-100"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <HiXMark className="h-7 w-7" /> : <HiBars3 className="h-7 w-7" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-stone-200 bg-white lg:hidden dark:border-stone-800 dark:bg-stone-950"
          >
            <nav className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 flex items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50 py-3 text-base font-semibold text-brand-800 transition hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-950/50 dark:text-brand-200 dark:hover:bg-brand-900/50"
              >
                <FaWhatsapp className="h-5 w-5 shrink-0 text-[#25D366]" aria-hidden />
                WhatsApp {PHONE_DISPLAY}
              </a>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  className="rounded-lg px-3 py-3 text-left text-base font-medium text-stone-800 hover:bg-stone-100 dark:text-stone-100 dark:hover:bg-stone-900"
                  onClick={() => {
                    setOpen(false)
                    scrollToId(link.id)
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
