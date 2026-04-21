export default function AxDxPage() {
  return (
    <div className="subpage-content">
      <section className="subpage-grid">
        <article className="card subpage-card">
          <p className="eyebrow">Discovery</p>
          <h2>현재 흐름을 먼저 읽습니다</h2>
          <p>사용자 동선, 내부 운영 방식, 병목 구간을 함께 분석해 어디를 바꿔야 효과가 큰지 확인합니다.</p>
        </article>
        <article className="card subpage-card">
          <p className="eyebrow">Planning</p>
          <h2>작게 시작해 크게 확장합니다</h2>
          <p>한 번에 모두 바꾸기보다 먼저 적용할 수 있는 영역부터 단계적으로 설계합니다.</p>
        </article>
        <article className="card subpage-card">
          <p className="eyebrow">Outcome</p>
          <h2>운영 가능한 변화</h2>
          <p>현실적인 일정과 운영 환경을 고려해, 바뀐 뒤에도 유지할 수 있는 구조를 만듭니다.</p>
        </article>
      </section>

      <section className="card subpage-callout">
        <p className="eyebrow">Key Points</p>
        <strong>AX / DX는 기술을 더하는 일이 아니라, 일하는 방식과 보는 방식을 다시 설계하는 일입니다.</strong>
        <ul className="subpage-list">
          <li>사용자 여정 기준의 개선 포인트 도출</li>
          <li>업무 시스템과 화면 흐름의 연결</li>
          <li>변화 이후 운영까지 고려한 설계</li>
        </ul>
      </section>
    </div>
  );
}
