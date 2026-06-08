"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/context";
import { useTransitionTo } from "./Transition";

export function Nav() {
  const pathname = usePathname();
  const go = useTransitionTo();
  const { t, href } = useI18n();
  const { path } = stripLocale(pathname);

  const routes = [
    { label: t.nav.home, href: href("/"), code: "01", match: "/" },
    { label: t.nav.work, href: href("/work"), code: "02", match: "/work" },
    { label: t.nav.about, href: href("/about"), code: "03", match: "/about" },
    {
      label: t.nav.contact,
      href: href("/contact"),
      code: "04",
      match: "/contact"
    }
  ];

  return (
    <nav
      className="fixed top-1/2 -translate-y-1/2 right-[var(--edge)] z-[85] hidden md:flex md:w-[var(--nav-rail)] md:justify-end pointer-events-none"
      aria-label={t.nav.aria}
    >
      <ul className="no-bullets flex flex-col items-end gap-2 pointer-events-auto">
        {routes.map((r) => {
          const active =
            r.match === "/"
              ? path === "/"
              : path === r.match || path.startsWith(`${r.match}/`);

          return (
            <li key={r.match}>
              <Link
                href={r.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(r.href);
                }}
                aria-current={active ? "page" : undefined}
                className={[
                  "group flex items-center gap-3 py-2 pl-4 -mr-1 rounded-sm",
                  "transition-colors duration-200",
                  "hover:bg-bone/[0.04] focus-visible:bg-bone/[0.06]",
                  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-bone/50",
                  active ? "text-bone" : "text-ash hover:text-bone"
                ].join(" ")}
              >
                <span className="t-meta transition-colors">{r.code}</span>
                <span
                  aria-hidden
                  className={[
                    "block h-px shrink-0 transition-all duration-300 ease-[var(--ease-out)]",
                    active
                      ? "w-7 bg-bone"
                      : "w-3 bg-ash group-hover:w-5 group-hover:bg-bone/70"
                  ].join(" ")}
                />
                <span
                  className={[
                    "t-mono text-[11px] tracking-[0.32em] border-b pb-px transition-colors",
                    active
                      ? "border-bone/50"
                      : "border-transparent group-hover:border-bone/35"
                  ].join(" ")}
                >
                  {r.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
