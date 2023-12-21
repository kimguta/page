$(function() { 

    var slickOption1 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 500,
        responsive: [
            {
                breakpoint: 717,
                settings: {
                    // 
                }
            }
        ]
    }; 
    initSlick($('#visual .slick'), slickOption1);

    var slickOption2 = {
        autoplay: false,
        arrows: false,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        pauseOnHover: false,
        variableWidth: true,
        speed: 350,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('#now .slick'), slickOption2);

});
