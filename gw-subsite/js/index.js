$(function() { 

    var slickOption1 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        prevArrow: $('#notice .prev'),
        nextArrow: $('#notice .next'),
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 600,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                speed: 500,
                centerMode: true,
                slidesToShow: 3,
                variableWidth: true,
                swipeToSlide:true,
                }
            }
        ]
    };
    
    initSlick($('#notice .slick'), slickOption1);
    $('#board .tab a:first-child, #board .bx div:first-child').addClass('active');
});


ObjDoc.on({
	'click': function(e) { 
        e.preventDefault();
		idx = $(this).index();
        $('#board .tab a').removeClass('active');
        $(this).addClass('active');
        $('#board .bx > div').removeClass('active');
        $('#board .bx > div').eq(idx).addClass('active');
	}
}, '#board .tab a');


