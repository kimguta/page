import { ArchiveCardGrid } from '../../components/archive/ArchiveCardGrid'
import { projectCards } from '../../data/archiveCards'

export function ProductIndexPage() {
  return (
    <div className="archive-section">
      <article className="panel card archive-intro">
        <div className="panel__eyebrow">최근 사이트</div>
        <h2>최근 작업</h2>
        <p>최근에 만든 사이트를 썸네일 카드로 바로 볼 수 있는 화면입니다.</p>
      </article>
      <ArchiveCardGrid cards={projectCards} />
    </div>
  )
}
