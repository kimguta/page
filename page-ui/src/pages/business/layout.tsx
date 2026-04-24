import { ArchiveCardGrid } from '../../components/archive/ArchiveCardGrid'
import { publicCards } from '../../data/archiveCards'

export function BusinessLayout() {
  return (
    <section className="panel card section-layout business-layout">
      <div className="archive-section">
        <article className="panel card archive-intro">
          <div className="panel__eyebrow">Public / Admin</div>
          <h2>공공과 행정 성격의 프로젝트</h2>
          <p>정보 구조와 안내가 중요한 사이트들을 모아 둔 섹션입니다.</p>
        </article>
        <ArchiveCardGrid cards={publicCards} />
      </div>
    </section>
  )
}
