import { site } from '../../constants/site'

export function ProfilePage() {
  return (
    <div className="mypage-grid">
      <article className="panel card profile-card">
        <div className="panel__eyebrow">Project Info</div>
        <h2>{site.name}</h2>
        <p>{site.description}</p>
        <p>프로젝트 단위로 정리된 아카이브와 작업 메모를 한 곳에서 확인할 수 있습니다.</p>
      </article>
      <article className="panel card profile-card">
        <h3>What lives here</h3>
        <p>2026 최신 작업, 2025 이전 아카이브, 문화 / 관광, 공공 / 행정 섹션이 함께 정리됩니다.</p>
      </article>
    </div>
  )
}
