$(function() { 
    var slickOption1 = {
        autoplay: false,
        arrows: false,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        asNavFor: '#event .slick-wrap2 .slick', 
        fade: true,
        speed: 350,
        responsive: [
          
        ]
    }; 
    initSlick($('#event .slick-wrap .slick'), slickOption1);


    var slickOption2 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        focusOnSelect: true,
        variableWidth: true,
        asNavFor: '#event .slick-wrap .slick', 
        speed: 350,
        responsive: [
            {
                breakpoint: 1181,
                settings: {
                    speed: 350,
                    slidesToShow: 3,
                    
                }
            },
            {
                breakpoint: 717,
                settings: {
                    centerMode: true,
                    
                }
            }
        ]
    }; 
    initSlick($('#event .slick-wrap2 .slick'), slickOption2);


    $('#notice .slick-wrap').each(function(){
        $(this).find('.slick').slick({
            autoplay: false,
            arrows: true,
            accessibility: false,
            dots:false,
            draggable: true,
            swipeToSlide: true,
            slidesToScroll: 1,
            infinite: true,
            slidesToShow: 3,
            pauseOnHover: false,
            speed: 250,
            responsive: [
                {
                    breakpoint: 1181,
                    settings: {
                        speed: 350,
                        variableWidth: true,
                    }
                }
            ]
        });
    });

    


});

ObjDoc.on({
	'click': function(e) { 
		e.preventDefault();
        var Idx = $(this).index();
        $('#notice h2 button').removeClass('active');
        $(this).addClass('active');
        $('#notice .slick-wrap .item').hide().eq(Idx).show().slick('refresh');;
	}
}, '#notice h2 button');

