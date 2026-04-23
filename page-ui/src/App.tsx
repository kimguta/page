import { useEffect, useSyncExternalStore } from 'react'
import { MainLayout } from './layouts/MainLayout'
import { resolveRoute, subscribeToNavigation } from './routes'
import { site } from './constants/site'

function usePathname() {
  return useSyncExternalStore(
    subscribeToNavigation,
    () => `${window.location.pathname}${window.location.search}${window.location.hash}`,
    () => '/',
  )
}

function App() {
  const pathname = usePathname()
  const route = resolveRoute(pathname)

  useEffect(() => {
    document.title = route.title === site.name ? site.name : `${route.title} | ${site.tagline}`
  }, [route.title])

  if (route.shell === 'main') {
    return (
      <div key={pathname} className="page-transition page-transition--main">
        {route.element}
      </div>
    )
  }

  return (
    <MainLayout
      pathname={pathname}
      title={route.title}
      summary={route.summary}
      breadcrumbs={route.breadcrumbs}
    >
      <div key={pathname} className="page-transition">
        {route.element}
      </div>
    </MainLayout>
  )
}

export default App
