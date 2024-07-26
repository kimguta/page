
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
        $Count.html('<strong>' + formattedNowSlide + '</strong>' + '<span>-</span>' + formattedAllSlide);

        // 접근성을 위한 탭 인덱스 설정
        target.find('.slick-slide').attr('tabindex', '-1');
        target.find('.slick-active').attr('tabindex', '0');

        if ($(this).hasClass('notice')) {
            $('.category-bx p').hide();  
            $('.category-bx p').eq(nowSlide - 1).show();
        } 
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



// 로딩 이벤트 처리
$Win.on({
    'scroll load': function() {
        $('#header').toggleClass('fixed', $Doc.scrollTop() > 10);
    },
    'resize load': function() {
        var $WinWidth = $Win.outerWidth();
        $('#header').toggleClass('pc-mode', $WinWidth > $MobileWidth)
                    .toggleClass('mobile-mode', $WinWidth <= $MobileWidth);
        if ($WinWidth > $MobileWidth) {
            setTimeout(function() {
                $('.Htlv01').add('.Htlv02').add('.Htlv03').removeClass('active');
            }, 100);
            $('.Hdepth02').stop().hide();
        }else {
            setTimeout(function() {
                $('.Htlv01.active').next('.Hdepth02').show();
            }, 100);
        }    
        $('a[role="button"]').on('keypress', function(e) {
            if (e.keyCode === 32) {
                $(this).trigger('click');
                e.preventDefault();
            }
        });            
    }
});

// 동적 이벤트 처리
$Doc.on({
    'mouseover focusin': function() {
        // 각 2depth 메뉴 활성
        $('.Htlv01').removeClass('active');
        $('.Hdepth02').stop().css('display', 'none');
        $(this).children('.Htlv01').addClass('active');
        $(this).children('.Hdepth02').stop().css('display', 'flex');
        
    }
}, '#header.pc-mode .Hdepth01 > li')
.on({
    'focusout': function() {
        $('#header').add('.Htlv01').removeClass('active');
        $('.Hdepth02').stop().css('display', 'none');
    }
}, '#header.pc-mode .Hdepth01 a:last')
.on({
    'mouseleave': function() {
        $('.Htlv01').removeClass('active');
        $('.Hdepth02').stop().css('display', 'none');
    }
}, '#header.pc-mode nav')
.on({
    'click': function(e) {
        e.preventDefault();
        var $WinWidth = $Win.outerWidth();
        if ($(this).is('.active')) {
            $(this).add('#header .nav-bx').add('header').removeClass('active');
            $('.Hdepth02').stop().css('display', 'none');
            $('.Htlv01').removeClass('active');
        } else { 
            $(this).add('#header .nav-bx').add('header').addClass('active');

            if ($WinWidth > $MobileWidth) {
                setTimeout(function() {
                    $('.Htlv01').removeClass('active');
                }, 100);
                
            }
            
        }
    }
}, '#header .sitemap-btn')
.on({
    'click': function(e) {
        e.preventDefault();
        if ($(this).parent().is('.active')) {
            $(this).parent('.Htlv01').removeClass('active');
            $(this).parent('.Htlv01').next('.Hdepth02').stop().slideUp(350);
        } else { 
            $('.Htlv01').removeClass('active');
            $(this).parent('.Htlv01').addClass('active');
            $('.Hdepth02').stop().slideUp(300);
            $(this).parent('.Htlv01').next('.Hdepth02').stop().slideDown(350);
        }
    }
}, '#header.mobile-mode .Htlv01 a')
.on({
    'click': function(e) {
        
        if ($('#main').length) {
            e.preventDefault();
            $('#header .header-search').add('header').addClass('active');
        }     
    }
}, '#header .search-btn')
.on({
    'click': function(e) {
        e.preventDefault();
        $('#header .header-search').add('header').removeClass('active');
    }
}, '.header-search .close')
.on({
    'click': function(e) {
        e.preventDefault();
        if ($(this).is('.active')) {
            $(this).removeClass('active');
            $(this).next('.view-bx').slideUp(300);    
        } else { 
            $(this).addClass('active');
            $(this).next('.view-bx').slideDown(300);   
           
        }
    }
}, '#footer .view-btn')
.on({
    'click': function(e) {
        e.preventDefault();
        $('html, body').delay(100).animate({ scrollTop: 0 }, 350);
        $('#header h1 a').focus();
    }
}, '#btn-top');



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

