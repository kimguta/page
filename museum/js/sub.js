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

	$('.event .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        accessibility: true,
        prevArrow: $('.event .prev'),
        nextArrow: $('.event .next'),
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

});
