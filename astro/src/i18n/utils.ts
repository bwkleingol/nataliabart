import { getLocale } from 'astro-i18n';
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

export function getTranslations() {
  const locale = getLocale() || 'en';
  return translations[locale as keyof typeof translations] || translations.en;
}

export function t(key: TranslationKey): string {
  const locale = getLocale() || 'en';
  const translationObj = translations[locale as keyof typeof translations] || translations.en;
  
  return getNestedValue(translationObj, key) || getNestedValue(translations.en, key) || key;
}

function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  return keys.reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj) as string;
}

export const defaultLocale = 'en';
export const locales = ['en', 'nl', 'id'];

export function getLocalizedPathname(pathname: string, locale: string): string {
  // Remove the current locale prefix if it exists
  const currentLocale = getLocale();
  let path = pathname;
  
  if (currentLocale) {
    const localePrefix = `/${currentLocale}`;
    if (pathname.startsWith(localePrefix)) {
      path = pathname.substring(localePrefix.length) || '/';
    }
  }
  
  // Ensure path starts with a slash
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  
  // Add the new locale prefix
  return locale === defaultLocale ? path : `/${locale}${path}`;
}
