export default function Hero() {
  return (
    <section className="card section hero" id="home">
      <p className="eyebrow">React is ready</p>
      <h1>Vite + React setup complete</h1>
      <p className="description">
        Start building in <code>src/components</code> and run <code>npm run dev</code>.
      </p>

      <div className="hero-actions">
        <a className="primary-link" href="#contact">
          Talk to us
        </a>
        <a className="secondary-link" href="#services">
          View services
        </a>
      </div>
    </section>
  );
}
