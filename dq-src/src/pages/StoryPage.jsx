export default function StoryPage() {
  return (
    <div className="subpage-content">
      <section className="subpage-grid">
        <article className="card subpage-card">
          <p className="eyebrow">Context</p>
          <h2>문제 정의부터 시작</h2>
          <p>보이는 화면보다 먼저 해결해야 할 문제를 명확하게 정의하고, 그다음에 화면을 설계합니다.</p>
        </article>
        <article className="card subpage-card">
          <p className="eyebrow">Decision</p>
          <h2>선택의 이유를 남깁니다</h2>
          <p>왜 이 구조를 택했는지 기록해 두면, 이후 수정이나 리뉴얼 때 같은 고민을 반복하지 않아도 됩니다.</p>
        </article>
        <article className="card subpage-card">
          <p className="eyebrow">Result</p>
          <h2>운영 가능한 결과물</h2>
          <p>한 번 잘 만든 화면이 아니라, 나중에 다시 봐도 손볼 수 있는 결과물을 지향합니다.</p>
        </article>
      </section>

      <section className="card subpage-callout">
        <p className="eyebrow">Story Line</p>
        <strong>프로젝트는 끝나고 나면 사라지는 것이 아니라, 다음 작업을 위한 기준이 됩니다.</strong>
        <ul className="subpage-list">
          <li>기획 의도와 구조 선택의 기록</li>
          <li>디자인과 개발의 협업 맥락 정리</li>
          <li>다음 개선을 위한 작업 힌트 축적</li>
        </ul>
      </section>
    </div>
  );
}
