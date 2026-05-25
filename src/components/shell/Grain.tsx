"use client";

import { useEffect, useRef } from "react";

/**
 * Шум живой: каждые 80мс мы сдвигаем фон на пол-пикселя.
 * Это и есть «зерно», а не статичная текстура.
 */
export function Grain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const tick = (t: number) => {
      if (t - last > 80 && ref.current) {
        const x = (Math.random() * 8 - 4).toFixed(2);
        const y = (Math.random() * 8 - 4).toFixed(2);
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        last = t;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div ref={ref} className="grain" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
    </>
  );
}
