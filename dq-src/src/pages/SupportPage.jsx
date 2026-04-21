export default function SupportPage() {
  return (
    <div className="subpage-content">
      <section className="subpage-grid">
        <article className="card subpage-card">
          <p className="eyebrow">Contact</p>
          <h2>빠른 연결</h2>
          <p>요청 내용을 먼저 정리해 주시면, 필요한 담당과 범위를 빠르게 연결할 수 있습니다.</p>
        </article>
        <article className="card subpage-card">
          <p className="eyebrow">Response</p>
          <h2>명확한 회신</h2>
          <p>대기만 길어지지 않도록, 진행 가능 여부와 예상 범위를 먼저 안내합니다.</p>
        </article>
        <article className="card subpage-card">
          <p className="eyebrow">Follow-up</p>
          <h2>지속적인 관리</h2>
          <p>처리 후에도 필요한 후속 작업이 있으면 이어서 점검하고 마무리까지 관리합니다.</p>
        </article>
      </section>

      <section className="card subpage-callout">
        <p className="eyebrow">Support Channel</p>
        <strong>문의가 들어오면 바로 끝내는 것이 아니라, 다음 행동이 이어지도록 정리하는 것이 중요합니다.</strong>
        <ul className="subpage-list">
          <li>문의 내용 정리 후 우선순위 구분</li>
          <li>진행 가능 범위와 일정 안내</li>
          <li>작업 후 결과 및 후속 확인</li>
        </ul>
      </section>
    </div>
  );
}
