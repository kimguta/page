
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
		if (ObjDoc.scrollTop() > 94) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	}
})
.on({
	'resize load': function() {
		$('#header .depth-02').prev('h2').addClass('has-depth');
		if(ObjWin.width() > 1399){
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
	'load': function() {
		$('#header .depth-01').append('<span class="bg_pc"></span>');
		$('a[role="button"]').on('keypress', function (key) {
			if (key.keyCode == 32) {
				$(this).trigger('click');
				return false
			}
		});
		var highestBox = 0;
			$('#header .depth-02').each(function(){
				if($(this).height() > highestBox){
				highestBox = $(this).height() + 40;
			}
		});
		$('.bg_pc').css('height',highestBox);
	}
});
var ObjGnb = $(document);
ObjGnb.init(function(){
	$('#header .depth_03').prev('h3').addClass('has_depth');
	$('#header .depth_02').prev('h2').addClass('has_depth');
	$('#header').after('<span id="mask"></span>');
})

ObjDoc.on({
	'click': function() {
		$('#header.mobile-mode .site_map .depth-01 h2').removeClass('active');
		$(this).parent().addClass('active');
	}
}, '#header.mobile-mode .site_map .depth-01 h2 a')
.on({
	'click': function() {
		$('#header.mobile-mode .site_map .depth-01 h2').removeClass('active');
		$(this).parent().addClass('active');
	}
}, '#header.mobile-mode .site_map .depth-01 h2 a')
.on({
	'click': function() {
		var idx = $('#header.type_sub nav .depth-01 li h2 a').index(this);
		$('#header.type_sub nav .depth-01 li h2').removeClass('active');
		$(this).parent().addClass('active');
		$('#sub-visual').removeClass();
		$('#sub-visual').addClass('type_0'+(idx+1));
	}
}, '#header.type_sub nav .depth-01 li h2 a')
.on({
	'click': function(e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h2').removeClass('active');
			$('.depth-02').stop().slideUp(250);
		} else{
			$('#header h2').removeClass('active');
			$(this).parent('h2').addClass('active');
			$('.depth-02').stop().slideUp(250);
			$(this).parent('h2').next('.depth-02').stop().slideDown(300);
		}
	}
}, '#header.mobile-mode nav h2.has-depth a')

.on({
	'click': function(e) {
		e.preventDefault();
		$('#mask').addClass('active');
		$('#header .site_map').addClass('active');
	}
}, '#header .btn-bx .sitemap')
.on({
	'click': function(e) {
		e.preventDefault();
		$('#mask').removeClass('active');
		$('#header .site_map').removeClass('active');
	}
}, '#header .site_map .close_btn')
.on({
	'click': function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 400);
	}
}, '#btn-top')
.on('click', '.family .open', function(e){
	e.preventDefault();
	$(this).toggleClass('active');
});

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
			}
		}
	});
});