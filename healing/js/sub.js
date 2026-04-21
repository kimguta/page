
//서브공통 스크립트
var ObjDoc = $(document);

ObjDoc.on({
  'click': function (e) {
    e.preventDefault();
    var fileUrl = $(this).find('img').attr('src');
    var fileName = $(this).find('img').attr('alt');
    $("body").append(`
		<div id="img-modal">
			<div class="title-bx">
				<h1>`+ fileName + `</h1>
				<div class="btn-bx">
					<a href="#" class="zoom-in" id="zoom-in"><i class="fa-solid fa-magnifying-glass-plus"></i> 확대</a>
					<a href="#" class="zoom-out" id="zoom-out"><i class="fa-solid fa-magnifying-glass-minus"></i> 축소</a>
				</div>
			</div>
			<div class=thumb>
				<img id="panzoom" src="`+ fileUrl + `" alt="` + fileName + `">
			</div>
			<a href="#" class="close"><i class="fa-solid fa-xmark"></i></a>
		</div>
		`);
    const element = document.getElementById('panzoom');
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    const panzoom = Panzoom(element, {
      maxScale: 3,
      minScale: 0.3,
    });
    const parent = element.parentElement
    parent.addEventListener('wheel', panzoom.zoomWithWheel);
    zoomInButton.addEventListener('click', panzoom.zoomIn);
    zoomOutButton.addEventListener('click', panzoom.zoomOut);
    $(this).addClass('active');
    $('#img-modal a:first').focus();
  }
}, '.img-zoom-modal')
  .on({
    'keydown': function (e) {
      if (e.keyCode == 9) {
        $('#img-modal a:first').focus();
        return false;
      }
    },
    'click': function (e) {
      e.preventDefault();
      $('#img-modal').remove();
      $('.img-zoom-modal.active').focus().removeClass('active');
    }
  }, '#img-modal .close');

//콘텐츠 스크립트 (dom ready 후 동작)
function contentScript() {

  $('.skinTb-wrapper').on('scroll', function () {
    $(this).addClass('scroll');
  });
  $('.skinTb.width640').parent().addClass('width640');
  $('.skinTb.width768').parent().addClass('width768');
  $('.skinTb.width1000').parent().addClass('width1000');




  const groupSwiper = new Swiper('.groupSwiper', {
    loop: true,
    speed: 600,
    navigation: {
      nextEl: '.groupSwiper .swiper-button-next',
      prevEl: '.groupSwiper .swiper-button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 0,
    touchRatio: 1,
    effect: 'slide',
  });

  const subSwiper = new Swiper('.subSwiper', {
    loop: true,
    speed: 600,
    navigation: {
      nextEl: '.subSwiper .swiper-button-next',
      prevEl: '.subSwiper .swiper-button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 0,
    touchRatio: 1,
    effect: 'slide',
  });

  // detailSwiper 동적 초기화 (모든 요소)
  document.querySelectorAll('.detailSwiper').forEach((slider) => {
    const images = slider.querySelectorAll('.swiper-slide img');

    // pagination 찾기: swiper 안에 있거나 부모에 있을 수 있음
    const paginationEl = (() => {
      // 1. swiper 안에서 찾기
      let el = slider.querySelector('.swiper-pagination');
      if (el) return el;
      // 2. 부모에서 찾기
      el = slider.parentElement?.querySelector('.swiper-pagination');
      if (el) return el;
      // 3. 1단계 상위 부모에서 찾기
      return slider.parentElement?.parentElement?.querySelector('.swiper-pagination');
    })();

    new Swiper(slider, {
      loop: false,
      navigation: {
        nextEl: '.detailSwiper .swiper-button-next',
        prevEl: '.detailSwiper .swiper-button-prev',
      },
      pagination: {
        el: paginationEl,
        clickable: true,
        renderBullet: function (index, className) {
          const src = images[index]?.getAttribute('src');
          const alt = images[index]?.getAttribute('alt') || `썸네일 ${index + 1}`;
          return `<button class="${className}"><img src="${src}" alt="${alt}"></button>`;
        }
      }
    });
  });

  (() => {
    const onReady = (fn) =>
      document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', fn, { once: true })
        : fn();

    onReady(() => {
      const items = document.querySelectorAll('.scroll-show');
      let hasScrolled = false;

      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      }, {
        threshold: 0.3
      });

      items.forEach((el) => io.observe(el));

      function checkEndTouch() {
        if (!hasScrolled) return;

        const triggerLine = window.innerHeight * 1.2;

        items.forEach((el) => {
          const rect = el.getBoundingClientRect();

          // 요소 bottom이 화면 아래 20% 전 지점에 오면 클래스 추가
          if (rect.bottom <= triggerLine) {
            el.classList.add('end-touch');
          }
        });
      }

      window.addEventListener('scroll', () => {
        hasScrolled = true;
        checkEndTouch();
      });

      window.addEventListener('resize', checkEndTouch);
    });
  })();

  const wrap = document.querySelector('.news-board-bx');
  const list = document.querySelector('.news-board-list');
  const item = document.querySelector('.news-board-bx .item:first-child');
  if (!wrap || !list || !item) return;

  // 720px 이상만
  const mq = window.matchMedia('(min-width: 720px)');

  function getTopOffset() {
    const header = document.querySelector('#header');
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const extra = 0;
    return headerH + extra;
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  let ticking = false;
  let enabled = false;

  function update() {
    ticking = false;

    const topOffset = getTopOffset();
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    const wrapTop = wrap.getBoundingClientRect().top + scrollY;

    const listTopInWrap = list.offsetTop;
    const listH = list.offsetHeight;
    const itemH = item.offsetHeight;

    const maxMove = Math.max(0, (listTopInWrap + listH) - itemH);
    const desired = (scrollY + topOffset) - wrapTop;
    const y = clamp(desired, 0, maxMove);

    item.style.transform = `translateY(${y}px)`;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function enable() {
    if (enabled) return;
    enabled = true;

    item.style.position = 'absolute';
    item.style.left = '0';
    item.style.top = '0';
    item.style.willChange = 'transform';
    item.style.zIndex = '2';

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', update);

    update();
  }

  function disable() {
    if (!enabled) return;
    enabled = false;

    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    window.removeEventListener('load', update);

    // 원복(모바일에서는 일반 흐름으로 보이게)
    item.style.transform = '';
    item.style.willChange = '';
    item.style.zIndex = '';

    // 원래 absolute 유지하고 싶으면 아래 3줄은 주석 처리
    item.style.position = '';
    item.style.left = '';
    item.style.top = '';
  }

  function apply() {
    if (mq.matches) enable();
    else disable();
  }

  // 초기 적용
  apply();

  // 해상도 변경 대응
  if (mq.addEventListener) mq.addEventListener('change', apply);
  else mq.addListener(apply); // 구형 브라우저 대응




};

$(function () {
  contentScript();



});


(function () {
  function initToggle(root) {
    const btns = root.querySelectorAll('[data-view-btn]');
    const areas = root.querySelectorAll('[data-view-area]');
    if (!btns.length || !areas.length) return;

    const defaultId =
      root.getAttribute('data-view-default') ||
      (btns[0] && btns[0].dataset.viewBtn) ||
      (areas[0] && areas[0].dataset.viewArea);

    function show(id) {
      const key = String(id);

      areas.forEach(a => {
        a.hidden = (a.dataset.viewArea !== key);
      });

      btns.forEach(b => {
        b.classList.toggle('is-active', b.dataset.viewBtn === key);
        b.setAttribute('aria-selected', b.dataset.viewBtn === key ? 'true' : 'false');
      });
    }

    // 초기 표시
    show(defaultId);

    // 이벤트(위임)
    root.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-view-btn]');
      if (!btn || !root.contains(btn)) return;

      // a 태그면 점프 방지
      if (btn.tagName === 'A') e.preventDefault();

      show(btn.dataset.viewBtn);
    });
  }

  // ✅ 모든 토글 세트 자동 초기화 (버튼/패널을 같이 갖고 있는 "공통 부모"를 찾음)
  document.querySelectorAll('[data-view-btn]').forEach(btn => {
    const root = btn.closest('[data-view-root]') || btn.parentElement?.closest(':scope') || btn.closest('body');
    // 위 한 줄이 애매하면, 아래처럼 "권장" 방식 쓰는 게 제일 깔끔함:
    // const root = btn.closest('[data-view-root]');
  });

  // 권장: data-view-root 달린 부모만 초기화 (안 꼬임)
  document.querySelectorAll('[data-view-root]').forEach(initToggle);

  // data-view-root 안 달아도 "버튼/패널을 같이 포함한 가장 가까운 부모" 자동 탐색 버전
  document.querySelectorAll('[data-view-btn]').forEach(btn => {
    let p = btn.parentElement;
    while (p && p !== document.body) {
      if (p.querySelector('[data-view-area]')) { initToggle(p); break; }
      p = p.parentElement;
    }
  });
})();

$(document).on('click', '.toggle-tabs a', function (e) {
  e.preventDefault();
  const $tab = $(this);
  const index = $tab.index();
  // 탭 active
  $tab.addClass('active')
    .siblings()
    .removeClass('active');
  // 멤버 active
  const $memberWrap = $('.toggle-bx');
  $memberWrap.find('> div')
    .removeClass('active')
    .eq(index)
    .addClass('active');
});

// space-tab and space-view link (동적 콘텐츠 처리)
$(document).on('click', '.space-tab a', function (e) {
  e.preventDefault();
  const $link = $(this);
  const index = $link.attr('data-index');

  if (index) {
    // 모든 view-item에서 active 제거
    $('.space-view .view-item').removeClass('active');

    // 클릭한 항목의 view-item에 active 추가
    $(`.space-view .view-item[data-index="${index}"]`).addClass('active');

    // 모든 탭 링크에서 active 제거
    $('.space-tab a').removeClass('active');

    // 클릭한 링크에 active 추가
    $link.addClass('active');
  }
});