/**
 * Факты о продукте. Меняй их здесь, когда выходит новая сборка.
 * Короткое описание — перевод заданной формулировки, его тоже можно править.
 */
export const site = {
  name: "exDesktop",
  version: "7.3.3.(5)",
  license: "GPL-3.0",
  licenseUrl: "https://www.gnu.org/licenses/gpl-3.0.html",
  summary:
    "Модифицированный кроссплатформенный клиент Telegram для компьютера с возможностями мобильных клиентов.",
  windows: {
    file: "exDesktop-setup-x64.7.3.3.5.exe",
    size: "81.6 MB",
    href: "https://github.com/metawka/exDesktop/releases/download/v7.3.3.5/exDesktop-setup-x64.7.3.3.5.exe",
  },
  installCommand:
    "curl -fsSL https://raw.githubusercontent.com/metawka/exDesktop/main/install.sh | sh",
  githubUrl: "https://github.com/metawka/exDesktop",
  telegramUrl: "https://t.me/exDesktop",
  siteUrl: "https://exdesktop.xyz",
  platforms: ["Windows", "Linux", "macOS"],
  downloadLabel: {
    windows: "Скачать для Windows",
    macos: "Скачать для macOS",
    linux: "Установить на Linux",
  },
  otherPlatforms: "Другие платформы",
  placeholders: {
    requirements: "[требования]",
    interactive: "[название блока]",
    roadmap: [
      "[этап 1]",
      "[этап 2]",
      "[этап 3]",
      "[этап 4]",
    ],
  },
} as const
