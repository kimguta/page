import { site } from '../../constants/site'

export function LocationPage() {
  return (
    <div className="content-stack">
      <article className="panel card">
        <div className="panel__eyebrow">Archive Map</div>
        <h2>{site.address}</h2>
        <p>아카이브는 한 화면에서 프로젝트를 훑어보고, 필요할 때 사이트로 이동하는 흐름을 따릅니다.</p>
      </article>
      <article className="panel card map-card">
        <div>
          <h3>Archive hours</h3>
          <p>{site.hours}</p>
        </div>
        <div>
          <h3>Focus</h3>
          <p>프로젝트 성격, 메인 비주얼, 카드 리스트, 상세 메모를 한눈에 보는 구성입니다.</p>
        </div>
      </article>
    </div>
  )
}
