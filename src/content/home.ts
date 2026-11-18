import { site } from "./site.ts"

export type Fact = {
  text: string
  href?: string
}

export type InfoCard = {
  title: string
  body: string
  emphasis?: boolean
  facts?: Fact[]
  chips?: readonly string[]
}

export type MockLayoutId = "split" | "thread" | "columns"

export const home = {
  hero: {
    extra: "[Текст: дополнительная строка героя — напиши сам]",
  },
  features: {
    id: "features",
    kicker: "01",
    title: "Возможности",
    intro: "[Текст: вводный абзац блока — напиши сам]",
    cards: [
      {
        title: "Клиент",
        body: "[Текст: описание функции — напиши сам]",
        emphasis: true,
      },
      {
        title: "Платформы",
        body: "[Текст: описание функции — напиши сам]",
        chips: site.platforms,
      },
      {
        title: "Версия",
        body: "[Текст: описание функции — напиши сам]",
        facts: [{ text: site.version }],
      },
      {
        title: "Лицензия",
        body: "[Текст: описание функции — напиши сам]",
        facts: [{ text: site.license, href: site.licenseUrl }],
      },
      {
        title: "Установщик",
        body: "[Текст: описание функции — напиши сам]",
        facts: [
          { text: site.windows.file, href: site.windows.href },
          { text: site.windows.size },
        ],
      },
      {
        title: "Исходный код",
        body: "[Текст: описание функции — напиши сам]",
        facts: [{ text: "github.com/metawka/exDesktop", href: site.githubUrl }],
      },
    ] satisfies InfoCard[],
  },
  studio: {
    id: "columns",
    kicker: "02",
    title: "Колонки",
    intro: "[Текст: подпись к макету — напиши сам]",
    layouts: [
      { id: "split", label: "Список" },
      { id: "thread", label: "Лента" },
      { id: "columns", label: "Три колонки" },
    ] satisfies { id: MockLayoutId; label: string }[],
  },
  install: {
    id: "install",
    kicker: "03",
    title: "Установка",
    intro: "[Текст: вводный абзац установки — напиши сам]",
    windowsNote: "[Текст: примечание к установке — напиши сам]",
    linuxNote: "[Текст: примечание к установке — напиши сам]",
    macosNote: "[Текст: примечание к установке — напиши сам]",
  },
  roadmap: {
    id: "roadmap",
    kicker: "04",
    title: "Дорожная карта",
    intro: "[Текст: вводный абзац дорожной карты — напиши сам]",
    items: [
      {
        title: "[Заголовок этапа — напиши сам]",
        body: "[Текст: пункт дорожной карты — напиши сам]",
      },
      {
        title: "[Заголовок этапа — напиши сам]",
        body: "[Текст: пункт дорожной карты — напиши сам]",
      },
      {
        title: "[Заголовок этапа — напиши сам]",
        body: "[Текст: пункт дорожной карты — напиши сам]",
      },
      {
        title: "[Заголовок этапа — напиши сам]",
        body: "[Текст: пункт дорожной карты — напиши сам]",
      },
    ],
  },
  passport: {
    id: "passport",
    kicker: "05",
    title: "Паспорт сборки",
    note: "[Текст: примечание к сборке — напиши сам]",
  },
  links: {
    id: "links",
    kicker: "06",
    title: "Ссылки",
    items: [
      {
        title: "GitHub",
        kicker: "Исходный код",
        href: site.githubUrl,
        body: "[Текст: подпись к ссылке — напиши сам]",
      },
      {
        title: "Telegram",
        kicker: "Канал",
        href: site.telegramUrl,
        body: "[Текст: подпись к ссылке — напиши сам]",
      },
      {
        title: "Документация",
        kicker: "На сайте",
        href: "/docs",
        internal: true,
        body: "[Текст: подпись к ссылке — напиши сам]",
      },
    ],
  },
} as const
