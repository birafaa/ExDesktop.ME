export type OsId = "windows" | "linux" | "macos"

export const install = {
  title: "Установка",
  osLabel: "Система",
  download: "Скачать установщик",
  systems: {
    windows: {
      label: "Windows",
      steps: [
        { title: "Скачайте файл" },
        { title: "Запустите установщик" },
        { title: "Откройте exDesktop" },
      ],
    },
    linux: {
      label: "Linux",
      steps: [
        { title: "Откройте терминал" },
        { title: "Вставьте команду" },
        { title: "Запустите exdesktop" },
      ],
    },
    macos: {
      label: "macOS",
      steps: [
        { title: "Откройте Терминал" },
        { title: "Вставьте команду" },
        { title: "Откройте exDesktop" },
      ],
    },
  },
} as const
