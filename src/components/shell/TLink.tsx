"use client";

import { ComponentPropsWithoutRef } from "react";
import { useTransitionTo } from "./Transition";

/**
 * Ссылка, которая всегда проходит через слой створок.
 * Используется везде, кроме Nav (который вызывает transitionTo напрямую).
 */
export function TLink({
  href,
  onClick,
  children,
  ...rest
}: ComponentPropsWithoutRef<"a"> & { href: string }) {
  const go = useTransitionTo();
  return (
    <a
      href={href}
      onClick={(e) => {
        if (
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.button !== 0 ||
          href.startsWith("http")
        ) {
          return;
        }
        e.preventDefault();
        onClick?.(e);
        go(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
