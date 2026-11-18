import { site } from "./site.ts"

export const home = {
  hero: {
    extra: "Неофициальный клиент Telegram для компьютера с функциями, которых нет в обычном.",
  },
  difference: {
    id: "difference",
    title: "Чем отличается",
    intro: "Клиент запускает плагины exteraGram на компьютере. Коротко о том, что описано в документации.",
    items: [
      {
        title: "Плагины",
        body: "Плагин из каталога exteraGram ставится без изменений. Движок совместим с SDK 1.4.6.2.",
      },
      {
        title: "Перенос",
        body: "В карточке плагина есть действие «Перенести при помощи ИИ». Используется только ваш ключ.",
      },
      {
        title: "Системы",
        body: "Движок плагинов одинаково работает на Windows, Linux и macOS.",
      },
      {
        title: "Среда",
        body: "Плагин ограничен в файлах, сети и системе. Данные Telegram и чужие плагины ему закрыты.",
      },
    ],
  },
  cta: {
    title: "Поставить на компьютер",
    body: "Для Windows есть файл установщика. Для Linux и macOS одна команда.",
    install: "К установке",
    docs: "Документация",
  },
  showcase: {
    id: "window",
    title: "Окно клиента",
    intro: "Настройки поверх канала. Строки чатов пустые: это схема, не переписка.",
    version: "7.3.3.9",
    role: "клиент Telegram",
    subscribers: "261 подписчиков",
    search: "Поиск",
    settings: "Настройки",
    badge: "личное",
    comments: "23 комментария",
    tiles: [
      { title: "Оформление", body: "Значок, список чатов, папки", tone: "violet" },
      { title: "Сообщения", body: "Вид, жесты, ввод, медиа", tone: "blue" },
      { title: "Перевод", body: "Сервис, язык, сущности", tone: "teal" },
      { title: "Конфиденциальность", body: "Телефон, ID, режим стримера", tone: "indigo" },
      { title: "Сеть", body: "tg-ws-proxy, загрузки", tone: "orange" },
      { title: "Плагины", body: "Плагины, движок, проверка", tone: "pink" },
      { title: "Обновления", body: "Автообновление, копии", tone: "green" },
      { title: "Поддержать", body: "Значок, ссылки", tone: "red" },
      { title: "Другое", body: "Остальные параметры", tone: "neutral" },
    ],
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
