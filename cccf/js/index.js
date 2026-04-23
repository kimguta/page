
document.addEventListener("DOMContentLoaded", () => {
  const swipe1 = new Swiper(".mainSwiper1", {
    speed: 500,
    loop: true,
    observer: true,
    observeParents: true,
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
      formatFractionCurrent: (number) => String(number).padStart(2, '0'),
      formatFractionTotal: (number) => String(number).padStart(2, '0'),
    },
  });

  const mainSwiper2El = document.querySelector(".mainSwiper2");
  const mainSwiper2Wrapper = mainSwiper2El ? mainSwiper2El.querySelector(".swiper-wrapper") : null;

  if (mainSwiper2Wrapper && !mainSwiper2Wrapper.dataset.duplicated) {
    const originalSlides = Array.from(mainSwiper2Wrapper.children);
    const slideCount = originalSlides.length;
    let repeatCount = 1;

    if (slideCount <= 4) {
      repeatCount = 3;
    } else if (slideCount === 5) {
      repeatCount = 2;
    }

    if (repeatCount > 1 && slideCount > 0) {
      const originalHTML = mainSwiper2Wrapper.innerHTML;
      for (let i = 1; i < repeatCount; i += 1) {
        mainSwiper2Wrapper.insertAdjacentHTML("beforeend", originalHTML);
      }
      mainSwiper2Wrapper.dataset.duplicated = "true";
    }
  }

  const swipe2 = new Swiper(".mainSwiper2", {
    spaceBetween: 0,
    speed: 350,
    slidesPerView: 'auto',
    loop: true,
    observer: true,
    observeParents: true,

    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    breakpoints: {
      717: { spaceBetween: 0, },
      1400: { spaceBetween: 0, }
    },
  });

  const targets = document.querySelectorAll(".scroll-show");

  targets.forEach(target => {
    // 요소마다 threshold 설정
    let thresholdValue = parseFloat(target.dataset.threshold) || 0.2;

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
    'click': function (e) {
      e.preventDefault();
      const idx = $(this).index();
      $('.toggle-bx .tab-bx a, .toggle-bx .news-item > div').removeClass('active');
      $(this).addClass('active');
      $('.toggle-bx .news-item > div').eq(idx).addClass('active');
    }
  }, '.toggle-bx .tab-bx a');


document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count-up");

  const animateCount = (el) => {
    const target = +el.dataset.count;
    const duration = 3500; // ms
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
