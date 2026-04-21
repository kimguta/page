import { Link, NavLink } from 'react-router-dom';
import { menuItems } from '../data/menuItems';

export default function Header() {
  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="brand-mark">D</span>
        <span className="brand-text">DQ</span>
      </Link>

      <nav className="nav" aria-label="Primary navigation">
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

      <Link className="cta" to="/support">
        Inquiry
      </Link>
    </header>
  );
}
