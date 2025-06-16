
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
var $MobileWidth = 1500;

window.addEventListener('load', function () {
    let startX = 0;
    let currentTranslate = 0;
    let isDragging = false;

    function isScreenWidthValid() {
        return window.innerWidth <= 1500;
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
        

        // $('#sitemap .item02 > div').prev('.tit02').addClass('has_depth');
        // $('#sitemap .item01 > div').prev('.tit01').addClass('has_depth');
    }
});

// 문서 이벤트 처리


$Doc.on({
    'mouseover focusin': function() {
      // —— 동적 높이 계산 & 일괄 적용 —— 
      var maxH = 0;
      $('.Hdepth02').each(function(){
        var h = $(this).outerHeight(); 
        if(h > maxH) maxH = h;
      });
      $('.Hdepth02, .gnb-bg').css('height', maxH + 'px');
      // ——————————————————————————————
      $('#header').addClass('active');
      $('.Htlv01').removeClass('active');
      $(this).children('.Htlv01').addClass('active');
      $('.Hdepth02, .gnb-bg').stop().slideDown(200);
    }
  }, '#header.pc-mode .Hdepth01 > li')
.on({
    'focusout': function() {
        $('#header').add('.Htlv01').removeClass('active');      
        $('.Hdepth02, .gnb-bg').stop().slideUp(200);

    }
}, '#header.pc-mode .Hdepth02 a:last')
.on({
    'mouseleave': function() {
        $('#header').add('.Htlv01').removeClass('active');
        $('.Hdepth02, .gnb-bg').stop().slideUp(200);
    }
}, '#header.pc-mode')
.on({
    'click': function(e) {
        e.preventDefault();
        $('#header').add(this).toggleClass('active');
    }
}, '#header.mobile-mode .menu-btn')
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
        $('html, body').animate({ scrollTop: 0 }, 500);
        $('#header h1 a').focus();
    }
}, '#btn-top');
;

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





    // $('#main, #sub').after('<button type="button" id="btn-top"><img src="/page/pccrs/images/common/top.png" alt="위로"></button>');

      
});

