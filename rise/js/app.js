
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

     function setVh() {
        const vh = window.innerHeight + 'px';
        document.documentElement.style.setProperty('--vh', vh);
    }

    setVh(); // 초기값
    window.addEventListener('resize', setVh); // 창 크기 바뀔 때 갱신
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
      $('.Hdepth02, .gnb-bg').slideDown(200);
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
        $(this).closest('.item').siblings('.item').find('> div').stop().slideUp(300).end().find('> button').removeClass('active');
        $(this).toggleClass('active').next('div').stop().slideToggle(300);
    }
}, '.family-bx button')
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
        $('html, body').animate({ scrollTop: 0 }, 1500);
        $('#header h1 a').focus();
    }
}, '#btn-top');


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
        const root = btnStop.closest('.swiper-bx'); // 공통 클래스 기준
        if (!root) return;
        const btnPlay = root.querySelector('.swiper-play');
        if (!btnPlay) return;
        btnPlay.style.display = 'none';
        btnStop.addEventListener('click', (e) => {
            e.preventDefault();
            root.querySelector('.swiper').swiper.autoplay.stop();
            btnStop.style.display = 'none';
            btnPlay.style.display = 'flex';
        });

        btnPlay.addEventListener('click', (e) => {
            e.preventDefault();
            root.querySelector('.swiper').swiper.autoplay.start();
            btnPlay.style.display = 'none';
            btnStop.style.display = 'flex';
        });
    });
});

(function(){
  // PC 마우스가 아닌 환경이면 종료
  if (!window.matchMedia('(pointer:fine)').matches) return;

  // ✅ body가 transform/overflow로 꼬이는 사이트가 있어서 html에 붙이는 게 안전
  const root = document.documentElement;
  root.classList.add('is-fake-cursor');

  // 중복 생성 방지
  if (document.querySelector('.fake-cursor')) return;

  const c = document.createElement('div');
  c.className = 'fake-cursor';
  root.appendChild(c);

  // 위치 업데이트 (rAF로 부드럽게)
  let tx=0, ty=0, x=0, y=0;
  function loop(){
    x += (tx - x) * 0.35;
    y += (ty - y) * 0.35;
    c.style.left = x + 'px';
    c.style.top  = y + 'px';
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  window.addEventListener('mousemove', (e)=>{
    tx = e.clientX; ty = e.clientY;
  }, {passive:true});

  // ✅ 클릭 가능 요소 범위(필요하면 .btn 같은 클래스 추가)
  const clickSel =
    'a,button,[role="button"],[onclick],input[type="button"],input[type="submit"],.btn,.clickable';
  const textSel = 'input,textarea,select,[contenteditable="true"]';

  // pointerover는 버블링이 잘돼서 안정적
  document.addEventListener('pointerover', (e)=>{
    const isText = !!e.target.closest(textSel);

    root.classList.toggle('is-real-cursor', isText);
    root.classList.toggle('is-fake-cursor', !isText);

    if (!isText) {
      const isPointer = !!e.target.closest(clickSel);
      c.classList.toggle('is-pointer', isPointer);
    }
  }, true);
})();