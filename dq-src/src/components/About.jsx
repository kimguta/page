const stats = [
  { value: '12+', label: 'Projects delivered' },
  { value: '4', label: 'Core services' },
  { value: '24/7', label: 'Support mindset' },
];

export default function About() {
  return (
    <section className="card section" id="about">
      <p className="eyebrow">About</p>
      <h2 className="section-title">A clean layout that is easy to grow</h2>
      <p className="description">
        섹션을 나눠두면 내용이 늘어나도 관리가 쉽고, CMS나 API로 바꾸기에도 훨씬 편합니다.
      </p>

      <div className="stats-grid">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
