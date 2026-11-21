import { site } from "./site.ts"

export const home = {
  hero: {
    extra: "Мы можем больше, чем вы думаете",
  },
  difference: {
    id: "difference",
    title: "Почему ExDesktop?",
    items: [
      {
        title: "Плагины",
        body: "Каталог плагинов exteraGram\nДвижок совместим с SDK 1.4.6.2",
      },
      {
        title: "Перенос",
        body: "Функция «Перенести с помощью ИИ», которая портирует плагины с exteraGram на ExDesktop",
      },
      {
        title: "Системы",
        body: "Все поддерживаемые системы Windows/Linux/MacOS работают стабильно.",
      },
      {
        title: "Среда",
        body: "Плагин ограничен в файлах, сети и системе. Данные Telegram и чужие плагины ему закрыты.",
      },
    ],
  },
  cta: {
    title: "Быстрая установка",
    install: "К установке",
    docs: "Документация",
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
