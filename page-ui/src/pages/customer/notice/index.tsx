import { ArchiveCardGrid } from '../../../components/archive/ArchiveCardGrid'
import { legacyCards } from '../../../data/archiveCards'

export function NoticeListPage() {
  return (
    <div className="archive-section">
      <article className="panel card archive-intro">
        <div className="panel__eyebrow">2025 Legacy</div>
        <h2>이전 작업 아카이브</h2>
        <p>예전 프로젝트를 한 번에 보기 좋게 정리한 카드 목록입니다.</p>
      </article>
      <ArchiveCardGrid cards={legacyCards} />
    </div>
  )
}
