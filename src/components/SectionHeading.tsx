export function SectionHeading({
  id,
  titleId,
  kicker,
  title,
  intro,
}: {
  id: string
  titleId: string
  kicker: string
  title: string
  intro?: string
}) {
  return (
    <header className="section-head" id={id}>
      <p className="kicker">{kicker}</p>
      <h2 id={titleId} className="section-title">
        {title}
      </h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </header>
  )
}
