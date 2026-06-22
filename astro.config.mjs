// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

const SITE = process.env.PUBLIC_SITE_URL || 'https://quizdee.com'

export default defineConfig({
  site: SITE,
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      i18n: {
        defaultLocale: 'th',
        locales: { th: 'th-TH' },
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/api/'),
      serialize(item) {
        // Custom priority per URL pattern
        if (item.url === SITE + '/') item.priority = 1.0
        else if (item.url.includes('/mbti/')) item.priority = 0.9
        else if (item.url.includes('/quiz/')) item.priority = 0.8
        else if (item.url.includes('/blog/')) item.priority = 0.7
        return item
      },
    }),
  ],
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',  // inline small CSS, link big ones
    assets: '_assets',
  },
  trailingSlash: 'always',
  output: 'static',
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
})
