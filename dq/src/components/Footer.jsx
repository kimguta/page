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
          DQ는 브랜드 경험, 웹사이트 구축, 콘텐츠 운영을 한 흐름으로 연결하는 회사입니다.
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
