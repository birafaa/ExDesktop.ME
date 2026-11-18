import { site } from "./site.ts"

export type DocBlock =
  | { type: "p"; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "platforms" }
  | { type: "code"; label: string; code: string }
  | { type: "note"; text: string }
  | { type: "faq"; items: { id: string; q: string; a: string }[] }
  | { type: "links"; items: { label: string; href: string }[] }

export type DocSection = {
  id: string
  title: string
  blocks: DocBlock[]
}

export const docsSections: DocSection[] = [
  {
    id: "start",
    title: "Начало работы",
    blocks: [
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
      { type: "h3", id: "start-before", text: "Перед запуском" },
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
      {
        type: "ul",
        items: [
          "[Текст: шаг — напиши сам]",
          "[Текст: шаг — напиши сам]",
          "[Текст: шаг — напиши сам]",
        ],
      },
      { type: "h3", id: "start-first", text: "Первый запуск" },
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
    ],
  },
  {
    id: "install",
    title: "Установка",
    blocks: [
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
      { type: "h3", id: "install-windows", text: "Windows" },
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
      { type: "code", label: `Файл · ${site.windows.size}`, code: site.windows.file },
      { type: "note", text: "[Текст: примечание к установке — напиши сам]" },
      { type: "h3", id: "install-linux", text: "Linux" },
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
      { type: "code", label: "Команда", code: site.installCommand },
      { type: "h3", id: "install-macos", text: "macOS" },
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
      { type: "code", label: "Команда", code: site.installCommand },
    ],
  },
  {
    id: "capabilities",
    title: "Возможности",
    blocks: [
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
      { type: "h3", id: "capabilities-general", text: "Общее" },
      { type: "p", text: "[Текст: описание функции — напиши сам]" },
      { type: "h3", id: "capabilities-platforms", text: "Платформы" },
      { type: "platforms" },
      { type: "p", text: "[Текст: описание функции — напиши сам]" },
      { type: "h3", id: "capabilities-code", text: "Код" },
      { type: "p", text: "[Текст: описание функции — напиши сам]" },
    ],
  },
  {
    id: "settings",
    title: "Настройки",
    blocks: [
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
      { type: "h3", id: "settings-params", text: "Параметры" },
      {
        type: "ul",
        items: [
          "[Параметр — напиши сам]",
          "[Параметр — напиши сам]",
          "[Параметр — напиши сам]",
          "[Параметр — напиши сам]",
        ],
      },
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
    ],
  },
  {
    id: "faq",
    title: "Вопросы",
    blocks: [
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
      {
        type: "faq",
        items: [
          {
            id: "faq-1",
            q: "[Вопрос — напиши сам]",
            a: "[Текст: ответ — напиши сам]",
          },
          {
            id: "faq-2",
            q: "[Вопрос — напиши сам]",
            a: "[Текст: ответ — напиши сам]",
          },
          {
            id: "faq-3",
            q: "[Вопрос — напиши сам]",
            a: "[Текст: ответ — напиши сам]",
          },
          {
            id: "faq-4",
            q: "[Вопрос — напиши сам]",
            a: "[Текст: ответ — напиши сам]",
          },
        ],
      },
    ],
  },
  {
    id: "source",
    title: "Сборка из исходников",
    blocks: [
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
      { type: "h3", id: "source-repo", text: "Репозиторий" },
      {
        type: "links",
        items: [{ label: "GitHub", href: site.githubUrl }],
      },
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
      { type: "h3", id: "source-commands", text: "Команды" },
      { type: "code", label: "Команда", code: "# [Команда — напиши сам]" },
      { type: "p", text: "[Текст: абзац документации — напиши сам]" },
    ],
  },
]

export function sectionSearchText(section: DocSection): string {
  const parts: string[] = [section.title]
  for (const block of section.blocks) {
    switch (block.type) {
      case "p":
      case "note":
        parts.push(block.text)
        break
      case "h3":
        parts.push(block.text)
        break
      case "ul":
        parts.push(...block.items)
        break
      case "code":
        parts.push(block.label, block.code)
        break
      case "faq":
        for (const item of block.items) parts.push(item.q, item.a)
        break
      case "links":
        for (const item of block.items) parts.push(item.label, item.href)
        break
      case "platforms":
        parts.push(...site.platforms)
        break
      default: {
        const exhaustive: never = block
        parts.push(String(exhaustive))
      }
    }
  }
  return parts.join("\n")
}

export function sectionMatches(section: DocSection, query: string): boolean {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  return sectionSearchText(section).toLowerCase().includes(needle)
}

export function sectionToc(section: DocSection): { id: string; text: string; level: 2 | 3 }[] {
  const items: { id: string; text: string; level: 2 | 3 }[] = [
    { id: section.id, text: section.title, level: 2 },
  ]
  for (const block of section.blocks) {
    if (block.type === "h3") items.push({ id: block.id, text: block.text, level: 3 })
  }
  return items
}
