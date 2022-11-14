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
        arrows: false,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        vertical: true,
        verticalSwiping: true,
        speed: 500,
        autoplaySpeed: 6000,
    };
    
    initSlick($('.vertical-bx .slick'), slickOption2);


    var slickOption3 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide:true,
        speed: 350,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                centerMode: true,
                slidesToShow: 3,
                variableWidth: true,
                }
            }
        ]
    };
    
    initSlick($('.menu-bx .slick'), slickOption3);

    var slickOption4 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        prevArrow: $('.noti-bx .prev'),
        nextArrow: $('.noti-bx .next'),
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 450,
        autoplaySpeed: 6000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                speed: 350,
                centerMode: true,
                slidesToShow: 3,
                variableWidth: true,
                swipeToSlide:true,
                }
            }
        ]
    };
    
    initSlick($('.noti-bx .slick'), slickOption4);


    $('.edu-bx .slick').each( function() {
        var prevBtn =  $(this).parent('.item').find('.prev');
        var nextBtn =  $(this).parent('.item').find('.next');
        var dotBox =  $(this).parent('.item').find('.dots');
        $(this).slick({
            autoplay: false,
            arrows: true,
            accessibility: false,
            dots:true,
            draggable: true,
            prevArrow: prevBtn,
            nextArrow: nextBtn,
            appendDots: dotBox,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            variableWidth: true,
            swipeToSlide:true,
            pauseOnHover: false,
            speed: 450,
        });
      });


      var slickOption5 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 700,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                speed: 500,
                slidesToShow: 2,
                variableWidth: true,
                swipeToSlide:true,
                }
            }
        ]
    };
    
    initSlick($('#vr-center .slick'), slickOption5);


    $('#visual .tab a:first, #visual .data-bx .item:first-child, #education .tab a:first, #education .edu-bx .item:first-child, #board .tab a:first, #board .edu-bx .item:first-child').addClass('active');

    $('.data-bx > div').each(function (index, item) {
        $(item).find('.spot-bx a:first').addClass('active');
    });

    AOS.init({
        easing: 'ease',
        duration: 700,
        delay: 500,
        once: true,
        offset: 50,   
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
        var Item = $(this).parents('.item');
	    Item.find('.view').slideUp(300);
        Item.find('.open').text(Name);
        Item.find('.map-bx .spot-bx a').removeClass('active');
        Item.find('.map-bx .spot-bx a').eq(Idx2).addClass('active');
	}
}, '.local-bx .view a, .map-bx .spot-bx a')
.on({
	'click': function(e) { 
        e.preventDefault();
        var Idx3 = $(this).index();
        $(this).parent().find('a').removeClass('active');
        $(this).addClass('active');
        $(this).parent().next('div').find('.item').removeClass('active');
        $(this).parent().next('div').find('.item').eq(Idx3).addClass('active');
        $(this).parent().next('div').find('.item').eq(Idx3).find('.slick').slick('setPosition');
	}
}, '#education .tab a, #board .tab a');



