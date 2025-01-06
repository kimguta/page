$(function() { 

    var slickOption1 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        prevArrow: $('.pop-bx .prev'),
        nextArrow: $('.pop-bx .next'),
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
                    variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('.pop-bx .slick'), slickOption1);


});
