import type { ReactNode } from 'react'

type MypageLayoutProps = {
  children: ReactNode
}

export function MypageLayout({ children }: MypageLayoutProps) {
  return <section className="panel card section-layout">{children}</section>
}
