import type { ReactNode } from 'react'
import { BusinessLayout } from '../pages/business/layout'
import { CompanyLayout } from '../pages/company/layout'
import { GreetingPage } from '../pages/company/greeting'
import { LocationPage } from '../pages/company/location'
import { CustomerLayout } from '../pages/customer/layout'
import { FaqPage } from '../pages/customer/faq'
import { NoticeListPage } from '../pages/customer/notice'
import { QnaPage } from '../pages/customer/qna'
import { MypageLayout } from '../pages/mypage/layout'
import { OrderPage } from '../pages/mypage/order'
import { ProfilePage } from '../pages/mypage/profile'
import { ProductLayout } from '../pages/product/layout'
import { ProductIndexPage } from '../pages/product'
import { MainPage } from '../pages/main/MainPage'
import { ProjectsPage } from '../pages/projects'
import type { BreadcrumbItem } from '../types/common'
import { normalizePath, subscribeToNavigation } from '../utils/routePath'

export type RouteResult = {
  title: string
  summary: string
  breadcrumbs: BreadcrumbItem[]
  element: ReactNode
  shell?: 'main' | 'sub'
}

const companyBreadcrumbs = (label: string): BreadcrumbItem[] => [
  { label: 'Home', href: '/' },
  { label: '회사', href: '/company/greeting' },
  { label },
]

const customerBreadcrumbs = (label: string): BreadcrumbItem[] => [
  { label: 'Home', href: '/' },
  { label: '문화·문의', href: '/customer/faq' },
  { label },
]

const mypageBreadcrumbs = (label: string): BreadcrumbItem[] => [
  { label: 'Home', href: '/' },
  { label: '프로젝트', href: '/mypage/profile' },
  { label },
]

export { subscribeToNavigation }

export function resolveRoute(pathname: string): RouteResult {
  const path = normalizePath(pathname)

  if (path === '/') {
    return {
      title: 'DQ UI Archive',
      summary: 'DQ에서 만든 사이트를 성격별로 바로 볼 수 있는 첫 화면입니다.',
      breadcrumbs: [{ label: 'Home' }],
      element: <MainPage />,
      shell: 'main',
    }
  }

  if (path === '/business') {
    return {
      title: '공공·행정',
      summary: '공공 서비스와 행정형 사이트를 모아둔 화면입니다.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: '공공·행정' },
      ],
      element: <BusinessLayout />,
    }
  }

  if (path === '/company/greeting') {
    return {
      title: '회사 소개',
      summary: '회사와 작업 방향을 간단히 확인하는 화면입니다.',
      breadcrumbs: companyBreadcrumbs('소개'),
      element: (
        <CompanyLayout>
          <GreetingPage />
        </CompanyLayout>
      ),
    }
  }

  if (path === '/company/location') {
    return {
      title: '위치',
      summary: '찾아오는 길과 기본 정보를 확인하는 화면입니다.',
      breadcrumbs: companyBreadcrumbs('위치'),
      element: (
        <CompanyLayout>
          <LocationPage />
        </CompanyLayout>
      ),
    }
  }

  if (path === '/product') {
    return {
      title: '최근 사이트',
      summary: '최근 작업을 카드와 썸네일로 보여주는 화면입니다.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: '최근 사이트' },
      ],
      element: (
        <ProductLayout>
          <ProductIndexPage />
        </ProductLayout>
      ),
    }
  }

  if (path === '/projects') {
    return {
      title: '전체 프로젝트',
      summary: '썸네일과 사이트명을 한 번에 보는 전체 프로젝트 목록입니다.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: '전체 프로젝트' },
      ],
      element: <ProjectsPage />,
    }
  }

  if (path === '/customer/faq') {
    return {
      title: '문화·관광',
      summary: '문화, 전시, 관광 사이트를 모아둔 화면입니다.',
      breadcrumbs: customerBreadcrumbs('문화·관광'),
      element: (
        <CustomerLayout>
          <FaqPage />
        </CustomerLayout>
      ),
    }
  }

  if (path === '/customer/qna') {
    return {
      title: '문의',
      summary: '메일로 문의를 보내는 화면입니다.',
      breadcrumbs: customerBreadcrumbs('문의'),
      element: (
        <CustomerLayout>
          <QnaPage />
        </CustomerLayout>
      ),
    }
  }

  if (path === '/customer/notice') {
    return {
      title: '이전 사이트',
      summary: '이전에 만든 사이트를 모아둔 화면입니다.',
      breadcrumbs: customerBreadcrumbs('이전 사이트'),
      element: (
        <CustomerLayout>
          <NoticeListPage />
        </CustomerLayout>
      ),
    }
  }

  if (path === '/mypage/profile') {
    return {
      title: '프로젝트 정보',
      summary: '작업 개요와 기본 정보를 확인하는 화면입니다.',
      breadcrumbs: mypageBreadcrumbs('프로젝트 정보'),
      element: (
        <MypageLayout>
          <ProfilePage />
        </MypageLayout>
      ),
    }
  }

  if (path === '/mypage/order') {
    return {
      title: '작업 기록',
      summary: '작업 내역과 기록을 확인하는 화면입니다.',
      breadcrumbs: mypageBreadcrumbs('작업 기록'),
      element: (
        <MypageLayout>
          <OrderPage />
        </MypageLayout>
      ),
    }
  }

  return {
    title: 'Not Found',
    summary: '요청한 페이지를 찾을 수 없습니다.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Not Found' },
    ],
    element: (
      <section className="panel card">
        <div className="panel__eyebrow">404</div>
        <h2>페이지를 찾을 수 없습니다.</h2>
        <p>메인에서 원하는 사이트 분류로 다시 들어가 보세요.</p>
      </section>
    ),
  }
}
