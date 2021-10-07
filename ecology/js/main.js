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


 
    $('#visual .bg-bx > div a').on('mouseenter', function (e) {
        e.preventDefault();
        $('#visual .bg-bx div').removeClass('bg');
        $('#visual .bg-bx div.active').addClass('bg').delay(100).removeClass('active');
        $(this).parent('div').addClass('active');

        var idx = $(this).parent('div').index();

        $('#visual .inner .item').hide();
        $('#visual .inner .item').eq(idx).fadeIn(1000);

    });

     /*
     $('#visual .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('#visual .slick .text').fadeOut(300);
    }); 

    $('#visual .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        $('#visual .slick .text').fadeIn(300);
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

    $('#business .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('#business .prev'),
        nextArrow: $('#business .next'),
        accessibility: false,
        swipeToSlide: true,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 500,
        responsive: [{
            breakpoint: 721,
            settings: {
                slidesToShow: 2,
            }
        }]
    });

    */


});

