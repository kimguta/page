$(function() {

    //인트로
    $('.intro .btn-bx a').on('click', function(e){
		e.preventDefault();
		$('.intro').addClass('remove');
		$('#visual').addClass('active');
	});

	$('.intro .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('.illu').removeClass('active');
	});
	$('.intro .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		$('.slick-current .illu').addClass('active');
		if(currentSlide == 1){
			$('.intro .slick').slick('slickPause');
			setTimeout(function(){
				$('.intro').addClass('remove');
				$('#visual').addClass('active');
			}, 5000);
		}
	});
	$('.intro .slick').slick({
		autoplay: true,
        arrows: false,
        accessibility: false,
        dots: false,
        draggable: true,
        infinite: false,
		fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 2000,
        autoplaySpeed: 5000,
	});


	$('#promise .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		$('#promise .count').html((currentSlide ? currentSlide : 0) + 1 + '<span> - </span>' + '<em>'+ slick.slideCount + '<em>');
	});
	$('#promise .slick').slick({
		autoplay: false,
        arrows: true,
        accessibility: false,
		prevArrow: $('#promise .prev'),
        nextArrow: $('#promise .next'),
		swipeToSlide: true, 
        dots: false,
        draggable: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 500,
	});

});
