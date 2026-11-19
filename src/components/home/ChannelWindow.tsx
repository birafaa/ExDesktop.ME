import type { CSSProperties } from "react"

const bubbles: Array<Array<string | "image">> = [
  ["92%", "78%", "54%"],
  ["image", "84%", "46%"],
  ["96%", "70%", "88%", "36%"],
  ["64%", "42%"],
]

const listTones = ["blue", "teal", "violet", "pink"] as const

function PersonAvatar({ tone, size }: { tone: string; size: number }) {
  return (
    <span className="person-ava" data-tone={tone} style={{ "--ava": `${size}px` } as CSSProperties}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="9" r="3.2" fill="currentColor" />
        <path fill="currentColor" d="M6.2 18.6c.9-2.7 3-4.2 5.8-4.2s4.9 1.5 5.8 4.2v.2H6.2v-.2Z" />
      </svg>
    </span>
  )
}

export function ChannelWindow() {
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
          <PersonAvatar tone="slate" size={36} />
          <span className="channel-row__lines">
            <i />
            <i />
          </span>
        </div>
        {listTones.map((tone) => (
          <div key={tone} className="channel-row">
            <PersonAvatar tone={tone} size={36} />
            <span className="channel-row__lines">
              <i />
              <i />
            </span>
          </div>
        ))}
      </div>
      <div className="channel-main">
        <div className="channel-head">
          <PersonAvatar tone="slate" size={40} />
          <span className="channel-head__lines">
            <i />
            <i />
          </span>
        </div>
        <div className="channel-stream" aria-hidden="true">
          {bubbles.map((lines, index) => (
            <div key={index} className="channel-bubble" style={{ "--i": index } as CSSProperties}>
              {lines.map((line) =>
                line === "image" ? (
                  <span key="image" className="channel-ph" />
                ) : (
                  <i key={line} style={{ "--w": line } as CSSProperties} />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
