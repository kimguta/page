
// slick 함수
function initSlick(target, options) {
	var ControlBtn = target.parent().find('.control .ps-btn');
	var PlayBtn  = target.parent().find('.control .play');
	var PauseBtn  = target.parent().find('.control .pause');
	var slickDots  = target.parent().find('.control .dots');
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
			slickDots.addClass('stop');
	    } else if ($(this).hasClass('play')) {
	        $(this).hide();
	        PauseBtn.css('display','inline-block');
	        target.slick('slickPlay');
			slickDots.removeClass('stop');
	    }
	});
};
$(function() {
	$('#footer .relevant_banner .slick').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: '<a href="#" class="prev">이전</a>',
		nextArrow: '<a href="#" class="next">다음</a>',
		accessibility: true,
		swipeToSlide: true,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		pauseOnHover: false,
		variableWidth: true,
		speed: 600,
	});
});

var ObjWin = $(window);
var ObjDoc = $(document);
var Wwidth = ObjWin.outerWidth();
// $(window).resize(function(){document.location.reload();})
ObjWin.on({
	'resize load': function() {
		$('#header .depth-02').prev('h2').addClass('has-depth');
		if(ObjWin.width() > 1400){
			$('#header').removeClass('mobile-mode');
			$('#header').addClass('pc-mode');
		}
		else{
			$('#header').removeClass('pc-mode');
			$('#header').addClass('mobile-mode');
			$('.mobile-mode .active + .depth-02').show();
		}
	}
})
.on({
	'resize': function() {
		var Wwidth2 = $(window).outerWidth();
		if (Wwidth2 > 1399 && Wwidth < 1400){
			$('#header h2').removeClass('active');
			$('.depth-02, .bg_pc').stop().hide();
		}
	}
})
.on({
	'scroll load': function() {
		if (ObjDoc.scrollTop() > 80) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	}
})
.on({
	'load': function() {
		$('.mobile-mode .site_map .depth-02 h3').removeClass('has-depth');
		$('.mobile-mode .site_map .depth-03').has('li').prev('h3').addClass('has-depth');
	}
})

// .on({
// 	'resize': function() {
// 		var divEl = $("#header nav > .depth-01");
// 		var divY = divEl.outerWidth();
// 		$('#header nav > .depth-01 .depth-02').css({'padding-left': (1200 - divY) / 2 - 11 + 'px'});

// 	}
// });

ObjDoc.on({
	'mouseover focusin': function() {
		var offset = $(this).position().left + ($(this).width() / 2 - 0);
		// $('body').css('overflow','hidden');
		$('#header').addClass('active');
		$('#header h2').removeClass('active');
		$(this).children('h2').addClass('active');
		$('#header .bg_pc').addClass('active');
		$('#header .cycle').stop().animate({'left':offset}, 600,'easeOutCubic');
	}
}, '#header.pc-mode nav > .depth-01 li')
.on({
	'mouseleave': function() {
		$('body').css('overflow','');
		$('#header').removeClass('active');
		$('#header h2').removeClass('active');
	}
}, '#header.pc-mode nav > ul')
.on({
	'click': function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#header').addClass('active');
		$('#header .site_map').addClass('active');
		$('#header .site_map a:first').focus();
		$('body').css('overflow','hidden');
		// if(ObjWin.width() < 1199){
		// 	$('body').css('overflow','hidden');
		// }
	}
}, '#header .sitemap')
.on({
	'click': function() {
		$('body').css('overflow','');
		$('#header').removeClass('active');
		$('#header h2').removeClass('active');
	}
}, '#header.pc-mode.active nav a')
.on({
	'click': function(e) {
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$('#header h4').removeClass('active');

		} else{
			$('#header h3').removeClass('active');
			$(this).parent().addClass('active');
		}
	}
}, '#header nav > .depth-01 h3 a')
.on({
	'click': function(e) {
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h4').removeClass('active');

		} else{
			$('#header h4').removeClass('active');
			$(this).parent('h4').addClass('active');
		}
	}
}, '#header nav > .depth-01 h4 a')
// .on({
// 	'click': function(e) {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		if ($(this).parent().hasClass('has-depth')) {
// 			$(this).parent().addClass('active');
// 		} else{
// 			$('body').css('overflow','visible');
// 			$('#header').removeClass('active');
// 			$('#header .site_map').removeClass('active');
// 		}
// 	}
// }, '#header.mobile-mode .site_map a')
// .on({
// 	'click': function(e) {
// 		e.preventDefault();
// 		$('#header .site_map h2').removeClass('active');
// 		$('#header .site_map h3').removeClass('active');
// 		$('#header .site_map h4').removeClass('active');
// 		$(this).parent().addClass('active');
// 	}
// }, '.site_map .depth-01 a')
.on({
	'click': function(e) {
		e.preventDefault();
		e.stopPropagation();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');

		} else{
			$(this).parent().addClass('active');
		}
	}
}, '.site_map .depth-02 h3.has-depth a')
// .on({
// 	'click': function(e) {
// 		e.preventDefault();
// 		$('#header .site_map h2').removeClass('active');
// 		$('#header .site_map h3').removeClass('active');
// 		$('#header .site_map h4').removeClass('active');
// 		$(this).parent().addClass('active');
// 	}
// }, '#header .site_map .depth-02 h3 a')
// .on({
// 	'click': function(e) {
// 		e.preventDefault();
// 		$('#header .site_map h2').removeClass('active');
// 		$('#header .site_map h3').removeClass('active');
// 		$('#header .site_map h4').removeClass('active');
// 		$(this).parent().addClass('active');
// 	}
// }, '#header .site_map .depth-03 h4 a')
.on({
	'click': function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('body').css('overflow','visible');
		$('#header').removeClass('active');
		$('#header .site_map').removeClass('active');
		$('#header .sitemap').focus();
	}
}, '#header .site_map .close_btn')
.on({
	'click': function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 400);
	}
}, '#btn-top')

$(function() {
	var currentPosition = parseInt($("#btn-side").css("top"));
	ObjWin.on({
		'scroll': function() {
			var posY = ObjWin.scrollTop();
			$("#btn-side").stop().animate({"top":posY+currentPosition+"px"},500);
			if ( posY > 100 ){
				$("#btn-top").addClass('active');
			} else if(posY < 100) {
				$("#btn-top").removeClass('active');
			};
		}
	})

	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);

	window.addEventListener("resize", () => {
	console.log("resize");
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
	});

});
