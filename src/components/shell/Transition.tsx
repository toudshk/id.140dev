"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { ensureGsap, gsap } from "@/lib/gsap";

/**
 * Barba-эквивалент для App Router.
 *
 * Идея: семь вертикальных «створок» закрывают вьюпорт сверху вниз,
 * пока next/router меняет страницу. После маунта новой страницы те же
 * створки уходят снизу вверх — со сдвинутой задержкой между колонками.
 *
 * Это даёт ощущение «переключения слайда фильмоскопа», а не fade.
 */

type Ctx = {
  transitionTo: (href: string) => void;
  busy: boolean;
};
const TransitionCtx = createContext<Ctx>({
  transitionTo: () => {},
  busy: false
});

const SLATS = 7;

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const shutterRef = useRef<HTMLDivElement>(null);
  const slatsRef = useRef<HTMLSpanElement[]>([]);
  const pendingHref = useRef<string | null>(null);
  const justNavigated = useRef(false);
  const [busy, setBusy] = useState(false);

  // открываем створки при маунте новой страницы
  useEffect(() => {
    let cancelled = false;
    (async () => {
      await ensureGsap();
      if (cancelled) return;
      const slats = slatsRef.current.filter(Boolean);
      if (!slats.length) return;

      if (!justNavigated.current) {
        // первая загрузка — без шторки, быстрый мягкий вход
        gsap.set(slats, { scaleY: 0 });
        gsap.fromTo(
          "[data-archive-page]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "arch" }
        );
        return;
      }

      gsap.set(slats, { transformOrigin: "bottom center", scaleY: 1 });
      gsap.set("[data-archive-page]", { autoAlpha: 1, y: 0 });
      gsap.to(slats, {
        scaleY: 0,
        duration: 0.9,
        ease: "shutter",
        stagger: { each: 0.05, from: "edges" },
        onComplete: () => setBusy(false)
      });
      gsap.fromTo(
        "[data-archive-page]",
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "arch", delay: 0.18 }
      );
      justNavigated.current = false;
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const transitionTo = useCallback(
    async (href: string) => {
      if (busy) return;
      if (href === pathname) return;
      pendingHref.current = href;
      setBusy(true);
      await ensureGsap();
      const slats = slatsRef.current.filter(Boolean);
      gsap.set(slats, { transformOrigin: "top center", scaleY: 0 });
      const tl = gsap.timeline({
        onComplete: () => {
          justNavigated.current = true;
          router.push(href);
        }
      });
      tl.to(slats, {
        scaleY: 1,
        duration: 0.7,
        ease: "shutter",
        stagger: { each: 0.04, from: "start" }
      });
      tl.to(
        "[data-archive-page]",
        { y: -32, autoAlpha: 0, duration: 0.5, ease: "arch" },
        0
      );
    },
    [busy, pathname, router]
  );

  return (
    <TransitionCtx.Provider value={{ transitionTo, busy }}>
      {children}
      <div className="shutter" ref={shutterRef} aria-hidden="true">
        {Array.from({ length: SLATS }).map((_, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) slatsRef.current[i] = el;
            }}
          />
        ))}
      </div>
    </TransitionCtx.Provider>
  );
}

export function useTransitionTo() {
  return useContext(TransitionCtx).transitionTo;
}

export function useTransitionBusy() {
  return useContext(TransitionCtx).busy;
}
