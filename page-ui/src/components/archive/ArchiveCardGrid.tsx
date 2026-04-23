import type { ArchiveCard } from '../../data/archiveCards'
import { resolvePublicPath } from '../../utils/publicPath'

type ArchiveCardGridProps = {
  cards: ArchiveCard[]
}

export function ArchiveCardGrid({ cards }: ArchiveCardGridProps) {
  return (
    <div className="archive-card-grid">
      {cards.map((card) => (
        <article key={card.title} className="archive-card panel">
          <a
            className="archive-card__media"
            href={resolvePublicPath(card.href)}
            target="_blank"
            rel="noreferrer"
          >
            <img src={resolvePublicPath(card.thumb)} alt={`${card.title} 썸네일`} loading="lazy" />
          </a>
          <div className="archive-card__body">
            <div className="archive-card__meta">
              <span className="chip">{card.year}</span>
              <span className="archive-card__category">{card.category}</span>
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <div className="button-row">
              <a
                className="button button--ghost"
                href={resolvePublicPath(card.href)}
                target="_blank"
                rel="noreferrer"
              >
                사이트 열기
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
