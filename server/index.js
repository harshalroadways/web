/**
 * Contact mail API — run alongside Vite in dev (see package.json "server" script).
 * Loads SMTP settings from the project root .env (same file as Vite; do not commit secrets).
 */
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import nodemailer from 'nodemailer'

const PORT = Number(process.env.CONTACT_API_PORT || 8787)
const MAIL_TO = process.env.MAIL_TO || 'aryansaini1986@gmail.com'
const MAIL_FROM =
  process.env.MAIL_FROM || process.env.SMTP_USER || 'noreply@localhost'

const extraOrigins = (process.env.CONTACT_ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

function isAllowedOrigin(origin) {
  if (!origin) return true
  if (extraOrigins.includes(origin)) return true
  if (/^https?:\/\/localhost(:\d+)?$/.test(origin)) return true
  if (/^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) return true
  return false
}

function validateBody(body) {
  const errors = {}
  const fullName = String(body?.fullName ?? '').trim()
  const phone = String(body?.phone ?? '').trim()
  const email = String(body?.email ?? '').trim()
  const serviceType = String(body?.serviceType ?? '').trim()
  const pickup = String(body?.pickup ?? '').trim()
  const drop = String(body?.drop ?? '').trim()
  const message = String(body?.message ?? '').trim()
  const phoneDigits = phone.replace(/\D/g, '')

  if (!fullName) errors.fullName = 'Please enter your full name.'
  if (!phone) errors.phone = 'Please enter your phone number.'
  else if (phoneDigits.length < 8) errors.phone = 'Enter a valid phone number.'
  if (!email) errors.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
  if (!serviceType) errors.serviceType = 'Select a service type.'
  if (!pickup) errors.pickup = 'Please enter pickup location.'
  if (!drop) errors.drop = 'Please enter drop location.'
  if (!message) errors.message = 'Please add a short message.'

  if (Object.keys(errors).length) return { errors }
  return {
    values: { fullName, phone, email, serviceType, pickup, drop, message },
  }
}

function buildMailText(v) {
  return [
    `New inquiry — Harshal Roadways`,
    ``,
    `Name: ${v.fullName}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone}`,
    `Service: ${v.serviceType}`,
    `Pickup: ${v.pickup}`,
    `Drop: ${v.drop}`,
    ``,
    `Message:`,
    v.message,
  ].join('\n')
}

function createTransport() {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    return null
  }

  const port = Number(process.env.SMTP_PORT || 587)
  const secure =
    process.env.SMTP_SECURE === 'true' || process.env.SMTP_SECURE === '1'

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })
}

const app = express()
app.use(
  cors({
    origin: (origin, cb) => cb(null, isAllowedOrigin(origin)),
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
)
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mailConfigured: Boolean(createTransport()) })
})

app.post('/api/inquiry', async (req, res) => {
  const parsed = validateBody(req.body)
  if ('errors' in parsed) {
    return res.status(400).json({
      ok: false,
      message: 'Please check the form fields.',
      errors: parsed.errors,
    })
  }

  const transporter = createTransport()
  if (!transporter) {
    return res.status(503).json({
      ok: false,
      message:
        'Mail is not configured on the server. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env — see .env.example.',
    })
  }

  const { values: v } = parsed
  const subject = `Harshal Roadways — ${v.serviceType}`

  try {
    await transporter.sendMail({
      from: `"Harshal Roadways (site)" <${MAIL_FROM}>`,
      to: MAIL_TO,
      replyTo: v.email,
      subject,
      text: buildMailText(v),
    })
    return res.json({ ok: true })
  } catch (err) {
    console.error('[mail]', err)
    return res.status(502).json({
      ok: false,
      message:
        err instanceof Error
          ? `Could not send email: ${err.message}`
          : 'Could not send email.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Contact mail API listening on http://127.0.0.1:${PORT}`)
  if (!createTransport()) {
    console.warn(
      '[mail] SMTP not configured — set SMTP_HOST, SMTP_USER, SMTP_PASS in .env',
    )
  }
})
