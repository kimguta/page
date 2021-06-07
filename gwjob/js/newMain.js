$(function() {

    setTimeout(function() {
        AOS.init({
            easing: 'ease',
            duration: 1200,
            delay: 200,
            once: true,
            offset: 150
        });
     }, 200);


     
    $('#notify .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('#notify .control .count').html('<em>' + i + '</em>ㆍ' + slick.slideCount);
    });

    $('#notify .slick').slick({
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


    $('#notify .control .bttn').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#notify .control .play').css('display','inline-block');
            $('#notify .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#notify .control .pause').css('display','inline-block');
            $('#notify .slick').slick('slickPlay');
        }
    });


    $('.diagnosis .menu a').on('click', function (e) {
        e.preventDefault();
        var idx = $(this).index();
        $('.diagnosis .menu a').removeClass('active');
        $(this).addClass('active');
        $('.diagnosis .bx > a').hide();
        $('.diagnosis .bx > a').eq(idx).show();
    });


    $('#support .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        accessibility: false,
        prevArrow: $('#support .prev'),
        nextArrow: $('#support .next'),
        draggable: true,
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 800,
        responsive: [{
            breakpoint: 600,
            settings: {
                slidesToShow: 2
            }
        },

        {
            breakpoint: 780,
            settings: {
                slidesToShow: 3
            }
        },

         {  
            breakpoint: 9999,
            settings: {
                slidesToShow: 4
            }
        }]
    });


    $('#app .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        accessibility: false,
        prevArrow: $('#app .prev'),
        nextArrow: $('#app .next'),
        draggable: true,
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 800,
        responsive: [{
            breakpoint: 600,
            settings: {
                slidesToShow: 2
            }
        },

        {
            breakpoint: 780,
            settings: {
                slidesToShow: 3
            }
        },

         {  
            breakpoint: 9999,
            settings: {
                slidesToShow: 4
            }
        }]
    });

});

