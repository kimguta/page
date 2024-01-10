$(function() { 
    var slickOption1 = {
        autoplay: true,
        arrows: false,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false, 
        fade: true,
        speed: 350,
        autoplaySpeed: 9500,
        responsive: [
          
        ]
    }; 
    initSlick($('#visual .slick'), slickOption1);


    var slickOption2 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 350,
        responsive: [
            {
                breakpoint: 1181,
                settings: {
                    speed: 350,
                    slidesToShow: 3,
                    variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('#hotplace .slick'), slickOption2);

    var slickOption3 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 350,
        responsive: [
            {
                breakpoint: 1181,
                settings: {
                    speed: 350,
                    slidesToShow: 3,
                    variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('#now .slick'), slickOption3);

    var slickOption4 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        prevArrow: $('#board-notify .prev'),
        nextArrow: $('#board-notify .next'),
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 350,
        autoplaySpeed: 6000,
        responsive: [
            {
                breakpoint: 1181,
                settings: {
                    speed: 350,
                }
            }
        ]
    }; 
    initSlick($('#board-notify .slick'), slickOption4);
});

ObjDoc.on({
	'click': function(e) { 
		e.preventDefault();
        var Idx = $(this).index();
        $('.pin-bx a').removeClass('active');
        $(this).addClass('active');
        $('#map .list-bx > div').hide().eq(Idx).show();
	}
}, '.pin-bx a');