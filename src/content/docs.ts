import ai from "./docs/ai.json" with { type: "json" }
import sdk from "./docs/sdk.json" with { type: "json" }

/**
 * Текст документации взят со страниц exdesktop.xyz/docs/ и /docs/ai/ без пересказа.
 * Файлы sdk.json и ai.json — этот текст. Его правят только вместе с исходной документацией.
 */
export type Inline =
  | { t: "text"; v: string }
  | { t: "code"; v: string }
  | { t: "link"; v: string; href: string }

export type DocBlock =
  | { type: "p"; inlines: Inline[]; lead?: boolean }
  | { type: "note"; inlines: Inline[] }
  | { type: "h3"; id: string; text: string }
  | { type: "ul"; items: Inline[][] }
  | { type: "ol"; items: Inline[][] }
  | { type: "code"; code: string }
  | { type: "table"; headers: Inline[][]; rows: Inline[][][] }
  | { type: "links"; items: { label: string; href: string }[] }

export type DocSection = {
  id: string
  title: string
  blocks: DocBlock[]
}

export type DocPage = {
  id: string
  path: string
  group: string
  title: string
  intro: DocBlock[]
  sections: DocSection[]
}

export const docPages = [sdk, ai] as DocPage[]

export function inlineText(parts: Inline[]): string {
  return parts.map((part) => part.v).join("")
}

export function blockText(block: DocBlock): string {
  switch (block.type) {
    case "p":
    case "note":
      return inlineText(block.inlines)
    case "h3":
      return block.text
    case "ul":
    case "ol":
      return block.items.map((item) => inlineText(item)).join("\n")
    case "code":
      return block.code
    case "table":
      return [...block.headers, ...block.rows.flat()].map((cell) => inlineText(cell)).join("\n")
    case "links":
      return block.items.map((item) => `${item.label} ${item.href}`).join("\n")
    default: {
      const exhaustive: never = block
      return exhaustive
    }
  }
}

export function sectionSearchText(section: DocSection): string {
  return [section.title, ...section.blocks.map((block) => blockText(block))].join("\n")
}

export function introSearchText(page: DocPage): string {
  return [page.title, ...page.intro.map((block) => blockText(block))].join("\n")
}

export function sectionMatches(section: DocSection, query: string): boolean {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  return sectionSearchText(section).toLowerCase().includes(needle)
}

export function introMatches(page: DocPage, query: string): boolean {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  return introSearchText(page).toLowerCase().includes(needle)
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

export function pageToc(
  page: DocPage,
  sections: DocSection[],
  includeIntro: boolean,
): { id: string; text: string; level: 2 | 3 }[] {
  const items: { id: string; text: string; level: 2 | 3 }[] = []
  if (includeIntro) {
    for (const block of page.intro) {
      if (block.type === "h3") items.push({ id: block.id, text: block.text, level: 3 })
    }
  }
  for (const section of sections) items.push(...sectionToc(section))
  return items
}
