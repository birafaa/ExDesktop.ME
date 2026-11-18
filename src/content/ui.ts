/** Короткие подписи интерфейса. Их можно оставить как есть или переименовать. */
export const ui = {
  skip: "К содержанию",
  nav: {
    primary: "Разделы сайта",
    mobile: "Меню",
    footer: "Ссылки в подвале",
    home: "Главная",
    docs: "Документация",
    github: "GitHub",
    telegram: "Канал",
    menu: "Меню",
    open: "Открыть меню",
    close: "Закрыть меню",
  },
  theme: {
    toLight: "Включить светлую тему",
    toDark: "Включить тёмную тему",
  },
  actions: {
    download: "Скачать",
    docs: "Документация",
    github: "GitHub",
    copy: "Копировать",
    copied: "Скопировано",
    copyFailed: "Не удалось скопировать",
    home: "На главную",
    releases: "Все релизы",
  },
  preview: {
    label: "Схематичное окно клиента",
  },
  install: {
    tabsLabel: "Платформа установки",
    sharedCommand: "Одна команда для Linux и macOS.",
    fileLabel: "Файл установщика",
    commandLabel: "Команда",
  },
  studio: {
    groupLabel: "Макет окна",
    scrollHint: "Макет шире экрана — его можно прокрутить.",
  },
  docs: {
    title: "Документация",
    sections: "Разделы",
    openSections: "Открыть разделы",
    closeSections: "Закрыть разделы",
    searchLabel: "Поиск по разделам",
    searchPlaceholder: "Поиск по разделам",
    searchHint: "поиск",
    toc: "На этой странице",
    noResults: "Ничего не найдено",
    count: (n: number) => (n === 1 ? "Найден 1 раздел" : `Найдено разделов: ${n}`),
  },
  notFound: {
    title: "Страница не найдена",
    body: "Такой страницы нет.",
  },
  footer: {
    note: "[Текст: подпись в подвале — напиши сам]",
  },
} as const
