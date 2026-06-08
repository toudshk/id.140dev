"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, gsap } from "@/lib/gsap";
import { TLink } from "@/components/shell/TLink";
import { useI18n } from "@/lib/i18n/context";

export default function AboutPage() {
  const root = useRef<HTMLDivElement>(null);
  const { t, href } = useI18n();

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
          <div className="t-meta">{t.about.code}</div>
          <div className="t-meta mt-1">{t.about.title}</div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <h1
            className="t-display italic text-[12vw] md:text-[8vw] leading-[0.86] text-bone"
            data-line
          >
            {t.site.alias}
          </h1>
        </div>
      </header>

      <section className="grid grid-cols-12 gap-4 mb-32">
        <div className="col-span-12 md:col-span-4" data-line>
          <div className="t-meta">{t.about.briefLabel}</div>
        </div>
        <div className="col-span-12 md:col-span-7" data-line>
          <p className="t-grotesk text-[24px] md:text-[34px] leading-[1.25] text-bone/90 max-w-[36ch]">
            {t.about.lead}
          </p>
          <p className="t-grotesk text-[18px] md:text-[20px] leading-[1.5] text-bone/60 max-w-[44ch] mt-8">
            {t.about.body}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-4 border hairline">
        <Row label={t.about.rows.name} value={t.site.name} />
        <Row label={t.about.rows.focus} value={t.about.rowValues.focus} />
        <Row label={t.about.rows.team} value={t.about.rowValues.team} />
        <Row label={t.about.rows.tools} value={t.about.rowValues.tools} />
        <Row label={t.about.rows.avoids} value={t.about.rowValues.avoids} />
        <Row label={t.about.rows.timezone} value={t.about.rowValues.timezone} />
        <Row
          label={t.about.rows.load}
          value={t.about.rowValues.load}
          highlight
        />
      </div>

      <section className="grid grid-cols-12 gap-4 mt-32">
        <div className="col-span-12 md:col-span-4" data-line>
          <div className="t-meta">{t.about.approachLabel}</div>
        </div>
        <div className="col-span-12 md:col-span-7" data-line>
          <p className="t-grotesk text-[20px] md:text-[24px] leading-[1.45] text-bone/80 max-w-[44ch]">
            {t.about.approach}
          </p>
        </div>
      </section>

      <footer className="mt-32 grid grid-cols-12 gap-4 items-end border-t hairline pt-6">
        <div className="col-span-12 md:col-span-6" data-line>
          <span className="t-meta">{t.about.end}</span>
        </div>
        <div className="col-span-12 md:col-span-6 flex justify-end" data-line>
          <TLink
            href={href("/contact")}
            className="t-stretch text-[8vw] md:text-[4vw] text-bone hover:text-acid transition-colors"
          >
            {t.about.write}
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
