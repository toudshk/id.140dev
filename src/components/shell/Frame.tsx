"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { META } from "@/lib/data";
import { Logo } from "./Logo";
import { TLink } from "./TLink";

/**
 * Тонкая «рама» вокруг страницы:
 * имя в левом верхнем углу, локация и время в правом,
 * город слева снизу, год справа.
 */
export function Frame() {
  const pathname = usePathname();
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const z = (n: number) => String(n).padStart(2, "0");
      setTime(`${z(d.getHours())}:${z(d.getMinutes())}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="edge-frame">
      <span className="tick tl" />
      <span className="tick tr" />
      <span className="tick bl" />
      <span className="tick br" />

      <div className="edge-row top pl-6 pr-6">
        <div className="flex items-center gap-6">
          <TLink
            href="/"
            className="interactive group flex items-center gap-3"
            data-magnetic
            aria-label="id.140dev — на главную"
          >
            <Logo size={22} markOnly className="transition-opacity group-hover:opacity-80" />
            <span className="t-meta hidden sm:inline">{META.role}</span>
          </TLink>
        </div>
        <div className="flex items-center gap-6">
          <span className="t-meta hidden md:inline">{sectionLabel(pathname)}</span>
          <span className="t-meta tabular-nums">{time}</span>
        </div>
      </div>

      <div className="edge-row bot pl-6 pr-6">
        <span className="t-meta">{META.city}</span>
        <span className="t-meta hidden md:inline">© {META.year}</span>
      </div>
    </div>
  );
}

function sectionLabel(pathname: string) {
  if (pathname === "/") return "главная";
  if (pathname.startsWith("/work/")) return "проект";
  if (pathname.startsWith("/work")) return "работы";
  if (pathname.startsWith("/about")) return "обо мне";
  if (pathname.startsWith("/contact")) return "контакт";
  return "";
}
