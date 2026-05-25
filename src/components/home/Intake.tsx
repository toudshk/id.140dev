"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, gsap } from "@/lib/gsap";
import { ShaderPlane } from "./ShaderPlane";
import { Glyphs } from "./Glyphs";
import { TLink } from "@/components/shell/TLink";
import { PROJECTS, META } from "@/lib/data";

export function Intake() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      await ensureGsap();
      if (cancel || !root.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.4 });
        tl.from("[data-mark]", {
          autoAlpha: 0,
          y: 18,
          duration: 0.9,
          stagger: 0.06
        });
        tl.from(
          "[data-display] span",
          {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.04,
            ease: "arch"
          },
          "-=0.6"
        );
        tl.from(
          "[data-side]",
          { autoAlpha: 0, x: 30, stagger: 0.08, duration: 0.8 },
          "-=0.6"
        );
      }, root);

      return () => ctx.revert();
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const live = PROJECTS.filter((p) => p.status === "live").length;

  return (
    <section
      ref={root}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <ShaderPlane />

      <div className="relative z-10 grid min-h-screen grid-cols-12 gap-4 px-[var(--edge)] py-[calc(var(--edge)*3)]">
        {/* левая колонка */}
        <aside className="col-span-12 md:col-span-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="t-meta" data-mark>
              {META.alias}
            </div>
            <div className="t-meta" data-mark>
              {META.role}
            </div>
            <div className="t-meta" data-mark>
              {META.city}
            </div>
          </div>
          <div className="hidden md:block space-y-3 mt-12">
            <div className="rule" data-mark />
            <p
              className="t-mono text-[11px] leading-[1.7] text-bone/70 max-w-[28ch]"
              data-mark
            >
              Делаю сайты для брендов, художников и небольших студий.
              Беру по одному проекту за раз.
            </p>
          </div>
        </aside>

        {/* центр — большое имя */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
          <h1
            data-display
            className="t-stretch text-[14vw] md:text-[10vw] leading-[0.78] text-bone"
            aria-label="id.140dev"
          >
            <span className="inline-block overflow-hidden">
              <span className="inline-block">id</span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="inline-block">.140</span>
            </span>
            <br />
            <span className="inline-block overflow-hidden italic font-display font-normal text-[12vw] md:text-[8.6vw] tracking-[-0.06em]">
              <span className="inline-block">— frontend / web</span>
            </span>
          </h1>

          <div className="mt-10 max-w-[44ch]">
            <Glyphs text="next.js · gsap · three.js · interaction" />
          </div>

          <div className="mt-12 flex items-center gap-6">
            <TLink
              href="/work"
              className="group inline-flex items-center gap-3 t-mono text-[12px] text-bone tracking-[0.32em] border-b border-bone/40 pb-1"
              data-mark
            >
              <span>посмотреть работы</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                ⟶
              </span>
            </TLink>
            <TLink
              href="/about"
              className="t-mono text-[11px] text-ash tracking-[0.32em]"
              data-mark
            >
              обо мне
            </TLink>
          </div>
        </div>

        {/* правая колонка — счётчики */}
        <aside className="col-span-12 md:col-span-2 flex flex-col items-end justify-between text-right">
          <div className="space-y-1" data-side>
            <div className="t-meta">проектов</div>
            <div className="t-stretch text-bone text-[44px] leading-none tabular-nums">
              {String(live).padStart(2, "0")}
            </div>
            <div className="t-meta">опубликовано</div>
          </div>

          <div className="space-y-1 mt-10" data-side>
            <div className="t-meta">статус</div>
            <div className="t-mono text-[11px] text-acid">
              открыт к заказам
            </div>
          </div>

          <div className="space-y-2 mt-10" data-side>
            <div className="t-meta">избранное</div>
            <a
              href="https://anntiart.ru"
              target="_blank"
              rel="noreferrer"
              className="block t-mono text-[11px] text-bone/70 hover:text-bone"
            >
              ↗ anntiart.ru
            </a>
            <a
              href="https://vitrima.ru"
              target="_blank"
              rel="noreferrer"
              className="block t-mono text-[11px] text-bone/70 hover:text-bone"
            >
              ↗ vitrima.ru
            </a>
          </div>
        </aside>
      </div>

      {/* «нога» главной — крупная outline-цифра */}
      <div className="pointer-events-none absolute bottom-[calc(var(--edge)*2)] left-[var(--edge)] right-[var(--edge)] z-10 flex items-end justify-between">
        <span className="outline t-stretch text-[14vw] leading-[0.8] hidden md:block select-none">
          140
        </span>
      </div>
    </section>
  );
}
