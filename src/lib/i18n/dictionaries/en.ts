import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: {
    title: "id.140dev — frontend / web",
    description:
      "Portfolio of frontend developer id.140dev. Websites for brands, artists, and small studios.",
    ogDescription: "frontend / web · interaction"
  },
  nav: {
    aria: "navigation",
    home: "home",
    work: "work",
    about: "about",
    contact: "contact"
  },
  frame: {
    logoAria: "id.140dev — home",
    home: "home",
    work: "work",
    project: "project",
    about: "about",
    contact: "contact"
  },
  home: {
    pitch:
      "I build websites for brands, artists, and small studios. One project at a time.",
    viewWork: "view work",
    aboutLink: "about",
    projectsLabel: "projects",
    publishedLabel: "published",
    statusLabel: "status",
    statusValue: "open for work",
    featuredLabel: "featured"
  },
  about: {
    code: "03",
    title: "about",
    briefLabel: "brief",
    lead:
      "Frontend developer. I build websites for brands, artists, and small studios.",
    body:
      "One project at a time. I handle the brief myself and write everything from scratch — no CMS, no theme kits. A single site takes one to eight weeks, depending on animation and photography scope.",
    approachLabel: "approach",
    approach:
      "I start with the material: photos, copy, product, references. If there is something worth showing, the design grows around it. If not — the brief goes back for refinement.",
    end: "— end",
    write: "↳ write",
    rows: {
      name: "name",
      focus: "focus",
      team: "team",
      tools: "tools",
      avoids: "avoids",
      timezone: "timezone",
      load: "load"
    },
    rowValues: {
      focus: "frontend / web · interaction",
      team: "solo",
      tools: "next.js · gsap · three.js · tailwind",
      avoids: "page builders, no-code, templates",
      timezone: "UTC+10",
      load: "2 projects in progress · 1 slot open"
    }
  },
  contact: {
    code: "04",
    title: "contact",
    heading: "write",
    hint: "Hold the button for about one and a half seconds to reveal the email.",
    note: "short emails welcome.",
    holdAria: "hold to reveal email address",
    hold: "hold",
    emailLabel: "email",
    footer: "built with next.js · gsap · three.js"
  },
  work: {
    title: "work — id.140dev",
    code: "02",
    heading: "work",
    subtitle:
      "newest first. some projects are under NDA or still in progress.",
    columns: {
      num: "№",
      project: "project",
      year: "year",
      role: "role",
      status: "status"
    },
    status: {
      live: "published",
      private: "private",
      wip: "in progress"
    },
    total: "total",
    footer: "new projects are added as they go live."
  },
  project: {
    label: "project",
    meta: {
      year: "year",
      client: "client",
      role: "role",
      status: "status"
    },
    status: {
      live: "published",
      private: "private",
      wip: "in progress"
    },
    blockKinds: {
      text: "description",
      spec: "stack",
      code: "code",
      quote: "quote",
      image: "image"
    },
    noExternal: "no external link",
    back: "← all work"
  },
  notFound: {
    message: "this page does not exist.",
    back: "← home"
  },
  site: {
    alias: "id.140dev",
    name: "id.140dev",
    role: "frontend / web · interaction",
    city: "MEL · UTC+10",
    year: "2026"
  },
  projects: [
    {
      id: "001",
      slug: "anntiart",
      title: "anntiart — artist showcase site",
      year: "2026",
      client: "anntiart.ru",
      status: "live",
      role: "site · front-end · motion",
      external: { label: "anntiart.ru", href: "https://anntiart.ru" },
      blocks: [
        {
          kind: "text",
          body: "An experimental digital portfolio and visual playground combining brutalist aesthetics, atmospheric animation, and immersive front-end interactions."
        },
        {
          kind: "spec",
          body: "next.js · gsap · prisma · tailwind"
        },
        {
          kind: "text",
          body: "The project explores the overlap of web development, art direction, and cinematic UI through raw typography, layered composition, and unconventional navigation."
        }
      ]
    },
    {
      id: "002",
      slug: "vitrima",
      title: "vitrima — brand website",
      year: "2025",
      client: "vitrima.ru",
      status: "live",
      role: "site · front-end · 3d",
      external: { label: "vitrima.ru", href: "https://vitrima.ru" },
      blocks: [
        {
          kind: "text",
          body: "Corporate website for a company building an embeddable GPT-based widget for architecture firms and design studios."
        },
        {
          kind: "spec",
          body: "next.js · nest.js · gsap · tailwind"
        },
        {
          kind: "text",
          body: "Built around clear structure, readable navigation, and a focus on engineering reliability and production capabilities."
        }
      ]
    },
    {
      id: "003",
      slug: "transitfield",
      title: "transit/field — personal experiment",
      year: "2025",
      client: "—",
      status: "private",
      role: "webgl · experiment",
      blocks: [
        {
          kind: "text",
          body: "WebGL experiment. The cursor controls grid density and shifts the type. Not taken to public release."
        },
        {
          kind: "code",
          body: "// fragment.glsl\nfloat n = noise(uv * 8.0 + uTime * 0.05);\nuv += n * 0.04;\ngl_FragColor = texture2D(uTex, uv);"
        },
        {
          kind: "spec",
          body: "source saved, build not published"
        }
      ]
    },
    {
      id: "004",
      slug: "vercel-04",
      title: "vercel-04 — single-page series",
      year: "2026",
      client: "—",
      status: "wip",
      role: "site · subdomains",
      blocks: [
        {
          kind: "text",
          body: "Several small sites on separate Vercel subdomains. Each is one page and one interaction rule. The fourth is in progress."
        },
        {
          kind: "spec",
          body: "edge functions · one page per project"
        }
      ]
    }
  ]
};
