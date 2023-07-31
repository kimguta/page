$(function() { 
    var mainSlickOption1 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('#news-popup .prev'),
        nextArrow: $('#news-popup .next'),
        pauseOnHover: false,
        speed: 350,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    variableWidth: true,
                }
            }
        ]
    };
    initSlick($('#news-popup .slick'), mainSlickOption1);

    
    var mainSlickOption2 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        swipeToSlide: true,
        slidesToScroll: 1,
        infinite: true,
        slidesToShow: 1,
        pauseOnHover: false,
        speed: 600,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    speed: 350,
                }
            }
        ]
    };
    initSlick($('#banner .slick'), mainSlickOption2);

    $('#board .slick-wrap').each(function(){
        var prevBtn = $(this).find('.prev');
        var nextBtn = $(this).find('.next');
        $(this).find('.slick').slick({
            autoplay: false,
            arrows: true,
            prevArrow: prevBtn,
            nextArrow: nextBtn,
            accessibility: false,
            dots:false,
            draggable: true,
            swipeToSlide: true,
            slidesToScroll: 1,
            infinite: true,
            slidesToShow: 2,
            pauseOnHover: false,
            speed: 350,
            responsive: [
                {
                    breakpoint: 1200,
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
        $('#news-popup .tab a').removeClass('active');
        $(this).addClass('active');
        $('#news-popup .view-bx > div').removeClass('active').eq(Idx).addClass('active');
	}
}, '#news-popup .tab a')
.on({
	'click': function(e) { 
        e.preventDefault();
        var Idx = $(this).index();
        $('#board .title-bx div a').removeClass('active');
        $(this).addClass('active');
        $('#board .view-bx > div').removeClass('active').eq(Idx).addClass('active');
        $('#board .view-bx > div').eq(Idx).children('.slick').slick('setPosition');
	}
}, '#board .title-bx div a');
