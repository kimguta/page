$(function() {

    /*
    setTimeout(function() {
        AOS.init({
            easing: 'ease-out-back',
            duration: 1200,
            delay: 200,
            once: true,
            offset: 150
        });
     }, 200);

    $('#visual .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#visual .text span').fadeOut('300');
        $('#visual .text strong').fadeOut('300');
     });
 
     $('#visual .slick').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        $('#visual .text span').fadeIn('300');
        $('#visual .text strong').fadeIn('300');
     });
     */

    $('#visual .slick').slick({
        autoplay: true,
        arrows: true,
        dots: true,
        accessibility: true,
        prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        appendDots: $('#visual .dots'),
        draggable: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1200,
        autoplaySpeed: 5000,
		responsive: [{
            breakpoint: 761,
            settings: {
                 speed: 900
            }
        }]
    });
    
    $('#service .tab a:first-child').addClass('active');
    
    $('#service .tab a').on('click', function (e) {
        e.preventDefault();  
        var idx = $(this).index();
        $('#service .tab a').removeClass('active');
        $(this).addClass('active');
        $('.sbx > div').hide();
        $('.sbx > div').eq(idx).fadeIn('200');
        $('.sbx > div .slick').slick('resize');
        $('.sbx > div .slick').slick('slickGoTo', 0);
        $('#service .prev').removeClass('active');
    });


    $('#service .slick').on('afterChange', function(event, slick, currentSlide, nextSlide) {   
        if ($('#service .next').hasClass('slick-disabled')) {
            $('#service .prev').addClass('active'); 
        }
     });

     $('#service .prev').on('click', function (e) {
        e.preventDefault();
        $('#service .slick').slick('slickGoTo', 0);
        $(this).removeClass('active');
    });

    $('#service .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">→</a>',
        accessibility: false,
        draggable: true,
        infinite: false,
        variableWidth: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        pauseOnHover: false,
        speed: 800,
		responsive: [{
            breakpoint: 501,
            settings: {
                speed: 500,
                slidesToShow: 1
            }
        },
        {  
            breakpoint: 761,
            settings: {
                speed: 600,
                slidesToShow: 2
            }
        },
        {  
            breakpoint: 992,
            settings: {
                speed: 600,
                slidesToShow: 3
            }
        },
         {  
            breakpoint: 1200,
            settings: {
                speed: 700,
                slidesToShow: 3
            }
        }]
    });

});




