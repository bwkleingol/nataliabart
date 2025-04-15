#!/bin/bash

# Remove the astro-i18next config file if it still exists
if [ -f "astro-i18next.config.mjs" ]; then
  rm astro-i18next.config.mjs
fi

# Run the development server
npm run dev
