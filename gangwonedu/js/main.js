$(function() {

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
        dots: true,
        accessibility: true,
        prevArrow: $('#visual .control .prev'),
        nextArrow: $('#visual .control .next'),
        appendDots: $('#visual .control .dots'),
        draggable: true,
        customPaging: function(slick,index) {
            return '<a href="#" onclick="return false;">' + (index + 1) + '</a>';
        },
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1000,
        autoplaySpeed: 5500
    });


    $('#visual .control .bttn').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#visual .control .play').css('display','inline-block');
            $('#visual .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#visual .control .pause').css('display','inline-block');
            $('#visual .slick').slick('slickPlay');
        }
    });


    $('#notify .slick02').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('#notify .control02 .count').html('<em>' + i + '</em>ㆍ' + slick.slideCount);
    });

    $('#notify .slick02').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        accessibility: false,
        prevArrow: $('#notify .prev'),
        nextArrow: $('#notify .next'),
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 900,
        autoplaySpeed: 4500
    });


    $('#notify .control02 .bttn').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#notify .control02 .play').css('display','inline-block');
            $('#notify .slick02').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#notify .control02 .pause').css('display','inline-block');
            $('#notify .slick02').slick('slickPlay');
        }
    });

    $('#notice .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        accessibility: false,
        prevArrow: $('#notice .prev'),
        nextArrow: $('#notice .next'),
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        pauseOnHover: false,
        speed: 300,
        autoplaySpeed: 3500
    });


    $('#notice .control .bttn').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#notice .control .play').css('display','inline-block');
            $('#notice .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#notice .control .pause').css('display','inline-block');
            $('#notice .slick').slick('slickPlay');
        }
    });


});

