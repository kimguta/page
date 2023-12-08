$(function() { 
    var slickOption1 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
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
                    variableWidth: true,
                    centerMode: true,
                }
            },
            {
                breakpoint: 717,
                settings: {
                    variableWidth: false,
                    centerMode: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    }; 
    initSlick($('#notify-mayor .slick'), slickOption1);

    $('#today-sokcho .slick-wrap').each(function(){
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
            slidesToShow: 4,
            variableWidth: true,
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

    var slickOption2 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        prevArrow: $('.photo-bx .prev'),
        nextArrow: $('.photo-bx .next'),
        infinite: true,
        slidesToShow: 3,
        swipeToSlide: true,
        variableWidth: true,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 250,
        responsive: [
            {
                breakpoint: 741,
                settings: {
                    // speed: 250,
                }
            }
        ]
    }; 
    initSlick($('.photo-bx .slick'), slickOption2);

    var slickOption3 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        prevArrow: $('.notice-bx .prev'),
        nextArrow: $('.notice-bx .next'),
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
                    slidesToShow: 4,
                    variableWidth: true,
                    swipeToSlide: true,
                }
            }
        ]
    }; 
    initSlick($('.notice-bx .slick'), slickOption3);



    var slickOption4 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 4,
        swipeToSlide: true,
        variableWidth: true,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 250,
        responsive: [
            {
                breakpoint: 741,
                settings: {
                    // speed: 250,
                }
            }
        ]
    }; 
    initSlick($('#sns-magazine .slick'), slickOption4);


    var slickOption5 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        centerMode: true,
        swipeToSlide: true,
        variableWidth: true,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 250,
        responsive: [
            {
                breakpoint: 741,
                settings: {
                    // speed: 250,
                }
            }
        ]
    }; 
    initSlick($('#tour .slick'), slickOption5);

});


ObjDoc.on({
	'click': function(e) { 
		e.preventDefault();
        var Idx = $(this).index();
        $('#today-sokcho .tab button').removeClass('active');
        $(this).addClass('active');
        $('#today-sokcho .slick-bx > div').hide().eq(Idx).show();
	}
}, '#today-sokcho .tab button')
.on({
	'click': function(e) { 
		e.preventDefault();
        e.stopPropagation()
        $('.menu-list .item > a').removeClass('active');
        $(this).addClass('active');
	}
}, '.menu-list .item > a')
.on({
	'click': function() { 
        $('.menu-list .item > a').removeClass('active');
	}
}, '#main');