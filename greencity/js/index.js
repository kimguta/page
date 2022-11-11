$(function() { 
    var slickOption = {
        autoplay: false,
        arrows: false,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 800,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                speed: 600,
                }
            }
        ]
    };

    initSlick($('#visual .slick'), slickOption);

    var slickOption2 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        prevArrow: $('#notice .prev'),
        nextArrow: $('#notice .next'),
        draggable: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1200,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                speed: 900,
                centerMode: true,
                slidesToShow: 3,
                variableWidth: true,
                swipeToSlide:true,
                }
            }
        ]
    };
    
    
    initSlick($('#notice .slick'), slickOption2);
    
    $('#visual .tab a:first, #visual .data-bx .item:first-child').addClass('active');

    $('.data-bx > div').each(function (index, item) {
        $(item).find('.spot-bx a:first').addClass('active');
    });

});



ObjDoc.on({
	'click': function(e) { 
        e.preventDefault();
        var Idx = $(this).index();
        $('#visual .slick').slick('slickGoTo', Idx);
        $('#visual .tab a').removeClass('active');
        $(this).addClass('active');
        $('#visual .data-bx .item').removeClass('active');
        $('#visual .data-bx .item').eq(Idx).addClass('active');
	}
}, '#visual .tab a')
.on({
	'click': function(e) { 
        e.preventDefault();
        $(this).toggleClass('active');
	    $(this).next('.view').stop().slideToggle(300);
	}
}, '.local-bx .open')
.on({
	'click': function(e) { 
        e.preventDefault();
        var Idx2 = $(this).index();
        var Name = $(this).text();
	    $(this).parent('.view').stop().slideUp(300);
        $(this).parent('.view').prev('.open').text(Name);
        $(this).parents('.item').find('.map-bx .spot-bx a').removeClass('active');
        $(this).parents('.item').find('.map-bx .spot-bx a').eq(Idx2).addClass('active');
	}
}, '.local-bx .view a')
.on({
	'click': function(e) { 
        e.preventDefault();
        var Name2 = $(this).text();
        $(this).parents('.item').find('.open').text(Name2);
        $(this).parents('.item').find('.map-bx .spot-bx a').removeClass('active');
        $(this).addClass('active');
	}
}, '.map-bx .spot-bx a')
;


