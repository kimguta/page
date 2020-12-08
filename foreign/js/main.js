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


     $('#visual .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#visual .text').removeClass('active');
     });
 

     $('#visual .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        $('#visual .text').addClass('active');
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('#visual .text p').html('<em>' + 0 + i + '</em> ' + + 0 + slick.slideCount);
    });

     $('#visual .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        draggable: true,
        prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        infinite: true,
        slidesToShow: 1,
        fade: true,
        accessibility: false,
        slidesToScroll: 1,
        pauseOnHover: false,
        focusOnSelect: true,
        speed: 1200,
        autoplaySpeed: 6000,
		responsive: [{
            breakpoint: 761,
            settings: {
                speed: 900,
            }
        }]
    });

    $('#visual .text .button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#visual .play').css('display','inline-block');
            $('#visual .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#visual .pause').css('display','inline-block');
            $('#visual .slick').slick('slickPlay');
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

    $('.ftext > div:first-child').show();
    $('.ftab a:first-child').addClass('active');
    

    $('#festival .slick').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        $('.ftext > div').fadeOut(300);
        $('.ftext > div').eq(currentSlide).fadeIn(300);
        $('.ftab a').removeClass('active');
        $('.ftab a').eq(currentSlide).addClass('active');
     });

     $('.ftab a').on('click', function (e) {
        e.preventDefault();  
        var idx = $(this).index();
        $('#festival .slick').slick('slickGoTo', idx); 
    });

    $('#festival .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('#festival .prev'),
        nextArrow: $('#festival .next'),
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1000
    });

});


