export type OsId = "windows" | "linux" | "macos"

export const install = {
  title: "Установка",
  osLabel: "Система",
  download: "Скачать установщик",
  systems: {
    windows: {
      label: "Windows",
      steps: [
        { title: "Скачайте файл", description: "[описание шага]" },
        { title: "Запустите установщик", description: "[описание шага]" },
        { title: "Откройте exDesktop", description: "[описание шага]" },
      ],
    },
    linux: {
      label: "Linux",
      steps: [
        { title: "Откройте терминал", description: "[описание шага]" },
        { title: "Вставьте команду", description: "[описание шага]" },
        { title: "Запустите exdesktop", description: "[описание шага]" },
      ],
    },
    macos: {
      label: "macOS",
      steps: [
        { title: "Откройте Терминал", description: "[описание шага]" },
        { title: "Вставьте команду", description: "[описание шага]" },
        { title: "Откройте exDesktop", description: "[описание шага]" },
      ],
    },
  },
} as const
