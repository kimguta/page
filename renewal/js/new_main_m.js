$(function() {

    $('#notify .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#notify .slide h3').fadeOut(300);
        $('#notify .control').fadeOut(100);
    });
    
    $('#notify .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('#notify .count').html('<em>' + i + '</em> / ' + slick.slideCount);
        $('#notify .slide h3').fadeIn(300);
        $('#notify .control').fadeIn(100);
    });

    $('#notify .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#notify .prev'),
        nextArrow: $('#notify .next'),
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        pauseOnHover: false,
        autoplaySpeed: 5000,
        speed: 900,
        responsive: [{
            breakpoint: 640,
            settings: {
                slidesToShow: 1
            }
        },

        {  
            breakpoint: 770,
            settings: {
                slidesToShow: 2
            }
        },
         {  
            breakpoint: 9999,
            settings: {
                slidesToShow: 2
            }
        }]
    });

    $('#notify .bttn').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).css('display','none');
            $('#notify .play').css('display','inline-block');
            $('#notify .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).css('display','none');
            $('#notify .pause').css('display','inline-block');
            $('#notify .slick').slick('slickPlay');
        }
    });


    $('#window .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#window .prev'),
        nextArrow: $('#window .next'),
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        pauseOnHover: false,
        autoplaySpeed: 4500,
        speed: 900,
        responsive: [{
            breakpoint: 640,
            settings: {
                slidesToShow: 1
            }
        },
         {  
            breakpoint: 9999,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    $('#window .bttn').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).css('display','none');
            $('#window .play').css('display','inline-block');
            $('#window .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).css('display','none');
            $('#window .pause').css('display','inline-block');
            $('#window .slick').slick('slickPlay');
        }
    });

    $('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});

    $('#board .bx > div:first-child h3').addClass('active');
    $('#board .bx > div:first-child ul, #notify .leftbx > div:first-child .more').show();

    $('#board .bx h3 a').on('click', function (e) {
        e.preventDefault();
        $('#board .bx ul, #notify .bx .more').hide();
        $(this).parent('h3').siblings('ul, .more').show();
        $('#board .bx h3').removeClass('active');
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
        autoplaySpeed: 5000,
        speed: 700,
        responsive: [{
            breakpoint: 640,
            settings: {
                slidesToShow: 3
            }
        },

        {  
            breakpoint: 770,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        },
         {  
            breakpoint: 9999,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 1
            }
        }]
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



