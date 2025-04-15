

const lenis = new Lenis({
    duration: 1,   // 스크롤 애니메이션 지속 시간
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // 가감속 곡선
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);


let ticking = false;

window.addEventListener("scroll", function () {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

function updateScrollEffects() {
    const videoWrapper = document.querySelector(".video-wrapper");
    const mainTopMovie = document.getElementById("main-top-movie");

    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let maxScroll = window.innerHeight / 1.5;
    let vh50 = window.innerHeight / 4;
    let vh100 = window.innerHeight;

    // 모바일 여부 판단 (716px 이하)
    const isMobile = window.innerWidth <= 716;

    // 최소 스케일 값 설정 (모바일은 덜 작아지게)
    const minScale = isMobile ? 0.8 : 0.8;

    let scaleValue = 1 - (scrollTop / maxScroll) * 0.5;
    scaleValue = Math.max(scaleValue, minScale);

    // ✅ 비디오 대신 부모 요소에 적용
    videoWrapper.style.transform = `scale(${scaleValue})`;

    if (scrollTop >= vh50) {
        mainTopMovie.classList.add("small");
    } else {
        mainTopMovie.classList.remove("small");
    }

    if (scrollTop >= vh100) {
        mainTopMovie.classList.add("smaller");
    } else {
        mainTopMovie.classList.remove("smaller");
    }
}

// ✅ 스크롤 이벤트에 적용
window.addEventListener("scroll", updateScrollEffects);

document.addEventListener("DOMContentLoaded", function () {
    function startCounter(counter) {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        
        // ✅ .fast 클래스가 있으면 2배 빠르게 증가
        const speed = counter.classList.contains("fast") ? target / 170 : target / 2000;

        function updateCount() {
            if (count < target) {
                count += Math.ceil(speed); // 부드러운 증가
                counter.innerText = count;
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target; // 정확한 값으로 설정
            }
        }

        updateCount();
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 각 .point-bx가 화면에 들어오면 on 클래스 붙이고 슬릭 실행
                if (entry.target.classList.contains("point-bx")) {
                    entry.target.classList.add("on");

                    // 해당 섹션에 따라 조건적으로 실행
                    if (entry.target.closest('#depart')) {
                        $('#depart .slick1').slick('slickPlay');
                    }
                    if (entry.target.closest('#air')) {
                        $('#air .slick').slick('slickPlay');
                        $('#air .count').addClass('on');
                    }
                }

                // counter 동작
                if (entry.target.classList.contains("counter")) {
                    startCounter(entry.target);
                    observer.unobserve(entry.target); // 카운터는 1회만 실행
                }
            }
        });
    }, { threshold: 0.55 });

    // .counter 요소 감시 시작
    document.querySelectorAll(".counter").forEach(counter => {
        observer.observe(counter);
    });

    // .point-bx 요소 감시 시작 (여러 개 가능)
    document.querySelectorAll(".point-bx").forEach(pointBox => {
        observer.observe(pointBox);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    var vdo = document.getElementById("myVideo");
    var soundButton = document.querySelector(".sound button");
    var srText = document.querySelector(".sr-only");
    var mainTopMovie = document.getElementById("main-top-movie");

    // 요소가 정상적으로 로드되었는지 확인
    if (!vdo || !soundButton || !srText || !mainTopMovie) {
        console.error("필요한 요소를 찾을 수 없습니다. HTML을 확인하세요.");
        return;
    }

    vdo.playbackRate = 1; // 비디오 재생 속도 기본값 설정

    // 메인 비디오 영역 클릭 시 음소거 토글
    mainTopMovie.addEventListener("click", function () {
        toggleMute();
    });

    // 사운드 버튼 클릭 시 음소거 토글
    soundButton.addEventListener("click", function (e) {
        e.stopPropagation(); // 부모 요소의 클릭 이벤트 방지
        toggleMute();
    });

    // 음소거 상태 변경 함수
    function toggleMute() {
        vdo.muted = !vdo.muted; // 음소거 상태 반전

        if (vdo.muted) {
            soundButton.classList.remove("active"); // 음소거 상태일 때 active 클래스 제거
            srText.textContent = "재생시작";
        } else {
            soundButton.classList.add("active"); // 음소거 해제 시 active 클래스 추가
            srText.textContent = "재생중지";
        }
    }
});



$(function() { 


    var slickOption1 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots: false,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide: true,
        speed: 350,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    variableWidth: true,
                }
            },
            {
                breakpoint: 761,
                settings: {
                    variableWidth: true,
                    slidesToShow: 2,
                    centerMode: true,
                }
            }
        ]
    }; 
    initSlick($('#media .slick'), slickOption1);



    $('#depart .slick1').slick({
        autoplay: false,
        arrows: true,
        accessibility: false,
        asNavFor: '#depart .slick2',
        dots: false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        pauseOnHover: false,
        swipeToSlide: true,
        adaptiveHeight: true,
        speed: 400,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // vertical: false,
                    // verticalSwiping: false,
                    // variableWidth: true,
                    // slidesToShow: 1,
                    // centerMode: false,
                }
            }
        ]
      });

      $('#depart .slick2').on('beforeChange', function(event, slick, currentSlide){
        // 현재 슬라이드 찾기
        const currentImg = $(slick.$slides[currentSlide]).find('img').attr('src');
    
        $('.prev-img').fadeOut(200, function() {
            $(this).attr('src', currentImg).fadeIn(400);
        });
    });

      $('#depart .slick2').slick({
        autoplay: false,
        arrows: false,
        accessibility: false,
        asNavFor: '#depart .slick1',
        dots: false,
        draggable: true,
        infinite: true,
        slidesToShow: 2,
        variableWidth: true,
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide: true,
        speed: 400,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // vertical: false,
                    // verticalSwiping: false,
                    // variableWidth: true,
                    // slidesToShow: 1,
                    // centerMode: false,
                }
            }
        ]
      });


     

      $('#people .slick1').slick({
        autoplay: false,
        arrows: false,
        accessibility: false,
        asNavFor: '#people .slick2',
        dots: false,
        draggable: true,
        infinite: true,
        slidesToShow: 2,
        variableWidth: true,
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide: true,
        focusOnSelect: true,
        speed: 0,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // vertical: false,
                    // verticalSwiping: false,
                    // variableWidth: true,
                    // slidesToShow: 1,
                    // centerMode: false,
                }
            }
        ]
      });

    $('#people .slick1').on('beforeChange', function() {
        $(this).addClass('active');
    });

    $('#people .slick1').on('afterChange', function(event, slick, currentSlide) {
        var $slider = $(this); 
        setTimeout(function(){
            $slider.removeClass('active');
        }, 500); 
    });

      $('#people .slick2').slick({
        autoplay: false,
        arrows: false,
        accessibility: false,
        asNavFor: '#people .slick1',
        dots: false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        pauseOnHover: false,
        swipeToSlide: true,
        speed: 350,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // vertical: false,
                    // verticalSwiping: false,
                    // variableWidth: true,
                    // slidesToShow: 1,
                    // centerMode: false,
                }
            }
        ]
      });

     

   
      $('#air .slick').on('init reInit afterChange', function(event, slick, currentSlide) {
        var $slider = $(this); 
        $slider.addClass('active');

        var nowSlide = (currentSlide ? currentSlide : 0) + 1;
        var allSlide = slick.slideCount;

        // 슬라이드 번호를 두 자리로 포맷팅
        var formattedNowSlide = (nowSlide < 10) ? '0' + nowSlide : nowSlide;
        var formattedAllSlide = (allSlide < 10) ? '0' + allSlide : allSlide;

        // 슬라이드 번호 표시 업데이트
        $('#air .count').html('<strong>' + formattedNowSlide + '</strong>' + '<span></span>' + formattedAllSlide);
    });

    $('#air .slick').on('beforeChange', function(event, slick, currentSlide) {
        $('#air .count').removeClass('on');
    });

    $('#air .slick').on('afterChange', function(event, slick, currentSlide) {
        $('#air .count').addClass('on');
    });


      $('#air .slick').slick({
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots: false,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        variableWidth: true,
        prevArrow: $('#air .prev'),
        nextArrow: $('#air .next'),
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide: true,
        speed: 500,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // vertical: false,
                    // verticalSwiping: false,
                    // variableWidth: true,
                    // slidesToShow: 1,
                    // centerMode: false,
                }
            },
            {
                breakpoint: 761,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                }
            }
        ]
      });
      
   

});



$Doc.on({
    'click': function(e) {
        e.preventDefault();
        var Idx = $(this).index();
        $('#board .tab a').removeClass('active').filter(this).addClass('active');
        $('#board .view-bx > div').hide().eq(Idx).show();
    }
}, '#board .tab a')
.on({
    'click': function(e) {
        e.preventDefault();
        $('#air .toggle-view-bx').toggleClass('on');
        $('#air .control').fadeToggle(300);
    }
}, '#air .toggle-btn');



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

    $('#quick-menu').toggleClass('active', $(document).scrollTop() >= $('#main-top-movie').height());

    if ($(document).scrollTop() >=  $('#main-movie-wrap').height()) {  
        vdo.muted = true;
    }else{
        if ($('.sound button').hasClass('active')) {
            vdo.muted = false;
        }
    }

});



