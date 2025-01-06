$(function() { 


    const $container = $('.major-land .slick-wrap');
    const $image = $('.move-img');

    $container.on('mousemove', function(event) {
        // 컨테이너 내부 좌표 계산
        const containerOffset = $container.offset();
        const mouseX = event.pageX - containerOffset.left;
        const mouseY = event.pageY - containerOffset.top;

        // 이미지 위치 업데이트 (이미지가 컨테이너 밖으로 나가지 않도록 제한)
        const imageWidth = $image.width();
        const imageHeight = $image.height();

        const newLeft = Math.min(
            Math.max(0, mouseX - imageWidth / 2),
            $container.width() - imageWidth
        );
        const newTop = Math.min(
            Math.max(0, mouseY - imageHeight / 2),
            $container.height() - imageHeight
        );

        $image.css({
            left: newLeft + 50 +'px',
            top: newTop + 'px'
        });
    });

    setTimeout(function() {
        AOS.init({
            easing: 'ease-out-back',
            duration: 1200,
            delay: 500,
            once: true,
            offset: 200
        });
     }, 100);

    // var slickOption1 = {
    //     autoplay: false,
    //     arrows: true,
    //     accessibility: false,
    //     dots: false,
    //     draggable: true,
    //     prevArrow: $('#introduce .prev'),
    //     nextArrow: $('#introduce .next'),
    //     infinite: true,
    //     slidesToShow: 5,
    //     slidesToScroll: 1,
    //     vertical: true,
    //     verticalSwiping: true,
    //     pauseOnHover: false,
    //     swipeToSlide: true,
    //     speed: 350,
    //     responsive: [
    //         {
    //             breakpoint: 992,
    //             settings: {
    //                 // variableWidth: true,
    //             }
    //         }
    //     ]
    // }; 
    // initSlick($('#introduce .slick'), slickOption1);


    var slickOption2 = {
        // autoplay: true,
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

    $('#introduce .slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $('.land-bx > div').removeClass('active').eq(currentSlide).addClass('active');
    });


    $('#introduce .slick').slick({
        autoplay: false,
        arrows: false,
        accessibility: false,
        dots: false,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        centerMode: true,
        verticalSwiping: true,
        pauseOnHover: false,
        swipeToSlide: true,
        focusOnSelect: true,
        speed: 350,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    variableWidth: true,
                    slidesToShow: 1,
                    centerMode: false,
                }
            }
        ]
      });

      $('#introduce .slick').on('wheel', function (e) {
            e.preventDefault();
            if (e.originalEvent.deltaY > 0) {
            $(this).slick('slickNext'); // 아래로 스크롤
            } else {
            $(this).slick('slickPrev'); // 위로 스크롤
            }
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
// .on({
//     'click': function(e) {
//         e.preventDefault();
//         var Idx = $(this).attr('data-go')
//         var sIdx = $(this).attr('data-slick');
//         $('.land-bx > div').removeClass('active').eq(Idx).addClass('active');
//         $('#introduce .slick').slick('slickGoTo', sIdx);
//         $('.major-list, .major-land').addClass('active');
//     }
// }, '.major-list button')
// .on({
//     'click': function(e) {
//         e.preventDefault();
//         var Idx = $(this).attr('data-go');
//         $('.land-bx > div').removeClass('active').eq(Idx).addClass('active');
//         $('#introduce .slick').slick('slickGoTo', Idx);
//     }
// }, '.major-land .go-btn');


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
