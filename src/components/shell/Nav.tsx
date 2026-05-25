"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransitionTo } from "./Transition";

const ROUTES = [
  { label: "главная", href: "/", code: "01" },
  { label: "работы", href: "/work", code: "02" },
  { label: "обо мне", href: "/about", code: "03" },
  { label: "контакт", href: "/contact", code: "04" }
];

/**
 * Вертикальная навигация по правому краю.
 * Активный пункт удлиняет хайр-линию слева от себя.
 */
export function Nav() {
  const pathname = usePathname();
  const go = useTransitionTo();

  return (
    <nav
      className="fixed top-1/2 -translate-y-1/2 right-[var(--edge)] z-[85] hidden md:flex md:w-[var(--nav-rail)] md:justify-end pointer-events-none"
      aria-label="навигация"
    >
      <ul className="no-bullets flex flex-col items-end gap-5 pointer-events-auto">
        {ROUTES.map((r) => {
          const active =
            r.href === "/"
              ? pathname === "/"
              : pathname === r.href || pathname.startsWith(r.href + "/");
          return (
            <li key={r.href} className="flex items-center gap-3">
              <span
                className="t-meta"
                style={{ color: active ? "var(--bone)" : "var(--ash)" }}
              >
                {r.code}
              </span>
              <span
                aria-hidden
                className="block h-px"
                style={{
                  width: active ? 28 : 12,
                  background: active ? "var(--bone)" : "var(--ash)",
                  transition: "width 320ms var(--ease-out)"
                }}
              />
              <Link
                href={r.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(r.href);
                }}
                className="t-mono text-[11px]"
                data-magnetic
                style={{
                  color: active ? "var(--bone)" : "var(--ash)",
                  letterSpacing: "0.32em"
                }}
              >
                {r.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
