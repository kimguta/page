import { getBasePath } from './routePath'

export function resolvePublicPath(path: string) {
  const cleanPath = path.replace(/^\/+/, '')
  const basePath = getBasePath()

  if (basePath === '/') {
    return `/${cleanPath}`
  }

  return `${basePath}${cleanPath}`
}
