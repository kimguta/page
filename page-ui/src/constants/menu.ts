import type { MenuItem } from '../types/common'

export const mainMenu: MenuItem[] = [
  { label: '홈', href: '/' },
  { label: '최근 사이트', href: '/product' },
  { label: '공공·행정', href: '/business' },
  { label: '문화·관광', href: '/customer/faq' },
  { label: '전체 프로젝트', href: '/projects' },
  { label: '문의', href: '/customer/qna' },
]

export const footerMenu: MenuItem[] = [
  { label: '최근 사이트', href: '/product' },
  { label: '이전 사이트', href: '/customer/notice' },
  { label: '문화·관광', href: '/customer/faq' },
  { label: '전체 프로젝트', href: '/projects' },
  { label: '공공·행정', href: '/business' },
  { label: '문의', href: '/customer/qna' },
]
