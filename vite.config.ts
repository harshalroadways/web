import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

function githubActionsPagesBase(): string | undefined {
  if (process.env.GITHUB_ACTIONS !== 'true') return undefined
  const full = process.env.GITHUB_REPOSITORY
  if (!full) return undefined
  const repo = full.split('/')[1]
  if (!repo) return undefined
  if (repo.endsWith('.github.io')) return '/'
  return `/${repo}/`
}

function githubActionsSiteUrl(): string | undefined {
  if (process.env.GITHUB_ACTIONS !== 'true') return undefined
  const full = process.env.GITHUB_REPOSITORY
  if (!full) return undefined
  const [owner, repo] = full.split('/')
  if (!owner || !repo) return undefined
  if (repo.endsWith('.github.io')) return `https://${owner}.github.io`
  return `https://${owner}.github.io/${repo}`
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (
    env.VITE_SITE_URL ||
    githubActionsSiteUrl() ||
    'https://example.com'
  ).replace(/\/$/, '')

  const contactApiPort = env.CONTACT_API_PORT || '8787'
  const base =
    env.VITE_BASE?.trim() || githubActionsPagesBase() || '/'
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
