
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

		if($(this).hasClass('visual')){ 
			
		}
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
		var HandOff = $('#store').offset().top + $('#store').height();
		var PosT = ObjWin.scrollTop();
		var WH = ObjWin.height();
		var HanOn = PosT + WH
		if (HanOn > HandOff) {
			$('#store').addClass('active');
		}
	}
});

$(document).ready(function(){
	appScript();
});

//콘텐츠 스크립트 (dom ready 후 동작)
function appScript(){
	if(ObjWin.width() > 1399){ 
		$('#header h2, #header h3, #header h4').removeClass('active');
	}
	$('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});

	setTimeout(function() {
		$('.depth-03').prev('h3').addClass('has-depth');
		var slickfooter = {
			autoplay: true,
			arrows: true,
			accessibility: false,
			dots:false,
			draggable: true,
			prevArrow: $('footer .prev'),
			nextArrow: $('footer .next'),
			infinite: true,
			swipeToSlide: true,
			slidesToShow: 6,
			pauseOnHover: false,
			variableWidth: true,
			speed: 250,
			autoplaySpeed: 5000,
		};
		initSlick($('footer .slick'), slickfooter);
		var navDom = $('#header nav').html();
		$('#header').append(
			`<div class="sitemap-bx">
				<div>`+ navDom +` </div>
				<a href="#" class="close"><img src="/page/gwcpn/images/common/btn-close-sitemap.png" alt="사이트맵 닫기"></a>
			</div>`
		);
		$('.sitemap-bx .depth-02').attr('style','display:block');
	}, 100);
};



ObjDoc.on({
	'mouseover focusin': function() { 
		$('#header').addClass('active');
		$('#header nav h2, #header nav h3').removeClass('active');
		$('#header nav .depth-02').stop().hide();
		$(this).addClass('active');
		$(this).next('.depth-02').show();
	}
}, '#header nav h2')
.on({
	'mouseover focusin': function() { 
		$('#header nav h3').removeClass('active');
		$(this).addClass('active');
	}
}, '#header nav h3')
.on({
	'focusout': function() { 
		$('#header').removeClass('active');
		$('#header nav h2').removeClass('active');
		$('#header nav .depth-02').hide();
	}
}, '#header nav .depth-01 a:last')
.on({
	'mouseleave': function() { 
		$('#header').removeClass('active');
		$('#header nav h2, #header nav h3').removeClass('active');
		$('#header nav .depth-02').hide();
	}
}, '#header')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header .sitemap-bx').addClass('active');
		$('#header .sitemap-bx a:first').focus();
	}
}, '#header .sitemap')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header .sitemap-bx').removeClass('active');
		$('#header .sitemap').focus();
	}
}, '.sitemap-bx .close')
.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h3').removeClass('active');
			$(this).parent('h3').next('.depth-03').stop().slideUp(200);
		} else{
			$('#header .sitemap-bx h3').removeClass('active');
			$(this).parent('h3').addClass('active');
			$('#header .sitemap-bx .depth-03').stop().slideUp(300);
			$(this).parent('h3').next('.depth-03').stop().slideDown(200);
			
		}
	}
}, '#header .sitemap-bx h3.has-depth a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('html, body').delay(100).animate({scrollTop: 0}, 350);
		$('#header h1 a').focus();
	}
}, '#btn-top');

$(function() {

	var currentPosition = parseInt($("#btn-top").css("top"));
	ObjWin.on({
		'scroll': function() { 
			var posY = ObjWin.scrollTop();
			$("#btn-top").stop().css("top",posY+currentPosition);
			if ( posY > 100 ){
				$("#btn-top").addClass('active');
			} else if(posY < 100) {
				$("#btn-top").removeClass('active');
			}
		}	
	});

	let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
    window.addEventListener("resize", () => {
		console.log("resize");
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", vh + "px");
    });

});

