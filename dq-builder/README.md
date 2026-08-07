# DQ SITE BUILDER

새 프로젝트의 마크업 작업을 시작할 때 `dq-builder` 폴더 전체를 복사해서 사용하는 사이트 빌더입니다.

## 프로젝트 시작 체크리스트

1. `index.html`, `sub.html`의 헤더·푸터 항목과 메뉴 문구 교체
2. `css/app.css`의 `:root` 색상과 영역별 최대 너비 설정
3. `index.html`의 Swiper 예시를 프로젝트 메인 콘텐츠로 교체
4. `sub.html`의 서브 비주얼과 브레드크럼 교체
5. `images/common/blit-temp.svg`를 프로젝트 제목 블릿으로 교체

> `content/0content-ui.html`과 `css/content-ui.css`는 협의된 한 묶음입니다.  
> 프로젝트별 수정 전에 반드시 담당자와 협의하고, 일반 레이아웃 정리 대상에서 제외합니다.

## 경로 설정

개발 단계에서 JSP 파일의 위치가 달라져도 리소스 경로가 흔들리지 않도록 HTML의 CSS, JS, 링크와 include 경로는 루트 기준 절대경로를 사용합니다.

```html
<html lang="ko" data-template-root="/page/dq-builder">

<link rel="stylesheet" href="/page/dq-builder/css/app.css">
<script src="/page/dq-builder/js/app.js"></script>
```

- 새 프로젝트로 복사할 때 `/page/dq-builder`를 실제 프로젝트 루트로 일괄 변경합니다.
- 공통 리소스는 `/page/common/` 절대경로를 사용합니다.
- CSS 내부 이미지 경로는 CSS 파일 위치를 기준으로 계산되므로 상대경로를 유지할 수 있습니다.

## GNB 열림 방식

각 페이지의 `#header`에 있는 `data-gnb-mode` 값으로 선택합니다.

```html
<!-- 선택한 1뎁스의 2·3뎁스만 열기 -->
<header id="header" data-gnb-mode="single">...</header>

<!-- 선택한 1뎁스의 2·3뎁스를 헤더 아래 전체 너비로 열기 -->
<header id="header" data-gnb-mode="single-full">...</header>

<!-- 모든 2·3뎁스를 함께 열기 -->
<header id="header" data-gnb-mode="all">...</header>
```

- `index.html`: `single-full` 적용 예시
- `sub.html`: `all` 적용 예시
- `all` 모드의 공통 배경은 가장 긴 2뎁스 메뉴 높이에 맞춰 자동으로 늘어납니다.
- 모바일 전체 메뉴는 1·2·3뎁스를 접지 않고 연속으로 표시합니다.
- 1뎁스는 데스크톱과 모바일 모두 실제 이동 링크인 `<a>`를 사용합니다.
- 사이트맵은 별도 메뉴를 복제하지 않고 기존 `.gnb-depth1`을 전체 화면 UI로 펼칩니다.
- 사이트맵에서 `Esc`를 누르면 닫히고, 키보드 포커스는 열기 버튼으로 돌아갑니다.

## 영역별 너비

`css/app.css`의 `:root`에서 각각 설정합니다.

```css
--header-layout-width: 100%;
--footer-layout-width: 100%;
--content-layout-width: 1200px;
```

헤더·푸터는 기본적으로 화면 전체 너비를 사용하고, 메인 및 서브 콘텐츠만 `content-layout-width`의 제한을 받습니다.

## 메인 Swiper 예시

`index.html`에는 프로젝트 시작 시 참고할 수 있는 두 가지 예시가 있습니다.

- `.js-main-visual`: 자동 재생, Fade, 이전·다음, 페이지 표시, 재생·정지
- `.js-card-swiper`: 화면 너비에 따라 1.12개·2개·3개로 바뀌는 카드 목록

Swiper는 공식 로컬 배포본 `12.2.0`으로 고정했습니다. Slick은 협의된 `0content-ui.html` 내부 갤러리 호환을 위해 서브 공통 콘텐츠에서만 사용합니다.

## 파일 역할

- `css/app.css`: 헤더, GNB, 사이트맵, 푸터와 공통 레이아웃
- `css/index.css`: 메인 Swiper 예시 전용 스타일
- `css/swiper-bundle.min.css`: Swiper 12.2.0 로컬 스타일
- `css/sub.css`: 서브 비주얼, 브레드크럼과 콘텐츠 레이아웃
- `css/content-ui.css`: 협의된 `0content-ui.html` 전용 스타일
- `css/custom-builder.css`: 영역 선택 편집기에서 생성한 요소별·반응형 사용자 스타일
- `js/app.js`: 템플릿 설정, HTML include, 요소별 오버라이드와 모듈 초기화
- `js/navigation.js`: GNB, 모바일 메뉴, 사이트맵과 헤더 스크롤
- `js/smooth-scroll.js`: Lenis 초기화와 정리
- `js/components.js`: 브레드크럼, 관련 사이트와 샘플 보조 UI
- `js/index.js`: 메인 Swiper 예시 2종 초기화
- `js/swiper-bundle.min.js`: Swiper 12.2.0 로컬 라이브러리
- `js/lenis.js`: 부드러운 스크롤 라이브러리
- `tools/check-template.ps1`: 고정 경로, 예시 링크와 JS 문법 점검

## 선택 기능 제거

- Lenis를 사용하지 않으면 HTML에서 `lenis.js`, `smooth-scroll.js` 두 링크를 제거합니다.
- 메인 Swiper를 사용하지 않으면 `swiper-bundle.min.css`, `swiper-bundle.min.js`, `index.js` 링크를 함께 제거합니다.
- 협의 UI가 없는 서브페이지는 `content-ui.css` 링크와 `0content-ui.html` include를 함께 제거합니다.
- jQuery는 HTML include와 협의 UI 호환성 때문에 유지합니다.

브레드크럼과 관련 사이트는 여러 개 배치해도 JS가 각각 고유 ID를 생성합니다. 제목 블릿은 CSS를 수정하지 않고 `blit-temp.svg` 파일만 교체할 수 있습니다.
