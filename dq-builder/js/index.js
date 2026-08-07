/**
 * 메인 페이지 Swiper 예시
 * - main-visual: 자동 재생 메인 비주얼
 * - card-showcase: 반응형 카드 목록
 */
(function (window, document) {
  "use strict";

  window.DQTemplate.use("index-swiper", function () {
    if (typeof window.Swiper !== "function") return;

    initMainVisual();
    initCardShowcase();
  });

  function initMainVisual() {
    var element = document.querySelector(".js-main-visual");
    if (!element) return;

    var toggle = element.querySelector(".js-main-toggle");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var swiper = new window.Swiper(element, {
      loop: true,
      speed: reduceMotion ? 0 : 700,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 4500,
        disableOnInteraction: false
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      navigation: {
        addIcons: false,
        prevEl: element.querySelector(".js-main-prev"),
        nextEl: element.querySelector(".js-main-next")
      },
      pagination: {
        el: element.querySelector(".js-main-pagination"),
        clickable: true
      },
      a11y: {
        enabled: true,
        prevSlideMessage: "이전 슬라이드",
        nextSlideMessage: "다음 슬라이드",
        paginationBulletMessage: "{{index}}번 슬라이드로 이동"
      }
    });

    if (!toggle) return;

    function setPauseState(isPaused) {
      toggle.classList.toggle("is-paused", isPaused);
      toggle.setAttribute("aria-pressed", String(isPaused));
      toggle.setAttribute("aria-label", isPaused ? "자동 재생 시작" : "자동 재생 정지");

      var blindText = toggle.querySelector(".blind");
      if (blindText) blindText.textContent = isPaused ? "자동 재생 시작" : "자동 재생 정지";
    }

    if (reduceMotion) swiper.autoplay.stop();
    setPauseState(reduceMotion);

    toggle.addEventListener("click", function () {
      var shouldPlay = toggle.classList.contains("is-paused");

      if (shouldPlay) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
      setPauseState(!shouldPlay);
    });
  }

  function initCardShowcase() {
    var element = document.querySelector(".js-card-swiper");
    if (!element) return;
    var section = element.closest(".card-showcase");

    new window.Swiper(element, {
      slidesPerView: 1.12,
      spaceBetween: 16,
      watchOverflow: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      navigation: {
        addIcons: false,
        prevEl: section && section.querySelector(".js-card-prev"),
        nextEl: section && section.querySelector(".js-card-next")
      },
      pagination: {
        el: element.querySelector(".js-card-pagination"),
        clickable: true
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 26
        }
      },
      a11y: {
        enabled: true,
        prevSlideMessage: "이전 카드",
        nextSlideMessage: "다음 카드",
        paginationBulletMessage: "{{index}}번 카드로 이동"
      }
    });
  }
}(window, document));
