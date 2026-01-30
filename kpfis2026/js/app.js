
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
var $MobileWidth = 1400;

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
    },
    'load': function() {
        $('a[role="button"]').on('keypress', function(e) {
            if (e.keyCode === 32) {
                $(this).trigger('click');
                e.preventDefault(); // 기본 동작 막기
            }
        }); 
    }
});

// 문서 이벤트 처리


$Doc.on({
  'mouseover focusin': function () {
    // 리셋
    $('.gnb-bg, .Hdepth02').css('height', '');

    var $targets = $('.Hdepth02, .gnb-bg');
    var wasHidden = $targets.filter(':hidden').length > 0;

    // 측정 위해 잠깐 열기
    if (wasHidden) $targets.css('display', 'block');

    // ✅ maxH 제대로 계산
    var maxH = 0;
    $('.Hdepth02').each(function () {
      this.style.height = 'auto';
      var h = this.scrollHeight;
      if (h > maxH) maxH = h;
    });

    // 높이 적용
    $('.gnb-bg, .Hdepth02').css('height', maxH + 'px');

    // 상태/애니메이션
    $('#header').addClass('active');
    $('.Htlv01').removeClass('active');
    $(this).children('.Htlv01').addClass('active');
    $('.Hdepth02, .gnb-bg').stop(true, true).slideDown(200);
  }
}, '#header.pc-mode .Hdepth01 > li')
.on({
  'focusout': function () {
    $('.Hdepth02, .gnb-bg').stop(true, true).slideUp(150, function () {
      $('.gnb-bg, .Hdepth02').css('height', '');
    });
    $('#header').removeClass('active');
     $('.Htlv01').removeClass('active');
  }
}, '#header.pc-mode .Hdepth02 a:last')
.on({
  'mouseleave': function () {
    $('.Hdepth02, .gnb-bg').stop(true, true).slideUp(150, function () {
      $('.gnb-bg, .Hdepth02').css('height', '');
    });
    $('#header').removeClass('active');
    $('.Htlv01').removeClass('active');
  }
}, '#header.pc-mode .Hdepth01')
.on({
    'click': function(e) {
        e.preventDefault(); 
        $('#header').add(this).toggleClass('sitemap-on');
        $('#header').add('.Htlv01').removeClass('active');   
        $('.Hdepth02, .gnb-bg').removeAttr('style');
    }
}, '#header .menu-btn')
.on({
    'click': function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 500);
        $('#header h1 a').focus();
    }
}, '#btn-top')
.on({
    'click': function(e) {
        e.preventDefault();
        $('.pop-bx').addClass('active');
        $('.pop-bx .swiper-slide-active').focus();
    }
}, '#header .pop-btn')
.on({
    'click': function(e) {
        e.preventDefault();
        $('.pop-bx').removeClass('active');
        $('#header .pop-btn').focus();
    }
}, '#header .close-pop')
.on({
    'click': function(e) {
        e.preventDefault();
        $('.search-bx').addClass('active');
        $('#header-search').focus();
    }
}, '#header .search-btn')
.on({
    'click': function(e) {
        e.preventDefault();
        $('.search-bx').removeClass('active');
        $('#header .search-btn').focus();
    }
}, '#header .close-search')
.on({
    'click': function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        
    }
}, '#footer .select');


$(window).on('load', function() {
    var lastScrollTop = 0; // 마지막 스크롤 위치 저장 변수
    $(window).on('scroll', function() {
        var currentScrollTop = $(this).scrollTop(); // 현재 스크롤 위치 가져오기
        $('#header').toggleClass('fixed', $(document).scrollTop() > 60);
        $('#header').toggleClass('down', currentScrollTop > lastScrollTop); 
        lastScrollTop = currentScrollTop; // 마지막 스크롤 위치 업데이트
    });
});



document.addEventListener('DOMContentLoaded', function() {

    const allStopBtns = document.querySelectorAll('.swiper-stop');

    allStopBtns.forEach((btnStop) => {
    const root = btnStop.closest('.swiper-bx');
    if (!root) return;

    const btnPlay = root.querySelector('.swiper-play');
    if (!btnPlay) return;
    const sw = root.swiper;
    if (!sw || !sw.autoplay) return;

    btnPlay.style.display = 'none';

    btnStop.addEventListener('click', () => {
        sw.autoplay.stop();
        btnStop.style.display = 'none';
        btnPlay.style.display = 'flex';
    });

    btnPlay.addEventListener('click', () => {
        sw.autoplay.start();
        btnPlay.style.display = 'none';
        btnStop.style.display = 'flex';
    });
    });
});

