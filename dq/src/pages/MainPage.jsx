const highlights = [
  {
    title: 'Strategy',
    text: '브랜드 방향성과 사이트 구조를 먼저 정리해서, 콘텐츠가 많은 사이트도 흐름이 자연스럽게 보이게 합니다.',
  },
  {
    title: 'Design',
    text: '보기 좋은 화면보다 오래 써도 질리지 않는 화면을 만듭니다. 톤과 여백, 타이포를 섬세하게 맞춥니다.',
  },
  {
    title: 'Build',
    text: 'React 기반으로 컴포넌트화해두어, 메뉴와 페이지가 늘어나도 관리가 편한 구조를 유지합니다.',
  },
];

const metrics = [
  { label: 'Launch speed', value: '2 weeks' },
  { label: 'Active clients', value: '35+' },
  { label: 'Projects shipped', value: '80+' },
];

export default function MainPage() {
  return (
    <main className="page-stack">
      <section className="card main-hero">
        <p className="eyebrow">DQ Main Page</p>
        <h1>브랜드의 첫인상을 설계하는 메인 페이지</h1>
        <p className="description">
          이 페이지는 메뉴와 별개로 DQ의 핵심 메시지를 보여주는 첫 화면입니다. 서브페이지로
          들어가기 전에 회사의 강점과 분위기를 먼저 전달합니다.
        </p>

        <div className="hero-actions">
          <a className="primary-link" href="/contact">
            프로젝트 문의
          </a>
          <a className="secondary-link" href="/guides">
            DQ 소개 보기
          </a>
        </div>

        <div className="dashboard-grid">
          {metrics.map((metric) => (
            <article className="mini-card" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="card section">
        <p className="eyebrow">How DQ works</p>
        <div className="content-grid">
          {highlights.map((item) => (
            <article className="content-card" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
