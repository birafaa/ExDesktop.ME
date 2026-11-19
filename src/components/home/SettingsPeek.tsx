import { Logo } from "../brand/Logo.tsx"

const tiles = [
  { title: "Оформление", body: "Значок, список чатов, папки", tone: "violet" },
  { title: "Сообщения", body: "Вид, жесты, ввод, медиа", tone: "blue" },
  { title: "Перевод", body: "Сервис, язык, сущности", tone: "teal" },
  { title: "Конфиденциальность", body: "Телефон, ID, режим стримера", tone: "indigo" },
  { title: "Сеть", body: "tg-ws-proxy, загрузки", tone: "orange" },
  { title: "Плагины", body: "Плагины, движок, проверка", tone: "pink" },
  { title: "Обновления", body: "Автообновление, копии", tone: "green" },
  { title: "Поддержать", body: "Значок, ссылки", tone: "red" },
] as const

function TileGlyph({ tone }: { tone: string }) {
  const common = { viewBox: "0 0 24 24", width: 16, height: 16, "aria-hidden": true as const }
  if (tone === "violet") {
    return (
      <svg {...common}>
        <circle cx="7" cy="8" r="2.2" fill="currentColor" />
        <circle cx="12" cy="8" r="2.2" fill="currentColor" />
        <circle cx="17" cy="8" r="2.2" fill="currentColor" />
        <rect x="5" y="13" width="14" height="6" rx="2" fill="currentColor" />
      </svg>
    )
  }
  if (tone === "blue") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H11l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      </svg>
    )
  }
  if (tone === "teal") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M4 7h7v2H6.8l2.4 2.4-1.4 1.4L5 10v4h2v2H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm16 10h-7v-2h4.2l-2.4-2.4 1.4-1.4L19 14v-4h-2V8h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1Z" />
      </svg>
    )
  }
  if (tone === "indigo") {
    return (
      <svg {...common}>
        <rect x="6" y="10" width="12" height="9" rx="2" fill="currentColor" />
        <path fill="none" stroke="currentColor" strokeWidth="2" d="M8 10V8a4 4 0 0 1 8 0v2" />
      </svg>
    )
  }
  if (tone === "orange") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M12 18.5a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8ZM7.2 16.2a7 7 0 0 1 9.6 0l-1.4 1.5a5 5 0 0 0-6.8 0l-1.4-1.5Zm-2.6-2.7a10.5 10.5 0 0 1 14.8 0l-1.4 1.4a8.5 8.5 0 0 0-12 0L4.6 13.5Z" />
      </svg>
    )
  }
  if (tone === "pink") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M9 3h2v3h2V3h2v3h3v2h-3v2h3v2h-3v3h-2v-3h-2v3H9v-3H6v-2h3V8H6V6h3V3Z" />
      </svg>
    )
  }
  if (tone === "green") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M12 5V2l4 4-4 4V7a5 5 0 1 0 4.9 6h2.1A7 7 0 1 1 12 5Z" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path fill="currentColor" d="M12 19s-6.2-3.8-6.2-8A3.4 3.4 0 0 1 12 8a3.4 3.4 0 0 1 6.2 3c0 4.2-6.2 8-6.2 8Z" />
    </svg>
  )
}

export function SettingsPeek() {
  return (
    <div className="peek" aria-hidden="true">
      <div className="peek__bar">
        <span className="peek__back" />
        <strong>Настройки</strong>
        <span className="peek__x">×</span>
      </div>
      <Logo size={48} />
      <p className="peek__ver" translate="no">
        7.3.3.9
      </p>
      <div className="peek__search">Поиск</div>
      <div className="peek__tiles">
        {tiles.map((tile) => (
          <div key={tile.title} className="peek__tile" data-tone={tile.tone}>
            <span className="peek__icon">
              <TileGlyph tone={tile.tone} />
            </span>
            <span>
              <b>{tile.title}</b>
              <small>{tile.body}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
