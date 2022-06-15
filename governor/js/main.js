
$(function() {
    

     $('#visual .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.text-bx h2, .man').removeClass('active');
        $('#visual .slick-slide').removeClass('slick-zoom');
    });

     $('#visual .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        $('.text-bx h2, .man').addClass('active');
        $('#visual .slick-current').addClass('slick-zoom');
    });

    $('#visual .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        var i2 = slick.slideCount
        if(i < 10){ 
            var i = '0' + i
		}
        if(slick.slideCount < 10){ 
            var i2 = '0' + i2
		}

        $('#visual .count').html( i + '<span>-</span>' + '<strong>'+ i2 + '<strong>');
    });

     $('#visual .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        accessibility: true,
        prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 700,
        autoplaySpeed: 15000
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


    $('#together .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        accessibility: true,
        prevArrow: $('#together .prev'),
        nextArrow: $('#together .next'),
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 700,
        autoplaySpeed: 8000,
        responsive: [{
            breakpoint: 1399,
            settings: {
                centerMode: true,
                variableWidth: true,
                swipeToSlide: true
            }
        }]
    });

    $('#together .control .bttn').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#together .control .play').css('display','inline-block');
            $('#together .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#together .control .pause').css('display','inline-block');
            $('#together .slick').slick('slickPlay');
        }
    });

});

