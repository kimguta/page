$(function() { 

    var slickOption1 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:true,
        draggable: true,
        prevArrow: $('.event-bx1 .prev'),
        nextArrow: $('.event-bx1 .next'),
        appendDots: $('.event-bx1 .dots'),
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 350,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 717,
                settings: {
                    variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('.event-bx1 .slick'), slickOption1);

    var slickOption2 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        prevArrow: $('.event-bx2 .prev'),
        nextArrow: $('.event-bx2 .next'),
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 450,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('.event-bx2 .slick'), slickOption2);

    var slickOption3 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        pauseOnHover: false,
        speed: 350,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('#education .slick'), slickOption3);

    var slickOption4 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        pauseOnHover: false,
        speed: 350,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('#reservation .slick'), slickOption4);
});
