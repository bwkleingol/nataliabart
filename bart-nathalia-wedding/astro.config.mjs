// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://bartnathaliawedding.com',
  compressHTML: true,
  build: {
    assets: '_assets'
  }
});
