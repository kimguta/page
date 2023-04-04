$(function() { 

    var sOption1 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        prevArrow: $('#intro .prev'),
        nextArrow: $('#intro .next'),
        fade: true,
        slidesToScroll: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
        speed: 500,
        responsive: [
            {
                breakpoint: 717,
                settings: {
                speed: 500,
                }
            }
        ]
    };

    initSlick($('#intro .slick'), sOption1);
});

ObjDoc.on({
    'click': function(e) { 
        e.preventDefault();
        var Idx = $(this).index();
        $('#map .btn-bx a, #map .img-bx img').removeClass('active');
        $('#map .img-bx img').eq(Idx).addClass('active');
        $(this).addClass('active');
    }
}, '#map .btn-bx a');


$(window).on('resize', function(){
   $('#partner .slick').slick('resize');
});

