import { ArchiveCardGrid } from '../../components/archive/ArchiveCardGrid'
import { cultureCards } from '../../data/archiveCards'

export function FaqPage() {
  return (
    <div className="archive-section">
      <article className="panel card archive-intro">
        <div className="panel__eyebrow">Culture / Tour</div>
        <h2>문화와 관광 성격의 프로젝트</h2>
        <p>분위기와 이미지를 살리는 작업을 썸네일 카드로 모아 둔 섹션입니다.</p>
      </article>
      <ArchiveCardGrid cards={cultureCards} />
    </div>
  )
}
