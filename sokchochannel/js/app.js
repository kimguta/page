
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
		target.parent().find('.count').html( '<strong>'+ nowSlide + '</strong>' + '<span>/</span>' + allSlide) ;
		target.find('.slick-slide:not(.slick-active)').attr('tabindex','-1');
		target.find('.slick-active').attr('tabindex','0');
		if($(this).hasClass('video')){ 
			$('iframe').each( function() {
				$(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
			});  
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
		if(ObjWin.width() > 1180){ 
			$('#header, #sub').removeClass('mobile-mode');
			$('#header, #sub').addClass('pc-mode');
		}
		else{
			$('#header, #sub').removeClass('pc-mode');
			$('#header, #sub').addClass('mobile-mode');
		}
		$('#header .depth-03').prev('h3').addClass('has-depth');
	},
	'resize': function() { 
		var Wwidth2 = $(window).outerWidth();
		if (Wwidth2 > 1180){
			$('#header h2, #header h3, #header h4').removeClass('active');
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
		if(ObjWin.width() > 1180){ 
			
			setTimeout(function() {
				$('#header h2, #header h3, #header h4').removeClass('active');
			}, 100);
		}
		else{
			$('#header h2.active').next('.depth-02').show();
			$('#header h3.active').next('.depth-03').show();
		}
		var appSlickOption1 = {
			autoplay: true,
			arrows: false,
			accessibility: false,
			dots:false,
			draggable: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			pauseOnHover: false,
			pauseOnFocus: false,
			vertical: true,
			speed: 250,
			autoplaySpeed: 2000,
		}; 
		initSlick($('#header .button-slick'), appSlickOption1);

		$('#side-menu h3.active').next('.depth-03').show();
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
		$('#header').addClass('active');
		$('#header h2').removeClass('active');
		$('#header .depth-02').stop().show();
		$(this).children('h2').addClass('active');
		// $('.bg_pc').css('height',highestBox + 40).show();
	}
}, '#header.pc-mode .depth-01 > li')
.on({
	'focusout': function() { 
		$('#header').removeClass('active');
		$('#header .inner h2').removeClass('active');
		$('#header .inner .depth-02').stop().css('display','none');
		$('.bg_pc').hide().css('height',0);
	}
}, '#header.pc-mode .depth-01 a:last')
.on({
	'mouseleave': function() { 
		$('#header').removeClass('active');
		$('#header h2').removeClass('active');
		$('#header .depth-02').stop().css('display','none');
		$('.bg_pc').hide().css('height',0);
	}
}, '#header.pc-mode')
.on({
	'click': function(e) { 
		e.preventDefault();	
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h3').removeClass('active');
			$(this).parent('h3').next('.depth-03').stop().slideUp(250,
				function(){
					callBackBg();
				}
			);
		} else{
			$('#header h3.has-depth').removeClass('active');
			$(this).parent('h3').addClass('active');
			$('#header .depth-03').stop().slideUp(250,
				function(){
					callBackBg();
				}
			);
			$(this).parent('h3').next('.depth-03').slideDown(250, 
				function(){
					callBackBg();
				}
			);	


		}
	}
}, '#header h3.has-depth a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header .nav-bx').addClass('active');
		$('#header.mobile-mode').addClass('active');
	}
}, '#header .mobile-menu')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header .nav-bx').removeClass('active');
		$('#header.mobile-mode').removeClass('active');
	}
}, '#header .mobile-close')
// .on({
// 	'click': function(e) { 
// 		e.preventDefault();
// 		if ($(this).parent().hasClass('active')) {
// 			$(this).parent('h2').removeClass('active');
// 			$(this).parent('h2').next('.depth-02').stop().slideUp(350);
// 		} else{
// 			$('#header.mobile-mode h2').removeClass('active');
// 			$(this).parent('h2').addClass('active');
// 			$('#header.mobile-mode .depth-02').stop().slideUp(300);
// 			$(this).parent('h2').next('.depth-02').stop().slideDown(350);
			
// 		}
// 	}
// }, '#header.mobile-mode h2 a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('html, body').delay(100).animate({scrollTop: 0}, 350);
		$('#header h1 a').focus();
	}
}, '#btn-top')
.on({
	'focusout': function() { 
		$(this).parent('.view-bx').prev('.view-btn').focus();
	}
}, '.view-bx a:last-child')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header .modal-search').show();
		$('#header .modal-search .bx').attr('tabindex','-1').focus();
	}
}, '#header .search-bx button')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header .modal-search').hide();
		$('#header .modal-search .bx').removeAttr('tabindex');
		$('#header .search-bx button').focus();
	}
}, '#header .modal-search .close');

function searchPlace(obj){
	$(document).on('keyup', obj, function(){
		$(this).addClass('active');
		if($.trim($(this).val())==''){
			$(this).removeClass('active');
		}
	});
}

function callBackBg(){
    var highestBox = 0;
	$('#header .depth-02').each(function(){
		if($(this).height() > highestBox){
			highestBox = $(this).height();
		}
	});
	$('.bg_pc').css('height',highestBox + 40).show();
}

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

