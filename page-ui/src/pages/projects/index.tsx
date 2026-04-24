import { archiveReadmeSections } from '../../data/archiveReadmeList'
import { siteArchiveCards } from '../../data/siteArchive'
import { resolvePublicPath } from '../../utils/publicPath'
import './ProjectsPage.css'

export function ProjectsPage() {
  const cardsByHref = new Map(siteArchiveCards.map((card) => [card.href.replace(/\/+$/, ''), card]))
  const readmeCount = archiveReadmeSections.reduce((sum, section) => sum + section.items.length, 0)
  const projectCards = archiveReadmeSections
    .flatMap((section) => section.items)
    .map((project) =>
      cardsByHref.get(project.href.replace(/\/+$/, '')) ?? {
        href: project.href,
        title: project.title,
        thumb: 'common/images/archive-placeholder.svg',
      },
    )

  return (
    <section className="panel card section-layout projects-page">
      <article className="panel card projects-page__intro">
        <div className="panel__eyebrow">전체 프로젝트</div>
        <h2>저장소에 있는 사이트를 한 번에 보는 목록</h2>
        <p>각 사이트를 썸네일과 이름으로 정리했습니다. 전체 항목은 저장소의 실제 사이트 폴더를 기준으로 표시됩니다.</p>
        <div className="projects-page__meta">
          <span className="chip chip--soft">{readmeCount} sites</span>
          <span className="chip">4-column grid</span>
        </div>
      </article>

      <section className="projects-section">
        <div className="projects-grid">
          {projectCards.map((project) => (
            <a
              key={`${project.href}-${project.title}`}
              className="project-card panel"
              href={resolvePublicPath(project.href)}
              target="_blank"
              rel="noreferrer"
            >
              <div className="project-card__media">
                <img src={resolvePublicPath(project.thumb)} alt={project.title} loading="lazy" />
              </div>
              <div className="project-card__body">
                <strong>{project.title}</strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="projects-section projects-section--list">
        <div className="projects-section__head">
          <h3>전체 목록</h3>
          <span>{readmeCount} sites</span>
        </div>

        {archiveReadmeSections.map((section) => (
          <div key={section.key} className="projects-list-section">
            <div className="projects-section__head projects-section__head--compact">
              <h4>{section.key}</h4>
              <span>{section.items.length} sites</span>
            </div>

            <ul className="projects-list">
              {section.items.map((project) => (
                <li key={`list-${project.href}-${project.title}`}>
                  <a href={resolvePublicPath(project.href)} target="_blank" rel="noreferrer">
                    <span className="projects-list__title">{project.title}</span>
                    <span className="projects-list__href">{resolvePublicPath(project.href)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </section>
  )
}
