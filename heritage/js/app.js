
// slick 함수
function initSlick(target, options) {
	var ControlBtn = target.parent().find('.control .ps-btn');
	var PlayBtn  = target.parent().find('.control .play');
	var PauseBtn  = target.parent().find('.control .pause');

	target.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		// 슬라이드 체인지 전
	});
	target.on('init afterChange', function (event, slick, currentSlide, nextSlide) {
	// 초기 후, 슬라이드 체인지 후
		var nowSlide = (currentSlide ? currentSlide : 0) + 1;
		var allSlide = slick.slideCount
		if(nowSlide < 10){ 
			var nowSlide = '0' + nowSlide
		}
		if(allSlide < 10){ 
			var allSlide = '0' + allSlide
		}
		target.parent().find('.count').html('<strong>'+ nowSlide + '</strong>' + '<span></span>' + allSlide);
		target.find('.slick-slide:not(.slick-active)').attr('tabindex','-1');
		target.find('.slick-active').attr('tabindex','0');

		if($(this).hasClass('warn')){ 
			$('#data-wrap .img-bx > div').removeClass('active');
			$('#data-wrap .img-bx > div').eq(currentSlide).addClass('active');
		}
	});
	target.slick(options);
	ControlBtn.on('click', function (e) {
	    e.preventDefault();
	    if ($(this).hasClass('pause')) {
	        $(this).hide();
			PlayBtn.css('display','flex');
	        target.slick('slickPause');
	    } else if ($(this).hasClass('play')) {
	        $(this).hide();
	        PauseBtn.css('display','flex');
	        target.slick('slickPlay');
	    }
	});
};

// dots 커스텀 함수
function imgPaging(slick,index){
    var targetImage = slick.$slides.eq(index).find('img').attr('src');
    return '<a href="#" role="button" onclick="return false;"><img src=" ' + targetImage + ' "></a>';
}

function imgNumber(slick,index){
    return '<a href="#" role="button" onclick="return false;">' + (index + 1) + '</a>';
}

function tglCls(elem){
    $(elem).toggleClass('active');
	if ($(elem).hasClass('active')) {
		$(elem).find('span').text('닫기');
	} else {
		$(elem).find('span').text('열기');
	}
}

var ObjWin = $(window);
var ObjDoc = $(document);	
var Wwidth = ObjWin.outerWidth();

ObjWin.on({
	'scroll load': function() { 
		if (ObjDoc.scrollTop() > 50) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	},
	'load': function() { 
		appScript();
	},
	'resize': function() { 
		var Wwidth2 = $(window).outerWidth();
		if (Wwidth2 > 1399){
			$('#header .depth-02').stop().hide();
			$('#header h2, #header h3').removeClass('active');
		}
		else{
			$('#header .depth-02').removeAttr('style');
		}
	},
	'resize load': function() { 
		appScript2();
	}			
});


//콘텐츠 스크립트 (dom ready 후 동작)
function appScript(){
	$('#header .depth-02').prev('h2').addClass('has-depth');
	$('#header .depth-03').prev('h3').addClass('has-depth');
	if(ObjWin.width() > 1399){ 
		$('#header h2, #header h3').removeClass('active');
	}
	$('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});

	var appOption1 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        slidesToShow: 3,
        slidesToScroll: 1,
		swipeToSlide: true,
        infinite: true,
        pauseOnHover: false,
        speed: 200,
        autoplaySpeed: 3000,
		variableWidth: true,
		prevArrow: $('#footer .prev'),
        nextArrow: $('#footer .next'),
    };
    initSlick($('#footer .top-bx .inner > div:last-child'), appOption1);
};

function appScript2(){
	if(ObjWin.width() > 1719){ 
		$('#header, #sub').removeClass('mobile-mode');
		$('#header, #sub').addClass('pc-mode');
	}
	else{
		$('#header, #sub').removeClass('pc-mode');
		$('#header, #sub').addClass('mobile-mode');
		$('#header .depth-01 h2.active').next('.depth-02').show();
		$('#header .depth-02 h3.active').next('.depth-03').show();
	}
};

ObjDoc.on({
	'mouseover focusin': function() { 
		var highestBox = 0;
		$('#header .depth-01 .depth-02').each(function(){
			if($(this).height() > highestBox){
				highestBox = $(this).height() + 40;
			}
		});
		$('#header').addClass('active');
		$('#header h2').removeClass('active');
		$('#header .depth-02').stop().show();
		$(this).children('h2').addClass('active');
		$('.bg_pc').css('height',highestBox).show();
		$('#header .depth-02').css('height',highestBox);

	}
}, '#header.pc-mode h2 a')
.on({
	'focusout': function() { 
		$('#header').removeClass('active');
		$('#header h2').removeClass('active');
		$('#header .depth-02').stop().hide();
		$('.bg_pc').hide().css('height',0);
	}
}, '#header.pc-mode .depth-01 a:last')
.on({
	'mouseleave': function() { 
		$('#header').removeClass('active');
		$('#header h2').removeClass('active');
		$('#header .depth-02').stop().hide();
		$('.bg_pc').hide().css('height',0);
	}
}, '#header.pc-mode')
.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h2').removeClass('active');
			$(this).parent('h2').next('.depth-02').show().slideUp(300);
		} else{
			$('#header.mobile-mode h2').removeClass('active');
			$(this).parent('h2').addClass('active');
			$('#header.mobile-mode .depth-01 .depth-02').slideUp(300);
			$(this).parent('h2').next('.depth-02').hide().slideDown(300);		
		}
	}
}, '#header.mobile-mode .depth-01 h2.has-depth a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header.mobile-mode').toggleClass('active');
	}
}, '#header.mobile-mode .menu-on')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 400);
		$('#header h1 a').focus();
	}
}, '#btn-top')
.on({
	'click': function(e) { 
		e.preventDefault();
		$(this).toggleClass('active');
		$('#footer .view').slideToggle(250);
	}
}, '#footer .open');
