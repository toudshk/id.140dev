"use client";

import { TLink } from "@/components/shell/TLink";
import { defaultLocale, localeHref } from "@/lib/i18n";

export default function NotFound() {
  return (
    <section className="min-h-screen px-[var(--edge)] pt-[calc(var(--edge)*4)] pb-[calc(var(--edge)*4)] flex flex-col justify-between">
      <div>
        <div className="t-meta">404</div>
        <h1
          aria-hidden
          className="t-stretch outline text-[28vw] md:text-[20vw] leading-[0.78] mt-12 select-none"
        >
          404
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-12">
        <div className="col-span-12 md:col-span-6">
          <p className="t-display italic text-[6vw] md:text-[3vw] leading-[1] text-bone">
            такой страницы нет.
          </p>
        </div>
        <div className="col-span-12 md:col-span-6 flex md:justify-end items-end">
          <TLink
            href={localeHref(defaultLocale, "/")}
            className="t-mono text-[12px] text-bone tracking-[0.32em] border-b border-bone/40 pb-1"
          >
            ← на главную
          </TLink>
        </div>
      </div>
    </section>
  );
}
