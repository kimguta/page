import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { navigate } from '../../utils/routePath'

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
}

const appRoutePrefixes = ['/', '/business', '/company', '/product', '/projects', '/customer', '/mypage', '/content']

function isAppRoute(href: string) {
  if (!href.startsWith('/')) {
    return false
  }

  return appRoutePrefixes.some((prefix) => href === prefix || href.startsWith(`${prefix}/`))
}

export function Link({ href, onClick, children, ...props }: LinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event)
    if (event.defaultPrevented) {
      return
    }

    if (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#') ||
      !isAppRoute(href)
    ) {
      return
    }

    event.preventDefault()
    navigate(href)
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
