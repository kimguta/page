import { site } from '../../constants/site'

export function GreetingPage() {
  return (
    <div className="content-stack">
      <article className="panel card">
        <div className="panel__eyebrow">Archive Intro</div>
        <h2>Welcome to {site.name}</h2>
        <p>
          이 아카이브는 프로젝트 성격별로 작업을 나눠 보고, 메인 비주얼과 구조를 함께
          확인할 수 있도록 만든 페이지입니다.
        </p>
      </article>
      <article className="panel card two-column">
        <div>
          <h3>What we care about</h3>
          <p>밝은 톤, 명확한 구조, 빠르게 읽히는 카드형 정보 배치입니다.</p>
        </div>
        <div>
          <h3>How we work</h3>
          <p>썸네일과 분류를 먼저 보여주고, 필요할 때 상세 페이지로 내려가는 방식입니다.</p>
        </div>
      </article>
    </div>
  )
}
