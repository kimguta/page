$(function() { 
    var slickOption4 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:true,
        draggable: true,
        appendDots: $('#visual .dots'),
        prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        fade: true,
        speed: 600,
        autoplaySpeed: 6000,
    };
    
    initSlick($('#visual .slick'), slickOption4);
});


ObjDoc.on({
	'click': function(e) { 
		e.preventDefault();
        var Idx = $(this).index();
        $('#infomation .btn-bx button').removeClass('active');
        $(this).addClass('active');
        $('#infomation .view-bx > div').hide().eq(Idx).show();
	}
}, '#infomation .btn-bx button');