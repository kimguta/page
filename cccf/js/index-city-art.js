

document.addEventListener("DOMContentLoaded", () => {
    

    const swiper = new Swiper(".mainSwiper1", {
          speed: 600,
          grabCursor: true,
          autoplay: { delay: 6000, disableOnInteraction: false },
          parallax: true,
          loop: true,
          effect: "coverflow",
          coverflowEffect: {
            rotate: 35,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
          },
          breakpoints: {
            717: { speed: 800 },
            1500: { speed: 1000 }
          },
          navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });

     const targets = document.querySelectorAll(".scroll-show");

      targets.forEach(target => {
          // 요소마다 threshold 설정
          let thresholdValue = parseFloat(target.dataset.threshold) || 0.35;

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

      const scrollBx = document.querySelector('.event-bx');
      const items = scrollBx.querySelectorAll('.scroll-item');

      if(items.length > 1){
        scrollBx.classList.add('on');
      }

});


document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.querySelector('.event-scroll-bx');
  if (!wrapper) return;
  const eventBox = wrapper.closest('.event-bx');

  const innerLenis = new Lenis({
    wrapper: wrapper,
    eventsTarget: wrapper,
    duration: 0.3,
    easing: t => 1 - Math.pow(1 - t, 2),
    smoothWheel: true,
    wheelMultiplier: 1
  });

  const refreshEventScroll = () => {
    if (typeof innerLenis.resize === 'function') {
      innerLenis.resize();
    }

    if (eventBox) {
      const hasOverflow = wrapper.scrollHeight > wrapper.clientHeight + 1;
      eventBox.classList.toggle('on', hasOverflow);
    }
  };

  wrapper.addEventListener('wheel', function(e){
    refreshEventScroll();

    const maxScrollTop = wrapper.scrollHeight - wrapper.clientHeight;
    const isTop = wrapper.scrollTop <= 0;
    const isBottom = wrapper.scrollTop >= maxScrollTop - 1;

    if ((e.deltaY < 0 && isTop) || (e.deltaY > 0 && isBottom)) {
      e.preventDefault();

      // 전체 페이지도 Lenis 안 쓰면 이걸로
      // window.scrollBy({ top: e.deltaY, behavior: 'smooth' });

      // 전체 페이지 Lenis를 window.lenis 로 저장해뒀다면
      if (window.lenis) {
        window.lenis.scrollTo(window.scrollY + e.deltaY, {
          duration: 0.3,
          force: true
        });
      } else {
        window.scrollBy({ top: e.deltaY, behavior: 'smooth' });
      }

      return;
    }
  }, { passive: false });

  const resizeObserver = new ResizeObserver(() => {
    refreshEventScroll();
  });
  resizeObserver.observe(wrapper);

  const mutationObserver = new MutationObserver(() => {
    refreshEventScroll();
  });
  mutationObserver.observe(wrapper, {
    childList: true,
    subtree: true
  });

  wrapper.querySelectorAll('img').forEach((img) => {
    if (!img.complete) {
      img.addEventListener('load', refreshEventScroll, { once: true });
    }
  });

  window.addEventListener('load', refreshEventScroll);
  refreshEventScroll();

  function raf(time){
    innerLenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});


// $(document)
// .on({
//     'click': function(e) {
//         e.preventDefault();
//         const idx = $(this).index();
//         $('.toggle-bx .tab-bx a, .toggle-bx .news-item > div').removeClass('active');
//         $(this).addClass('active');
//         $('.toggle-bx .news-item > div').eq(idx).addClass('active');
//     }
// }, '.toggle-bx .tab-bx a');


// document.addEventListener("DOMContentLoaded", () => {
//   const counters = document.querySelectorAll(".count-up");

//   const animateCount = (el) => {
//     const target = +el.dataset.count;
//     const duration = 3500; // ms
//     const start = performance.now();

//     const step = (now) => {
//       const progress = Math.min((now - start) / duration, 1);
//       const value = Math.floor(progress * target);
//       el.textContent = value.toLocaleString();
//       if (progress < 1) requestAnimationFrame(step);
//     };
//     requestAnimationFrame(step);
//   };

//   const io = new IntersectionObserver((entries, obs) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         animateCount(entry.target);
//       }
//     });
//   }, { threshold: 0.3 });

//   counters.forEach(el => io.observe(el));
// });
