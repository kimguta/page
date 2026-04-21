export default function CompanyPage() {
  return (
    <div className="subpage-content">
      <section className="subpage-grid">
        <article className="card subpage-card">
          <p className="eyebrow">Overview</p>
          <h2>명확한 구조와 일관된 톤</h2>
          <p>복잡한 서비스를 쉽게 이해할 수 있도록 정보 구조를 정리하고, 화면마다 같은 경험을 유지합니다.</p>
        </article>
        <article className="card subpage-card">
          <p className="eyebrow">Process</p>
          <h2>기획부터 운영까지 한 흐름</h2>
          <p>초기 기획, 디자인 시스템, 퍼블리싱, 콘텐츠 운영을 한 번에 바라보는 방식으로 작업합니다.</p>
        </article>
        <article className="card subpage-card">
          <p className="eyebrow">Value</p>
          <h2>성과가 남는 화면</h2>
          <p>보기 좋은 화면에서 끝나지 않고, 실제 사용자 행동과 비즈니스 목표를 같이 만족시키는 것을 목표로 합니다.</p>
        </article>
      </section>

      <section className="card subpage-callout">
        <p className="eyebrow">Company Focus</p>
        <strong>DQ는 필요한 메시지를 선명하게 만들고, 오래 운영해도 무너지지 않는 구조를 우선합니다.</strong>
        <ul className="subpage-list">
          <li>브랜드 톤을 유지하는 콘텐츠 구조</li>
          <li>확장 가능한 화면 설계와 컴포넌트 구성</li>
          <li>운영과 업데이트가 쉬운 관리 방식</li>
        </ul>
      </section>
    </div>
  );
}
