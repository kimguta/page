

document.addEventListener('DOMContentLoaded', function() {

    const swiper = new Swiper(".mySwiper1", {
        effect: "creative",
        speed: 800,
        loop: false,
        rewind: true,  // ← 클론 슬라이드 없음
        grabCursor: true,
        loopAdditionalSlides: 4,
        autoplay: {
            delay: 5500,
            disableOnInteraction: false,
        },
        parallax: true,
        creativeEffect: {
            perspective: true,
            limitProgress: 4,
            prev: { opacity: .45, translate: ["-36%", 0, -320], rotate: [0, 24, 0], scale: .92, shadow: true },
            next: { opacity: .45, translate: ["36%",  0, -320], rotate: [0,-24, 0], scale: .92, shadow: true }
        },
        pagination: { el: ".swiper-pagination", clickable: true },
        scrollbar: {el: ".swiper-scrollbar", hide: false,draggable: true,} ,
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
    });
    
    
    const lenis = new Lenis({
        duration: 1,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let ticking = false;


    window.addEventListener("scroll", function () {
        if (!ticking) {
            
        ticking = true;
        }
    });


    const swiper2 = new Swiper(".mySwiper2", {
        slidesPerView: 'auto', 
        centeredSlides: true,
        spaceBetween: 4,
        speed: 400,
        loop: true,
        // slideToClickedSlide: true,           
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            breakpoints: {
            717: { spaceBetween: 40 },
            920: { spaceBetween: 60 },
            1641:{ spaceBetween: 70}
        },
    });

    
    const swiper3 = new Swiper(".mySwiper3", {
        spaceBetween: 15,
        speed: 400,
        freeMode: false,
        loop: true,  
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        // slideToClickedSlide: true,
        navigation: {
            nextEl: "#tour .swiper-button-next",
            prevEl: "#tour .swiper-button-prev"
        },
        breakpoints: {
            717: { spaceBetween: 20 },
            920: { spaceBetween: 30 },
            1641:{ spaceBetween: 60 }
        },
    });

   const swiper4 = new Swiper(".mySwiper4", {
     loopAdditionalSlides: 1,
    //  grabCursor: true,
    //   effect: "creative",
    // speed: 500,
     
    //   creativeEffect: {
    //     limitProgress: 1,
    //     prev: {
    //       shadow: true,
    //       translate: [0, 0, -400],
    //     },
    //     next: {
    //       translate: ["100%", 0, 0],
    //     },
    //   },
    });



// 스크롤 이동(하단 스냅) 전부 제거한 경량 버전
function bindHashButtons(swiper, buttonContainer, _opts = {}) {
  const wrap = (typeof buttonContainer === 'string')
    ? document.querySelector(buttonContainer)
    : buttonContainer;
  if (!swiper || !wrap) return;

  const btns = Array.from(wrap.querySelectorAll('button[data-slide]'));
  if (!btns.length) return;

  const useLoop = !!swiper.params.loop;

  // 버튼 active 동기화
  function setActive(realIdx) {
    btns.forEach(b => {
      const targetIdx = parseInt(b.dataset.slide, 10);
      b.classList.toggle('active', targetIdx === realIdx);
    });
  }
  const sync = () => setActive(useLoop ? swiper.realIndex : swiper.activeIndex);

  // 버튼 → 슬라이드 이동 (스크롤 없음)
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.dataset.slide, 10);
      if (Number.isNaN(idx)) return;

      if (useLoop && typeof swiper.slideToLoop === 'function') {
        swiper.slideToLoop(idx, 500);
      } else {
        swiper.slideTo(idx, 500);
      }
      setActive(idx);
    }, { passive: false });
  });

  // 슬라이드 변경 시 버튼 active 맞추기
  swiper.on('slideChange', sync);
  sync();
}

    // 사용
  bindHashButtons(swiper3, '#tour .hash-list');
  bindHashButtons(swiper4, '#map .pin-list'); // 옵션 넘겨도 무시됨



    // 컨테이너 범위 안에서만 요소 찾도록 스코프 고정
    const root = document.querySelector('.mySwiper5');
    // Swiper 초기화 (오토플레이 ON)
    const swiper5 = new Swiper(root, {
        effect: "cube",
        speed: 450,
        grabCursor: true,
        cubeEffect: {
            shadow: false,
            slideShadows: true,
            shadowOffset: 0,
            shadowScale: 0.3,
        },
        loop: true,
        pagination: {
        el: root.querySelector('.swiper-pagination'),
        type: 'fraction',
        renderFraction: (currentClass, totalClass) => (
        `<span class="${currentClass}"></span> - <span class="${totalClass}"></span>`
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
        delay: 4000,                // 4초마다 전환
        disableOnInteraction: false, // 화살표 클릭해도 계속 자동재생
        pauseOnMouseEnter: true      // 마우스 올리면 일시정지
        },
    });

    // 정지/재생 버튼
    const btnStop = root.querySelector('.swiper-stop');
    const btnPlay = root.querySelector('.swiper-play');

    // 초기 상태: 자동재생 중이므로 재생버튼 숨김
    btnPlay.style.display = 'none';

    btnStop.addEventListener('click', (e) => {
        e.preventDefault();
        swiper5.autoplay.stop();
        btnStop.style.display = 'none';
        btnPlay.style.display = 'block';
    });

    btnPlay.addEventListener('click', (e) => {
        e.preventDefault();
        swiper5.autoplay.start();
        btnPlay.style.display = 'none';
        btnStop.style.display = 'block';
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll(".character"); // v1, v2 포함

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 화면에 들어왔을 때
            entry.target.classList.add("active");
        } else {
            // 화면에서 나갔을 때
            entry.target.classList.remove("active");
        }
        });
    }, {
        threshold: 0.3
    });

    targets.forEach(target => observer.observe(target));
});


$(document).on({
    'click': function(e) {
        e.preventDefault();
         const isActive = $(this).hasClass('active');
        $(this).add('.modal-slick-wrap').toggleClass('active', !isActive);
        $(this).find('span').text(isActive ? '팝업닫기' : '팝업열기');
    }
}, '.modal-slick-wrap .open')
.on({
    'click': function(e) {
       const Idx =  $(this).index();
        $('#course .tab-bx button').removeClass('active');
        $(this).addClass('active');
        $('#course .view-bx > div').removeClass('active').eq(Idx).addClass('active');

    }
}, '#course .tab-bx button');

function elemOffset(obj) {
    $(obj).each(function() {
        var elemTop = $(this).offset().top;
        var elemBottom = $(this).offset().top + $(this).outerHeight();
        var winTop = $(document).scrollTop();
        var winBottom = $(document).scrollTop() + $(window).outerHeight();

        // 요소 화면 인
        if (elemTop <= winBottom && elemBottom >= winTop) {  // 요소가 화면에 보일 때
            $(this).addClass('elem-in');
            // 영상 재생
            $(this).find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            hasExecuted = true;  
        } else {
            // 요소가 화면에 보이지 않을 때 영상 정지
            $(this).find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }

        // 요소 아래쪽 붙음
        if (elemBottom <= winBottom) {
            $(this).addClass('elem-bottom');
        }

        // 요소 위쪽 붙음
        if (elemTop <= winTop) {
            $(this).addClass('elem-top');
        }

        // 요소 화면 아웃
        if (elemBottom <= winTop) { 
            $(this).addClass('elem-out');
        }
    });
}

$(window).on('scroll', function() {
    elemOffset('.video-bx'); 
});

