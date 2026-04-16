const services = [
  {
    title: 'Design System',
    text: '컴포넌트 기반으로 일관된 UI를 빠르게 쌓을 수 있게 해줍니다.',
  },
  {
    title: 'CMS Structure',
    text: '메뉴, 섹션, 카드 데이터를 외부 데이터로 바꾸기 쉬운 구조로 만듭니다.',
  },
  {
    title: 'Responsive Build',
    text: '데스크톱과 모바일 모두에서 자연스럽게 보이도록 레이아웃을 다듬습니다.',
  },
];

export default function Services() {
  return (
    <section className="card section" id="services">
      <p className="eyebrow">Services</p>
      <h2 className="section-title">What we can shape next</h2>

      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
