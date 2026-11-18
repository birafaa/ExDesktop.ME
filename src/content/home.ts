import { site } from "./site.ts"

export const home = {
  hero: {
    extra: "[Текст: дополнительная строка героя — напиши сам]",
  },
  passport: {
    id: "passport",
    title: "Паспорт сборки",
    note: "[Текст: примечание к сборке — напиши сам]",
  },
  links: {
    id: "links",
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
