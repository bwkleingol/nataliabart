// @ts-check
import { defineConfig } from 'astro/config';
import astroI18next from 'astro-i18next';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://bartnathaliawedding.com',
  compressHTML: true,
  output: 'server',
  adapter: vercel(),
  build: {
    assets: '_assets'
  },
  // i18n configuration
  integrations: [
    astroI18next()
  ]
});
