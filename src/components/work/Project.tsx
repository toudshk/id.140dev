"use client";

import { useEffect, useRef } from "react";
import { TLink } from "@/components/shell/TLink";
import { ensureGsap, gsap } from "@/lib/gsap";
import type { Project, Block } from "@/lib/data";

/**
 * Страница одного проекта.
 * Сохранён крупный outline-номер слева (визуальный якорь),
 * под ним идут блоки описания: текст / спека / цитата / код.
 */
export function ProjectView({ project }: { project: Project }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      await ensureGsap();
      if (cancel || !root.current) return;
      const ctx = gsap.context(() => {
        gsap.from("[data-id]", {
          xPercent: -8,
          autoAlpha: 0,
          duration: 1.2,
          ease: "arch"
        });
        gsap.from("[data-art-meta]", {
          y: 12,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.06,
          delay: 0.2
        });
        gsap.from("[data-block]", {
          y: 32,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.1,
          delay: 0.5,
          ease: "arch"
        });
      }, root);
      return () => ctx.revert();
    })();
    return () => {
      cancel = true;
    };
  }, [project.id]);

  return (
    <article
      ref={root}
      className="min-h-screen px-[var(--edge)] pt-[calc(var(--edge)*4)] pb-[calc(var(--edge)*4)]"
    >
      <header className="grid grid-cols-12 gap-4 mb-16">
        <div className="col-span-12 md:col-span-5 relative">
          <div
            data-id
            aria-hidden
            className="t-stretch outline text-[36vw] md:text-[20vw] leading-[0.78] select-none"
          >
            {project.id}
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 flex flex-col justify-end">
          <div className="t-meta mb-3" data-art-meta>
            проект {project.id}
          </div>
          <h1
            className="t-display italic text-[8vw] md:text-[5vw] leading-[0.9] text-bone max-w-[18ch]"
            data-art-meta
          >
            {project.title}
          </h1>
        </div>
      </header>

      <section className="grid grid-cols-12 gap-4 border-y hairline py-6 mb-20">
        {[
          ["год", project.year],
          ["клиент", project.client],
          ["роль", project.role],
          ["статус", project.status === "live" ? "опубликован" : project.status === "wip" ? "в работе" : "приватный"]
        ].map(([k, v]) => (
          <div
            key={k}
            className="col-span-6 md:col-span-3 flex flex-col gap-1"
            data-art-meta
          >
            <span className="t-meta">{k}</span>
            <span className="t-mono text-[12px] text-bone tracking-[0.2em] uppercase">
              {v}
            </span>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-12 gap-y-16 md:gap-y-24 gap-x-4">
        {project.blocks.map((b, i) => (
          <BlockView key={i} block={b} index={i} />
        ))}
      </section>

      <footer className="mt-32 grid grid-cols-12 gap-4 items-end border-t hairline pt-6">
        <div className="col-span-12 md:col-span-6">
          {project.external ? (
            <a
              href={project.external.href}
              target="_blank"
              rel="noreferrer"
              className="t-stretch text-[8vw] md:text-[4vw] text-bone hover:text-acid transition-colors"
              data-magnetic
            >
              ↗ {project.external.label}
            </a>
          ) : (
            <span className="t-meta">внешней ссылки нет</span>
          )}
        </div>
        <div className="col-span-12 md:col-span-6 flex justify-end">
          <TLink
            href="/work"
            className="t-mono text-[12px] text-bone tracking-[0.32em] border-b border-bone/40 pb-1"
          >
            ← все работы
          </TLink>
        </div>
      </footer>
    </article>
  );
}

function BlockView({ block, index }: { block: Block; index: number }) {
  const layouts = [
    "col-span-12 md:col-span-7 md:col-start-3",
    "col-span-12 md:col-span-5 md:col-start-7",
    "col-span-12 md:col-span-6 md:col-start-2",
    "col-span-12 md:col-span-8 md:col-start-3",
    "col-span-12 md:col-span-5 md:col-start-6"
  ];
  const wrap = layouts[index % layouts.length];

  return (
    <div className={wrap} data-block>
      <div className="flex items-center gap-3 mb-3">
        <span className="t-meta">{String(index + 1).padStart(2, "0")}</span>
        <span aria-hidden className="block h-px w-12 bg-ash/40" />
        <span className="t-meta">{labelFor(block.kind)}</span>
      </div>
      {block.kind === "quote" ? (
        <blockquote className="t-display italic text-[5vw] md:text-[2.6vw] leading-[1.05] text-bone">
          {block.body}
          {block.caption && (
            <cite className="block t-mono not-italic text-[11px] tracking-[0.32em] text-ash mt-4">
              {block.caption}
            </cite>
          )}
        </blockquote>
      ) : block.kind === "spec" ? (
        <div className="t-mono text-[12px] text-bone tracking-[0.16em] uppercase border-l border-acid/60 pl-4">
          {block.body}
        </div>
      ) : block.kind === "code" ? (
        <pre className="t-mono text-[11px] leading-[1.7] text-bone bg-iron/60 p-5 overflow-x-auto whitespace-pre">
          {block.body}
        </pre>
      ) : (
        <p className="t-grotesk text-[20px] md:text-[26px] leading-[1.35] text-bone/90 max-w-[44ch]">
          {block.body}
        </p>
      )}
    </div>
  );
}

function labelFor(kind: Block["kind"]): string {
  switch (kind) {
    case "text":
      return "описание";
    case "spec":
      return "стек";
    case "code":
      return "код";
    case "quote":
      return "цитата";
    case "image":
      return "изображение";
    default:
      return kind;
  }
}
