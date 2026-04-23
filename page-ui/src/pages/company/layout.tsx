import type { ReactNode } from 'react'

type CompanyLayoutProps = {
  children: ReactNode
}

export function CompanyLayout({ children }: CompanyLayoutProps) {
  return <section className="panel card section-layout">{children}</section>
}
