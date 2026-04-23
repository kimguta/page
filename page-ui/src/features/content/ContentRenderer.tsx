import type { ContentItem } from '../../types/content'
import { Button } from '../../components/common/Button'
import { Link } from '../../components/common/Link'

type ContentRendererProps = {
  content: ContentItem
}

export function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <article className="content-card">
      <div className="content-card__eyebrow">{content.category}</div>
      <h2>{content.title}</h2>
      <p className="content-card__subtitle">{content.subtitle}</p>
      <p className="content-card__hero">{content.hero}</p>
      <div className="content-card__sections">
        {content.sections.map((section) => (
          <section key={section.heading} className="content-card__section">
            <h3>{section.heading}</h3>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
      <div className="button-row">
        <Link className="button button--primary" href="/customer/notice">
          Visit notices
        </Link>
        <Button variant="secondary">Share story</Button>
      </div>
    </article>
  )
}
