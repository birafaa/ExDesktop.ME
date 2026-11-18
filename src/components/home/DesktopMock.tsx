import type { MockLayoutId } from "../../content/home.ts"

const chats = [
  { name: "Диалог 1", time: "12:41", shape: "round", active: true },
  { name: "Диалог 2", time: "11:05", shape: "squircle", active: false },
  { name: "Диалог 3", time: "09:18", shape: "leaf", active: false },
  { name: "Диалог 4", time: "вчера", shape: "round", active: false },
  { name: "Диалог 5", time: "пн", shape: "squircle", active: false },
]

export function DesktopMock({ layout = "split" }: { layout?: MockLayoutId }) {
  return (
    <div className={`mock mock--${layout}`} aria-hidden="true">
      <div className="mock__chrome">
        <span className="mock__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="mock__title" translate="no">
          exDesktop
        </span>
        <span className="mock__ver" translate="no">
          7.3.3.(5)
        </span>
      </div>
      <div className="mock__body">
        <div className="mock__list">
          <div className="mock__search">Поиск</div>
          {chats.map((chat) => (
            <div key={chat.name} className={chat.active ? "mock__chat is-active" : "mock__chat"}>
              <span className={`mock__avatar mock__avatar--${chat.shape}`} />
              <span className="mock__meta">
                <span className="mock__name">{chat.name}</span>
                <span className="mock__bar" />
              </span>
              <span className="mock__time">{chat.time}</span>
            </div>
          ))}
        </div>
        <div className="mock__thread">
          <div className="mock__thread-head">
            <span className="mock__back" />
            <span className="mock__avatar mock__avatar--round" />
            <span className="mock__meta">
              <span className="mock__name">Диалог 1</span>
              <span className="mock__bar" />
            </span>
          </div>
          <div className="mock__stream">
            <div className="mock__date">сегодня</div>
            <div className="mock__bubble mock__bubble--in">
              <span className="mock__line" />
              <span className="mock__line mock__line--short" />
            </div>
            <div className="mock__bubble mock__bubble--in">
              <span className="mock__line mock__line--short" />
            </div>
            <div className="mock__bubble mock__bubble--out">
              <span className="mock__line" />
            </div>
          </div>
          <div className="mock__composer">
            <div className="mock__field">Сообщение</div>
            <div className="mock__send">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path fill="currentColor" d="M4 12 19 5l-5.2 14-2.3-5.5L4 12Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mock__side">
          <span className="mock__avatar mock__avatar--leaf mock__avatar--lg" />
          <span className="mock__side-line" style={{ width: "72%" }} />
          <span className="mock__side-line" style={{ width: "48%" }} />
          <span className="mock__side-line" style={{ width: "80%" }} />
          <div className="mock__side-pills">
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  )
}
