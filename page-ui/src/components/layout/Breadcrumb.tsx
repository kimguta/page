import type { BreadcrumbItem } from '../../types/common'
import { Link } from '../common/Link'

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <span key={`${item.label}-${index}`} className="breadcrumb__item">
            {item.href && !isLast ? (
              <Link href={item.href} className="breadcrumb__link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumb__current">{item.label}</span>
            )}
            {isLast ? null : <span className="breadcrumb__divider">/</span>}
          </span>
        )
      })}
    </nav>
  )
}
