import { footerMenu } from '../../constants/menu'
import { site } from '../../constants/site'
import { Link } from '../common/Link'

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{site.name}</strong>
        <p>{site.description}</p>
      </div>
      <div className="site-footer__links">
        {footerMenu.map((item) => (
          <Link key={item.href} href={item.href} className="footer-link">
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  )
}
