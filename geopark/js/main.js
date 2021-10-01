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

     $('#visual .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('#visual .title-bx').fadeOut(350);
    }); 

    $('#visual .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        $('#visual .title-bx').fadeIn(350);
    });

    

    $('#visual .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        accessibility: true,
        prevArrow: $('#visual .control .prev'),
        nextArrow: $('#visual .control .next'),
        draggable: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1500,
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

    $('#intro .tab a').on('click', function (e) {
        e.preventDefault();  
        var idx = $(this).index();
        $('#intro .slick').slick('slickGoTo', idx); 
    });

  
    $('#intro .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#intro .tab a').removeClass('active');
        $('#intro .tab a').eq(nextSlide).addClass('active');
    });

    $('#intro .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
    });

    $('#intro .slick').slick({
        autoplay: false,
        arrows: false,
        dots: false,
        accessibility: false,
        draggable: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        fade: true,
        speed: 500,
        adaptiveHeight: true
    });

});

