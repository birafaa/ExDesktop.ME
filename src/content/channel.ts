export type ChannelPart = { t: "text"; v: string } | { t: "link"; v: string; href: string }

export type ChannelPost = {
  id: string
  url: string
  date: string
  views: string | null
  reactions: { emoji: string; count: string }[]
  parts: ChannelPart[]
  image?: string
}

type ChannelFile = {
  source: string
  fetchedAt: string
  posts: ChannelPost[]
}

const loaded = import.meta.glob("./channel.json", {
  eager: true,
  import: "default",
}) as Record<string, ChannelFile>

function isPost(value: unknown): value is ChannelPost {
  if (!value || typeof value !== "object") return false
  const post = value as ChannelPost
  return typeof post.id === "string" && typeof post.url === "string" && Array.isArray(post.parts)
}

export function loadChannelPosts(): ChannelPost[] {
  const file = Object.values(loaded)[0]
  if (!file || !Array.isArray(file.posts)) return []
  return file.posts.filter(isPost)
}
