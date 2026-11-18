import { site } from "./site.ts"

export const home = {
  hero: {
    extra: "Неофициальный клиент Telegram для компьютера с функциями, которых нет в обычном.",
  },
  links: {
    id: "links",
    title: "Ссылки",
    items: [
      {
        title: "GitHub",
        kicker: "Исходный код",
        href: site.githubUrl,
        body: "Весь код открыт. Можно посмотреть, собрать самому или предложить правку.",
      },
      {
        title: "Telegram",
        kicker: "Канал",
        href: site.telegramUrl,
        body: "Новости, релизы и обсуждение клиента.",
      },
      {
        title: "Документация",
        kicker: "На сайте",
        href: "/docs",
        internal: true,
        body: "Как установить, настроить и писать плагины.",
      },
    ],
  },
} as const
