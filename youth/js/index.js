$(function() { 
    var mainSlickOption = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 350,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                }
            }
        ]
    };
    initSlick($('#visual .slick'), mainSlickOption);


    var mainSlickOption2 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('#notice .prev'),
        nextArrow: $('#notice .next'),
        pauseOnHover: false,
        vertical: true,
        verticalSwiping: true,
        speed: 350,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                }
            }
        ]
    };
    initSlick($('#notice .slick'), mainSlickOption2);

    
    var mainSlickOption3 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        variableWidth: true,
        dots:false,
        draggable: true,
        swipeToSlide: true,
        slidesToScroll: 1,
        infinite: false,
        slidesToShow: 3,
        centerMode: true,
        prevArrow: $('#item-list .prev'),
        nextArrow: $('#item-list .next'),
        pauseOnHover: false,
        speed: 500,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                }
            }
        ]
    };
    initSlick($('#item-list .slick'), mainSlickOption3);


});

// ObjDoc.on({
// 	'click': function(e) { 
//         e.preventDefault();
// 	}
// }, '#data-wrap .tab a');
