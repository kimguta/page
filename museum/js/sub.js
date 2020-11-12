$(function() {
    $('#content .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next().fadeToggle(100);
	});

	$('#content .share ul a:last').on('focusout', function () {
		$('#content .share .open').focus();
	});

	$('.calendar01 td.possible > a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parents('tr').next('.schedule').fadeOut(300);
		} else{
			$('.calendar01 td').removeClass('active');
			$(this).parent().addClass('active');
			$('.calendar01 .schedule').fadeOut(300);
			$(this).parents('tr').next('.schedule').fadeIn(300);
		}
	});

	$('.event .slick_wrap .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        accessibility: true,
        prevArrow: $('.event .slick_wrap .prev'),
        nextArrow: $('.event .slick_wrap .next'),
        draggable: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
		swipeToSlide: true,
        pauseOnHover: false,
        speed: 1000,
        responsive: [{
            breakpoint: 761,
            settings: {
                slidesToScroll: 1,
                variableWidth: true
            }
        },
         {  
            breakpoint: 992,
            settings: {
                slidesToShow: 3
            }
        }]
    });

    $('.event .slick_wrap02 .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.event .slick_wrap02 .count').html('<em>' + i + '</em> <span>/ </span> <em class="sum">' + slick.slideCount + '</em>');
    });

    $('.event .slick_wrap02 .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        accessibility: true,
        prevArrow: $('.event .slick_wrap02 .prev'),
        nextArrow: $('.event .slick_wrap02 .next'),
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
		swipeToSlide: true,
        pauseOnHover: false,
        speed: 1000,
        responsive: [{
            breakpoint: 761,
            settings: {
                adaptiveHeight: true
            }
        }]
    });

    $('.outcenter .otab a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).index();
		var Position = $('.outbx > div').eq(idx).offset();

		var windowWidth = $(window).width();
		if (windowWidth < 481) {
			var Val = 80
		} else if (windowWidth > 480 && windowWidth < 1400) {
			var Val = 80
		} else {
			var Val = 110
		}
		$('html, body').animate({
			scrollTop : Position.top - Val
		}, 300);

	});

});
