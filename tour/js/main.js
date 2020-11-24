$(function() {

    setTimeout(function() {
        AOS.init({
            easing: 'ease-out-back',
            duration: 1200,
            delay: 200,
            once: true,
            offset: 150
        });
     }, 200);

    

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
        accessibility: true,
        draggable: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '#visual .tslick',
        pauseOnHover: false,
        speed: 1200,
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
        draggable: true,
        prevArrow: '<a role="button" class="slick-prev prev arrow" href="#">이전</a>',
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">다음</a>',
        variableWidth: true,
        asNavFor: '#visual .slick',
        infinite: true,
        slidesToShow: 4,
        accessibility: false,
        slidesToScroll: 1,
        pauseOnHover: false,
        focusOnSelect: true,
        swipeToSlide: true,
        speed: 1200,
		responsive: [{
            breakpoint: 761,
            settings: {
                speed: 900,
                slidesToShow: 2
            }
        },
         {  
            breakpoint: 1200,
            settings: {
                slidesToShow: 3
            }
        }]
    });

    $('.tgbox > div:nth-child(2) .slick').slick('slickPause');
    $('.tgbox > div:nth-child(3) .slick').slick('slickPause');


    $('.vtab a').on('click', function (e) {
        e.preventDefault();
        var idx = $(this).index();
        $('.vtab a').removeClass('active');
        $(this).addClass('active');
        $('.tgbox > div').hide();
        $('.tgbox > div').eq(idx).fadeIn('500');
        if(idx == 0) {
            $('.tgbox > div:nth-child(1) .slick').slick('resize');
            $('.tgbox > div:nth-child(1) .slick').slick('refresh');
            $('.tgbox > div:nth-child(1) .tslick').slick('resize');
            $('.tgbox > div:nth-child(1) .tslick').slick('refresh');
            /*
            $('.tgbox > div:nth-child(1) .slick').slick('slickPlay');
            $('.tgbox > div:nth-child(2) .slick').slick('slickPause');
            $('.tgbox > div:nth-child(3) .slick').slick('slickPause');
            */
        }else if(idx == 1){
            $('.tgbox > div:nth-child(2) .slick').slick('resize');
            $('.tgbox > div:nth-child(2) .slick').slick('refresh');
            $('.tgbox > div:nth-child(2) .tslick').slick('resize');
            $('.tgbox > div:nth-child(2) .tslick').slick('refresh');
            /*
            $('.tgbox > div:nth-child(2) .slick').slick('slickPlay');
            $('.tgbox > div:nth-child(1) .slick').slick('slickPause');
            $('.tgbox > div:nth-child(3) .slick').slick('slickPause');
            */
        }
        else{
            $('.tgbox > div:nth-child(3) .slick').slick('resize');
            $('.tgbox > div:nth-child(3) .slick').slick('refresh');
            $('.tgbox > div:nth-child(3) .tslick').slick('resize');
            $('.tgbox > div:nth-child(3) .tslick').slick('refresh');
            /*
            $('.tgbox > div:nth-child(3) .slick').slick('slickPlay');
            $('.tgbox > div:nth-child(1) .slick').slick('slickPause');
            $('.tgbox > div:nth-child(2) .slick').slick('slickPause');
            */
        }
    });

    $('.bg_vr').on('click mouseover', function (e) {
        e.preventDefault();  
        $(this).fadeOut(300);  
    });

    var vOffset = $('#vrtrip').offset();
	$(window).on('scroll', function () {
        var windowWidth = $(this).width();
        if (windowWidth < 761) {
            if ($(document).scrollTop() > vOffset.top - 110) {
                $('.bg_vr').delay(300).fadeOut(300); 
            }
        }
    });
    

    $('.tab .tlist a:first-child').addClass('active');

    $('#story .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
       $('#story .slick .text').fadeOut('300');
     });
 
     $('#story .slick').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        $('#story .slick .text').fadeIn('300');
        $('.tab .tlist a').removeClass('active');
        $('.tab .tlist a').eq(currentSlide).addClass('active');
     });

     $('.tab .tlist a').on('click', function (e) {
        e.preventDefault();  
        var idx = $(this).index();
        $('#story .slick').slick('slickGoTo', idx); 
    });

    $('#story .slick').slick({
        autoplay: false,
        arrows: false,
        dots: false,
        accessibility: false,
        draggable: true,
        infinite: true,
        variableWidth: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1200,
		responsive: [{
            breakpoint: 761,
            settings: {
                 speed: 900
            }
        }]
    });



});




