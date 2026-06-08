"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { stripLocale } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/context";
import { Logo } from "./Logo";
import { LocaleSwitch } from "./LocaleSwitch";
import { TLink } from "./TLink";

export function Frame() {
  const pathname = usePathname();
  const { t, href } = useI18n();
  const { path } = stripLocale(pathname);
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
            href={href("/")}
            className="interactive group flex items-center gap-3"
            data-magnetic
            aria-label={t.frame.logoAria}
          >
            <Logo
              size={22}
              markOnly
              className="transition-opacity group-hover:opacity-80"
            />
            <span className="t-meta hidden sm:inline">{t.site.role}</span>
          </TLink>
        </div>
        <div className="flex items-center gap-6">
          <LocaleSwitch />
          <span className="t-meta hidden md:inline">
            {sectionLabel(path, t.frame)}
          </span>
          <span className="t-meta tabular-nums">{time}</span>
        </div>
      </div>

      <div className="edge-row bot pl-6 pr-6">
        <span className="t-meta">{t.site.city}</span>
        <span className="t-meta hidden md:inline">© {t.site.year}</span>
      </div>
    </div>
  );
}

function sectionLabel(
  path: string,
  frame: {
    home: string;
    work: string;
    project: string;
    about: string;
    contact: string;
  }
) {
  if (path === "/") return frame.home;
  if (path.startsWith("/work/")) return frame.project;
  if (path.startsWith("/work")) return frame.work;
  if (path.startsWith("/about")) return frame.about;
  if (path.startsWith("/contact")) return frame.contact;
  return "";
}
