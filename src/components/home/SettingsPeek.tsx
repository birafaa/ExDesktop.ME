const tiles = [
  { title: "Оформление", tone: "violet" },
  { title: "Сообщения", tone: "blue" },
  { title: "Плагины", tone: "pink" },
  { title: "Сеть", tone: "orange" },
] as const

export function SettingsPeek() {
  return (
    <div className="peek" aria-hidden="true">
      <div className="peek__bar">
        <span />
        <strong>Настройки</strong>
        <span />
      </div>
      <div className="peek__tiles">
        {tiles.map((tile) => (
          <div key={tile.title} className="peek__tile" data-tone={tile.tone}>
            <i />
            <span>
              <b>{tile.title}</b>
              <em />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
