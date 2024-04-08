$(function() { 
    var slickOption1 = {
        autoplay: true,
        arrows: false,
        accessibility: false,
        dots:true,
        draggable: true,
        swipeToSlide: true,
        variableWidth: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 500,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1181,
                settings: {
                    // centerMode: true,
                }
            },
            {
                breakpoint: 717,
                settings: {
                    speed: 250,
                }
            }
        ]
    }; 
    initSlick($('#pledge .slick'), slickOption1);

    var slickOption2 = {
        autoplay: true,
        arrows: false,
        accessibility: false,
        dots:false,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        // cssEase: 'linear',
        speed: 1000,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1181,
                settings: {
                   
                }
            },
            {
                breakpoint: 717,
                settings: {
                    
                }
            }
        ]
    }; 
    initSlick($('#visual .slick'), slickOption2);
});