import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Frame } from "@/components/shell/Frame";
import { Nav } from "@/components/shell/Nav";
import { Cursor } from "@/components/shell/Cursor";
import { Grain } from "@/components/shell/Grain";
import { TransitionProvider } from "@/components/shell/Transition";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { I18nProvider } from "@/lib/i18n/context";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({
  params
}: {
  params: { locale: string };
}): Metadata {
  const locale = isLocale(params.locale) ? params.locale : "ru";
  const t = getDictionary(locale);

  return {
    title: t.meta.title,
    description: t.meta.description,
    openGraph: {
      title: t.site.alias,
      description: t.meta.ogDescription
    }
  };
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const locale = params.locale as Locale;

  return (
    <I18nProvider locale={locale}>
      <TransitionProvider>
        <main
          data-archive-page
          className="relative z-10 min-h-screen md:pr-[var(--nav-rail)]"
        >
          {children}
        </main>
        <Frame />
        <Nav />
      </TransitionProvider>
      <Grain />
      <Cursor />
    </I18nProvider>
  );
}
