$(function() { 

    var mainSlickOption1 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('.popup .prev'),
        nextArrow: $('.popup .next'),
        pauseOnHover: false,
        speed: 350,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    variableWidth: true,
                }
            }
        ]
    };
    initSlick($('.popup .slick'), mainSlickOption1);

    var mainSlickOption2 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        swipeToSlide: true,
        slidesToScroll: 1,
        slidesToShow: 4,
        pauseOnHover: false,
        speed: 300,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    variableWidth: true,
                }
            }
        ]
    };
    initSlick($('#education .slick'), mainSlickOption2);


});
