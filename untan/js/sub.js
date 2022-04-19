$(function() {

	AOS.init({
        easing: 'ease',
        duration: 900,
        delay: 300,
        once: true,
        offset: 50,   
    });

	$('.course-all .tab a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).index();
		$('.course-all .tab a').removeClass('active');
		$(this).addClass('active');
		$('.course-all .img-bx img').removeClass('active');
		$('.course-all .img-bx img').eq(idx).addClass('active');
		$('.course-all .slick').slick('slickGoTo', idx);
	});

	$('.course-all .slick').on('afterChange', function(event, slick, currentSlide, nextSlide) {
		$('.course-all .img-bx img, .course-all .tab a').removeClass('active');
		$('.course-all .img-bx img').eq(currentSlide).addClass('active');
		$('.course-all .tab a').eq(currentSlide).addClass('active');
	});


	$('.course-all .slick').slick({
        autoplay: false,
        arrows: false,
        dots: false,
        accessibility: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
		variableWidth: true,
        speed: 700,
		swipeToSlide: true,
    });



	var navOffset1 = $('.course-conts .visual').offset();
	var navOffset2 = $('.course-conts .info-bx').offset();
	$(window).on('scroll', function () {
		if ($(document).scrollTop() > navOffset1.top) {
			$('.course-conts .visual').addClass('fixed');
		} else {
			$('.course-conts .visual').removeClass('fixed');
		}
		if ($(document).scrollTop() > navOffset2.top - 200) {
			$('.course-conts .height').addClass('active');
		}else {
			$('.course-conts .height').removeClass('active');
		}
	});

	$('.course-conts .view-bx .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('.course-conts .view-bx .title').fadeOut(50);
    });

    $('.course-conts .view-bx .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		$('.course-conts .view-bx .slick-slide').removeClass('active');
		$('.course-conts .view-bx .slick-current').addClass('active');
		$('.course-conts .view-bx .title').fadeIn(300);
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.course-conts .view-bx .count').html( '<em>'+i+'</em>' + '<span></span>' + slick.slideCount);
    });

	$('.course-conts .view-bx .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('.course-conts .view-bx  .prev'),
        nextArrow: $('.course-conts .view-bx  .next'),
        accessibility: true,
        infinite: true,
		slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        pauseOnHover: false,
        speed: 700,
    });

	

});
