const listeners = new Set<() => void>()
const topLevelRoutes = new Set(['business', 'company', 'product', 'projects', 'customer', 'mypage', 'content'])

export function getBasePath() {
  if (typeof window === 'undefined') {
    return '/'
  }

  const { pathname } = window.location
  const firstSegment = pathname.split('/').filter(Boolean)[0]

  if (!firstSegment || topLevelRoutes.has(firstSegment)) {
    return '/'
  }

  return `/${firstSegment}/`
}

function stripBasePath(pathname: string) {
  const basePath = getBasePath()

  if (basePath === '/') {
    return pathname
  }

  if (pathname.startsWith(basePath)) {
    return pathname.slice(basePath.length - 1) || '/'
  }

  return pathname
}

function withBasePath(pathname: string) {
  const basePath = getBasePath()

  if (basePath === '/') {
    return pathname
  }

  if (pathname === '/') {
    return basePath
  }

  return `${basePath}${pathname.replace(/^\/+/, '')}`
}

export function normalizePath(pathname: string) {
  const value = stripBasePath(pathname.trim().split(/[?#]/)[0])
  if (!value || value === '/') {
    return '/'
  }

  return value.replace(/\/+$/, '')
}

export function isActivePath(currentPath: string, targetPath: string) {
  const current = normalizePath(currentPath)
  const target = normalizePath(targetPath)
  return current === target || current.startsWith(`${target}/`)
}

export function navigate(to: string) {
  if (typeof window === 'undefined') {
    return
  }

  const next = normalizePath(to)
  const current = normalizePath(window.location.pathname)
  if (current === next) {
    return
  }

  window.history.pushState({}, '', withBasePath(next))
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function subscribeToNavigation(callback: () => void) {
  listeners.add(callback)

  const handleChange = () => {
    listeners.forEach((listener) => listener())
  }

  window.addEventListener('popstate', handleChange)
  window.addEventListener('navigate', handleChange as EventListener)

  return () => {
    listeners.delete(callback)
    window.removeEventListener('popstate', handleChange)
    window.removeEventListener('navigate', handleChange as EventListener)
  }
}
