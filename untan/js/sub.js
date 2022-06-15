$(function() {

	AOS.init({
        easing: 'ease',
        duration: 700,
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


	$('.course-conts .view-bx .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
		prevArrow: '<a class="slick-prev" role="button" href="#"><img src="/page/untan/images/sub/arrow_w02.png" alt="이전"></a>',
        nextArrow: '<a class="slick-next" role="button" href="#"><img src="/page/untan/images/sub/arrow_w.png" alt="다음"></a>',
        accessibility: true,
        infinite: true,
		slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
		swipeToSlide: true,
        speed: 700,
		responsive: [{
            breakpoint: 1399,
            settings: {
                variableWidth: true
            }
        }]
    });


	$('.course-conts .tour-bx .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
		prevArrow: '<a class="slick-prev" role="button" href="#"><img src="/page/untan/images/sub/arrow02.png" alt="이전"></a>',
        nextArrow: '<a class="slick-next" role="button" href="#"><img src="/page/untan/images/sub/arrow.png" alt="다음"></a>',
        accessibility: true,
        infinite: true,
		slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: false,
		swipeToSlide: true,
        speed: 700,
		responsive: [{
            breakpoint: 1399,
            settings: {
                variableWidth: true
            }
        }]
    });

	$('.untan-qna .qa-bx a').on('click', function (e) {
		e.preventDefault();	
		if ($(this).hasClass('active')) {

            $(this).removeClass('active');
        }
		else{
			$('.untan-qna .qa-bx a').removeClass('active');
			$(this).addClass('active');
		}
	});	

});
