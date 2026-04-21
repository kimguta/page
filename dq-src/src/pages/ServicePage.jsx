export default function ServicePage() {
  return (
    <div className="subpage-content">
      <section className="subpage-grid">
        <article className="card subpage-card">
          <p className="eyebrow">Maintenance</p>
          <h2>빠른 수정과 안정적인 유지</h2>
          <p>작은 변경도 빠르게 반영하되, 운영 중인 화면이 흔들리지 않도록 안정성을 우선합니다.</p>
        </article>
        <article className="card subpage-card">
          <p className="eyebrow">Support</p>
          <h2>문제 대응과 개선 제안</h2>
          <p>단순 대응을 넘어서 왜 문제가 생겼는지 함께 보고, 다음 개선 포인트까지 정리합니다.</p>
        </article>
        <article className="card subpage-card">
          <p className="eyebrow">Update</p>
          <h2>운영이 쉬운 업데이트 구조</h2>
          <p>관리자가 직접 수정할 수 있는 부분과 개발이 필요한 부분을 분리해 운영 효율을 높입니다.</p>
        </article>
      </section>

      <section className="card subpage-callout">
        <p className="eyebrow">Service Scope</p>
        <strong>기능이 아니라 운영까지 책임질 수 있어야 서비스가 오래 갑니다.</strong>
        <ul className="subpage-list">
          <li>콘텐츠 및 이미지 교체 지원</li>
          <li>운영 중 발견되는 문제의 빠른 대응</li>
          <li>개선 이력과 반영 결과의 명확한 관리</li>
        </ul>
      </section>
    </div>
  );
}
