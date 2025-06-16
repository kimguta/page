

$(function() { 

    var slickOption1 = {
        autoplay: true,
        arrows: false,
        accessibility: false,
        dots: true,
        draggable: true,
        fade: true,
        infinite: true,
        appendDots: $('#visual .slick-wrap .dots'),
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide: true,
        speed: 1000,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1541,
                settings: {
                    // variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('#visual .slick-wrap .slick'), slickOption1);


     var slickOption2 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots: false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        swipeToSlide: true,
        speed: 300,
        autoplaySpeed: 4500,
        responsive: [
            {
                breakpoint: 1541,
                settings: {
                    // variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('#visual .modal-slick-wrap .slick'), slickOption2);



     var slickOption3 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots: false,
        draggable: true,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        pauseOnHover: false,
        prevArrow: $('#booking .prev'),
        nextArrow: $('#booking .next'),
        swipeToSlide: true,
        speed: 150,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    variableWidth: true,
                    // infinite: true,
                    slidesToShow: 1,
                }
            }
        ]
    }; 
    initSlick($('#booking .slick'), slickOption3);


    
    const lenis = new Lenis({
        duration: 1,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let ticking = false;


    window.addEventListener("scroll", function () {
        if (!ticking) {
            
        ticking = true;
        }
    });

});


$(document).on({
    'click': function(e) {
        e.preventDefault();
         const isActive = $(this).hasClass('active');
        $(this).add('.modal-slick-wrap').toggleClass('active', !isActive);
        $(this).find('span').text(isActive ? '팝업닫기' : '팝업열기');
    }
}, '.modal-slick-wrap .open')
.on({
    'click': function(e) {
       const Idx =  $(this).index();
        $('#course .tab-bx button').removeClass('active');
        $(this).addClass('active');
        $('#course .view-bx > div').removeClass('active').eq(Idx).addClass('active');

    }
}, '#course .tab-bx button');

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
    elemOffset('.video-bx'); 
});

