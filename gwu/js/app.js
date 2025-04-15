
// slick 슬라이더 초기화 함수
function initSlick(target, options) {
    var $ControlBtn = target.parent().find('.control .ps-btn');
    var $PlayBtn = target.parent().find('.control .play');
    var $PauseBtn = target.parent().find('.control .pause');
    var $Count = target.parent().find('.count');
    var $Dots = target.parent().find('.dots');

    target.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        // 슬라이드 변경 전에 실행할 로직
    });

    target.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        // 슬라이드 초기화 후 및 변경 후에 실행할 로직
        var nowSlide = (currentSlide ? currentSlide : 0) + 1;
        var allSlide = slick.slideCount;

        // 슬라이드 번호를 두 자리로 포맷팅
        var formattedNowSlide = (nowSlide < 10) ? '0' + nowSlide : nowSlide;
        var formattedAllSlide = (allSlide < 10) ? '0' + allSlide : allSlide;

        // 슬라이드 번호 표시 업데이트
        $Count.html('<strong>' + formattedNowSlide + '</strong>' + '<span>/</span>' + formattedAllSlide);

        // 접근성을 위한 탭 인덱스 설정
        target.find('.slick-slide').attr('tabindex', '-1');
        target.find('.slick-active').attr('tabindex', '0');

        // if($(this).hasClass('video')){ 
		// 	$('iframe').each( function() {
		// 		$(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
		// 	});  
		// }
    });

    // slick 슬라이더 초기화
    target.slick(options);

    // 컨트롤 버튼 이벤트 핸들러
    $ControlBtn.on('click', function (e) {
        e.preventDefault();
        
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $PlayBtn.show();
            target.slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $PauseBtn.show();
            target.slick('slickPlay');
        }
    });
}

// dots 커스텀 함수 정의
function imgPaging(slick,index){
    var targetImage = slick.$slides.eq(index).find('img').attr('src');
    return '<a href="#" role="button" onclick="return false;"><img src=" ' + targetImage + ' "></a>';
}

function imgNumber(slick,index){
    return '<a href="#" role="button" onclick="return false;">' + (index + 1) + '</a>';
}



// 선택자 변수
var $Win = $(window);
var $Doc = $(document);

// 모바일 분기
var $MobileWidth = 1440;

window.addEventListener('load', function () {
    let startX = 0;
    let currentTranslate = 0;
    let isDragging = false;

    function isScreenWidthValid() {
        return window.innerWidth <= 1440;
    }

    $('#sitemap').on('touchstart', function (e) {
        if (!isScreenWidthValid()) return;

        startX = e.touches[0].clientX;
        isDragging = true;
    });

    $('#sitemap').on('touchmove', function (e) {
        if (!isDragging || !isScreenWidthValid()) return;

        const touchX = e.touches[0].clientX;
        const deltaX = touchX - startX;
        const parentWidth = $(this).parent().width();
        currentTranslate = (deltaX / parentWidth) * 100;

        if (currentTranslate < 0) {
            currentTranslate = 0;
        }

        $(this).css('transform', `translateX(${currentTranslate}%)`);
    });

    $('#sitemap').on('touchend', function () {
        if (!isDragging || !isScreenWidthValid()) return;

        isDragging = false;

        if (currentTranslate > 30) {

            $('#header, .sitemap').removeClass('active');
        } 
        $(this).removeAttr('style');
      

        currentTranslate = 0; // Reset
    });
});


$Win.on({
    'resize load': function() {
        var $WinWidth = $Win.outerWidth();
        $('#header').toggleClass('pc-mode', $WinWidth > $MobileWidth)
                    .toggleClass('mobile-mode', $WinWidth <= $MobileWidth);
    },
    'resize': function() {
        var $WinWidth = $Win.outerWidth();
        if ($WinWidth > $MobileWidth) {
            $('.Htlv01').add('.Htlv02').add('.Htlv03').removeClass('active');
            $('.Hdepth02').stop().hide();
        }
        $('#header').removeClass('active');
        $('#sitemap').hide();
    },
    'load': function() {
        $('a[role="button"]').on('keypress', function(e) {
            if (e.keyCode === 32) {
                $(this).trigger('click');
                e.preventDefault(); // 기본 동작 막기
            }
        });
        
        // var $WinWidth = $Win.outerWidth();
        // if ($WinWidth > $MobileWidth) {
        //     setTimeout(function() {
        //         $('.Htlv01').add('.Htlv02').add('.Htlv03').removeClass('active');
        //     }, 100);
        // } else {
        //     // $('.tit01').filter('.active').next('.depth02-bx').show();
        //     // $('.tit02').filter('.active').next('.Hdepth03').show();
        // }
        $('#sitemap .item02 > div').prev('.tit02').addClass('has_depth');
        $('#sitemap .item01 > div').prev('.tit01').addClass('has_depth');
    }
});

// 문서 이벤트 처리

$Doc.on({
    'mouseover focusin': function() {
        // 각 2depth 메뉴 활성
        $('#header').addClass('active');
        $('.Htlv01').removeClass('active');
        $('.Hdepth02').stop().css('display', 'none');
        $(this).children('.Htlv01').addClass('active');
        $(this).children('.Hdepth02').stop().css('display', 'flex');
        
    }
}, '#header.pc-mode .Hdepth01 > li:not(.enter)')
// .on({
//     'mouseover focusin': function() {
//         $(this).children('.Hdepth03').stop().slideDown(300);
//     },
//     'mouseout': function() {
//         $(this).children('.Hdepth03').stop().slideUp(300);
//     }
// }, '#header.pc-mode .menu-list .item')

.on({
    'focusout': function() {
        $('#header').add('.Htlv01').removeClass('active');      
        $('.Hdepth02').stop().css('display', 'none');

    }
}, '#header.pc-mode .Hdepth02 a:last')
.on({
    'mouseleave': function() {
        $('#header').add('.Htlv01').removeClass('active');
        $('.Hdepth02').stop().css('display', 'none');
    }
}, '#header.pc-mode')
.on({
    'click': function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('#header').toggleClass('active');
        $('#sitemap').toggle();
        $('#sitemap .home-btn').focus();
    }
}, '#header .sitemap')
.on({
    'click': function(e) {
        e.preventDefault();
        $('#header .sitemap').removeClass('active').focus();
        $('#header').removeClass('active');
        $('#sitemap').hide();
    }
}, '#sitemap .close-btn')
.on({
    'click': function(e) {
        e.preventDefault();
        $('#header.mobile-mode .tit01').removeClass('active').filter(this).addClass('active');
    }
}, '#header.mobile-mode .tit01.has_depth')
.on({
    'click': function(e) {
        e.preventDefault();
        $('#header.mobile-mode .tit02.has_depth').removeClass('active').filter(this).addClass('active');
    }
}, '#header.mobile-mode .tit02.has_depth')
.on({
    'mouseenter': function(e) {
        e.preventDefault();
        $(this).addClass('active');
        $('.lang-view').show();
    }
}, '.language-bx button')
.on({
    'mouseleave': function(e) {
        e.preventDefault();
        // $(this).removeClass('active');
        $('.lang-view').hide();
    }
}, '#header')
.on({
    'click': function(e) {
        e.preventDefault();
        var Idx = $(this).index();
        $('#quick-menu .tab-bx button').removeClass('active').filter(this).addClass('active');
        $('.menu-view > div').removeClass('active').eq(Idx).addClass('active');
    }
}, '#quick-menu .tab-bx button')
.on({
    'click': function(e) {
        e.preventDefault();
        $('.quick-bx').css('display','flex');
        // $('.qbtn-bx .menu-open').focus();
    }
}, '#quick-menu .menu-open')
.on({
    'click': function(e) {
        e.preventDefault();
        $('.quick-bx').hide();
        $('.qbtn-bx .menu-open').focus();
    }
}, '#quick-menu .close-quick')
.on({
    'click': function(e) {
        e.preventDefault();
        // 클릭한 버튼이 현재 active가 아니라면,
        if (!$(this).hasClass('active')) {
          // 다른 버튼들의 active 클래스를 제거하고, 연결된 div는 닫습니다.
          $('#footer .family-bx button.active')
            .removeClass('active')
            .next('div')
            .slideUp(200);
        }
        // 클릭한 버튼은 토글합니다.
        $(this).toggleClass('active').next('div').slideToggle(200);
    }
}, '#footer .family-bx button')
.on({
    'focusout': function(e) {
        e.preventDefault();
        $(this).parents().find('button').removeClass('active')
        $(this).parent('div').slideUp(200);
    }
}, '#footer .family-bx div a:last-child')
.on({
    'click': function(e) {
        e.preventDefault();
        $('html, body').delay(100).animate({ scrollTop: 0 }, 0);
        $('#header h1 a').focus();
    }
}, '#btn-top')
.on({
    'click': function(e) {
        e.preventDefault();
        $('.alram-pop').addClass('active');
        $('.alram-pop a:first-child').focus();
    }
}, '#header .alram-open')
.on({
    'click': function(e) {
        e.preventDefault();
        $('.alram-pop').removeClass('active');
        $('#header .alram-open').focus();
    }
}, '#header .alram-close')
.on({
    'click': function(e) {
        e.preventDefault();
        $('.search-pop').addClass('active');
        $('.search-pop input').focus();
    }
}, '#header .search-open')
.on({
    'click': function(e) {
        e.preventDefault();
        $('.search-pop').removeClass('active');
        $('#header .search-open').focus();
    }
}, '#header .search-close')
.on({
    'click': function(e) {
        e.preventDefault();
        $('#sitemap').toggle();
        $('#sitemap .home-btn').focus();
    }
}, '#footer .link-bx a:last-child');

$(window).on('load', function() {
    var lastScrollTop = 0; // 마지막 스크롤 위치 저장 변수

    $(window).on('scroll', function() {
        var currentScrollTop = $(this).scrollTop(); // 현재 스크롤 위치 가져오기
        $("#btn-top").toggleClass('active', currentScrollTop > lastScrollTop);
        $('#header').toggleClass('fixed', $(document).scrollTop() > 100);
        $('#header').toggleClass('down', currentScrollTop > lastScrollTop); 
        $("#btn-top").toggleClass('active', currentScrollTop > lastScrollTop);
        lastScrollTop = currentScrollTop; // 마지막 스크롤 위치 업데이트
    });
});

$(function() {


	let vh = window.innerHeight;
    document.documentElement.style.setProperty("--vh", vh + "px");
    window.addEventListener("resize", () => {
		let vh = window.innerHeight;
		document.documentElement.style.setProperty("--vh", vh + "px");
    });

    var slickOptionq = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots: false,
        draggable: true,
        prevArrow: $('#quick-menu .prev'),
        nextArrow: $('#quick-menu .next'),
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide: true,
        speed: 350,
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
    initSlick($('#quick-menu .slick'), slickOptionq);


    // var $stickyDiv = $('.sticky-div'); 
    // var originalTop = $('.sticky-div').offset().top;

    // $(window).on('scroll load', function() {
    //   var scrollTop = $(window).scrollTop();
    //   var moveTop = scrollTop - originalTop;
    //  if(scrollTop >=  originalTop){
    //     $stickyDiv.css('top', moveTop + 72);
        
    //  }else{
    //     $stickyDiv.removeAttr('style');
    //  }
    // });  
    $('#main, #sub').after('<button type="button" id="btn-top"><img src="/page/gwu/images/common/top.png" alt="위로"></button>');

      
});

