$(function() { 

    var slickOption1 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
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
    initSlick($('#notice .slick'), slickOption1);

    var slickOption2 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        prevArrow: $('#major .prev'),
		nextArrow: $('#major .next'),
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 500,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('#major .slick'), slickOption2);

    var slickOption3 = {
        autoplay: false,
        arrows: false,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        asNavFor: '.thumb-bx .slick',
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
    initSlick($('.tube-bx .slick'), slickOption3);

    var slickOption4 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide: true,
        centerMode: true,
        asNavFor: '.tube-bx .slick',
        focusOnSelect: true,
        speed: 350,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    centerMode: false,
                    variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('.thumb-bx .slick'), slickOption4);

});


$Doc.on({
    'click': function(e) {
        e.preventDefault();
        var Idx = $(this).index();
        $('#notice .tab-bx button').removeClass('active').filter(this).addClass('active');
        $('.view-bx > div').removeClass('active').eq(Idx).addClass('active');
    }
}, '#notice .tab-bx button')
.on({
    'mouseleave': function(e) {
        e.preventDefault();
        $('#reason .img-bx span').removeClass('active');
    },
    'mouseenter': function(e) {
        e.preventDefault();
        var Idx = $(this).index();
        $('#reason .img-bx span').removeClass('active').eq(Idx).addClass('active');
    },
}, '#reason .reason-bx a');


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
            $(this).find('.slick-current iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            hasExecuted = true;  
        } else {
            // 요소가 화면에 보이지 않을 때 영상 정지
            $(this).find('.slick-current iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
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

$(window).on('scroll', function() {
    // 스크롤 이벤트가 한 번만 실행되도록 설정
    // if (!hasExecuted) {
    //     elemOffset('#major');  // 조건이 만족할 때만 실행
    // }

    elemOffset('#major'); 
});