$(function() { 
    var slickOption1 = {
        autoplay: true,
        arrows: false,
        accessibility: false,
        dots:true,
        draggable: true,
        appendDots: $('#visual .dots'),
        infinite: true,
        customPaging: function(slick,index) {
            var index = index + 1
            if(index < 10){ 
                var index = '0' + index
            }
            return '<button type="button">' + (index) + '<span></span></button>';
        },
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        fade: true,
        speed: 600,
        autoplaySpeed: 6000,
    };
    var slickOption2 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 300,
        autoplaySpeed: 3500,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 6,
                variableWidth: true,
                swipeToSlide: true,
            }
        }]
    };

    initSlick($('#visual .slick'), slickOption1);
    initSlick($('#weekly .slick'), slickOption2);
});
