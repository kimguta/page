$(function() { 
    var slickOption1 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false, 
        fade: true,
        speed: 500,
        asNavFor: '#visual .slick-for',
        autoplaySpeed: 6000,
        responsive: [
          
        ]
    }; 
    initSlick($('#visual .slick'), slickOption1);


    var slickOption2 = {
        autoplay: false,
        arrows: false,
        accessibility: false,
        dots:true,
        draggable: true,
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        asNavFor: '#visual .slick',
        focusOnSelect: true,
        speed: 350,
        responsive: [
            {
                breakpoint: 1181,
                settings: {
                    // speed: 350,
                    // slidesToShow: 3,
                    // variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('#visual .slick-for'), slickOption2);

    var slickOption3 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        cssEase: 'linear',
        speed: 600,
        responsive: [
            {
                breakpoint: 1181,
                settings: {
                    speed: 350,
                 
                }
            }
        ]
    }; 
    initSlick($('#exhibit .slick'), slickOption3);
 
});
