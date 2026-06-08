"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap, gsap } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n/context";

export default function ContactPage() {
  const root = useRef<HTMLDivElement>(null);
  const hold = useRef<HTMLButtonElement>(null);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    let cancel = false;
    (async () => {
      await ensureGsap();
      if (cancel || !root.current) return;
      const ctx = gsap.context(() => {
        gsap.from("[data-tline]", {
          y: 18,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.06
        });
      }, root);
      return () => ctx.revert();
    })();
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    if (!hold.current) return;
    let pressed = false;
    let raf = 0;
    const start = (e: Event) => {
      e.preventDefault();
      pressed = true;
      const tick = () => {
        setProgress((p) => {
          const next = p + 1.6;
          if (next >= 100) {
            setRevealed(true);
            return 100;
          }
          return next;
        });
        if (pressed) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      pressed = false;
      cancelAnimationFrame(raf);
      if (!revealed) {
        const back = () =>
          setProgress((p) => {
            if (p <= 0) return 0;
            requestAnimationFrame(back);
            return Math.max(0, p - 4);
          });
        back();
      }
    };
    const el = hold.current;
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start, { passive: false });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      el.removeEventListener("mousedown", start);
      el.removeEventListener("touchstart", start);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
      cancelAnimationFrame(raf);
    };
  }, [revealed]);

  return (
    <section
      ref={root}
      className="min-h-screen px-[var(--edge)] pt-[calc(var(--edge)*4)] pb-[calc(var(--edge)*4)] flex flex-col"
    >
      <header className="grid grid-cols-12 gap-4 mb-24">
        <div className="col-span-12 md:col-span-4" data-tline>
          <div className="t-meta">{t.contact.code}</div>
          <div className="t-meta mt-1">{t.contact.title}</div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <h1
            className="t-display italic text-[12vw] md:text-[8vw] leading-[0.86] text-bone"
            data-tline
          >
            {t.contact.heading}
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4 flex-1 items-center">
        <div className="col-span-12 md:col-span-7" data-tline>
          <p className="t-grotesk text-[20px] md:text-[24px] leading-[1.45] text-bone/80 max-w-[44ch]">
            {t.contact.hint}
          </p>
          <p className="t-mono text-[11px] tracking-[0.32em] text-ash mt-6">
            {t.contact.note}
          </p>
        </div>

        <div className="col-span-12 md:col-span-5 flex flex-col items-start md:items-end">
          {!revealed ? (
            <button
              ref={hold}
              data-magnetic
              className="relative w-full md:w-[320px] h-[120px] border hairline overflow-hidden group"
              aria-label={t.contact.holdAria}
            >
              <span
                className="absolute inset-0 bg-bone origin-left"
                style={{
                  transform: `scaleX(${progress / 100})`,
                  transition: "transform 80ms linear"
                }}
                aria-hidden
              />
              <span
                className="absolute inset-0 flex items-center justify-center t-mono text-[12px] tracking-[0.4em]"
                style={{
                  color: progress > 50 ? "var(--void)" : "var(--bone)",
                  mixBlendMode: progress > 50 ? "difference" : "normal"
                }}
              >
                {t.contact.hold}
              </span>
              <span
                className="absolute bottom-2 right-3 t-mono text-[10px] text-ash tabular-nums"
                aria-hidden
              >
                {String(Math.round(progress)).padStart(3, "0")}%
              </span>
            </button>
          ) : (
            <div className="w-full md:w-auto">
              <div className="t-meta mb-2">{t.contact.emailLabel}</div>
              <a
                href="mailto:id.140dev@gmail.com"
                className="t-stretch text-[8vw] md:text-[3.6vw] text-acid hover:text-bone transition-colors block"
              >
                id.140dev@gmail.com
              </a>
              <div className="flex flex-col gap-2 mt-6 t-mono text-[11px] tracking-[0.28em] text-bone/70">
                <a href="https://t.me/toudshke" target="_blank" rel="noreferrer">
                  ↗ telegram / @toudshke
                </a>
                <a
                  href="https://github.com/toudshke"
                  target="_blank"
                  rel="noreferrer"
                >
                  ↗ github / toudshke
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-24 grid grid-cols-12 gap-4 t-meta" data-tline>
        <div className="col-span-12 md:col-span-6">
          © {new Date().getFullYear()} id.140dev
        </div>
        <div className="col-span-12 md:col-span-6 text-right">
          {t.contact.footer}
        </div>
      </footer>
    </section>
  );
}
