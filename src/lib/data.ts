/**
 * Данные портфолио id.140dev.
 * Каждый блок проекта может быть текстом, спецификацией, цитатой клиента или кодом.
 */

export type Block = {
  kind: "image" | "quote" | "text" | "spec" | "code";
  body: string;
  caption?: string;
};

export type Project = {
  /** номер по порядку — выводится крупно */
  id: string;
  /** короткий слаг для маршрута /work/<slug> */
  slug: string;
  title: string;
  year: string;
  client: string;
  /** live — опубликован, private — личный, не для публики, wip — в работе */
  status: "live" | "private" | "wip";
  /** короткий тег жанра */
  role: string;
  external?: { label: string; href: string };
  blocks: Block[];
};

export const PROJECTS: Project[] = [
  {
    id: "001",
    slug: "anntiart",
    title: "anntiart — сайт-витрина художницы",
    year: "2026",
    client: "anntiart.ru",
    status: "live",
    role: "сайт · фронт · анимация",
    external: { label: "anntiart.ru", href: "https://anntiart.ru" },
    blocks: [
      {
        kind: "text",
        body: "Экспериментальное цифровое портфолио и визуальный playground, сочетающий бруталистичную эстетику, атмосферную анимацию и иммерсивные frontend-интеракции."
      },
      {
        kind: "spec",
        body: "next.js · gsap · prisma · tailwind"
      },
      {
        kind: "text",
        body: "Проект исследует пересечение веб-разработки, арт-дирекшна и кинематографичного UI через сырую типографику, слоистую композицию и нестандартную навигацию."
      }
    ]
  },
  {
    id: "002",
    slug: "vitrima",
    title: "vitrima — сайт бренда",
    year: "2025",
    client: "vitrima.ru",
    status: "live",
    role: "сайт · фронт · 3d",
    external: { label: "vitrima.ru", href: "https://vitrima.ru" },
    blocks: [
      {
        kind: "text",
        body: "Корпоративный сайт компании, специализирующейся на встраиваемом виджете на базе GPT для архитектурных бюро и дизайн-студий"
      },
      {
        kind: "spec",
        body: "next.js · nest.js · gsap · tailwind"
      },
      {
        kind: "text",
        body: "Проект выстроен вокруг точной структуры, понятной навигации и акцента на инженерной надёжности и производственных возможностях."
      }
    ]
  },
  {
    id: "003",
    slug: "transitfield",
    title: "transit/field — личный эксперимент",
    year: "2025",
    client: "—",
    status: "private",
    role: "webgl · эксперимент",
    blocks: [
      {
        kind: "text",
        body: "WebGL-эксперимент. Курсор управляет плотностью сетки и сдвигает текст. До публичного релиза не доведён."
      },
      {
        kind: "code",
        body: "// fragment.glsl\nfloat n = noise(uv * 8.0 + uTime * 0.05);\nuv += n * 0.04;\ngl_FragColor = texture2D(uTex, uv);"
      },
      {
        kind: "spec",
        body: "исходники сохранены, сборка не публикуется"
      }
    ]
  },
  {
    id: "004",
    slug: "vercel-04",
    title: "vercel-04 — серия одностраничников",
    year: "2026",
    client: "—",
    status: "wip",
    role: "сайт · поддомены",
    blocks: [
      {
        kind: "text",
        body: "Несколько маленьких сайтов на отдельных поддоменах Vercel. Каждый — одна страница и одно правило взаимодействия. Сейчас в работе четвёртый."
      },
      {
        kind: "spec",
        body: "edge-функции · по одной странице на проект"
      }
    ]
  }
];

export const META = {
  alias: "id.140dev",
  name: "id.140dev",
  role: "frontend / web · interaction",
  city: "MEL · UTC+10",
  year: "2026"
};
