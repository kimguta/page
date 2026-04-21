import { Link } from 'react-router-dom';

export default function SubPageLayout({
  eyebrow,
  title,
  description,
  visualLabel,
  visualTitle,
  visualBody,
  breadcrumbs,
  children,
}) {
  return (
    <main className="page-stack subpage-shell">
      <section className="card subpage-hero">
        <div className="subpage-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="description">{description}</p>

          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link className="breadcrumb-link" to="/">
              Home
            </Link>
            {breadcrumbs.map((item, index) => (
              <span className="breadcrumb-item" key={item.label}>
                <span className="breadcrumb-separator">/</span>
                {item.to ? (
                  <Link className="breadcrumb-link" to={item.to}>
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>

        <aside className="subpage-visual" aria-label={`${visualLabel} summary`}>
          <p className="subpage-visual-label">{visualLabel}</p>
          <strong className="subpage-visual-title">{visualTitle}</strong>
          <p className="subpage-visual-body">{visualBody}</p>
          <div className="subpage-visual-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </aside>
      </section>
      <div className="subpage-wrap">{children}</div>
    </main>
  );
}
