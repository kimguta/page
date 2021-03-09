$(function() {

    $('#visual .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#visual .titbx').removeClass('active').fadeOut(300);
     });

    $('#visual .slick').on('afterChange init', function(event, slick, currentSlide, nextSlide) {
        $('#visual .titbx').addClass('active').fadeIn(300);
     });


     $('#visual .slick').on('init', function(event, slick, currentSlide, nextSlide) {
        $('#visual .titbx').addClass('active').fadeIn(300);
     });


    var $slick_carousel = $('#visual .slick');

    $slick_carousel.on('init', function(event, slick) {
		$slick_carousel.find('.slick-current').removeClass('slick-active').addClass('reset-animation');
		setTimeout( function() {
			$slick_carousel.find('.slick-current').removeClass('reset-animation').addClass('slick-active');
		}, 100);
	});

    $('#visual .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        accessibility: true,
        prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        draggable: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1000,
        autoplaySpeed: 5500
    });


    $('#pledge .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#pledge .bx').removeClass('active');
     });

    $('#pledge .slick').on('afterChange init', function(event, slick, currentSlide, nextSlide) {
        $('#pledge .bx').addClass('active');
     });

        
     $('#pledge .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        accessibility: true,
        asNavFor: '#pledge .slick02',
        prevArrow: $('#pledge .prev'),
        nextArrow: $('#pledge .next'),
        draggable: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        adaptiveHeight: true,
        speed: 1000
    });
     
    $('#pledge .slick02').slick({
        autoplay: false,
        arrows: false,
        dots: false,
        asNavFor: '#pledge .slick',
        draggable: true,
        infinite: true,
        accessibility: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        pauseOnHover: false,
        focusOnSelect: true,
        speed: 1200,
		responsive: [{
            breakpoint: 761,
            settings: {
                speed: 900,
            }
        },
         {  
            breakpoint: 1200,
            settings: {
                speed: 1000,
            }
        }]
    });


    $('#news .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        draggable: true,
        infinite: true,
        accessibility: false,
        prevArrow: $('#news .prev'),
        nextArrow: $('#news .next'),
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        focusOnSelect: true,
        swipeToSlide: true,
        speed: 900,
        autoplaySpeed: 5000,
		responsive: [{
            breakpoint: 761,
            settings: {
                speed: 900,
                slidesToShow: 2
            }
        },
         {  
            breakpoint: 770,
            settings: {
                slidesToShow: 2
            }
        }]
    });

  
});

