"use client";

import { createContext, useContext, useEffect } from "react";
import { getDictionary, localeHref, type Dictionary, type Locale } from "@/lib/i18n";

type I18nContextValue = {
  locale: Locale;
  t: Dictionary;
  href: (path: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  children
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = getDictionary(locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nContext.Provider
      value={{
        locale,
        t,
        href: (path) => localeHref(locale, path)
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
