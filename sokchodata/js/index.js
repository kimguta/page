$(function() { 
    var slickOption1 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        prevArrow: $('.window-bx .prev'),
        nextArrow: $('.window-bx .next'),
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 350,
        autoplaySpeed: 6000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('.window-bx .slick'), slickOption1);

    var slickOption2 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide: true,
        speed: 350,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // variableWidth: true,
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 717,
                settings: {
                    variableWidth: true,
                    slidesToShow: 3,
                }
            },
        ]
    }; 
    initSlick($('#stats .slick'), slickOption2);
});