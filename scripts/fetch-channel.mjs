import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const out = join(dirname(fileURLToPath(import.meta.url)), "../src/content/channel.json")
const source = "https://t.me/s/exDesktop"

function keepPrevious(reason) {
  console.warn(`fetch:channel: ${reason}`)
  if (existsSync(out)) console.warn("fetch:channel: keeping the previous channel.json")
  else console.warn("fetch:channel: no snapshot yet, the page will show skeletons")
}

function decode(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
}

function safeHref(raw) {
  if (!raw) return null
  let href = decode(raw).trim()
  if (href.startsWith("//")) href = `https:${href}`
  try {
    const url = new URL(href)
    if (url.protocol === "http:" || url.protocol === "https:") return url.toString()
  } catch {
    return null
  }
  return null
}

function safeImage(raw) {
  const href = safeHref(raw)
  if (!href) return null
  const host = new URL(href).hostname
  if (host === "t.me" || host.endsWith(".telesco.pe") || host.endsWith(".telegram.org")) return href
  return null
}

function stripTags(html) {
  return decode(html.replace(/<[^>]+>/g, "")).replace(/\u00a0/g, " ")
}

function pushText(parts, value) {
  if (!value) return
  const last = parts.at(-1)
  if (last?.t === "text") last.v += value
  else parts.push({ t: "text", v: value })
}

function partsFromHtml(html) {
  let sourceHtml = html.replace(/<tg-emoji\b[^>]*>[\s\S]*?<b>([\s\S]*?)<\/b>[\s\S]*?<\/tg-emoji>/gi, "$1")
  sourceHtml = sourceHtml.replace(/<i class="emoji"[\s\S]*?<b>([\s\S]*?)<\/b>[\s\S]*?<\/i>/gi, "$1")
  const parts = []
  const token = /<br\s*\/?>|<a\b([^>]*)>([\s\S]*?)<\/a>|([^<]+)|<[^>]+>/gi
  for (const match of sourceHtml.matchAll(token)) {
    if (match[0].toLowerCase().startsWith("<br")) {
      pushText(parts, "\n")
    } else if (match[1] !== undefined) {
      const href = safeHref(/href="([^"]*)"/i.exec(match[1])?.[1])
      const label = stripTags(match[2]).replace(/\s+/g, " ").trim()
      if (!label) continue
      if (href) parts.push({ t: "link", v: label, href })
      else pushText(parts, label)
    } else if (match[3]) {
      pushText(parts, decode(match[3]))
    }
  }
  const cleaned = parts
    .map((part) => (part.t === "text" ? { ...part, v: part.v.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n") } : part))
    .filter((part) => part.t !== "text" || part.v.trim())
  if (cleaned[0]?.t === "text") cleaned[0] = { ...cleaned[0], v: cleaned[0].v.trimStart() }
  const last = cleaned.at(-1)
  if (last?.t === "text") cleaned[cleaned.length - 1] = { ...last, v: last.v.trimEnd() }
  return cleaned.filter((part) => part.t !== "text" || part.v)
}

function reactionsFrom(chunk) {
  const start = chunk.indexOf("tgme_widget_message_reactions")
  const end = chunk.indexOf("tgme_widget_message_footer")
  if (start < 0 || end < start) return []
  const area = chunk.slice(start, end)
  const reactions = []
  for (const match of area.matchAll(/<span class="tgme_reaction">([\s\S]*?)<\/span>/g)) {
    const emoji = decode(/<b>([\s\S]*?)<\/b>/.exec(match[1])?.[1] ?? "").trim()
    const count = stripTags(match[1]).replace(emoji, "").trim()
    if (emoji && count) reactions.push({ emoji, count })
  }
  return reactions.slice(0, 6)
}

function parse(html) {
  const posts = []
  for (const chunk of html.split('<div class="tgme_widget_message_wrap').slice(1)) {
    const id = /data-post="exDesktop\/(\d+)"/.exec(chunk)?.[1]
    const date = /<time[^>]*datetime="([^"]+)"/.exec(chunk)?.[1]
    const url = /class="tgme_widget_message_date" href="(https:\/\/t\.me\/exDesktop\/\d+)"/.exec(chunk)?.[1]
    if (!id || !date || !url) continue
    const textHtml = /<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/.exec(chunk)?.[1]
    const parts = textHtml ? partsFromHtml(textHtml) : []
    if (parts.length === 0) continue
    const views = /class="tgme_widget_message_views">([^<]*)</.exec(chunk)?.[1]?.trim() || null
    const image = safeImage(/tgme_widget_message_photo_wrap[\s\S]{0,500}?url\('([^']+)'/.exec(chunk)?.[1])
    posts.push({
      id,
      url,
      date,
      views,
      reactions: reactionsFrom(chunk),
      parts,
      ...(image ? { image } : {}),
    })
  }
  return posts.slice(-5)
}

try {
  const response = await fetch(source, {
    headers: {
      accept: "text/html",
      "user-agent": "exdesktop-site-channel-fetch",
    },
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const posts = parse(await response.text())
  if (posts.length === 0) throw new Error("parsed no posts")
  const next = { source, fetchedAt: new Date().toISOString(), posts }
  if (existsSync(out)) {
    const previous = JSON.parse(readFileSync(out, "utf8"))
    if (JSON.stringify(previous.posts) === JSON.stringify(next.posts)) {
      console.log(`fetch:channel: ${posts.length} posts unchanged`)
      process.exit(0)
    }
  }
  writeFileSync(out, `${JSON.stringify(next, null, 2)}\n`)
  console.log(`fetch:channel: wrote ${posts.length} posts`)
} catch (error) {
  keepPrevious(error instanceof Error ? error.message : String(error))
  process.exit(0)
}
