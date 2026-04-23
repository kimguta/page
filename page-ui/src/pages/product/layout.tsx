import type { ReactNode } from 'react'

type ProductLayoutProps = {
  children: ReactNode
}

export function ProductLayout({ children }: ProductLayoutProps) {
  return <section className="panel card section-layout">{children}</section>
}
