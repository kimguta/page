$(function() {

    $('#breadcrumb .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next('ul').slideUp(200);
			$(this).children('span').text('열기');
		} else{
			$('#breadcrumb .open').removeClass('active');
			$('#breadcrumb .box ul').slideUp(200);
			$(this).addClass('active');
			$(this).next('ul').slideDown(200);
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
		}
	});

	$('#breadcrumb .box ul li:last-child a').on('focusout', function () {
		$(this).parents('.box').children('.open').focus();
	});
	

	 $('#content .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next().fadeToggle(100);
	});

	$('#content .share ul a:last').on('focusout', function () {
		$('#content .share .open').focus();
	});


	$('.smart_db .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.smart_db .count').html('<em>' + i + '</em> <span>/ </span> <em class="sm">' + slick.slideCount + '</em>');
    });

    $('.smart_db .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('.smart_db .prev'),
        nextArrow: $('.smart_db .next'),
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1200
    });

});
