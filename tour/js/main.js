$(function() {

    AOS.init({
        easing: 'ease-out-back',
        duration: 400,
        delay: 30,
        once: true,
        disable: 'mobile'
    });

    $('.vtab a:first-child').addClass('active');

    
    $('#visual .tslick a').on('click', function (e) {
        e.preventDefault();       
    });

    $('#visual .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $(this).prev('.text').removeClass('active').fadeOut('300');
     });
 
     $('#visual .slick').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        $(this).prev('.text').addClass('active').fadeIn('300');
     });

    $('#visual .slick').slick({
        autoplay: false,
        arrows: false,
        dots: false,
        fade: true,
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '#visual .tslick',
        pauseOnHover: false,
        speed: 1300,
		responsive: [{
            breakpoint: 761,
            settings: {
                 speed: 900
            }
        }]
    });


    $('#visual .tslick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        accessibility: true,
        draggable: true,
        prevArrow: '<a role="button" class="slick-prev prev arrow" href="#">이전</a>',
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">다음</a>',
        variableWidth: true,
        asNavFor: '#visual .slick',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: false,
        focusOnSelect: true,
        speed: 1300,
		responsive: [{
            breakpoint: 761,
            settings: {
                speed: 900,
            }
        },
         {  
            breakpoint: 1200,
            settings: {
                slidesToShow: 3
            }
        }]
    });

    $('.vtab a').on('click', function (e) {
        e.preventDefault();
        var idx = $(this).index();
        $('.vtab a').removeClass('active');
        $(this).addClass('active');
        $('.tgbox > div').hide();
        $('.tgbox > div').eq(idx).fadeIn('300');
        if(idx == 0) {
            $('.tgbox > div:nth-child(1) .slick').slick('resize');
            $('.tgbox > div:nth-child(1) .slick').slick('refresh');
            $('.tgbox > div:nth-child(1) .tslick').slick('resize');
            $('.tgbox > div:nth-child(1) .tslick').slick('refresh');
        }else if(idx == 1){
            $('.tgbox > div:nth-child(2) .slick').slick('resize');
            $('.tgbox > div:nth-child(2) .slick').slick('refresh');
            $('.tgbox > div:nth-child(2) .tslick').slick('resize');
            $('.tgbox > div:nth-child(2) .tslick').slick('refresh');
        }
        else{
            $('.tgbox > div:nth-child(3) .slick').slick('resize');
            $('.tgbox > div:nth-child(3) .slick').slick('refresh');
            $('.tgbox > div:nth-child(3) .tslick').slick('resize');
            $('.tgbox > div:nth-child(3) .tslick').slick('refresh');
        }
    });


    

});

/*
$(window).on('resize', function () {
    $('.tgbox .slick').slick('resize');
});
*/


