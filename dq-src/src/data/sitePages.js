import AxDxPage from '../pages/AxDxPage';
import CompanyPage from '../pages/CompanyPage';
import ServicePage from '../pages/ServicePage';
import SolutionPage from '../pages/SolutionPage';
import StoryPage from '../pages/StoryPage';
import SupportPage from '../pages/SupportPage';

export const subPageDefinitions = [
  {
    id: 'company',
    label: 'Company',
    href: '/company',
    cmsKey: 'company',
    Component: CompanyPage,
    eyebrow: 'Company',
    title: 'DQ는 디지털 경험을 설계하는 파트너입니다.',
    description:
      '브랜드 메시지, 서비스 구조, 운영 방식까지 하나의 흐름으로 정리해 고객이 실제로 쓰는 디지털 경험을 만듭니다.',
    visualLabel: 'Who we are',
    visualTitle: 'Strategy, design, operation',
    visualBody: '기획과 구현, 운영과 개선을 분리하지 않고 처음부터 끝까지 연결하는 방식으로 일합니다.',
  },
  {
    id: 'axdx',
    label: 'AX/DX',
    href: '/ax-dx',
    cmsKey: 'axdx',
    Component: AxDxPage,
    eyebrow: 'AX / DX',
    title: '사용자 경험을 바꾸는 흐름을 먼저 설계합니다.',
    description:
      '업무 효율과 고객 경험을 함께 바꾸는 AX, DX 전략을 바탕으로 서비스의 전환 지점을 정리합니다.',
    visualLabel: 'Transformation',
    visualTitle: 'From process to experience',
    visualBody: '기존 시스템을 유지하면서도 더 나은 흐름으로 바꾸는 현실적인 전환 전략을 제안합니다.',
  },
  {
    id: 'solution',
    label: 'Solution',
    href: '/solution',
    cmsKey: 'solution',
    Component: SolutionPage,
    eyebrow: 'Solution',
    title: '운영하기 쉬운 구조로 해답을 만듭니다.',
    description:
      '콘텐츠, 관리자 화면, 정보 구조, 컴포넌트 설계를 함께 맞춰 나가며 지속적으로 관리 가능한 해법을 제안합니다.',
    visualLabel: 'Solution stack',
    visualTitle: 'CMS, UI, workflow',
    visualBody: '콘텐츠 추가와 수정이 편하고, 향후 기능 확장까지 고려한 구조를 우선합니다.',
  },
  {
    id: 'service',
    label: 'ICT Service',
    href: '/service',
    cmsKey: 'service',
    Component: ServicePage,
    eyebrow: 'ICT Service',
    title: '서비스 운영과 개선을 함께 이어갑니다.',
    description:
      '런칭 이후에도 콘텐츠 수정, 오류 대응, 기능 개선이 끊기지 않도록 운영 중심의 지원 구조를 제공합니다.',
    visualLabel: 'Service',
    visualTitle: 'Operate, improve, support',
    visualBody: '사이트가 만들어진 뒤에도 꾸준히 손볼 수 있어야 진짜 서비스가 됩니다.',
  },
  {
    id: 'story',
    label: 'Story',
    href: '/story',
    cmsKey: 'story',
    Component: StoryPage,
    eyebrow: 'Story',
    title: '프로젝트가 어떻게 완성됐는지 보여줍니다.',
    description:
      '결과물만 보여주는 대신, 어떤 문제를 어떻게 풀었는지 과정과 선택의 이유까지 함께 전달합니다.',
    visualLabel: 'Story',
    visualTitle: 'Ideas become products',
    visualBody: '작업의 맥락을 남겨두면 다음 개선과 확장이 훨씬 쉬워집니다.',
  },
  {
    id: 'support',
    label: 'Support',
    href: '/support',
    cmsKey: 'support',
    Component: SupportPage,
    eyebrow: 'Support',
    title: '문의와 운영 지원을 빠르게 연결합니다.',
    description:
      '프로젝트 문의, 운영 이슈, 기능 개선 요청을 한 흐름에서 정리하고 빠르게 답할 수 있는 창구를 제공합니다.',
    visualLabel: 'Support',
    visualTitle: 'Talk, solve, follow up',
    visualBody: '문의가 들어온 뒤에도 누락 없이 이어지는 대응 흐름이 중요합니다.',
  },
];
