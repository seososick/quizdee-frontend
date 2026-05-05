// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://quizdee.com',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  build: {
    format: 'directory', // /quiz/mbti/  (with trailing slash via routing)
  },
  trailingSlash: 'always',
  output: 'static',
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
})
