
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
		if (ObjDoc.scrollTop() > 10) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	}		
})
.on({
	'resize load': function() { 
		$('#header .depth-02').prev('h2').addClass('has-depth');
		$('#header .depth-03').prev('h3').addClass('has-depth');
		$('#side-menu .depth-03').prev('h3').addClass('has-depth');
		$('#header .depth-02 h3.active').next('.depth-03').show();
		if(ObjWin.width() > 1379){ 
			$('#header, #sub').removeClass('mobile-mode');
			$('#header, #sub').addClass('pc-mode');
		}
		else{
			$('#header, #sub').removeClass('pc-mode');
			$('#header, #sub').addClass('mobile-mode');
		}
	}
})
.on({
	'resize': function() { 
		var Wwidth2 = $(window).outerWidth();
		if (Wwidth2 > 1379 && Wwidth < 1380){
			$('#header h2, #header h3, #header h4').removeClass('active');
			$('.bg_pc').stop().hide();
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
		$('#header .icon').parents('.depth-02').addClass('icon-bx');
		if(ObjWin.width() > 1379){ 
			$('#header h2, #header h3, #header h4').removeClass('active');
		}
	}
});

ObjDoc.on({
	'mouseover focusin': function() { 
		$('#header').addClass('active');
		$('#header h2').removeClass('active');
		$('#header .depth-02').stop().hide();
		$(this).children('h2').addClass('active');
		$(this).children('.depth-02').stop().show();
		var highestBox = $(this).children('.depth-02').height() + 30;
		$('.bg_pc').show().css('height',highestBox);
	}
}, '#header.pc-mode .depth-01 > li')
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
		$(this).toggleClass('active');
	}
}, '#header .lang-bx .ibtn')
.on({
	'focusout': function() { 
		$('#header .lang-bx .ibtn').removeClass('active').focus();
	}
}, '#header .lang-view a:last')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header.mobile-mode h2').removeClass('active');
		$(this).parent('h2').addClass('active');
	}
}, '#header.mobile-mode h2.has-depth a')
.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h3').removeClass('active');
			$(this).parent('h3').next('.depth-03').show().slideUp(300);
		} else{
			$('#header.mobile-mode h3').removeClass('active');
			$(this).parent('h3').addClass('active');
			$('#header.mobile-mode .depth-03').slideUp(300);
			$(this).parent('h3').next('.depth-03').hide().slideDown(300);
			
		}
	}
}, '#header.mobile-mode h3.has-depth a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header.mobile-mode').toggleClass('active');
	}
}, '#header.mobile-mode .mobile-menu')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 400);
		$('#header h1 a').focus();
	}
}, '#btn-top')
.on('click', '.family .open', function(e){
	e.preventDefault();
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');

	} else{
		$('.family .open').removeClass('active');
		$(this).addClass('active');
	}
})
.on({
	'focusout': function() { 
		$(this).parents('.family').find('.open').focus();
	}
}, '.family .view.v1 a:last, .family .view.v2 a:last');


$(function() {
	var currentPosition = parseInt($("#btn-top").css("top"));
	ObjWin.on({
		'scroll': function() { 
			var posY = ObjWin.scrollTop();
			$("#btn-top").stop().animate({"top":posY+currentPosition+"px"},500);
			if ( posY > 100 ){
				$("#btn-top").addClass('active');
			} else if(posY < 100) {
				$("#btn-top").removeClass('active');
			}
		}	
	});



	// let vh = window.innerHeight * 0.01;
	// document.documentElement.style.setProperty("--vh", `${vh}px`);

	// window.addEventListener("resize", () => {
	// console.log("resize");
	// let vh = window.innerHeight * 0.01;
	// document.documentElement.style.setProperty("--vh", `${vh}px`);
	// });
});

