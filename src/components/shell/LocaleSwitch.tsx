"use client";

import { usePathname } from "next/navigation";
import { localeHref, locales, stripLocale } from "@/lib/i18n";
import { useTransitionTo } from "./Transition";

export function LocaleSwitch() {
  const pathname = usePathname();
  const go = useTransitionTo();
  const { locale, path } = stripLocale(pathname);

  return (
    <div
      className="flex items-center gap-1 t-meta tabular-nums"
      role="group"
      aria-label="language"
    >
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden className="text-ash/50">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              if (l === locale) return;
              go(localeHref(l, path));
            }}
            aria-current={locale === l ? "true" : undefined}
            className={[
              "px-1 py-0.5 rounded-sm transition-colors uppercase tracking-[0.2em]",
              locale === l
                ? "text-bone"
                : "text-ash hover:text-bone focus-visible:text-bone"
            ].join(" ")}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
