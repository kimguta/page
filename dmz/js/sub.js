$(function() {

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
	/*
	$('#visual-bx .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		$('#visual-bx .title-bx').fadeOut(300);
	});

	$('#visual-bx .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
		$('#visual-bx .title-bx').fadeIn(300);
	});
	*/

	$('#visual-bx .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('#visual-bx .prev'),
        nextArrow: $('#visual-bx .next'),
        accessibility: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1000,
    });

	$('.vr-navi .slick').slick({
        autoplay: false,
        arrows: false,
        dots: false,
        accessibility: true,
        infinite: false,
		slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
		swipeToSlide: true,
        speed: 300,
		variableWidth: true,
    });
	
});
