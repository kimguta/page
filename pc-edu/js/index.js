

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

    // 테이블용 Lenis 추가
    const tableWrap = document.querySelector('#map .table-wrap > div');
    const lenis2 = new Lenis({
        wrapper: tableWrap,
        content: tableWrap,
        duration: 0.5,
        easing: t => t * t * (3 - 2 * t),
        smoothWheel: true, // 마우스 휠 스크롤 부드럽게
        smoothTouch: true, // 터치 스크롤 부드럽게
    });

    function rafTable(time) {
        lenis2.raf(time); // 테이블용 Lenis 업데이트
        requestAnimationFrame(rafTable);
    }
    requestAnimationFrame(rafTable);

  

    const swiper = new Swiper(".mySwiper1", {
        spaceBetween: 15,
        speed: 250,
        slidesPerView: 'auto', 
        loop: true,
        // freeMode: true,
        // freeModeMomentum: true,
        // freeModeMomentumRatio: 3,      // 관성 이동 거리 증가
        // freeModeMomentumVelocityRatio: 5, // 손을 떼었을 때 속도 증가
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: { nextEl: "#class-info .swiper-button-next", prevEl: "#class-info .swiper-button-prev" },
         breakpoints: {
            717: { spaceBetween: 20 },
            1400:{ spaceBetween: 35,freeMode: false,}
        },
    });
    
    const swipe2 = new Swiper(".mySwiper2", {
        spaceBetween: 15,
        speed: 250,
        slidesPerView: 'auto', 
        loop: true,
        // freeMode: true,
        // freeModeMomentum: true,
        // freeModeMomentumRatio: 3,      // 관성 이동 거리 증가
        // freeModeMomentumVelocityRatio: 5, // 손을 떼었을 때 속도 증가
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: { nextEl: "#news .swiper-button-next", prevEl: "#news .swiper-button-prev" },
         breakpoints: {
            717: { spaceBetween: 15 },
            1400:{ spaceBetween: 20,freeMode: false,}
        },
    });


    // 컨테이너 범위 안에서만 요소 찾도록 스코프 고정
    const root = document.querySelector('.mySwiper3');
    // Swiper 초기화 (오토플레이 ON)
    const swiper3 = new Swiper(root, {
        speed: 300,
        // effect: "cube",
        grabCursor: true,
        // cubeEffect: {
        //     shadow: false,
        //     slideShadows: true,
        //     shadowOffset: 0,
        //     shadowScale: 0.3,
        // },
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
        `<span class="${currentClass}"></span> | <span class="${totalClass}"></span>`
        ),
        // (옵션) 2자리로 패딩하고 싶으면 켜세요
        formatFractionCurrent: n => String(n).padStart(2,'0'),
        formatFractionTotal:   n => String(n).padStart(2,'0'),
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

      const swipe4 = new Swiper(".mySwiper4", {
        spaceBetween: 15,
        speed: 250,
        slidesPerView: 'auto', 
        loop: true,
        // freeMode: true,
        // freeModeMomentum: true,
        // freeModeMomentumRatio: 3,      // 관성 이동 거리 증가
        // freeModeMomentumVelocityRatio: 5, // 손을 떼었을 때 속도 증가
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: { nextEl: "#photo .swiper-button-next", prevEl: "#photo .swiper-button-prev" },
         breakpoints: {
            717: { spaceBetween: 30 },
            1400:{ spaceBetween: 58,freeMode: false,}
        },
    });

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


$(document).on({
    'click': function(e) {
        e.preventDefault();
        $('.main-search-bx').toggleClass('hide');
    }
}, '.main-search-bx .search-close')
.on({
  'click': function(e) {
    e.preventDefault();
    const Index = $(this).index();
    $('.map-img-bx img, .table-wrap > div').removeClass('active');
    $('.map-img-bx img').eq(Index).addClass('active');
    $('.table-wrap > div').eq(Index).addClass('active');
    $('.map-btn-bx').each(function() {
        $(this).find('button').removeClass('active');
        $(this).find('button').eq(Index).addClass('active');
    });
  },
  'mouseover': function(e) {
    e.preventDefault();
    const Index = $(this).index();
    $('.map-img-bx img').eq(Index).addClass('over');
  },
  'mouseleave': function(e) {
    e.preventDefault();
    const Index = $(this).index();
    $('.map-img-bx img').eq(Index).removeClass('over');
  }
}, '.map-btn-bx button');



