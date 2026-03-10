

document.addEventListener("DOMContentLoaded", () => {
    

    const swiper = new Swiper(".mainSwiper1", {
      speed: 600,
      grabCursor: true,
      // autoplay: { delay: 6000, disableOnInteraction: false },
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

    const swiper2 = new Swiper(".mainSwiper2", {
      speed: 250,          // 속도 빠르게
      loop: true,          // 인피니티
      slidesPerView: 4,
      spaceBetween: 40,
      navigation: {
        nextEl: ".control-bx .swiper-button-next",
        prevEl: ".control-bx .swiper-button-prev",
      },

      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        717: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 25
        },
        1401: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      }
    });  


    const thumbSwiper3 = new Swiper(".thumbSwiper3", {
      direction: "vertical",
      slidesPerView: 3,
      spaceBetween: 15,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      loop: false,
      freeMode: true,
      observer: true,
      observeParents: true,
      updateOnWindowResize: true,

      breakpoints: {
        0: {
          direction: "horizontal",
          freeMode: false,
          spaceBetween: 5
        },
        717: {
          direction: "vertical",
          spaceBetween: 10
        },
        992: {
          spaceBetween: 10
        },
        1401: {
          spaceBetween: 15
        }
      }
    });

      function pauseAllYoutube(swiperEl) {
        $(swiperEl).find("iframe").each(function () {
          this.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        });
      }

      const mainSwiper3 = new Swiper(".mainSwiper3", {
        speed: 400,
        loop: false,

        navigation: {
          nextEl: ".magazin-swipe-wrap .swiper-button-next",
          prevEl: ".magazin-swipe-wrap .swiper-button-prev"
        },

        scrollbar: {
          el: ".magazin-swipe-wrap .swiper-scrollbar",
          draggable: true
        },

        thumbs: {
          swiper: thumbSwiper3
        },

        on: {
          init: function () {
            pauseAllYoutube(this.el);
          },
          touchStart: function () {
            pauseAllYoutube(this.el);
          },
          slideChangeTransitionStart: function () {
            pauseAllYoutube(this.el);
          }
        }
      });

      $(document).on("click", ".thumbSwiper3 .swiper-slide", function (e) {
        e.preventDefault();
      });

      $('.magazin-swipe-wrap .swiper-stop').on('click', function () {
        mainSwiper3.autoplay.stop();
        $(this).hide();
        $('.magazin-swipe-wrap .swiper-play').show();
      });

      $('.magazin-swipe-wrap .swiper-play').on('click', function () {
        mainSwiper3.autoplay.start();
        $(this).hide();
        $('.magazin-swipe-wrap .swiper-stop').show();
      });

      $(document).on('click', '.thumbSwiper3 .swiper-slide', function(e){
        e.preventDefault();
      });


    const thumbSwiper4 = new Swiper(".thumbSwiper4", {
      slidesPerView: 2,
      spaceBetween: 20,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      breakpoints: {
        0: {
          spaceBetween: 10
        },
        717: {
          spaceBetween: 15
        },
        992: {
          spaceBetween: 20
        }
      }
    });

    const mainSwiper4 = new Swiper(".mainSwiper4", {
      speed: 400,
      loop: false,
      spaceBetween: 0,

      navigation: {
        nextEl: ".space-swipe-wrap .swiper-button-next",
        prevEl: ".space-swipe-wrap .swiper-button-prev"
      },

      thumbs: {
        swiper: thumbSwiper4
      }
    });

    $(document).on("click", ".thumbSwiper4 .swiper-slide", function (e) {
      e.preventDefault();
    });     

$('.mainSwiper3 .swiper-stop').on('click', function () {
  mainSwiper3.autoplay.stop();
  $(this).hide();
  $('.mainSwiper3 .swiper-play').show();
});

$('.mainSwiper3 .swiper-play').on('click', function () {
  mainSwiper3.autoplay.start();
  $(this).hide();
  $('.mainSwiper3 .swiper-stop').show();
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


$(document).on('click', '.board-bx .tab-btn', function(e){
  e.preventDefault();

  const $wrap = $(this).closest('.board-bx');
  const idx = $(this).index();

  $wrap.find('.tab-btn').removeClass('active');
  $(this).addClass('active');

  $wrap.find('.item').removeClass('active').eq(idx).addClass('active');
});