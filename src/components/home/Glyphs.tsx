"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, gsap } from "@/lib/gsap";

const GLYPHS = "▮▯◇◈◉◐◑◒◓⌗§¶†‡↯⊘⊙⊚⊛⊜⊝";

/**
 * Кинетическая «лента глифов» под заголовком.
 * Каждый символ изредка подменяется на случайный — система кажется
 * нестабильной, но не сломанной.
 */
export function Glyphs({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancel = false;
    let intervalId: number | null = null;

    (async () => {
      await ensureGsap();
      if (cancel || !ref.current) return;
      const spans = ref.current.querySelectorAll<HTMLSpanElement>("[data-g]");
      gsap.from(spans, {
        autoAlpha: 0,
        y: 12,
        duration: 0.7,
        stagger: { each: 0.03, from: "random" },
        ease: "arch"
      });

      intervalId = window.setInterval(() => {
        const i = Math.floor(Math.random() * spans.length);
        const span = spans[i];
        if (!span) return;
        const original = span.dataset.original ?? span.textContent ?? "";
        span.dataset.original = original;
        span.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        window.setTimeout(() => {
          if (span.dataset.original) span.textContent = span.dataset.original;
        }, 90);
      }, 220);
    })();

    return () => {
      cancel = true;
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, [text]);

  return (
    <div
      ref={ref}
      className="t-mono text-[11px] text-bone/60 tracking-[0.5em] flex flex-wrap gap-x-2"
    >
      {text.split("").map((c, i) => (
        <span key={i} data-g>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </div>
  );
}
