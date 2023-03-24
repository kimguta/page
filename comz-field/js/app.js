
// slick 함수
function initSlick(target, options) {
	var ControlBtn = target.parent().find('.control .ps-btn');
	var PlayBtn  = target.parent().find('.control .play');
	var PauseBtn  = target.parent().find('.control .pause');
	target.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		// 슬라이드 체인지 전

	});
	target.on('afterChange', function (event, slick, currentSlide, nextSlide) {
	// 슬라이드 체인지 후
		if ($(this).hasClass('map')) {
			$('.img-bx img, .btn-bx button').removeClass('active');
			var slideNum = [
				{slideStart: 0, slideEnd: 3},
				{slideStart: 4, slideEnd: 10},
				{slideStart: 11, slideEnd: 12},
				{slideStart: 13, slideEnd: 13},
				{slideStart: 14, slideEnd: 14},
				{slideStart: 15, slideEnd: 15},
			];	
			for (var i = 0; i< slideNum.length; i++) {	
				if (currentSlide >= slideNum[i].slideStart && currentSlide <= slideNum[i].slideEnd) {
					$('.img-bx img').eq(i).addClass('active');
					$('.btn-bx button').eq(i).addClass('active');
				} 
			};
		}
		var nowSlide = (currentSlide ? currentSlide : 0) + 1;
		var allSlide = slick.slideCount
		if(nowSlide < 10){ 
			var nowSlide = '0' + nowSlide
		}
		if(allSlide < 10){ 
			var allSlide = '0' + allSlide
		}
		target.parent().find('.count').html( nowSlide + '<span>/</span>' + '<strong>'+ allSlide + '<strong>');
		target.find('.slick-slide:not(.slick-active)').attr('tabindex','-1');
		target.find('.slick-active').attr('tabindex','0');
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

// dots 커스텀 함수
function imgPaging(slick,index){
    var targetImage = slick.$slides.eq(index).find('img').attr('src');
    return '<a href="#" role="button" onclick="return false;"><img src=" ' + targetImage + ' "></a>';
}

function imgNumber(slick,index){
    return '<a href="#" role="button" onclick="return false;">' + (index + 1) + '</a>';
}

var ObjWin = $(window);
var ObjDoc = $(document);	
var Wwidth = ObjWin.outerWidth();

ObjWin.on({
	'scroll load': function() { 
		if (ObjDoc.scrollTop() > 70) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	}		
})
.on({
	'resize load': function() { 
		if(ObjWin.width() > 1399){ 
			$('#header').removeClass('mobile-mode');
			$('#header').addClass('pc-mode');
		}
		else{
			$('#header').removeClass('pc-mode');
			$('#header').addClass('mobile-mode');
		}
	}
})
.on({
	'resize': function() { 
		var Wwidth2 = $(window).outerWidth();
		if (Wwidth2 > 1399 && Wwidth < 1400){
			$('#header h2').removeClass('active');
		}
	}
})
.on({	
	'load': function() { 
		$('a[role="button"]').on('keypress', function (key) {
			if (key.keyCode == 32) {
				$(this).trigger('click');
				return false
			}
		});
		setTimeout(function() {
			var menuDom = $('#header nav').clone();
			$('#header .site-map h1').after(menuDom);
			$('#header .site-map nav').removeAttr('class');
			$('#header .depth-02').prev('h2').addClass('has-depth');
			$('#header .depth-03').prev('h3').addClass('has-depth');
		 }, 300);
	}
});

ObjDoc.on({
	'mouseover focusin': function() { 
		$('#header').addClass('active');
		$('#header .pc-menu h2').removeClass('active');
		$('.pc-menu .depth-02').removeClass('active');
		$(this).children('h2').addClass('active');
		$(this).children('.depth-02').addClass('active');
	}
}, '#header .pc-menu .depth-01 li')
.on({
	'focusout': function() { 
		$('#header').removeClass('active');
		$('#header .pc-menu h2').removeClass('active');
		$('.pc-menu .depth-02').removeClass('active');
	}
}, '#header .pc-menu .depth-01 a:last')
.on({
	'mouseleave': function() { 
		$('#header').removeClass('active');
		$('#header  .pc-menu h2').removeClass('active');
		$('.pc-menu .depth-02').removeClass('active');
	}
}, '#header .pc-menu')
.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h2').removeClass('active');
			$('#header .site-map .depth-02').stop().slideUp(250);
		} else{
			$('#header .site-map h2').removeClass('active');
			$(this).parent('h2').addClass('active');
			$('#header .site-map .depth-02').stop().slideUp(250);
			$(this).parent('h2').next('.depth-02').stop().slideDown(300);
			
		}
	}
}, '#header .site-map h2.has-depth a')
.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h3').removeClass('active');
			$('#header .site-map .depth-03').stop().slideUp(250);
		} else{
			$('#header .site-map h3').removeClass('active');
			$(this).parent('h3').addClass('active');
			$('#header .site-map .depth-03').stop().slideUp(250);
			$(this).parent('h3').next('.depth-03').stop().slideDown(300);
			
		}
	}
}, '#header .site-map h3.has-depth a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header, #header .site-map').removeClass('active');
	}
}, '#header .site-map .map-close')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header, #header .site-map').addClass('active');
	}
}, '#header .map-open')
.on({
	'mouseenter': function() { 
		$('#search-bx').addClass('active');
	}
}, '#search-bx')
.on({
	'mouseenter': function() { 
		$('#search-bx').removeClass('active');
	}
}, 'main')
.on({
	'focusin': function() { 
		setTimeout(function() {
			$('.site-map').animate({scrollTop: 200}, 200);
		 }, 300);
	}
}, '#search-mobile #search2')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 400);
		$('#header > h1 a').focus();
	}
}, '#btn-top');


$(function() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", vh + "px");
	window.addEventListener("resize", () => {
	console.log("resize");
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", vh + "px");
	});
});

