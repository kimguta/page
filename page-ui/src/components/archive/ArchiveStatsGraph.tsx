import { archiveFolderTotal, archiveRegionStats, archiveTypeStats } from '../../data/archiveStats'
import type { ArchiveSeriesItem } from '../../data/archiveStats'

function StatsBars({ items }: { items: ArchiveSeriesItem[] }) {
  const max = Math.max(...items.map((item) => item.count), 1)

  return (
    <div className="stats-bars">
      {items.map((item) => (
        <div key={item.label} className="stats-bar">
          <div className="stats-bar__head">
            <span>{item.label}</span>
            <strong>{item.count}</strong>
          </div>
          <div className="stats-bar__track">
            <span
              className="stats-bar__fill"
              style={{ width: `${(item.count / max) * 100}%`, background: item.color }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ArchiveStatsGraph() {
  return (
    <section className="archive-stats panel">
      <div className="archive-stats__header">
        <div>
          <div className="panel__eyebrow">Archive Stats</div>
          <h2>지역별 · 유형별 분포</h2>
          <p>저장소 최상위 사이트 폴더 64개를 기준으로 나눈 통계입니다.</p>
        </div>

        <div className="archive-stats__summary">
          <strong>{archiveFolderTotal}</strong>
          <span>sites</span>
        </div>
      </div>

      <div className="archive-stats__grid">
        <article className="archive-stats__card">
          <div className="archive-stats__card-head">
            <h3>지역별</h3>
            <span>Region</span>
          </div>
          <StatsBars items={archiveRegionStats} />
        </article>

        <article className="archive-stats__card">
          <div className="archive-stats__card-head">
            <h3>유형별</h3>
            <span>Type</span>
          </div>
          <StatsBars items={archiveTypeStats} />
        </article>
      </div>
    </section>
  )
}
