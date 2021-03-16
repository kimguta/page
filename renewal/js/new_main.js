$(function() {

    $('.leftbx .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.leftbx .slide h3').fadeOut(300);
    });
    
    $('.leftbx .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.leftbx .count').html('<em>' + i + '</em> / ' + slick.slideCount);
        $('.leftbx .slide h3').fadeIn(300);
    });

    $('.leftbx .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('.leftbx .prev'),
        nextArrow: $('.leftbx .next'),
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        pauseOnHover: false,
        autoplaySpeed: 5000,
        speed: 1000,
    });

    $('.leftbx .bttn').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).css('display','none');
            $('.leftbx .play').css('display','inline-block');
            $('.leftbx .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).css('display','none');
            $('.leftbx .pause').css('display','inline-block');
            $('.leftbx .slick').slick('slickPlay');
        }
    });


    $('.rightbx .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('.rightbx .prev'),
        nextArrow: $('.rightbx .next'),
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        pauseOnHover: false,
        autoplaySpeed: 4500,
        speed: 900,
    });

    $('.rightbx .bttn').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).css('display','none');
            $('.rightbx .play').css('display','inline-block');
            $('.rightbx .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).css('display','none');
            $('.rightbx .pause').css('display','inline-block');
            $('.rightbx .slick').slick('slickPlay');
        }
    });

    $('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});

    $('#notify .leftbx > div:first-child h3').addClass('active');
    $('#notify .leftbx > div:first-child ul, #notify .leftbx > div:first-child .more').show();

    $('#notify .leftbx h3 a').on('click', function (e) {
        e.preventDefault();
        $('#notify .leftbx ul, #notify .leftbx .more').hide();
        $(this).parent('h3').siblings('ul, .more').show();
        $('#notify .leftbx h3').removeClass('active');
        $(this).parent('h3').addClass('active');
    });

    $('.airport .btnbx a').on('mouseover', function () {
        $(this).parents('.airport').addClass('active');
    });

    $('#menu .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#menu .prev'),
        nextArrow: $('#menu .next'),
        accessibility: false,
        draggable: true,
        swipeToSlide: true,
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        swipe: true,
        pauseOnHover: false,
        autoplaySpeed: 3500,
        speed: 700,
    });

    $('#menu .bttn').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).css('display','none');
            $('#menu .play').css('display','inline-block');
            $('#menu .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).css('display','none');
            $('#menu .pause').css('display','inline-block');
            $('#menu .slick').slick('slickPlay');
        }
    });

    $('#info .noti a').on('mouseover', function () {
        $(this).next('p').fadeIn(200);
    });

    $('#info .noti').on('mouseleave', function () {
        $(this).children('p').fadeOut(200);
    });


    $('#info .rbx a').on('mouseover', function () {
        $(this).parents('.rbx').addClass('active');
    });

});



