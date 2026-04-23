import type { ReactNode } from 'react'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import type { BreadcrumbItem } from '../types/common'

type MainLayoutProps = {
  pathname: string
  title: string
  summary: string
  breadcrumbs: BreadcrumbItem[]
  children: ReactNode
}

export function MainLayout({ pathname, title, summary, breadcrumbs, children }: MainLayoutProps) {
  return (
    <div className="app-shell">
      <Header currentPath={pathname} />
      <main className="app-shell__main">
        <section className="page-hero panel panel--hero page-transition__hero">
          <Breadcrumb items={breadcrumbs} />
          <div className="page-hero__content">
            <div className="panel__eyebrow">DQ Archive</div>
            <h1>{title}</h1>
            <p>{summary}</p>
          </div>
        </section>
        <div className="page-content">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
