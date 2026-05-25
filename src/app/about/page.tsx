"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, gsap } from "@/lib/gsap";
import { TLink } from "@/components/shell/TLink";
import { META } from "@/lib/data";

export default function AboutPage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      await ensureGsap();
      if (cancel || !root.current) return;
      const ctx = gsap.context(() => {
        gsap.from("[data-line]", {
          y: 16,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "arch"
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
      <header className="grid grid-cols-12 gap-4 mb-20">
        <div className="col-span-12 md:col-span-4" data-line>
          <div className="t-meta">03</div>
          <div className="t-meta mt-1">обо мне</div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <h1
            className="t-display italic text-[12vw] md:text-[8vw] leading-[0.86] text-bone"
            data-line
          >
            {META.alias}
          </h1>
        </div>
      </header>

      <section className="grid grid-cols-12 gap-4 mb-32">
        <div className="col-span-12 md:col-span-4" data-line>
          <div className="t-meta">кратко</div>
        </div>
        <div className="col-span-12 md:col-span-7" data-line>
          <p className="t-grotesk text-[24px] md:text-[34px] leading-[1.25] text-bone/90 max-w-[36ch]">
            Фронтенд-разработчик. Делаю сайты для брендов,
            художников и небольших студий.
          </p>
          <p className="t-grotesk text-[18px] md:text-[20px] leading-[1.5] text-bone/60 max-w-[44ch] mt-8">
            Беру по одному проекту за раз. Брифую сам, пишу всё с нуля,
            без CMS и сборных тем. Срок одного сайта — от одной до восьми
            недель, в зависимости от объёма анимации и съёмки.
          </p>
        </div>
      </section>

      {/* факты */}
      <div className="grid grid-cols-12 gap-4 border hairline">
        <Row label="имя" value={META.name} />
        <Row label="специализация" value="frontend / web · interaction" />
        <Row label="работает" value="один" />
        <Row label="инструменты" value="next.js · gsap · three.js · tailwind" />
        <Row label="не использует" value="конструкторы, no-code, шаблоны" />
        <Row label="часовой пояс" value="UTC+10" />
        <Row label="загрузка" value="2 проекта в работе · 1 свободный слот" highlight />
      </div>

      <section className="grid grid-cols-12 gap-4 mt-32">
        <div className="col-span-12 md:col-span-4" data-line>
          <div className="t-meta">какой подход</div>
        </div>
        <div className="col-span-12 md:col-span-7" data-line>
          <p className="t-grotesk text-[20px] md:text-[24px] leading-[1.45] text-bone/80 max-w-[44ch]">
            Сначала смотрю на материал: фотографии, тексты, продукт, референсы.
            Если есть что показать, дизайн собирается вокруг него.
            Если нет — возвращаю бриф на доработку.
          </p>
        </div>
      </section>

      <footer className="mt-32 grid grid-cols-12 gap-4 items-end border-t hairline pt-6">
        <div className="col-span-12 md:col-span-6" data-line>
          <span className="t-meta">— конец</span>
        </div>
        <div className="col-span-12 md:col-span-6 flex justify-end" data-line>
          <TLink
            href="/contact"
            className="t-stretch text-[8vw] md:text-[4vw] text-bone hover:text-acid transition-colors"
          >
            ↳ написать
          </TLink>
        </div>
      </footer>
    </section>
  );
}

function Row({
  label,
  value,
  highlight
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <>
      <div
        className="col-span-12 md:col-span-3 border-b hairline px-4 py-5 t-meta"
        data-line
      >
        {label}
      </div>
      <div
        className="col-span-12 md:col-span-9 border-b hairline px-4 py-5 t-mono text-[12px] tracking-[0.2em] uppercase relative flex items-center gap-3"
        data-line
        style={{ color: highlight ? "var(--acid)" : "var(--bone)" }}
      >
        {value}
      </div>
    </>
  );
}
