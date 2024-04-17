
// slick 함수
function initSlick(target, options) {
	var ControlBtn = target.parent().find('.control .ps-btn');
	var PlayBtn  = target.parent().find('.control .play');
	var PauseBtn  = target.parent().find('.control .pause');
	target.on('init reInit beforeChange', function (event, slick, currentSlide, nextSlide) {
		// 슬라이드 체인지 전
		if($(this).hasClass('visual')){ 
			$('.time-bar').removeClass('active');
		}


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
		target.parent().find('.count').html( '<strong>'+ nowSlide + '</strong>' + '<span>/</span>' + allSlide) ;
		target.find('.slick-slide:not(.slick-active)').attr('tabindex','-1');
		target.find('.slick-active').attr('tabindex','0');
		if($(this).hasClass('visual')){ 
			target.find('.slick-slide').removeClass('zoom');
			target.find('.slick-current').addClass('zoom');
			$('.time-bar').addClass('active');
		}
		if($(this).hasClass('zoom')){ 
			$('.slick-slide').removeClass('active prev next');
			$('.slick-center').prev('div').addClass('active prev');
			$('.slick-center').next('div').addClass('active next');
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
	},
	'resize load': function() { 
		if(ObjWin.width() > 1439){ 
			$('#header, #sub').removeClass('mobile-mode');
			$('#header, #sub').addClass('pc-mode');
		}
		else{
			$('#header, #sub').removeClass('pc-mode');
			$('#header, #sub').addClass('mobile-mode');
		}
		$('#header .depth-03').prev('.tlv-03').addClass('has-depth');
	},
	'resize': function() { 
		var Wwidth2 = $(window).outerWidth();
		if (Wwidth2 > 1439){
			$('#header .tlv-02, #header .tlv-03, #header .tlv-04').removeClass('active');
			$('#header .depth-02').stop().hide();
		}
	},
	'load': function() { 
		$('a[role="button"]').on('keypress', function (key) {
			if (key.keyCode == 32) {
				$(this).trigger('click');
				return false;
			}
		});
		if(ObjWin.width() > 1439){ 
			
			setTimeout(function() {
				$('#header .tlv-02, #header .tlv-03, #header .tlv-04').removeClass('active');
			}, 100);
		}else{
			$('#header .tlv-02.active').next('.depth-02').show();
			$('#header .tlv-03.active').next('.depth-03').show();
		}
		// var appSlickOption1 = {
		// 	autoplay: true,
		// 	arrows: false,
		// 	accessibility: false,
		// 	dots:false,
		// 	draggable: false,
		// 	infinite: true,
		// 	slidesToShow: 1,
		// 	slidesToScroll: 1,
		// 	pauseOnHover: false,
		// 	pauseOnFocus: false,
		// 	vertical: true,
		// 	speed: 250,
		// 	autoplaySpeed: 2000,
		// }; 
		// initSlick($('#header .button-slick'), appSlickOption1);
	}
});

ObjDoc.on({
	'mouseover focusin': function() { 
		var highestBox = 0;
		$('#header .depth-02').each(function(){
			if($(this).height() > highestBox){
				highestBox = $(this).height();
			}
		});
		$('#header .depth-02').css('height',355);
		$('#header').addClass('active');
		$('#header .tlv-02').removeClass('active');
		$('#header .depth-02').stop().show();
		$(this).children('.tlv-02').addClass('active');
		$('.bg_pc').css('height',highestBox + 45).show();
		$('#header .header-search-bx').removeClass('active');
		$('#header .header-search-bx .search-form').removeAttr('tabindex');
	}
}, '#header.pc-mode .depth-01 > li')
.on({
	'focusout': function() { 
		$('#header').removeClass('active');
		$('#header .tlv-02').removeClass('active');
		$('#header .depth-02').stop().css('display','none');
		$('.bg_pc').hide().css('height',0);
	}
}, '#header.pc-mode .depth-01 a:last')
.on({
	'mouseleave': function() { 
		$('#header').removeClass('active');
		$('#header .tlv-02').removeClass('active');
		$('#header .depth-02').stop().css('display','none');
		$('.bg_pc').hide().css('height',0);
	}
}, '#header.pc-mode .nav-wrap')
// .on({
// 	'click': function(e) { 
// 		e.preventDefault();
// 		$('#header .nav-bx').addClass('active');
// 		$('#header.mobile-mode').addClass('active');
// 	}
// }, '#header .mobile-menu')
// .on({
// 	'click': function(e) { 
// 		e.preventDefault();
// 		$('#header .nav-bx').removeClass('active');
// 		$('#header.mobile-mode').removeClass('active');
// 	}
// }, '#header .mobile-close')
// .on({
// 	'click': function(e) { 
// 		e.preventDefault();
// 		if ($(this).parent().hasClass('active')) {
// 			$(this).parent('.tlv-02').removeClass('active');
// 			$(this).parent('.tlv-02').next('.depth-02').stop().slideUp(350);
// 		} else{
// 			$('#header.mobile-mode .tlv-02').removeClass('active');
// 			$(this).parent('.tlv-02').addClass('active');
// 			$('#header.mobile-mode .depth-02').stop().slideUp(300);
// 			$(this).parent('.tlv-02').next('.depth-02').stop().slideDown(350);
			
// 		}
// 	}
// }, '#header.mobile-mode .tlv-02 a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('html, body').delay(100).animate({scrollTop: 0}, 350);
		$('#header h1 a').focus();
	}
}, '#btn-top')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header').addClass('active');
		$('#header .header-search-bx').addClass('active');
		$('#header .header-search-bx .search-form').attr('tabindex','-1').focus();
	}
}, '#header .search-open')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header').removeClass('active');
		$('#header .inner .depth-02').stop().css('display','none');
		$('.bg_pc').hide().css('height',0);
		$('#header .header-search-bx').removeClass('active');
		$('#header .header-search-bx .search-form').removeAttr('tabindex');
		$('#header .search-open').focus();
	}
}, '#header .header-search-bx .close')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('.nav-wrap').addClass('view-mode');
		$('#header h1 a').focus();
		$('#header').removeClass('active');
		$('#header .header-search-bx').removeClass('active');
		$('#header .header-search-bx .search-form').removeAttr('tabindex');
	}
}, '#header .sitemap')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('.nav-wrap').removeClass('view-mode');
		$('.bg_pc').hide().css('height',0);
		$('#header .sitemap').focus();
	}
}, '.nav-wrap .close')
.on({
	'mouseover focusin': function() { 
		$('#header').removeClass('active');
	}
}, '#header.pc-mode .nav-wrap.view-mode .depth-01 > li');

function searchPlace(obj){
	$(document).on('keyup', obj, function(){
		$(this).addClass('active');
		if($.trim($(this).val())==''){
			$(this).removeClass('active');
		}
	});
}

// function callBackBg(){
//     var highestBox = 0;
// 	$('#header .depth-02').each(function(){
// 		if($(this).height() > highestBox){
// 			highestBox = $(this).height();
// 		}
// 	});
// 	$('.bg_pc').css('height',highestBox).show();
// }

function toggleBox(Btn, Box){
    $(document).on('click', Btn, function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).parent('.view-wrap').find(Box).slideToggle(300);
	});
}

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

	let vh = window.innerHeight;
    document.documentElement.style.setProperty("--vh", vh + "px");
    window.addEventListener("resize", () => {
		console.log("resize");
		let vh = window.innerHeight;
		document.documentElement.style.setProperty("--vh", vh + "px");
    });

	toggleBox('.view-btn', '.view-bx');
	searchPlace('#search-main');
	searchPlace('#search-header');
});

