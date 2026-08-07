import { ArchiveCardGrid } from '../../components/archive/ArchiveCardGrid'
import { ArchiveStatsGraph } from '../../components/archive/ArchiveStatsGraph'
import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { Link } from '../../components/common/Link'
import { site } from '../../constants/site'
import { cultureCards, legacyCards, projectCards, publicCards } from '../../data/archiveCards'
import { resolvePublicPath } from '../../utils/publicPath'
import './MainPage.css'

const quickLinks = [
  {
    label: '최근 사이트',
    href: '/product',
    description: '최근에 만든 사이트를 바로 봅니다.',
  },
  {
    label: '공공·행정',
    href: '/business',
    description: '공공 서비스와 행정형 화면을 모았습니다.',
  },
  {
    label: '문화·관광',
    href: '/customer/faq',
    description: '문화, 관광, 행사 사이트를 모았습니다.',
  },
  {
    label: '문의',
    href: '/customer/qna',
    description: '문의는 메일로 바로 보냅니다.',
  },
]

export function MainPage() {
  const builderHref = resolvePublicPath('dq-builder/index.html')

  return (
    <div className="main-page">
      <Header currentPath="/" />

      <main className="main-page__main">
        <section className="builder-promo panel" aria-labelledby="builder-promo-title">
          <div className="builder-promo__copy">
            <div className="panel__eyebrow">DQ Builder · Preview</div>
            <h2 id="builder-promo-title">DQ 사이트 빌더 미리보기</h2>
            <p>
              헤더·푸터·콘텐츠 구성과 상세 스타일 편집 흐름을 브라우저에서 직접 테스트해
              보세요.
            </p>
            <div className="builder-promo__tags" aria-label="DQ 빌더 주요 기능">
              <span>구성 편집</span>
              <span>상세 편집</span>
              <span>메인·서브 미리보기</span>
            </div>
          </div>
          <div className="builder-promo__action">
            <a className="button button--primary builder-promo__link" href={builderHref}>
              DQ 빌더 열기 <span aria-hidden="true">→</span>
            </a>
            <small>PC 화면 권장 · GitHub Pages에서는 임시 편집 체험용</small>
          </div>
        </section>

        <section className="hero panel panel--hero panel--sunrise">
          <div className="hero__copy">
            <div className="hero__badge">DQ UI Archive</div>
            <h1>DQ UI 아카이브</h1>
            <p className="hero__lead">{site.description}</p>

            <div className="button-row">
              <a className="button button--primary" href="#site-lists">
                전체 사이트 보기
              </a>
              <Link className="button button--secondary" href="/customer/qna">
                Inquiry
              </Link>
            </div>

            <div className="hero__chips">
              <span className="pill">Card-first</span>
              <span className="pill">Direct copy</span>
              <span className="pill">Dark archive</span>
            </div>
          </div>

          <ArchiveStatsGraph />
        </section>

        <section className="section">
          <div className="section-heading">
            <div className="panel__eyebrow">Quick Links</div>
            <h2>바로 가기</h2>
            <p>원하는 분류를 눌러서 바로 들어갈 수 있습니다.</p>
          </div>

          <div className="index-grid">
            {quickLinks.map((item) => (
              <Link key={item.label} className="index-card panel" href={item.href}>
                <span className="index-card__label">Open</span>
                <strong>{item.label}</strong>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="site-lists" className="section">
          <div className="section-heading">
            <div className="panel__eyebrow">All Sites</div>
            <h2>전체 사이트</h2>
            <p>카드와 썸네일로 사이트를 바로 볼 수 있게 정리했습니다.</p>
          </div>

          <div className="archive-stack">
            <article className="panel archive-panel">
              <div className="panel__eyebrow">최근 사이트</div>
              <h3>최근 작업</h3>
              <ArchiveCardGrid cards={projectCards} />
            </article>

            <article className="panel archive-panel">
              <div className="panel__eyebrow">공공·행정</div>
              <h3>공공·행정</h3>
              <ArchiveCardGrid cards={publicCards} />
            </article>

            <article className="panel archive-panel">
              <div className="panel__eyebrow">문화·관광</div>
              <h3>문화·관광</h3>
              <ArchiveCardGrid cards={cultureCards} />
            </article>

            <article className="panel archive-panel">
              <div className="panel__eyebrow">이전 사이트</div>
              <h3>이전 작업</h3>
              <ArchiveCardGrid cards={legacyCards} />
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
