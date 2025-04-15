/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: "en",
  locales: ["en", "nl", "id"],
  i18nextServer: {
    debug: true,
  },
  i18nextClient: {
    debug: true,
  },
  routes: {
    en: {
      "our-story": "our-story",
      "event-details": "event-details",
      "travel": "travel",
      "gallery": "gallery",
      "contact": "contact"
    },
    nl: {
      "our-story": "ons-verhaal",
      "event-details": "evenement-details",
      "travel": "reis-verblijf",
      "gallery": "galerij",
      "contact": "contact"
    },
    id: {
      "our-story": "kisah-kami",
      "event-details": "detail-acara",
      "travel": "perjalanan-penginapan",
      "gallery": "galeri",
      "contact": "hubungi-kami"
    }
  }
};
