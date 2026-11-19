import { loadChannelPosts, type ChannelPart } from "../../content/channel.ts"
import { site } from "../../content/site.ts"
import { Logo } from "../brand/Logo.tsx"

const list = ["чт", "18:34", "29.10", "12:02", "вчера"]

function formatDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

function PostText({ parts }: { parts: ChannelPart[] }) {
  return (
    <p className="channel-bubble__text">
      {parts.map((part, index) =>
        part.t === "link" ? (
          <a key={index} href={part.href} target="_blank" rel="noreferrer">
            {part.v}
          </a>
        ) : (
          <span key={index}>{part.v}</span>
        ),
      )}
    </p>
  )
}

export function ChannelWindow() {
  const posts = loadChannelPosts()

  return (
    <div className="channel-win">
      <div className="channel-rail" aria-hidden="true">
        <span className="is-on" />
        <span />
        <span />
      </div>
      <div className="channel-list" aria-hidden="true">
        <div className="channel-search">Поиск</div>
        <div className="channel-row is-active">
          <Logo size={36} />
          <span className="channel-row__name" translate="no">
            {site.name}
          </span>
        </div>
        {list.map((time) => (
          <div key={time} className="channel-row">
            <Logo size={36} />
            <span className="channel-row__lines">
              <i />
              <i />
            </span>
            <span className="channel-row__time">{time}</span>
          </div>
        ))}
      </div>
      <div className="channel-main">
        <div className="channel-head">
          <Logo size={40} />
          <strong translate="no">{site.name}</strong>
        </div>
        <div className="channel-stream" aria-label={`Посты канала ${site.name}`}>
          {posts.length === 0
            ? [0, 1, 2].map((item) => (
                <div key={item} className="channel-bubble is-skeleton" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              ))
            : posts.map((post) => (
                <article key={post.id} className="channel-bubble">
                  {post.image ? <img src={post.image} alt="" /> : null}
                  <PostText parts={post.parts} />
                  {post.reactions.length > 0 ? (
                    <p className="channel-react">
                      {post.reactions.map((reaction) => (
                        <span key={`${reaction.emoji}${reaction.count}`}>
                          {reaction.emoji} {reaction.count}
                        </span>
                      ))}
                    </p>
                  ) : null}
                  <p className="channel-meta">
                    <a href={post.url} target="_blank" rel="noreferrer">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </a>
                    {post.views ? <span>{post.views}</span> : null}
                  </p>
                </article>
              ))}
        </div>
      </div>
    </div>
  )
}
