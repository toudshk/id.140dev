import { en } from "./dictionaries/en";
import { ru } from "./dictionaries/ru";
import { defaultLocale, type Locale } from "./config";

export { locales, defaultLocale, localeHref, stripLocale, isLocale } from "./config";
export type { Locale } from "./config";
export type { Dictionary } from "./types";

const dictionaries = { ru, en } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
