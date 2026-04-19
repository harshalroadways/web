/** Shared business details for Contact, Footer, etc. */
export const OFFICE_ADDRESS =
  'Shop No 6, New Loha Mandi Road, Opposite Macheda Mandir, Harmada, Jaipur-302013, Rajasthan, India'

/** WhatsApp deep link (digits only: country code + national number). */
export const WHATSAPP_URL = 'https://wa.me/919829152909' as const

/** Human-readable number for UI (single space after country code). */
export const PHONE_DISPLAY = '+91 9829152909' as const

/** Mobile shown on Contact (tap-to-call). */
export const MOBILE_DISPLAY = '+91 9828388124' as const

export const MOBILE_TEL_HREF = 'tel:+919828388124' as const

/**
 * Pinned place (authoritative). “Open in Google Maps” uses this link.
 * @see https://maps.app.goo.gl/nciDaVijoiE9S1Ht5
 */
export const GOOGLE_MAPS_SHARE_URL =
  'https://maps.app.goo.gl/nciDaVijoiE9S1Ht5' as const

/**
 * Exact lat/lng from that pin’s place data (!3d / !4d in the resolved URL).
 * Embedded iframe uses the same point as the short link above.
 */
const OFFICE_MAP_LAT = 26.9950665
const OFFICE_MAP_LNG = 75.7611718

export const GOOGLE_MAPS_EMBED_SRC =
  `https://www.google.com/maps?q=${OFFICE_MAP_LAT}%2C${OFFICE_MAP_LNG}&z=19&output=embed&hl=en` as const
