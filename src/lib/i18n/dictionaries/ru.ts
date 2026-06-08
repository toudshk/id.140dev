import type { Dictionary } from "../types";

export const ru: Dictionary = {
  meta: {
    title: "id.140dev — frontend / web",
    description:
      "Портфолио фронтенд-разработчика id.140dev. Сайты для брендов, художников и небольших студий.",
    ogDescription: "frontend / web · interaction"
  },
  nav: {
    aria: "навигация",
    home: "главная",
    work: "работы",
    about: "обо мне",
    contact: "контакт"
  },
  frame: {
    logoAria: "id.140dev — на главную",
    home: "главная",
    work: "работы",
    project: "проект",
    about: "обо мне",
    contact: "контакт"
  },
  home: {
    pitch:
      "Делаю сайты для брендов, художников и небольших студий. Беру по одному проекту за раз.",
    viewWork: "посмотреть работы",
    aboutLink: "обо мне",
    projectsLabel: "проектов",
    publishedLabel: "опубликовано",
    statusLabel: "статус",
    statusValue: "открыт к заказам",
    featuredLabel: "избранное"
  },
  about: {
    code: "03",
    title: "обо мне",
    briefLabel: "кратко",
    lead:
      "Фронтенд-разработчик. Делаю сайты для брендов, художников и небольших студий.",
    body:
      "Беру по одному проекту за раз. Брифую сам, пишу всё с нуля, без CMS и сборных тем. Срок одного сайта — от одной до восьми недель, в зависимости от объёма анимации и съёмки.",
    approachLabel: "какой подход",
    approach:
      "Сначала смотрю на материал: фотографии, тексты, продукт, референсы. Если есть что показать, дизайн собирается вокруг него. Если нет — возвращаю бриф на доработку.",
    end: "— конец",
    write: "↳ написать",
    rows: {
      name: "имя",
      focus: "специализация",
      team: "работает",
      tools: "инструменты",
      avoids: "не использует",
      timezone: "часовой пояс",
      load: "загрузка"
    },
    rowValues: {
      focus: "frontend / web · interaction",
      team: "один",
      tools: "next.js · gsap · three.js · tailwind",
      avoids: "конструкторы, no-code, шаблоны",
      timezone: "UTC+10",
      load: "2 проекта в работе · 1 свободный слот"
    }
  },
  contact: {
    code: "04",
    title: "контакт",
    heading: "написать",
    hint: "Чтобы получить почту, удержите кнопку полторы секунды.",
    note: "короткое письмо приветствуется.",
    holdAria: "удерживайте, чтобы получить адрес",
    hold: "удерживать",
    emailLabel: "почта",
    footer: "сделано с next.js · gsap · three.js"
  },
  work: {
    title: "работы — id.140dev",
    code: "02",
    heading: "работы",
    subtitle:
      "от свежих к старым. часть проектов закрыта по NDA или ещё в работе.",
    columns: {
      num: "№",
      project: "проект",
      year: "год",
      role: "роль",
      status: "статус"
    },
    status: {
      live: "опубликован",
      private: "приватный",
      wip: "в работе"
    },
    total: "всего",
    footer: "новые проекты добавляются по мере публикации."
  },
  project: {
    label: "проект",
    meta: {
      year: "год",
      client: "клиент",
      role: "роль",
      status: "статус"
    },
    status: {
      live: "опубликован",
      private: "приватный",
      wip: "в работе"
    },
    blockKinds: {
      text: "описание",
      spec: "стек",
      code: "код",
      quote: "цитата",
      image: "изображение"
    },
    noExternal: "внешней ссылки нет",
    back: "← все работы"
  },
  notFound: {
    message: "такой страницы нет.",
    back: "← на главную"
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
  ]
};
