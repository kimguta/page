export default function HomePage() {
  return (
    <main className="page-stack">
      <section className="card hero-panel">
        <p className="eyebrow">DQ Company</p>
        <h1>디지털 경험을 더 선명하게 만드는 팀</h1>
        <p className="description">
          DQ는 브랜드 사이트, 랜딩 페이지, 운영형 웹사이트를 빠르게 설계하고 안정적으로
          운영할 수 있도록 돕는 웹 파트너입니다.
        </p>

        <div className="dashboard-grid">
          <article className="mini-card">
            <span>브랜드 프로젝트</span>
            <strong>80+</strong>
          </article>
          <article className="mini-card">
            <span>운영 중인 사이트</span>
            <strong>35+</strong>
          </article>
          <article className="mini-card">
            <span>평균 런칭 기간</span>
            <strong>2주</strong>
          </article>
        </div>
      </section>

      <section className="card section">
        <p className="eyebrow">What we do</p>
        <div className="content-grid">
          <article className="content-card">
            <h2>Brand websites</h2>
            <p>기업 소개, 제품 소개, 채용 페이지까지 브랜드 톤을 살린 웹사이트를 만듭니다.</p>
          </article>
          <article className="content-card">
            <h2>CMS operations</h2>
            <p>메뉴, 배너, 공지, 콘텐츠를 관리자가 직접 업데이트할 수 있도록 구조를 잡아드립니다.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
