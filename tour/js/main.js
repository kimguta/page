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
        $(this).prev('.text').children('p').hide();
        $(this).prev('.text').children('p').eq(currentSlide).show();
     });

    $('#visual .bx1 .slick').slick({
        autoplay: false,
        arrows: false,
        dots: false,
        accessibility: true,
        draggable: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '#visual .bx1 .tslick',
        pauseOnHover: false,
        speed: 1200,
		responsive: [{
            breakpoint: 761,
            settings: {
                 speed: 900
            }
        }]
    });


    $('#visual .bx1 .tslick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        draggable: true,
        prevArrow: '<a role="button" class="slick-prev prev arrow" href="#">이전</a>',
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">다음</a>',
        variableWidth: true,
        asNavFor: '#visual .bx1 .slick',
        infinite: true,
        accessibility: false,
        slidesToShow: 3,
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
            }
        }]
    });

    $('#visual .bx2 .slick').slick({
        autoplay: false,
        arrows: false,
        dots: false,
        accessibility: true,
        draggable: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '#visual .bx2 .tslick',
        pauseOnHover: false,
        speed: 1200,
		responsive: [{
            breakpoint: 761,
            settings: {
                 speed: 900
            }
        }]
    });


    $('#visual .bx2 .tslick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        draggable: true,
        prevArrow: '<a role="button" class="slick-prev prev arrow" href="#">이전</a>',
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">다음</a>',
        variableWidth: true,
        asNavFor: '#visual .bx2 .slick',
        infinite: true,
        accessibility: false,
        slidesToShow: 3,
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
            }
        }]
    });

    $('#visual .bx3 .slick').slick({
        autoplay: false,
        arrows: false,
        dots: false,
        accessibility: true,
        draggable: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '#visual .bx3 .tslick',
        pauseOnHover: false,
        speed: 1200,
		responsive: [{
            breakpoint: 761,
            settings: {
                 speed: 900
            }
        }]
    });


    $('#visual .bx3 .tslick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        draggable: true,
        prevArrow: '<a role="button" class="slick-prev prev arrow" href="#">이전</a>',
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">다음</a>',
        variableWidth: true,
        asNavFor: '#visual .bx3 .slick',
        infinite: true,
        accessibility: false,
        slidesToShow: 3,
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
        $('#visual .text p').hide();
        $('#visual .text p:first-of-type').show();
        if(idx == 0) {
            $('.tgbox .bx1 .slick').slick('resize');
            $('.tgbox .bx1 .tslick').slick('resize');
            $('.tgbox .bx1 .slick').slick('slickGoTo', 0);
            $('.tgbox .bx1 .tslick').slick('slickGoTo', 0);
            /*
            $('.tgbox > div:nth-child(1) .slick').slick('slickPlay');
            $('.tgbox > div:nth-child(2) .slick').slick('slickPause');
            $('.tgbox > div:nth-child(3) .slick').slick('slickPause');
            */
        }else if(idx == 1){
            $('.tgbox .bx2 .slick').slick('resize');
            $('.tgbox .bx2 .tslick').slick('resize');
            $('.tgbox .bx2 .slick').slick('slickGoTo', 0);
            $('.tgbox .bx2 .tslick').slick('slickGoTo', 0);
            /*
            $('.tgbox > div:nth-child(2) .slick').slick('slickPlay');
            $('.tgbox > div:nth-child(1) .slick').slick('slickPause');
            $('.tgbox > div:nth-child(3) .slick').slick('slickPause');
            */
        }
        else if(idx == 2){
            $('.tgbox .bx3 .slick').slick('resize');
            $('.tgbox .bx3 .tslick').slick('resize');
            $('.tgbox .bx3 .slick').slick('slickGoTo', 0);
            $('.tgbox .bx3 .tslick').slick('slickGoTo', 0);
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
        infinite: false,
        variableWidth: true,
        slidesToShow: 1,
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




