

document.addEventListener('DOMContentLoaded', function() {
    // 기존 페이지 전체 Lenis (그대로 유지)
    const lenis = new Lenis({
        duration: 0.5,
        easing: t => 1 - Math.pow(1 - t, 2),
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

   
    const swipe1 = new Swiper(".mySwiper1", {
        speed: 1000,
        loop: true,
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        autoplay: {
            delay: 5000,                // 4초마다 전환
            disableOnInteraction: false, // 화살표 클릭해도 계속 자동재생
            pauseOnMouseEnter: true      // 마우스 올리면 일시정지
        },
        pagination: {
        el: '#visual .swiper-pagination',
        type: 'fraction',
            renderFraction: (currentClass, totalClass) => (
            `<span class="${currentClass}"></span> <em> / </em> <span class="${totalClass}"></span>`
            ),
        },
    });


    // 컨테이너 범위 안에서만 요소 찾도록 스코프 고정
    const root = document.querySelector('.mySwiper2');
    // Swiper 초기화 (오토플레이 ON)
    const swiper3 = new Swiper(root, {
        speed: 300,
        grabCursor: true,
        effect: "creative",
        creativeEffect: {
            prev: {
            shadow: true,
            translate: [0, 0, -400],
            },
            next: {
            translate: ["100%", 0, 0],
            },
        },
        loop: true,
        pagination: {
        el: root.querySelector('.swiper-pagination'),
        type: 'fraction',
        renderFraction: (currentClass, totalClass) => (
        `<span class="${currentClass}"></span> <em> / </em> <span class="${totalClass}"></span>`
        ),
        },
        navigation: {
        nextEl: root.querySelector('.swiper-button-next'),
        prevEl: root.querySelector('.swiper-button-prev'),
        },
        autoplay: {
        delay: 4500,                // 4초마다 전환
        disableOnInteraction: false, // 화살표 클릭해도 계속 자동재생
        pauseOnMouseEnter: true      // 마우스 올리면 일시정지
        },
    });

      // 패널 단위 스와이퍼 보장 초기화
    function ensurePanelSwiper(panelEl) {
        if (panelEl.dataset.swiperReady === '1') {
            const sw = panelEl.querySelector('.mySwiper3')?.swiper;
            sw && sw.update();
            return;
        }

        const root = panelEl.querySelector('.mySwiper3');
        if (!root) return;

        const wrap = root.querySelector('.swiper-wrapper');
        if (!wrap) return;

        const MIN = 8;
        const originals = Array.from(wrap.children);
        if (originals.length > 0 && wrap.children.length < MIN) {
            const frag = document.createDocumentFragment();
            const stripIds = (el) => {
            if (el.nodeType !== 1) return;
            el.removeAttribute('id');
            el.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
            };
            while (wrap.children.length + frag.childNodes.length < MIN) {
            for (const slide of originals) {
                const c = slide.cloneNode(true);
                stripIds(c);
                frag.appendChild(c);
                if (wrap.children.length + frag.childNodes.length >= MIN) break;
            }
            }
            wrap.appendChild(frag);
        }
        const nextBtn = panelEl.querySelector('.swiper-button-next');
        const prevBtn = panelEl.querySelector('.swiper-button-prev');

        const sw = new Swiper(".mySwiper3", {
            spaceBetween: 15,
            speed: 250,
            slidesPerView: 'auto',
            loop: true,
            navigation: { nextEl: nextBtn, prevEl: prevBtn },
            breakpoints: {
            717:  { spaceBetween: 20 },
            1400: { spaceBetween: 21 }
            },
            on: {
            init() {
                this.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(0.25, 0.8, 0.5, 1)';
            }
            }
        });
    
    }
    document.querySelectorAll('.section-toggle-bx > div').forEach(ensurePanelSwiper);    

});

document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll(".scroll-show");

    targets.forEach(target => {
        // 요소마다 threshold 설정
        let thresholdValue = parseFloat(target.dataset.threshold) || 0.5;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    entry.target.classList.remove("show");
                }
            });
        }, { threshold: thresholdValue });

        observer.observe(target);
    });
});


$(document)
.on({
    'click': function(e) {
        e.preventDefault();
        const ElmIndex = $(this).index();
        $(this).closest('.toggle-wrap').find('.section-toggle-tab button').removeClass('active').end().addBack().addClass('active');
        $(this).closest('.toggle-wrap').find('.section-toggle-bx > div').removeClass('active').eq(ElmIndex).addClass('active');
         (() => {
        const $wrap   = $(this).closest('.toggle-wrap');
        const $panels = $wrap.find('.section-toggle-bx > div');
        const panelEl = $panels.get(ElmIndex);
        const swEl    = panelEl && panelEl.querySelector('.mySwiper3');
        const sw      = swEl && swEl.swiper;
        if (!sw) return; // 아직 초기화 안 된 패널이면 패스

        // 활성화(class 변경) 반영된 다음 프레임에 리셋/갱신
        requestAnimationFrame(() => {
            sw.update(); // slidesPerView:'auto' 폭 재계산
            if (sw.params.loop) sw.slideToLoop(0, 0);
            else sw.slideTo(0, 0);
            sw.navigation && sw.navigation.update(); // 버튼 상태 갱신
        });
        })();
    }
}, '.section-toggle-tab button')
.on({
    'click': function(e) {
        e.preventDefault();
         const ElmIndex = $(this).index();
        $('.meal-tab button').removeClass('active');
        $(this).addClass('active');
        $('.meal-date > div').removeClass('active').eq(ElmIndex).addClass('active');
        
    }
}, '.meal-tab button')
.on({
    'click': function(e) {
        e.preventDefault();
        $('.meal-bx').toggleClass('active');
        
    }
}, '.meal-open, .meal-close');

(() => {
    const init = () => {
    const nav = document.getElementById('side-nav');
    if (!nav) return;

    const btns = Array.from(nav.querySelectorAll('button'));
    const secs = Array.from(document.querySelectorAll('main > section'));

    // 버튼 텍스트로 타깃 자동 매핑 (visual, notice, ... => #id)
    btns.forEach(b => b.dataset.target = b.dataset.target || b.textContent.trim().toLowerCase());

    const setActiveById = (id) => {
    btns.forEach(b => b.classList.toggle('active', b.dataset.target === id));
    };

    // 클릭 시 해당 섹션 최상단으로 스크롤
    nav.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const target = document.getElementById(btn.dataset.target);
    if (!target) return;

    const offset = 0; // 고정 헤더가 있으면 그 높이로 조정
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(top, { duration: 1 });
    } else {
        window.scrollTo({ top, behavior: 'smooth' });
    }
    setActiveById(target.id); // 즉시 active 반영
    });

    // 스크롤(휠) 시 현재 섹션 기준으로 active 동기화
    const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveById(entry.target.id);
    });
    }, {
    root: null,
    threshold: 0,
    rootMargin: '-50% 0px -50% 0px' // 뷰포트 중앙에 들어오면 해당 섹션으로 판단
    });

    secs.forEach(sec => io.observe(sec));
};

document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init, { once: true })
    : init();
})();

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count-up");

  const animateCount = (el) => {
    const target = +el.dataset.count;
    const duration = 3000; // ms
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => io.observe(el));
});