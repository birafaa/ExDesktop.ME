import type { ReactNode } from "react"

export function Highlight({ text, query }: { text: string; query: string }) {
  const needle = query.trim()
  if (!needle) return <>{text}</>

  const lower = text.toLowerCase()
  const q = needle.toLowerCase()
  const nodes: ReactNode[] = []
  let start = 0
  let index = lower.indexOf(q, start)
  let mark = 0

  while (index !== -1) {
    if (index > start) nodes.push(text.slice(start, index))
    nodes.push(<mark key={mark}>{text.slice(index, index + needle.length)}</mark>)
    mark += 1
    start = index + needle.length
    index = lower.indexOf(q, start)
  }

  if (start < text.length) nodes.push(text.slice(start))
  return <>{nodes}</>
}
