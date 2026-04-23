import type { ReactNode } from 'react'

type CustomerLayoutProps = {
  children: ReactNode
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
  return <section className="panel card section-layout">{children}</section>
}
