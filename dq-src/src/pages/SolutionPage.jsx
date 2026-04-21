export default function SolutionPage() {
  return (
    <div className="subpage-content">
      <section className="subpage-grid">
        <article className="card subpage-card">
          <p className="eyebrow">Content</p>
          <h2>업데이트가 쉬운 콘텐츠 구조</h2>
          <p>자주 바뀌는 영역과 고정 영역을 나눠 관리 비용을 줄이고, 편집 실수를 줄이는 방식으로 설계합니다.</p>
        </article>
        <article className="card subpage-card">
          <p className="eyebrow">System</p>
          <h2>재사용 가능한 컴포넌트</h2>
          <p>한 번 만든 패턴을 여러 페이지에 확장할 수 있게 구조화해 유지보수 속도를 높입니다.</p>
        </article>
        <article className="card subpage-card">
          <p className="eyebrow">Scale</p>
          <h2>서비스 성장에 대응하는 설계</h2>
          <p>초기 런칭뿐 아니라 이후 메뉴 추가, 서브페이지 확장, 콘텐츠 증설까지 자연스럽게 이어지도록 준비합니다.</p>
        </article>
      </section>

      <section className="card subpage-callout">
        <p className="eyebrow">Solution Direction</p>
        <strong>좋은 솔루션은 복잡해 보이지 않으면서도, 내부 구조는 단단해야 합니다.</strong>
        <ul className="subpage-list">
          <li>운영자가 바로 이해할 수 있는 정보 구조</li>
          <li>추가 개발 없이도 확장하기 쉬운 레이아웃</li>
          <li>디자인과 개발의 경계를 줄이는 공통 패턴</li>
        </ul>
      </section>
    </div>
  );
}
