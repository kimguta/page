
// slick 함수
function initSlick(target, options) {
	var ControlBtn = target.parent().find('.control .ps-btn');
	var PlayBtn  = target.parent().find('.control .play');
	var PauseBtn  = target.parent().find('.control .pause');
	target.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		// 슬라이드 체인지 전
	});
	target.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
	// 초기 후, 슬라이드 체인지 후
		var nowSlide = (currentSlide ? currentSlide : 0) + 1;
		var allSlide = slick.slideCount
		if(nowSlide < 10){ 
			var nowSlide = '0' + nowSlide
		}
		if(allSlide < 10){ 
			var allSlide = '0' + allSlide
		}
		target.parent().find('.count').html( nowSlide + '<span>-</span>' + '<strong>'+ allSlide + '<strong>');
	});
	target.slick(options);
	ControlBtn.on('click', function (e) {
	    e.preventDefault();
	    if ($(this).hasClass('pause')) {
	        $(this).hide();
			PlayBtn.css('display','inline-block');
	        target.slick('slickPause');
	    } else if ($(this).hasClass('play')) {
	        $(this).hide();
	        PauseBtn.css('display','inline-block');
	        target.slick('slickPlay');
	    }
	});
};

var ObjWin = $(window);
var ObjDoc = $(document);	
var Wwidth = ObjWin.outerWidth();
var currentPosition = parseInt($("#btn_top").css("top"));

ObjWin.on('scroll load', function () {
	if (ObjDoc.scrollTop() > 80) {
		$('#header').addClass('fixed');
	} else {
		$('#header').removeClass('fixed');
	}
})
.on('resize load', function () {
	if(ObjWin.width() > 1399){ 
		$('#header').removeClass('mobile-mode');
		$('#header').addClass('pc-mode');
	}
	else{
		$('#header').removeClass('pc-mode');
		$('#header').addClass('mobile-mode');
		$('.mobile-mode .active + .depth-02').show();
	}

	clearTimeout(window.resizedFinished);
	window.resizedFinished = setTimeout(function(){
		var Wwidth2 = ObjWin.outerWidth();
		if ( (Wwidth > 1399 && Wwidth2 < 1400) || (Wwidth < 1400 && Wwidth2 > 1399) ){
			$('.depth-02, .depth-03, #mask').stop().hide();
		}
	}, 300);

	var highestBox = 0;
		$('#header .depth-02').each(function(){
			if($(this).height() > highestBox){
			highestBox = $(this).height() + 15;
		}
	});
	$('.bg_pc').css('height',highestBox);
})
.on('scroll', function () {
	var posY = ObjWin.scrollTop();
	$("#btn_top").stop().animate({"top":posY+currentPosition+"px"},500);
	if ( posY > 100 ){
		$("#btn_top").css('opacity','.8');
	} else if(posY < 100) {
		$("#btn_top").css('opacity','0');
	};
})
.on('load', function() {	
	$('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});	
});


ObjDoc.on({
	'mouseover focusin': function() { 
		$('#header').addClass('active');
		$('#header h2').removeClass('active');
		$(this).children('h2').addClass('active');
		$('.depth-02').stop().show();
		$('.bg_pc').stop().slideDown(300);
		$('#mask').show();
		$('#header.pc-mode .sitemap').addClass('active');
	}
}, '#header.pc-mode .depth-01 li')
.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('#header').removeClass('active');
			$('#header h2').removeClass('active');
			$('.depth-02, .bg_pc, #mask').stop().hide();
		} else{
			$(this).addClass('active');
			$('#header').addClass('active');
			$('.depth-02').stop().show();
			$('.bg_pc').stop().slideDown(300);
			$('#mask').show();	
		}
	}
}, '#header.pc-mode .sitemap')
.on({
	'focusout': function() { 
		$('#header').removeClass('active');
		$('#header h2').removeClass('active');
		$('.depth-02, .bg_pc, #mask').stop().hide();
		$('#header.pc-mode .sitemap').removeClass('active');
	}
}, '#header .depth-01 a:last')
.on({
	'mouseleave': function() { 
		$('#header').removeClass('active');
		$('#header h2').removeClass('active');
		$('.depth-02, .bg_pc, #mask').stop().hide();
		$('#header.pc-mode .sitemap').removeClass('active');
	}
}, '#header.pc-mode')
.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h2').removeClass('active');
			$('.depth-02, .depth-03').stop().slideUp(300);
		} else{
			$('#header h2').removeClass('active');
			$(this).parent('h2').addClass('active');
			$('.depth-02').stop().slideUp(300);
			$(this).parent('h2').next('.depth-02').stop().slideDown(300);
			
		}
	}
}, '#header.mobile-mode h2.has_depth a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#mask, #header nav, #header').toggleClass('active');
	}
}, '#header.mobile-mode .sitemap, #header.mobile-mode .mobile-close, #header.mobile-mode + #mask')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 400);
	}
}, '#btn_top')
.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else{
			$('#footer .open').removeClass('active');
			$(this).addClass('active');
		}
	}
}, '#footer .open')
.on({
	'focusout': function() { 
		$('#footer .open').removeClass('active');
		$(this).parent('.view').prev('.open').focus();
	}
}, '#footer .view a:last-child')
.on({
	'mouseleave': function() { 
		$('#footer .open').removeClass('active');
	}
}, '#footer .family');


