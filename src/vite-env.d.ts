/// <reference types="vite/client" />

declare module 'swiper/css'
declare module 'swiper/css/navigation'
declare module 'swiper/css/pagination'
declare module 'swiper/css/effect-fade'

interface ImportMetaEnv {
  /** No trailing slash. Canonical + social meta image URLs. */
  readonly VITE_SITE_URL?: string
  readonly VITE_EMAILJS_PUBLIC_KEY?: string
  readonly VITE_EMAILJS_SERVICE_ID?: string
  readonly VITE_EMAILJS_TEMPLATE_ID?: string
  /** https://web3forms.com — one access key; inbox is chosen in the Web3Forms dashboard (use aryansaini1986@gmail.com). */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
  /** When `true`, contact form uses POST /api/inquiry (Node + nodemailer; see server/index.js). */
  readonly VITE_USE_NODE_MAIL?: string
  /** Optional absolute origin for the mail API in production (no trailing slash), e.g. https://api.yourdomain.com */
  readonly VITE_CONTACT_API_ORIGIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
