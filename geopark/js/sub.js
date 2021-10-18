$(function() {

	 $('#visual-bx .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next('.view').fadeToggle(100);
	});

	$('#visual-bx .share .close').on('click', function (e) {
		e.preventDefault();
	   $(this).parents('.view').fadeToggle(100);
   });

	$('#content .share .view a:last').on('focusout', function () {
		$('#content .share .open').focus();
		$('.view').fadeOut(100);
	});

	$('#breadcrumb .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).children('span').text('열기');
			$('#breadcrumb .box ul').slideUp(300);
		} else{
			$('#breadcrumb .open').removeClass('active');
			$(this).addClass('active');
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
			$('#breadcrumb .box ul').slideUp(300);
			$(this).next('ul').slideDown(300);
		}
	});

	$('#breadcrumb').on('mouseleave', function (e) {
		e.preventDefault();
		$('#breadcrumb .open span').text('열기');
		$('#breadcrumb .box ul').slideUp(300);
		$('#breadcrumb .box .open').removeClass('active');
	});

	$('#breadcrumb .box ul li:last-child a').on('focusout', function () {
		$(this).parents('.box').children('.open').focus();
	});

	$('.delicious .tab a').on('click', function (e) {
		e.preventDefault();
		$('.delicious .tab a').removeClass('active');
		$(this).addClass('active');

		var idx = $(this).index();
		$('.delicious .view-bx > div').hide();
		$('.delicious .view-bx > div').eq(idx).show();
   });

   $('.vr360 .slick-01').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
	}); 

	$('.vr360 .slick-01').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {

	});

	$('.vr360 .slick-01').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		accessibility: true,
		prevArrow: $('.vr360 .control .prev'),
		nextArrow: $('.vr360 .control .next'),
		infinite: false,
		slidesToShow: 4,
  		slidesToScroll: 1,
		pauseOnHover: false,
		swipeToSlide: true,
		vertical: true,
		verticalSwiping: true,
		speed: 800,
	});


	$('.vr360 .view-slide .slick').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		accessibility: true,
		slidesToShow: 1,
  		slidesToScroll: 1,
		pauseOnHover: false,
		adaptiveHeight: true,
		speed: 800,
	});


	$('.vr360 .slick-01 .slide').on('click', function (e) {
		e.preventDefault();
		if ($(window).width() < 1400) {
			var gap = 50
		} else {
			var gap = 60
		}
		var Offset = $('.vr360').offset();
		var idx = $(this).index();
		$('html, body').animate({scrollTop: Offset.top - gap}, 200);
		$('.vr360 .view-slide').show();
		$('.vr360 .view-slide .item').eq(idx).show();
		$('.vr360 .view-slide .slick').slick('refresh');
   });

   $('.vr360 .view-slide .close').on('click', function (e) {
		e.preventDefault();
		$('.vr360 .view-slide, .vr360 .view-slide .item').hide();
		
	});

	$('.vr360 .slick-01 .img-bx').on('wheel', function (e) {
		e.preventDefault();
		if (e.originalEvent.deltaY < 0) {
			$('.vr360 .slick-01').slick('slickPrev');
		} else {
			$('.vr360 .slick-01').slick('slickNext');
		}
	});


	$('.vr360 .map-wrap .btn-bx a').on('click', function (e) {
		e.preventDefault();
		if ($(window).width() < 1400) {
			var gap = 50
		} else {
			var gap = 60
		}
		var Offset = $('.vr360').offset();
		var idx2 = $(this).index();
		$('html, body').animate({scrollTop: Offset.top - gap}, 200);
		$('.vr360 .view-video').show();
		$('.vr360 .view-video .item').eq(idx2).show();
   });

   $('.vr360 .view-video .close').on('click', function (e) {
		e.preventDefault();
		$('.vr360 .view-video, .vr360 .view-video .item').hide();
		$('iframe').each( function() {
            $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        });
	})
	
});
