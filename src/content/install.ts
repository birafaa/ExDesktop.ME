export type OsId = "windows" | "linux" | "macos"

export const install = {
  title: "Установка",
  osLabel: "Система",
  download: "Скачать установщик",
  systems: {
    windows: {
      label: "Windows",
      steps: ["Скачайте файл", "Запустите установщик", "Откройте exDesktop"],
    },
    linux: {
      label: "Linux",
      steps: ["Откройте терминал", "Вставьте команду", "Запустите exdesktop"],
    },
    macos: {
      label: "macOS",
      steps: ["Откройте Терминал", "Вставьте команду", "Откройте exDesktop"],
    },
  },
} as const
