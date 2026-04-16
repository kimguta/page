import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const heroStats = [
  { label: 'Projects shipped', value: '80+' },
  { label: 'Active clients', value: '35+' },
  { label: 'Avg. launch', value: '2 weeks' },
];

const focusCards = [
  {
    title: 'Company',
    text: '브랜드 방향과 사업 목표를 정리해 사이트 전체의 톤과 구조를 흔들림 없이 잡아줍니다.',
  },
  {
    title: 'AX / DX',
    text: '사용자 경험과 내부 업무 흐름을 함께 개선하는 디지털 전환 포인트를 설계합니다.',
  },
  {
    title: 'Solution',
    text: 'CMS, 관리자 페이지, 콘텐츠 운영 구조를 묶어 오래 쓰기 좋은 시스템을 만듭니다.',
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

const heroSlides = [
  {
    eyebrow: 'Company',
    title: 'Digital Quotient',
    text: '브랜드 소개, 서비스 구조, 콘텐츠 흐름을 한 번에 이해되도록 정리합니다.',
    tag: 'Brand system',
    accent: 'slide-company',
  },
  {
    eyebrow: 'AX / DX',
    title: 'Connected experience',
    text: '사용자 경험과 내부 운영을 같이 개선해 더 빠르고 명확한 구조를 만듭니다.',
    tag: 'Digital transformation',
    accent: 'slide-axdx',
  },
  {
    eyebrow: 'Support',
    title: 'Ongoing operation',
    text: '업데이트, 유지보수, 개선 요청까지 이어지는 안정적인 운영 체계를 제공합니다.',
    tag: 'Maintenance',
    accent: 'slide-support',
  },
  {
    eyebrow: 'Solution',
    title: 'System-driven build',
    text: 'CMS와 관리형 구조를 설계해, 나중에 콘텐츠가 늘어나도 관리가 쉬운 사이트를 만듭니다.',
    tag: 'CMS ready',
    accent: 'slide-solution',
  },
];

export default function MainPage() {
  const carouselRef = useRef(null);
  const slideRefs = useRef([]);
  const dragState = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const slideCount = heroSlides.length;

  useEffect(() => {
    const root = carouselRef.current;
    const slides = slideRefs.current.filter(Boolean);

    if (!root || slides.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry = null;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        }

        if (bestEntry) {
          const index = Number(bestEntry.target.dataset.index);
          if (!Number.isNaN(index)) {
            setActiveIndex(index);
          }
        }
      },
      {
        root,
        threshold: [0.55, 0.65, 0.75],
      },
    );

    slides.forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, []);

  const pager = useMemo(
    () =>
      Array.from({ length: slideCount }, (_, index) => ({
        index,
        label: heroSlides[index].eyebrow,
      })),
    [slideCount],
  );

  const scrollToSlide = (index) => {
    const slide = slideRefs.current[index];
    if (!slide) return;

    slide.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const snapToClosestSlide = () => {
    const root = carouselRef.current;
    if (!root) return;

    const rootCenter = root.scrollLeft + root.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;

      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - rootCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    scrollToSlide(closestIndex);
  };

  const handlePointerDown = (event) => {
    const root = carouselRef.current;
    if (!root || event.button !== 0) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: root.scrollLeft,
    };

    setIsDragging(true);
    root.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const root = carouselRef.current;
    const state = dragState.current;
    if (!root || !state.active) return;

    const deltaX = event.clientX - state.startX;
    root.scrollLeft = state.startScrollLeft - deltaX;
  };

  const endDrag = (event) => {
    const root = carouselRef.current;
    if (!dragState.current.active) return;

    dragState.current.active = false;
    setIsDragging(false);
    root?.releasePointerCapture?.(event.pointerId);
    snapToClosestSlide();
  };

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
            <div
              ref={carouselRef}
              className={`hero-carousel ${isDragging ? 'dragging' : ''}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onPointerLeave={endDrag}
            >
              {heroSlides.map((slide, index) => (
                <article
                  key={slide.title}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  data-index={index}
                  className={`hero-slide ${slide.accent}`}
                >
                  <div className="slide-media" aria-hidden="true">
                    <div className="slide-orb slide-orb-one" />
                    <div className="slide-orb slide-orb-two" />
                    <div className="slide-grid" />
                  </div>

                  <div className="slide-copy">
                    <span className="visual-label">{slide.eyebrow}</span>
                    <strong>{slide.title}</strong>
                    <p>{slide.text}</p>
                    <span className="slide-tag">{slide.tag}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="carousel-controls" aria-label="hero pager">
              {pager.map((item) => (
                <button
                  key={item.index}
                  type="button"
                  className={`pager-dot ${activeIndex === item.index ? 'active' : ''}`}
                  onClick={() => scrollToSlide(item.index)}
                  aria-label={`Go to ${item.label}`}
                  aria-pressed={activeIndex === item.index}
                />
              ))}
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
