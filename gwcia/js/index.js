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
    setTimeout(function() {
        AOS.init({
            easing: 'ease',
            duration: 700,
            delay: 350,
            once: true,
            offset: 50,

        });
     }, 200);

	$('#visual .text-bx > div').eq(0).show().find('h2').addClass('active');
	$('#visual .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('#visual .slick .slide').removeClass('slick-zoom');
		$('#visual .slick .slick-current').removeClass('loading');
		$('#visual .text-bx > div').fadeOut(300);
	});

	$('#visual .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;
		$('#visual .count').html( i + '<span> / </span>' + slick.slideCount);
		$('#visual .slick .slick-current').addClass('slick-zoom');
		$('#visual .slick-dots .slick-active').addClass('loading');
		$('#visual .text-bx > div').eq(currentSlide).fadeIn(300);
		$('#visual .text-bx > div').eq(currentSlide).find('h2').addClass('active');
	});


	$('#visual .slick').slick({
		autoplay: true,
        arrows: true,
        dots: true,
        appendDots: $('#visual .dots'),
        customPaging: function(slick,index) {
            return '<a href="#" onclick="return false;" role="button" class="v' + (index + 1) + '"><em></em><span></span></a>';
        },
		prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        accessibility: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 500,
        autoplaySpeed: 15000
	});
	$('#visual .control .bttn').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('pause')) {
			$(this).hide();
			$('#visual .control .play').css('display','inline-block');
			$('#visual .dots').addClass('stop');
			$('#visual .slick').slick('slickPause');

		} else if ($(this).hasClass('play')) {
			$(this).hide();
			$('#visual .control .pause').css('display','inline-block');
			$('#visual .dots').removeClass('stop');
			$('#visual .slick').slick('slickPlay');
		}
	});
});


var ObjWin = $(window);
var ObjDoc = $(document);
var Wwidth = ObjWin.outerWidth();

ObjDoc.on({
	' click': function(e) {
		e.preventDefault();
		$(this).parent().parent().find('.box_item').removeClass('active');
		$(this).addClass('active');
	}
}, '#visual .shortcuts_box .box_item')
.on('click', '.family .open', function(e){
	e.preventDefault();
	$(this).toggleClass('active');
})
.on({
	'mouseover focusin click': function(e) {
        e.preventDefault();
        $(this).parent().parent().find('li').removeClass('active');
		$(this).parent().addClass('active');
	}
}, '#incentive_wrap .incentive_list .list_item')
.on({
	'click': function(e) {
		e.preventDefault();
		$(this).parent().find('a').removeClass('active');
        $(this).addClass('active');
	}
}, '#target_area .map_point a')

