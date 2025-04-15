// @ts-check
import { defineConfig } from 'astro/config';
import astroI18next from 'astro-i18next';

// https://astro.build/config
export default defineConfig({
  site: 'https://bartnathaliawedding.com',
  compressHTML: true,
  build: {
    assets: '_assets'
  },
  // i18n configuration
  integrations: [
    astroI18next()
  ]
});
