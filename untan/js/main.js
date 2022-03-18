

$(function() {

    setTimeout(function() {
        AOS.init({
            easing: 'ease',
            duration: 900,
            delay: 300,
            once: true,
            offset: 50,
            
        });
     }, 200);

    $('#section0 .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('#section0 .tit-bx').hide();

    });

    $('#section0 .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        $('#section0 .tit-bx').show();
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('#section0 .count').html( i + '<span></span>' + slick.slideCount);
    });

    $('#section0 .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#section0  .prev'),
        nextArrow: $('#section0  .next'),
        accessibility: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 700,
        autoplaySpeed: 15000
    });


    $('#section1 .slick').slick({
        autoplay: false,
        arrows: true,
        dots: true,
        prevArrow: $('#section1  .prev'),
        nextArrow: $('#section1  .next'),
        appendDots: $('#section1 .dots'),
        customPaging: function(slick,index) {
            return '<a href="#" onclick="return false;" role="button">' + (index + 1) + '</a>';
        },
        accessibility: true,
        infinite: false,
        slidesToScroll: 1,
        variableWidth: true,
        pauseOnHover: false,
        speed: 700,
    });


    $('#section3 .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('#section3  .prev'),
        nextArrow: $('#section3  .next'),
        accessibility: true,
        infinite: false,
        slidesToScroll: 1,
        variableWidth: true,
        pauseOnHover: false,
        speed: 700,
    });

   
});

