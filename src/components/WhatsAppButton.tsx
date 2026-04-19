import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { PHONE_DISPLAY, WHATSAPP_URL } from '../data/site'

export function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/20 ring-2 ring-brand-200/90 ring-offset-2 ring-offset-white dark:ring-brand-700/80 dark:ring-offset-[#0f0618]"
      aria-label={`Chat on WhatsApp at ${PHONE_DISPLAY}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp className="h-8 w-8" />
    </motion.a>
  )
}
