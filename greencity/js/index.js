$(function() { 
    var slickOption = {
        autoplay: false,
        arrows: false,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: false,
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
        speed: 350,
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
                speed: 200,
                slidesToShow: 3,
                centerMode: true,
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


    $('.edu-bx .slick').each( function(index, item) {
        var prevBtn =  $(item).parent('.item').find('.prev');
        var nextBtn =  $(item).parent('.item').find('.next');
        var dotBox =  $(item).parent('.item').find('.dots');
        $(item).slick({
            autoplay: false,
            arrows: true,
            accessibility: false,
            dots:true,
            draggable: true,
            prevArrow: prevBtn,
            nextArrow: nextBtn,
            appendDots: dotBox,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            swipeToSlide:true,
            pauseOnHover: false,
            speed: 350,
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
                swipeToSlide:true,
                }
            }
        ]
    };
    
    initSlick($('#vr-center .slick'), slickOption5);


    $('#visual .tab a:first, #visual .data-bx .item:first-child, #education .tab a:first, #education .edu-bx .item:first-child, #board .tab a:first, #board .board-bx .item:first-child').addClass('active');

    $('.data-bx > div').each(function (index, item) {
        $(item).find('.spot-bx a:first').addClass('active');
    });


});


