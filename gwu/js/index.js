$(function() { 

    setTimeout(function() {
        AOS.init({
            easing: 'ease-out-back',
            duration: 1200,
            delay: 500,
            once: true,
            offset: 200
        });
     }, 100);

    var slickOption1 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots: true,
        draggable: true,
        prevArrow: $('#introduce .prev'),
        nextArrow: $('#introduce .next'),
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        pauseOnHover: false,
        variableWidth: true,
        swipeToSlide: true,
        speed: 350,
        autoplaySpeed: 5000,
        appendDots: $('#introduce .dots'),
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('#introduce .slick'), slickOption1);

});

$(window).on('load', function() {
    var $headerOff = $('#header').offset().top; // 윈도우가 로드된 후 초기 오프셋 값을 가져옴

    $(window).on('scroll', function() {
        $('#header').toggleClass('scrolled', $(document).scrollTop() > 50);
        $('#header').toggleClass('fixed', $(document).scrollTop() > $headerOff); 
    });
});

$Doc.on({
    'click': function(e) {
        e.preventDefault();
        var Idx = $(this).index();
        $('.today-tab button').removeClass('active').filter(this).addClass('active');
        $('.today-view > div').removeClass('active').eq(Idx).addClass('active');
    }
}, '.today-tab button');


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


// 플래그를 전역으로 설정
let hasExecuted = false;
let hasExecuted2 = false;

$(window).on('scroll', function() {
    // 스크롤 이벤트가 한 번만 실행되도록 설정
    if (!hasExecuted2) {
        if ($(document).scrollTop() >=  $('#main-movie-wrap').height()) {  
          
            $('#main-movie-wrap').toggleClass('active');
            hasExecuted2 = true;
        }   
    }else if(hasExecuted2 == true){
        if ($(document).scrollTop() <= $('#main-movie-wrap').height()) {  
            hasExecuted2 = false;
        }
    }

    elemOffset('.video-wrap'); 
});