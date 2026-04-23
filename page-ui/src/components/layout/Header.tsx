import { mainMenu } from '../../constants/menu'
import { site } from '../../constants/site'
import { isActivePath } from '../../utils/routePath'
import { Link } from '../common/Link'

type HeaderProps = {
  currentPath: string
}

export function Header({ currentPath }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__brand">
        <Link href="/" className="site-logo">
          <span>
            <strong>{site.name}</strong>
            <small>{site.tagline}</small>
          </span>
        </Link>
      </div>
      <nav className="site-header__nav" aria-label="Primary">
        {mainMenu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActivePath(currentPath, item.href) ? 'nav-link is-active' : 'nav-link'}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
