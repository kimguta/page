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
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots: false,
        draggable: true,
        prevArrow: $('#introduce .prev'),
        nextArrow: $('#introduce .next'),
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide: true,
        speed: 350,
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


    var slickOption2 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots: false,
        draggable: true,
        prevArrow: $('#pride .prev'),
        nextArrow: $('#pride .next'),
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        variableWidth: true,
        swipeToSlide: true,
        centerMode: true,
        speed: 550,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('#pride .slick'), slickOption2);

});


$Doc.on({
    'click': function(e) {
        e.preventDefault();
        var Idx = $(this).index();
        $('.today-tab button').removeClass('active').filter(this).addClass('active');
        $('.today-view > div').removeClass('active').eq(Idx).addClass('active');
    }
}, '.today-tab button')
.on({
    'click': function(e) {
        e.preventDefault();
        var Idx = $(this).attr('data-go')
        var sIdx = $(this).attr('data-slick');
        $('.land-bx > div').removeClass('active').eq(Idx).addClass('active');
        $('#introduce .slick').slick('slickGoTo', sIdx);
        $('.major-list, .major-land').addClass('active');
    }
}, '.major-list button')
.on({
    'click': function(e) {
        e.preventDefault();
        var Idx = $(this).attr('data-go');
        $('.land-bx > div').removeClass('active').eq(Idx).addClass('active');
    }
}, '.major-land .go-btn');


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
    }else{
        if ($(document).scrollTop() <= $('#main-movie-wrap').height()) {  
            hasExecuted2 = false;
        }
    } 
    $('#quick-menu').toggleClass('active', $(document).scrollTop() >= $('#main-movie-wrap').height());
    elemOffset('.youtube-bx'); 
});