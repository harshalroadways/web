import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '')

  const contactApiPort = env.CONTACT_API_PORT || '8787'
  const base = env.VITE_BASE?.trim() || '/'
  const baseNormalized =
    base === '/' ? '/' : base.endsWith('/') ? base : `${base}/`

  return {
    base: baseNormalized,
    server: {
      proxy: {
        '/api': {
          target: `http://127.0.0.1:${contactApiPort}`,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inject-site-url',
        transformIndexHtml(html) {
          return html.replaceAll('__SITE_URL__', siteUrl)
        },
      },
    ],
  }
})
