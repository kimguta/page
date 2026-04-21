
document.addEventListener("DOMContentLoaded", () => {
  const visualEl = document.querySelector("#visual .visual-swiper");

  if (visualEl) {
    new Swiper(visualEl, {
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
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
      slidesPerView: 3,
      spaceBetween: 150,
      speed: 500,
      loop: true,
      watchOverflow: true,
      navigation: {
        prevEl: "#program .title-bx .control .prev",
        nextEl: "#program .title-bx .control .next",
      },
      breakpoints: {
        0: {
          slidesPerView: 1.65,
          spaceBetween: 18,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 2.6,
          spaceBetween: 40,
        },
        1600: {
          slidesPerView: 3,
          spaceBetween: 150,
        },
      },
    });
  }

  const powerTabBx = document.querySelector("#power .tab-bx");

  if (powerTabBx) {
    const tabListBx = powerTabBx.querySelector(".tab-list-bx");
    const powerTabs = powerTabBx.querySelectorAll("a");
    const previewBox = powerTabBx.querySelector(".thumb-preview");
    const previewImg = previewBox ? previewBox.querySelector("img") : null;
    let previewFrame = 0;
    let previewTargetY = null;

    const updatePreviewTop = (clientY) => {
      if (!previewBox || !tabListBx) {
        return;
      }

      const listRect = tabListBx.getBoundingClientRect();
      const previewHeight = previewBox.offsetHeight || 171;
      const minTop = previewHeight / 2;
      const maxTop = Math.max(minTop, listRect.height - previewHeight / 2);
      const nextTop = Math.max(minTop, Math.min(maxTop, clientY - listRect.top));

      previewBox.style.top = `${nextTop}px`;
    };

    const schedulePreviewTop = (clientY) => {
      previewTargetY = clientY;

      if (previewFrame) {
        return;
      }

      previewFrame = window.requestAnimationFrame(() => {
        previewFrame = 0;

        if (previewTargetY !== null) {
          updatePreviewTop(previewTargetY);
        }
      });
    };

    const showPreview = (src, clientY) => {
      if (!previewBox || !previewImg) {
        return;
      }

      if (src && previewImg.getAttribute("src") !== src) {
        previewImg.setAttribute("src", src);
      }

      if (typeof clientY === "number") {
        schedulePreviewTop(clientY);
      }

      previewBox.classList.add("is-visible");
    };

    const hidePreview = () => {
      if (previewBox) {
        previewBox.classList.remove("is-visible");
        previewBox.style.top = "";
      }
    };

    powerTabs.forEach((tab) => {
      const thumb = tab.querySelector("img");

      if (!thumb) {
        return;
      }

      tab.addEventListener("mouseenter", (e) => {
        showPreview(thumb.getAttribute("src"), e.clientY);
      });

      tab.addEventListener("mousemove", (e) => {
        showPreview(thumb.getAttribute("src"), e.clientY);
      });

      tab.addEventListener("focusin", () => {
        showPreview(thumb.getAttribute("src"));
      });
    });

    powerTabBx.addEventListener("mouseleave", hidePreview);
    powerTabBx.addEventListener("focusout", function (e) {
      if (!powerTabBx.contains(e.relatedTarget)) {
        hidePreview();
      }
    });
  }

  const facilityEl = document.querySelector("#facility .facility-swiper");

  if (facilityEl) {
    new Swiper(facilityEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 500,
      loop: true,
      watchOverflow: true,
      navigation: {
        prevEl: "#facility .title-bx .control .prev",
        nextEl: "#facility .title-bx .control .next",
      },
    });
  }

  const noticeEl = document.querySelector(".notice-swiper");

  if (noticeEl) {
    const noticeCountEl = noticeEl.querySelector(".count");
    const noticeSlides = noticeEl.querySelectorAll(".swiper-wrapper > .swiper-slide");
    const noticePrev = noticeEl.querySelector(".control .prev");
    const noticeNext = noticeEl.querySelector(".control .next");
    const noticePause = noticeEl.querySelector(".control .pause");
    const noticePlay = noticeEl.querySelector(".control .play");
    let noticeSwiper = null;

    const formatNoticeNumber = (value) => String(value).padStart(2, "0");

    const updateNoticeCount = (swiper) => {
      if (!noticeCountEl) {
        return;
      }

      noticeCountEl.innerHTML =
        "<strong>" +
        formatNoticeNumber((swiper.realIndex || 0) + 1) +
        "</strong> <em>/</em> " +
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

  const roadSection = document.querySelector("#road");

  if (roadSection) {
    const roadPins = Array.from(roadSection.querySelectorAll(".pin-bx > div > a"));
    const roadRoutes = Array.from(roadSection.querySelectorAll(".route-bx > a"));
    const roadSwiperEl = roadSection.querySelector(".road-swiper");

    let roadSwiper = null;

    const syncRoadActive = (index) => {
      roadPins.forEach((item, i) => {
        item.classList.toggle("active", i === index);
      });

      roadRoutes.forEach((item, i) => {
        item.classList.toggle("active", i === index);
      });
    };

    const goToRoadSlide = (index) => {
      if (roadSwiper) {
        roadSwiper.slideToLoop(index);
      }
      syncRoadActive(index);
    };

    roadSwiper = new Swiper(roadSwiperEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 500,
      navigation: {
        prevEl: "#road .control .prev",
        nextEl: "#road .control .next",
      },
      on: {
        init: function () {
          syncRoadActive(this.realIndex || 0);
        },
        slideChange: function () {
          syncRoadActive(this.realIndex || 0);
        },
      },
    });

    roadPins.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        goToRoadSlide(index);
      });
    });

    roadRoutes.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        goToRoadSlide(index);
      });
    });
  }

  const powerSection = document.querySelector("#power");

  if (powerSection) {
    const tabLinks = Array.from(powerSection.querySelectorAll(".tab-bx > div > a"));
    const linkCards = Array.from(powerSection.querySelectorAll(".link-bx > a"));

    const syncPowerActive = (index) => {
      tabLinks.forEach((item, i) => {
        item.classList.toggle("active", i === index);
      });

      linkCards.forEach((item, i) => {
        item.classList.toggle("active", i === index);
      });
    };

    const initialIndex = Math.max(
      tabLinks.findIndex((item) => item.classList.contains("active")),
      linkCards.findIndex((item) => item.classList.contains("active"))
    );

    syncPowerActive(initialIndex >= 0 ? initialIndex : 0);

    tabLinks.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        syncPowerActive(index);
      });
    });
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
