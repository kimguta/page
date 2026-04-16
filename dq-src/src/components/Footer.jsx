import { Link, NavLink } from 'react-router-dom';
import { menuItems } from '../data/menuItems';

export default function Footer() {
  return (
    <footer className="footerbar">
      <div className="footer-brand">
        <Link className="brand" to="/">
          <span className="brand-mark">D</span>
          <span className="brand-text">DQ</span>
        </Link>
        <p className="footer-copy">
          Digital Quotient는 브랜드, 시스템, 콘텐츠를 하나의 경험으로 연결하는 웹 파트너입니다.
        </p>
      </div>

      <nav className="footer-nav" aria-label="Footer navigation">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.href}
            className={({ isActive }) => (isActive ? 'footer-link active' : 'footer-link')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <p className="footer-meta">© 2026 DQ. All rights reserved.</p>
    </footer>
  );
}
