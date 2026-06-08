"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap, gsap } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n/context";
import { TLink } from "@/components/shell/TLink";

export function WorkList() {
  const root = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);
  const { t, href } = useI18n();
  const projects = t.projects;

  useEffect(() => {
    let cancel = false;
    (async () => {
      await ensureGsap();
      if (cancel || !root.current) return;
      const ctx = gsap.context(() => {
        gsap.from("[data-row]", {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "arch"
        });
        gsap.from("[data-led-meta]", {
          x: 12,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "arch",
          delay: 0.2
        });
      }, root);
      return () => ctx.revert();
    })();
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <section
      ref={root}
      className="min-h-screen px-[var(--edge)] pt-[calc(var(--edge)*4)] pb-[calc(var(--edge)*4)]"
    >
      <header className="mb-16 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3" data-led-meta>
          <div className="t-meta">{t.work.code}</div>
          <div className="t-meta mt-1">{t.work.heading}</div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="t-display italic text-[10vw] md:text-[7vw] leading-[0.86] text-bone">
            {t.work.heading} / 2024 — 2026
          </h2>
          <p className="t-mono text-[11px] tracking-[0.28em] text-ash mt-6 max-w-[60ch]">
            {t.work.subtitle}
          </p>
        </div>
      </header>

      <div
        className="hidden md:grid grid-cols-12 gap-4 t-meta border-b hairline pb-3 mb-2 sticky top-[calc(var(--edge)*2)] bg-void/80 backdrop-blur-[2px] z-20"
        data-led-meta
      >
        <span className="col-span-1">{t.work.columns.num}</span>
        <span className="col-span-5">{t.work.columns.project}</span>
        <span className="col-span-2">{t.work.columns.year}</span>
        <span className="col-span-2">{t.work.columns.role}</span>
        <span className="col-span-2 text-right">{t.work.columns.status}</span>
      </div>

      <ul className="no-bullets divide-y hairline">
        {projects.map((p) => {
          const closed = p.status === "private";

          return (
            <li
              key={p.id}
              data-row
              className="group relative grid grid-cols-12 gap-4 py-7 md:py-6 transition-colors"
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover((h) => (h === p.id ? null : h))}
            >
              <span className="col-span-2 md:col-span-1 t-mono text-[11px] text-ash tabular-nums self-center">
                {p.id}
              </span>

              <div className="col-span-10 md:col-span-5 self-center">
                {closed ? (
                  <span className="t-stretch text-[5vw] md:text-[2.6vw] text-ash/70 select-none cursor-not-allowed">
                    {p.title}
                  </span>
                ) : (
                  <TLink
                    href={href(`/work/${p.slug}`)}
                    className="block"
                    data-magnetic
                  >
                    <span
                      className="t-stretch text-[6vw] md:text-[3.2vw] text-bone leading-[0.9] inline-block transition-transform"
                      style={{
                        transform:
                          hover === p.id
                            ? "translateX(0.4ch) skewX(-2deg)"
                            : "translateX(0) skewX(0)"
                      }}
                    >
                      {p.title}
                    </span>
                  </TLink>
                )}
                <div className="t-meta mt-2 md:hidden">
                  {p.year} · {p.role}
                </div>
              </div>

              <span className="hidden md:block col-span-2 t-mono text-[11px] text-bone/70 self-center tabular-nums">
                {p.year}
              </span>
              <span className="hidden md:block col-span-2 t-mono text-[11px] text-ash self-center">
                {p.role}
              </span>
              <span
                className="hidden md:flex col-span-2 t-mono text-[11px] tracking-[0.28em] self-center justify-end items-center gap-2"
                style={{
                  color:
                    p.status === "live"
                      ? "var(--acid)"
                      : p.status === "wip"
                        ? "var(--bone)"
                        : "var(--ash)"
                }}
              >
                <span
                  aria-hidden
                  className="block w-2 h-2"
                  style={{
                    background:
                      p.status === "live"
                        ? "var(--acid)"
                        : p.status === "wip"
                          ? "var(--bone)"
                          : "var(--blood)",
                    transform: p.status === "wip" ? "rotate(45deg)" : "none"
                  }}
                />
                {t.work.status[p.status]}
              </span>
            </li>
          );
        })}
      </ul>

      <footer className="mt-24 grid grid-cols-12 gap-4 t-meta">
        <div className="col-span-12 md:col-span-3">
          {t.work.total}: {projects.length}
        </div>
        <div className="col-span-12 md:col-span-9 text-bone/60">
          {t.work.footer}
        </div>
      </footer>
    </section>
  );
}
