import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { OFFICE_ADDRESS, PHONE_DISPLAY, WHATSAPP_URL } from '../data/site'
import { scrollTransitionWithDelay, scrollViewport } from '../motion/scroll'
import { SectionHeading } from './SectionHeading'

const RECIPIENT_EMAIL = 'aryansaini1986@gmail.com'

const serviceTypes = [
  'House shifting',
  'Office relocation',
  'Goods transportation',
  'Loading & unloading',
  'Other',
]

type FormState = {
  fullName: string
  phone: string
  email: string
  serviceType: string
  pickup: string
  drop: string
  message: string
}

type FieldErrors = Partial<Record<keyof FormState, string>>

const initial: FormState = {
  fullName: '',
  phone: '',
  email: '',
  serviceType: '',
  pickup: '',
  drop: '',
  message: '',
}

function inquiryEmailBody(values: FormState): string {
  return [
    `Name: ${values.fullName}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Service: ${values.serviceType}`,
    `Pickup: ${values.pickup}`,
    `Drop: ${values.drop}`,
    '',
    'Message:',
    values.message,
  ].join('\n')
}

/** https://web3forms.com — access key must belong to a form that delivers to aryansaini1986@gmail.com */
async function submitViaWeb3Forms(
  values: FormState,
  accessKey: string,
): Promise<void> {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Harshal Roadways — ${values.serviceType}`,
      name: values.fullName,
      email: values.email,
      message: inquiryEmailBody(values),
    }),
  })
  const data = (await res.json()) as { success?: boolean; message?: string }
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Could not send inquiry')
  }
}

/**
 * Sends inquiry via FormSubmit to RECIPIENT_EMAIL when other providers are not configured.
 * The recipient may need to confirm the address once via FormSubmit’s activation email.
 */
function inquiryEndpoint(): string {
  const origin = import.meta.env.VITE_CONTACT_API_ORIGIN?.replace(/\/$/, '') ?? ''
  return origin ? `${origin}/api/inquiry` : '/api/inquiry'
}

/** POST /api/inquiry — Node mail server (see server/index.js + Vite proxy in dev). */
async function submitViaMailApi(values: FormState): Promise<void> {
  const res = await fetch(inquiryEndpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(values),
  })
  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean
    message?: string
    errors?: FieldErrors
  }
  if (!res.ok || !data.ok) {
    const msg = data.message || `Could not send (${res.status})`
    const err = new Error(msg) as Error & { fieldErrors?: FieldErrors }
    if (data.errors) err.fieldErrors = data.errors
    throw err
  }
}

async function submitViaFormSubmit(values: FormState): Promise<void> {
  const url = `https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `Harshal Roadways — ${values.serviceType}`,
      _replyto: values.email,
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      service_type: values.serviceType,
      pickup_location: values.pickup,
      drop_location: values.drop,
      message: values.message,
    }),
  })

  const raw = await res.text()
  if (!res.ok) {
    throw new Error(raw || `Request failed (${res.status})`)
  }
  try {
    const data = JSON.parse(raw) as { success?: boolean | string; message?: string }
    if (data.success === false || data.success === 'false') {
      throw new Error(data.message || 'Submission could not be delivered')
    }
  } catch (err) {
    if (err instanceof SyntaxError) return
    throw err
  }
}

function validate(values: FormState): FieldErrors {
  const e: FieldErrors = {}
  if (!values.fullName.trim()) e.fullName = 'Please enter your full name.'
  const phoneDigits = values.phone.replace(/\D/g, '')
  if (!values.phone.trim()) e.phone = 'Please enter your phone number.'
  else if (phoneDigits.length < 8) e.phone = 'Enter a valid phone number (include country code if needed).'
  if (!values.email.trim()) e.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Enter a valid email address.'
  if (!values.serviceType) e.serviceType = 'Select a service type.'
  if (!values.pickup.trim()) e.pickup = 'Please enter pickup location.'
  if (!values.drop.trim()) e.drop = 'Please enter drop location.'
  if (!values.message.trim()) e.message = 'Please add a short message.'
  return e
}

export function Contact() {
  const [values, setValues] = useState<FormState>(initial)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
  const emailjsReady = Boolean(publicKey && serviceId && templateId)

  const web3AccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
  const web3Ready = Boolean(web3AccessKey)

  const useNodeMailApi =
    import.meta.env.VITE_USE_NODE_MAIL === 'true' ||
    import.meta.env.VITE_USE_NODE_MAIL === '1'

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    setSuccess(false)
    setFormError(null)
    const v = validate(values)
    setErrors(v)
    if (Object.keys(v).length > 0) return

    const params = {
      to_email: RECIPIENT_EMAIL,
      from_name: values.fullName,
      phone: values.phone,
      email: values.email,
      service_type: values.serviceType,
      pickup: values.pickup,
      drop: values.drop,
      message: values.message,
      reply_to: values.email,
    }

    setLoading(true)
    try {
      if (useNodeMailApi) {
        await submitViaMailApi(values)
      } else if (emailjsReady) {
        await emailjs.send(serviceId!, templateId!, params, {
          publicKey: publicKey!,
        })
      } else if (web3Ready) {
        await submitViaWeb3Forms(values, web3AccessKey!)
      } else {
        await submitViaFormSubmit(values)
      }
      setSuccess(true)
      setValues(initial)
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Could not send your inquiry.'
      if (err instanceof Error && 'fieldErrors' in err) {
        const fe = (err as Error & { fieldErrors?: FieldErrors }).fieldErrors
        if (fe && Object.keys(fe).length) setErrors((e) => ({ ...e, ...fe }))
      }
      const isNetwork =
        msg === 'Failed to fetch' ||
        msg.includes('NetworkError') ||
        msg.includes('Load failed')
      setFormError(
        isNetwork && useNodeMailApi
          ? 'Cannot reach the mail server. Run `npm run server` (or `npm run dev:full`) and ensure .env has SMTP settings — see .env.example.'
          : useNodeMailApi
            ? msg
            : 'Could not send right now. Please try again, email us directly, or use WhatsApp.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-stone-50 dark:bg-stone-950"
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[length:420%_420%] motion-safe:animate-[contact-grad-light_30s_ease-in-out_infinite_alternate] motion-reduce:animate-none dark:hidden"
        style={{
          backgroundImage: `linear-gradient(
            125deg,
            #ffffff 0%,
            #faf5ff 18%,
            #f5f3ff 36%,
            #eef2ff 52%,
            #fdf4ff 68%,
            #ecfeff 82%,
            #ffffff 100%
          )`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden bg-[length:420%_420%] motion-safe:animate-[contact-grad-dark_30s_ease-in-out_infinite_alternate] motion-reduce:animate-none dark:block"
        style={{
          backgroundImage: `linear-gradient(
            125deg,
            rgb(12 10 9) 0%,
            rgb(28 25 23) 22%,
            rgb(49 46 129 / 0.45) 42%,
            rgb(30 27 75 / 0.55) 58%,
            rgb(28 25 23) 78%,
            rgb(12 10 9) 100%
          )`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Contact"
          titleId="contact-heading"
          title="Tell us about your move"
          subtitle="We respond within hours on business days. For urgent loads, mention timing in the message."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollViewport}
            transition={scrollTransitionWithDelay(0)}
          >
            <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-lg dark:border-stone-800">
              <iframe
                title="Harshal Roadways location on Google Maps"
                src="https://www.google.com/maps?q=26.9705566%2C75.7549498&z=17&output=embed&hl=en"
                className="h-72 w-full border-0 md:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href="https://maps.app.goo.gl/a5YFZ54xqRQz68PP6"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-brand-600 underline-offset-4 hover:underline dark:text-brand-400"
            >
              Open pinned location in Google Maps
            </a>
            <ul className="mt-6 space-y-3 text-stone-600 dark:text-stone-400">
              <li className="leading-relaxed">
                <strong className="text-stone-900 dark:text-white">Office:</strong>{' '}
                {OFFICE_ADDRESS}
              </li>
              <li>
                <strong className="text-stone-900 dark:text-white">Email:</strong>{' '}
                <a href={`mailto:${RECIPIENT_EMAIL}`} className="text-brand-600 hover:underline dark:text-brand-400">
                  {RECIPIENT_EMAIL}
                </a>
              </li>
              <li>
                <strong className="text-stone-900 dark:text-white">WhatsApp:</strong>{' '}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline dark:text-brand-400"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.form
            className="rounded-2xl border border-brand-100 bg-brand-50/50 p-6 dark:border-brand-900/60 dark:bg-stone-900/80 md:p-8"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollViewport}
            transition={scrollTransitionWithDelay(0.08)}
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  autoComplete="name"
                  value={values.fullName}
                  onChange={(e) => setValues((s) => ({ ...s, fullName: e.target.value }))}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-stone-600 dark:bg-stone-950 dark:text-white"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={(e) => setValues((s) => ({ ...s, phone: e.target.value }))}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-stone-600 dark:bg-stone-950 dark:text-white"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => setValues((s) => ({ ...s, email: e.target.value }))}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-stone-600 dark:bg-stone-950 dark:text-white"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="serviceType" className="mb-1 block text-sm font-medium">
                  Service type <span className="text-red-500">*</span>
                </label>
                <select
                  id="serviceType"
                  value={values.serviceType}
                  onChange={(e) => setValues((s) => ({ ...s, serviceType: e.target.value }))}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-stone-600 dark:bg-stone-950 dark:text-white"
                >
                  <option value="">Select…</option>
                  {serviceTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.serviceType}</p>
                )}
              </div>
              <div>
                <label htmlFor="pickup" className="mb-1 block text-sm font-medium">
                  Pickup location <span className="text-red-500">*</span>
                </label>
                <input
                  id="pickup"
                  value={values.pickup}
                  onChange={(e) => setValues((s) => ({ ...s, pickup: e.target.value }))}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-stone-600 dark:bg-stone-950 dark:text-white"
                />
                {errors.pickup && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pickup}</p>
                )}
              </div>
              <div>
                <label htmlFor="drop" className="mb-1 block text-sm font-medium">
                  Drop location <span className="text-red-500">*</span>
                </label>
                <input
                  id="drop"
                  value={values.drop}
                  onChange={(e) => setValues((s) => ({ ...s, drop: e.target.value }))}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-stone-600 dark:bg-stone-950 dark:text-white"
                />
                {errors.drop && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.drop}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1 block text-sm font-medium">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={values.message}
                  onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
                  className="w-full resize-y rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-stone-600 dark:bg-stone-950 dark:text-white"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                )}
              </div>
            </div>

            {formError && (
              <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">
                {formError}
              </p>
            )}
            {success && (
              <p className="mt-4 text-sm font-medium text-brand-800 dark:text-brand-200" role="status">
                Thank you — your inquiry was sent to our team at {RECIPIENT_EMAIL}. We will
                contact you shortly.
              </p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-linear-to-r from-brand-500 to-royal-600 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:brightness-110 disabled:opacity-60"
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
            >
              {loading ? 'Sending…' : 'Submit inquiry'}
            </motion.button>
          </motion.form>
        </div>
      </div>

      <style>{`
        @keyframes contact-grad-light {
          0% {
            background-position: 0% 45%;
          }
          100% {
            background-position: 100% 55%;
          }
        }
        @keyframes contact-grad-dark {
          0% {
            background-position: 100% 40%;
          }
          100% {
            background-position: 0% 60%;
          }
        }
      `}</style>
    </section>
  )
}
