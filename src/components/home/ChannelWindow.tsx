import type { CSSProperties } from "react"
import { site } from "../../content/site.ts"
import { Logo } from "../brand/Logo.tsx"

const bubbles: Array<Array<string | "image">> = [
  ["92%", "78%", "54%"],
  ["image", "84%", "46%"],
  ["96%", "70%", "88%", "36%"],
  ["64%", "42%"],
]

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
          <Logo size={36} />
          <span className="channel-row__name" translate="no">
            {site.name}
          </span>
        </div>
        {["a", "b", "c", "d"].map((id) => (
          <div key={id} className="channel-row">
            <Logo size={36} />
            <span className="channel-row__lines">
              <i />
              <i />
            </span>
          </div>
        ))}
      </div>
      <div className="channel-main">
        <div className="channel-head">
          <Logo size={40} />
          <strong translate="no">{site.name}</strong>
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
