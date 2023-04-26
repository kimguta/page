$(function() { 

    var sOption1 = {
        autoplay: true,
        arrows: false,
        accessibility: false,
        dots:true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        fade: true,
        slidesToScroll: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
        speed: 800,
        autoplaySpeed: 8000,
        responsive: [
            {
                breakpoint: 717,
                settings: {
                speed: 500,
                }
            }
        ]
    };

    var sOption2 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        prevArrow: $('#nation .prev'),
        nextArrow: $('#nation .next'),
        infinite: true,
        swipeToSlide: true,
        slidesToScroll: 1,
        slidesToShow: 3,
        pauseOnHover: false,
        pauseOnFocus: false,
        speed: 250,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 717,
                speed: 200,
            }
        ]
    };

    initSlick($('#visual .slick'), sOption1);
    initSlick($('#nation .slick'), sOption2);
});

$(window).on('resize', function(){
   $('#partner .slick').slick('resize');
});

