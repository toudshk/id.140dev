export const locales = ["ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localeHref(locale: Locale, path: string): string {
  let normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized !== "/" && !normalized.endsWith("/")) {
    normalized = `${normalized}/`;
  }
  if (normalized === "/") return `/${locale}/`;
  return `/${locale}${normalized}`;
}

export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (isLocale(first)) {
    const rest = segments.slice(1);
    return {
      locale: first,
      path: rest.length ? `/${rest.join("/")}` : "/"
    };
  }

  return { locale: defaultLocale, path: pathname || "/" };
}
