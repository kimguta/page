import { menuItems } from '../data/menuItems';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="brand-mark">D</span>
        <span className="brand-text">DQ</span>
      </Link>

      <nav className="nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.href}
            data-cms-key={item.cmsKey}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button className="cta" type="button">
        문의하기
      </button>
    </header>
  );
}
