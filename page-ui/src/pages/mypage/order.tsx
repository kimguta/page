import { legacyCards } from '../../data/archiveCards'

export function OrderPage() {
  return (
    <div className="mypage-grid">
      {legacyCards.slice(0, 4).map((card) => (
        <article key={card.title} className="panel card order-card">
          <div className="panel__eyebrow">{card.year}</div>
          <h3>{card.title}</h3>
          <p>{card.category}</p>
          <span>{card.description}</span>
        </article>
      ))}
    </div>
  )
}
