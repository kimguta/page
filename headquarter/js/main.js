$(function() {

     $('#visual .slick').on('beforeChange', function(slick, currentSlide, nextSlide) {
        $('#visual h2').addClass('active');
    });

    $('#visual .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
       $('#visual h2').removeClass('active');
     });


    $('#visual .slick').slick({
        autoplay: true,
        arrows: true,
        dots: true,
        appendDots: $('#visual .dots'),
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        pauseOnHover: false,
        autoplaySpeed: 5000,
        speed: 1200,
    });

    $('#news .info > div:first-child h2').addClass('active');
    $('#news .info > div:first-child .list01').show();

    $('#news .box h2 a').on('click', function (e) {
        e.preventDefault();
		$('#news .box .list01').fadeOut(300);
        $('#news .box h2').removeClass('active');
		$(this).parent().addClass('active');
        $(this).parent('h2').next('.list01').fadeIn(300);
	});

     $('#photo .slick').slick({
        autoplay: true,
        arrows: false,
        autoplaySpeed: 5000,
        variableWidth: true,
        accessibility: false,
        slidesToScroll: 1,
        draggable: true,
        swipeToSlide: true,
        speed: 1000,
        responsive: [{
                breakpoint: 500,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1401,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 9999,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    $('#company .company_box > div:first-child h3').addClass('active');
    $('#company .company_box > div:first-child .slick').show();

    $('#company .slick').slick({
        autoplay: false,
        arrows: true,
        variableWidth: true,
        accessibility: false,
        slidesToScroll: 1,
        draggable: true,
        swipeToSlide: true,
        speed: 1000,
        responsive: [{
                breakpoint: 500,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1401,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 9999,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    $('#company h3 a').on('click', function(e) {
        e.preventDefault();
        $(this).parents('#company').find('h3').removeClass('active');
        $(this).parent('h3').addClass('active');
        $(this).parents('#company').find('.slick').fadeOut(300);
        $(this).parent('h3').next('.slick').fadeIn(300);
        $(this).parent('h3').next('.slick').slick('resize');
        $(this).parent('h3').next('.slick').slick('refresh');
    });


});


 $(window).on('resize', function () {
    $('#photo .slick').slick('resize');
    $('#company .slick').slick('resize');
});