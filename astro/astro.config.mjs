// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://nataliabart.info',
  compressHTML: true,
  output: 'server',
  adapter: vercel(),
  build: {
    assets: '_assets'
  },
  // Astro built-in i18n configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'id'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
