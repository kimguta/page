
document.addEventListener("DOMContentLoaded", () => {
  const visualEl = document.querySelector("#visual .visual-swiper");

  if (visualEl) {
    new Swiper(visualEl, {
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      navigation: {
        prevEl: "#visual .prev",
        nextEl: "#visual .next",
      },
      speed: 900,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
    });
  }

  const programEl = document.querySelector("#program .program-swiper");

  if (programEl) {
    new Swiper(programEl, {
      slidesPerView: 1.2,
      speed: 500,
      loop: true,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      navigation: {
        prevEl: "#program .control .prev",
        nextEl: "#program .control .next",
      },
      pagination: {
        el: "#program .paging",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1.1,
        },
        768: {
          slidesPerView: 1.5,
        },
        1024: {
          // slidesPerView: 1.2,
        },
        1600: {
          slidesPerView: 1.08,
        },
      },
    });
  }



  const noticeEl = document.querySelector(".notice-swiper");

  if (noticeEl) {
    const noticeBx = noticeEl.closest(".notice-bx");
    const noticeCountEl = noticeBx ? noticeBx.querySelector(".count") : null;
    const noticeSlides = noticeEl.querySelectorAll(".swiper-wrapper > .swiper-slide");
    const noticePrev = noticeBx ? noticeBx.querySelector(".control .prev") : null;
    const noticeNext = noticeBx ? noticeBx.querySelector(".control .next") : null;
    const noticePause = noticeBx ? noticeBx.querySelector(".control .pause") : null;
    const noticePlay = noticeBx ? noticeBx.querySelector(".control .play") : null;
    let noticeSwiper = null;

    const formatNoticeNumber = (value) => String(value).padStart(2, "0");

    const updateNoticeCount = (swiper) => {
      if (!noticeCountEl) {
        return;
      }

      noticeCountEl.innerHTML =
        "<strong>" +
        formatNoticeNumber((swiper.realIndex || 0) + 1) +
        "</strong> <em>&mdash;</em> " +
        formatNoticeNumber(noticeSlides.length);
    };

    noticeSwiper = new Swiper(noticeEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 450,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        prevEl: noticePrev,
        nextEl: noticeNext,
      },
      on: {
        init: function () {
          updateNoticeCount(this);
        },
        slideChange: function () {
          updateNoticeCount(this);
        },
      },
    });

    if (noticePause) {
      noticePause.addEventListener("click", function (e) {
        e.preventDefault();
        noticeSwiper.autoplay.stop();
        noticePause.style.display = "none";
        if (noticePlay) {
          noticePlay.style.display = "block";
        }
      });
    }

    if (noticePlay) {
      noticePlay.addEventListener("click", function (e) {
        e.preventDefault();
        noticeSwiper.autoplay.start();
        noticePlay.style.display = "none";
        if (noticePause) {
          noticePause.style.display = "block";
        }
      });
    }

    if (noticePause && noticePlay) {
      noticePlay.style.display = "none";
      noticePause.style.display = "block";
    }
  }



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
