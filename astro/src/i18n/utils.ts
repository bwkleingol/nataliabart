import { getRelativeLocaleUrl } from 'astro:i18n';
import enTranslations from './en.json';
import nlTranslations from './nl.json';
import idTranslations from './id.json';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<typeof enTranslations>;

const translations = {
  en: enTranslations,
  nl: nlTranslations,
  id: idTranslations,
};

// Store the current locale - will be set by components that have access to Astro.currentLocale
let _currentLocale = 'en';

// Function to set the current locale from components
export function setCurrentLocale(locale: string) {
  _currentLocale = locale;
}

export function getTranslations(locale?: string) {
  const currentLocale = locale || _currentLocale;
  return translations[currentLocale as keyof typeof translations] || translations.en;
}

export function t(key: TranslationKey, locale?: string): string {
  const currentLocale = locale || _currentLocale;
  const translationObj = translations[currentLocale as keyof typeof translations] || translations.en;

  return getNestedValue(translationObj, key) || getNestedValue(translations.en, key) || key;
}

function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  return keys.reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj) as string;
}

export const defaultLocale = 'en';
export const locales = ['en', 'nl', 'id'];

export function getLocalizedPathname(pathname: string, locale: string): string {
  // Use Astro's built-in function to get the localized URL
  try {
    return getRelativeLocaleUrl(locale, pathname);
  } catch (error) {
    // Fallback implementation if the Astro function fails
    // Remove any existing locale prefix
    const strippedPath = stripLocalePrefixFromPath(pathname);

    // Add the new locale prefix if it's not the default locale
    return locale === defaultLocale ? strippedPath : `/${locale}${strippedPath}`;
  }
}

// Helper function to strip locale prefix from a path
function stripLocalePrefixFromPath(pathname: string): string {
  // Check if the path starts with any of the locales
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return pathname.substring(locale.length + 1) || '/';
    }
  }

  // Ensure path starts with a slash
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}
