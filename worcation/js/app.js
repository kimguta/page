
// slick 함수
function initSlick(target, options) {
	var ControlBtn = target.parent().find('.control .ps-btn');
	var PlayBtn  = target.parent().find('.control .play');
	var PauseBtn  = target.parent().find('.control .pause');
	target.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		// 슬라이드 체인지 전

	});
	target.on('init afterChange', function (event, slick, currentSlide, nextSlide) {
	// 슬라이드 체인지 후
		// if ($(this).hasClass('map')) {
			
		// }
		var nowSlide = (currentSlide ? currentSlide : 0) + 1;
		var allSlide = slick.slideCount
		if(nowSlide < 10){ 
			var nowSlide = '0' + nowSlide
		}
		if(allSlide < 10){ 
			var allSlide = '0' + allSlide
		}
		target.parent().find('.count').html( '<strong>'+ nowSlide + '</strong>' + '<span>/</span>' +  allSlide);
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
		if(ObjWin.width() > 1599){ 
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
		if ($(window).outerWidth() > 1599){
			$('#header h3').removeClass('active');
		}
	}
})
.on({	
	'load': function() { 
		$('a[role="button"]').on('keypress', function (key) {
			if (key.keyCode == 32) {
				$(this).trigger('click');
				return false;
			}
		});
		 $('#header .depth-02').prev('h2').addClass('has-depth');
		 if ($(window).outerWidth() > 1599){
			$('#header h3').removeClass('active');
		}
	}
});

ObjDoc.on({
	'mouseover focusin': function() { 
		$('#header h2').removeClass('active');
		$(this).addClass('active');
	}
}, '#header h2')
.on({
	'focusout': function() { 
		$('#heade h2').removeClass('active');
	}
}, '#header .pc-menu .depth-01 a:last')
.on({
	'mouseleave': function() { 
		$('#header h2').removeClass('active');
	}
}, '#header')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header').toggleClass('active');
	}
}, '#header .open')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 400);
		$('#header > h1 a').focus();
	}
}, '#btn-top')
.on({
	'click': function(e) { 
		e.preventDefault();
		$(this).toggleClass('active');
	}
}, '.family-bx button');


$(function() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", vh + "px");
	window.addEventListener("resize", () => {
	console.log("resize");
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", vh + "px");
	});
});

