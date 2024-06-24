
// slick 슬라이더 초기화 함수
function initSlick(target, options) {
    var $ControlBtn = target.parent().find('.control .ps-btn');
    var $PlayBtn = target.parent().find('.control .play');
    var $PauseBtn = target.parent().find('.control .pause');
    var $Count = target.parent().find('.count');

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

// 클래스를 추가하는 함수 정의
function addClassWithParam(className) {
    return function() {
        $(this).addClass(className);
    };
}

// 클래스를 제거하는 함수 정의
function removeClassWithParam(className) {
    return function() {
        $(this).removeClass(className);
    };
}

// 클래스를 추가하는 변수
var $addActiveClass = addClassWithParam('active');

// 클래스를 제거하는 변수
var $removeActiveClass = removeClassWithParam('active');


// 선택자 변수
var $Win = $(window);
var $Doc = $(document);
var $Header = $('#header');
var $Depth02 = $('.Hdepth02');
var $Depth03 = $('.Hdepth03');
var $Title01 = $('.Htlv01');
var $Title02 = $('.Htlv02');
var $Title03 = $('.Htlv03');
// 모바일 분기
var $MobileWidth = 1180;

// 이벤트 선택자 변수
var $Depth01List = $('#header.pc-mode .Hdepth01 > li');
var $Depth01LastLink = $('#header.pc-mode .Hdepth01 a:last');
var $HeaderPcMode = $('#header.pc-mode');
var $MobileMenu = $('#header .mobile-menu');
var $MobileClose = $('#header .mobile-close');
var $MobileNavLink = $('#header.mobile-mode .Htlv01 a');
var $BtnTop = $('#btn-top');
var $NavBox = $('#header .nav-bx');


// 윈도우 이벤트 처리
$Win.on({
    'scroll load': function() {
        $Header.toggleClass('fixed', $Doc.scrollTop() > 10);
    },
    'resize load': function() {
        var $WinWidth = $Win.outerWidth();
        $Header.toggleClass('pc-mode', $WinWidth > $MobileWidth)
               .toggleClass('mobile-mode', $WinWidth <= $MobileWidth);
    },
    'resize': function() {
        var $WinWidth = $Win.outerWidth();
        if ($WinWidth > $MobileWidth) {
            $Title01.add($Title02).add($Title03).each($removeActiveClass);
            $Depth02.stop().hide();
        }
    },
    'load': function() {
        $('a[role="button"]').on('keypress', function(e) {
            if (e.keyCode === 32) {
                $(this).trigger('click');
                e.preventDefault(); // 기본 동작 막기
            }
        });
        var $WinWidth = $Win.outerWidth();
        if ($WinWidth > $MobileWidth) {
            setTimeout(function() {
                $Title01.add($Title02).add($Title03).each($removeActiveClass);
            }, 100);
        } else {
            $Title01.filter('.active').next($Depth02).show();
            $Title02.filter('.active').next($Depth03).show();
        }
    }
});

// 문서 이벤트 처리
$Doc.on({
    'mouseover focusin': function() {
        // 각 2depth 메뉴 활성
        $Header.each($addActiveClass);
        $Title01.each($removeActiveClass);
        $Depth02.stop().css('display', 'none');
        $(this).children($Title01).each($addActiveClass);
        $(this).children($Depth02).stop().css('display', 'flex');
        var $HighestBox = $(this).children($Depth02).height() + 50;
        $('.bg_pc').show().css('height', $HighestBox);

        // 전체 2depth 메뉴 활성
        // var $HighestBox = 0;
		// $Depth02.each(function(){
        //   if($(this).height() > $HighestBox){
        // 	     $HighestBox = $(this).height();
        // 	  }
		// });
        // $Header.each($addActiveClass);
		// $Title01.each($removeActiveClass);
        // $(this).children($Title01).each($addActiveClass);
		// $Depth02.stop().show();
		// $('.bg_pc').css('height',$HighestBox + 40).show();
        
    }
}, $Depth01List)
.on({
    'focusout': function() {
        $Header.add($Title01).each($removeActiveClass);
        $Depth02.stop().css('display', 'none');
        $('.bg_pc').hide().css('height', 0);
    }
}, $Depth01LastLink)
.on({
    'mouseleave': function() {
        $Header.add($Title01).each($removeActiveClass);
        $Depth02.stop().css('display', 'none');
        $('.bg_pc').hide().css('height', 0);
    }
}, $HeaderPcMode)
.on({
    'click': function(e) {
        e.preventDefault();
        $NavBox.add($Header).each($addActiveClass);
    }
}, $MobileMenu)
.on({
    'click': function(e) {
        e.preventDefault();
        $NavBox.add($Header).each($removeActiveClass);
    }
}, $MobileClose)
.on({
    'click': function(e) {
        e.preventDefault();
        if ($(this).parent().is('.active')) {
            $(this).parent($Title01).each($removeActiveClass);
            $(this).parent($Title01).next($Depth02).stop().slideUp(350);
        } else {
            $Title01.each($removeActiveClass);
            $(this).parent($Title01).each($addActiveClass);
            $Depth02.stop().slideUp(300);
            $(this).parent($Title01).next($Depth02).stop().slideDown(350);
        }
    }
}, $MobileNavLink)
.on({
    'click': function(e) {
        e.preventDefault();
        $('html, body').delay(100).animate({ scrollTop: 0 }, 350);
        $('#header h1 a').focus();
    }
}, $BtnTop);


$(function() {
	var currentPosition = parseInt($("#btn-top").css("top"));
	$Win.on({
		'scroll': function() { 
			var posY = $Win.scrollTop();
			$("#btn-top").stop().css("top",posY+currentPosition);
			if ( posY > 100 ){
				$("#btn-top").addClass('active');
			} else if(posY < 100) {
				$("#btn-top").removeClass('active');
			}
		}	
	});

	let vh = window.innerHeight;
    document.documentElement.style.setProperty("--vh", vh + "px");
    window.addEventListener("resize", () => {
		let vh = window.innerHeight;
		document.documentElement.style.setProperty("--vh", vh + "px");
    });

});

