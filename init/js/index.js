$(function() { 

    var slickOption1 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        prevArrow: $('#news .prev'),
        nextArrow: $('#news .next'),
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
    initSlick($('#news .slick'), slickOption1);

});


$Doc.on({
    'click': function(e) {
        e.preventDefault();
        var Idx = $(this).index();
        $('.show-btn-bx button').removeClass('active').filter(this).addClass('active');
        $('.show-bx > div').removeClass('active').eq(Idx).addClass('active');
    }
}, '.show-btn-bx button');