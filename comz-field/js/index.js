$(function() { 

    var SlickOption1 = {
        autoplay: true,
        arrows: false,
        accessibility: false,
        dots:true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
        speed: 800,
        autoplaySpeed: 6000,
        responsive: [
            {
                breakpoint: 717,
                settings: {
                speed: 500,
                }
            }
        ]
    };

    initSlick($('#visual .slick'), SlickOption1);


    var SlickOption2 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        swipeToSlide:true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        variableWidth: true,
        pauseOnFocus: false,
        speed: 500,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                speed: 350,
                centerMode: true,
                }
            }
        ]
    };

    initSlick($('#wanted .slick'), SlickOption2);
    initSlick($('#project .slick'), SlickOption2);

});


ObjWin.on({
    'scroll load': function() { 
        var offSet = $('#commonz').offset().top - $('#commonz').height();
        var scrollTop = $(document).scrollTop();
        if (offSet < scrollTop){
            $('#commonz .video-bx').addClass('active');
        }
    }		
});


