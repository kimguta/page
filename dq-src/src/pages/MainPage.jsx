import { Link } from 'react-router-dom';

const heroStats = [
  { label: 'Projects shipped', value: '80+' },
  { label: 'Active clients', value: '35+' },
  { label: 'Avg. launch', value: '2 weeks' },
];

const focusCards = [
  {
    title: 'Company',
    text: '브랜드 방향과 사업 목표를 정리해서, 사이트 전체의 톤과 구조를 흔들림 없이 잡아줍니다.',
  },
  {
    title: 'AX / DX',
    text: '사용자 경험을 바꾸고 내부 업무 흐름을 개선하는 디지털 전환 포인트를 설계합니다.',
  },
  {
    title: 'Solution',
    text: 'CMS, 관리자 페이지, 콘텐츠 운영 구조를 함께 묶어 오래 쓰기 좋은 시스템을 만듭니다.',
  },
];

const storyCards = [
  {
    title: 'Clear message',
    text: '첫 화면에서 누구에게 무엇을 제공하는 회사인지 바로 이해되도록 메시지를 정리합니다.',
  },
  {
    title: 'Scalable system',
    text: '메뉴, 배너, 공지, 사례가 늘어나도 관리가 쉬운 구조로 만들어 지속 운영이 편합니다.',
  },
  {
    title: 'Polished motion',
    text: '과하지 않은 인터랙션과 여백, 대비를 사용해 고급스럽고 신뢰감 있는 분위기를 만듭니다.',
  },
];

export default function MainPage() {
  return (
    <main className="page-stack">
      <section className="card main-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">(주)디큐 Digital Quotient</p>
            <h1>브랜드와 기술을 연결해 비즈니스의 첫인상을 설계합니다</h1>
            <p className="description">
              DQ는 회사 소개, 솔루션, 운영 서비스, 스토리까지 한 번에 연결되는 디지털 경험을
              만듭니다. 보기 좋은 화면을 넘어서 실제 운영과 확장이 쉬운 웹사이트를 지향합니다.
            </p>

            <div className="hero-actions">
              <Link className="primary-link" to="/support">
                프로젝트 문의
              </Link>
              <Link className="secondary-link" to="/company">
                회사 소개 보기
              </Link>
            </div>

            <div className="hero-stats">
              {heroStats.map((stat) => (
                <article className="stat-card" key={stat.label}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </article>
              ))}
            </div>
          </div>

          <aside className="hero-visual" aria-label="DQ overview">
            <div className="visual-panel visual-panel-top">
              <span className="visual-label">Company</span>
              <strong>Digital Quotient</strong>
              <p>브랜드 전략, 서비스 구조, 콘텐츠 흐름을 정리합니다.</p>
            </div>
            <div className="visual-panel visual-panel-mid">
              <span className="visual-label">AX / DX</span>
              <p>업무와 고객 경험을 함께 바꾸는 디지털 전환.</p>
            </div>
            <div className="visual-panel visual-panel-bottom">
              <span className="visual-label">Support</span>
              <p>운영, 업데이트, 유지보수까지 이어지는 관리 체계.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="card section">
        <div className="section-heading">
          <p className="eyebrow">What DQ does</p>
          <h2>회사 소개부터 솔루션까지 한 흐름으로</h2>
        </div>

        <div className="feature-grid">
          {focusCards.map((item) => (
            <article className="feature-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card section">
        <div className="section-heading">
          <p className="eyebrow">Story</p>
          <h2>기능보다 먼저, 사용성과 신뢰를 만듭니다</h2>
        </div>

        <div className="story-grid">
          {storyCards.map((item) => (
            <article className="story-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
