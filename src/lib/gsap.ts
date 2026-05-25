"use client";

import { gsap } from "gsap";

let registered = false;

export async function ensureGsap() {
  if (registered || typeof window === "undefined") return gsap;
  const [{ ScrollTrigger }, { CustomEase }] = await Promise.all([
    import("gsap/ScrollTrigger"),
    import("gsap/CustomEase")
  ]);
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  // Архивный изинг — медленный старт, обрыв в конце
  CustomEase.create("arch", "M0,0 C0.62,0 0.18,1 1,1");
  CustomEase.create("shutter", "M0,0 C0.86,0 0.07,1 1,1");

  gsap.defaults({ ease: "arch", duration: 0.9 });
  registered = true;
  return gsap;
}

export { gsap };
