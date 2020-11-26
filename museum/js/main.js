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
        $('#visual .text').removeClass('active').fadeOut('300');
     });
 
     $('#visual .slick').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        $('#visual .text').addClass('active').fadeIn('300');
     });

     $('#visual .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        draggable: true,
        prevArrow: '<a role="button" class="slick-prev prev arrow" href="#">이전</a>',
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">다음</a>',
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


    $('#info .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        draggable: true,
        prevArrow: $('#info .prev'),
        nextArrow: $('#info .next'),
        infinite: true,
        slidesToShow: 1,
        accessibility: false,
        slidesToScroll: 1,
        pauseOnHover: false,
        focusOnSelect: true,
        speed: 800,
        swipeToSlide: true,
        autoplaySpeed: 5000,
		responsive: [{
            breakpoint: 761,
            settings: {
                speed: 800,
                slidesToShow: 3,
                variableWidth: true
            }
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
                variableWidth: true
            }
        }]
    });

    $('#info .control .button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#info .play').css('display','inline-block');
            $('#info .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#info .pause').css('display','inline-block');
            $('#info .slick').slick('slickPlay');
        }
    });


    $('#exhibit .tab a:first-child').addClass('active');

    $('#exhibit .tab a').on('click', function (e) {
        e.preventDefault();
        var idx = $(this).index();
        $('#exhibit .tab a').removeClass('active');
        $(this).addClass('active');
        $('.tgbox > div').hide();
        $('.tgbox > div').eq(idx).fadeIn(1000);
    });

    $('#story .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#story .tbox').fadeOut('300');
     });

    $('#story .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('#story  .count').html('<em>' + i + '</em> / ' + slick.slideCount);
        $('#story .tbox').fadeIn('300');
    });

    $('#story .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        draggable: true,
        prevArrow: $('#story .prev'),
        nextArrow: $('#story .next'),
        infinite: true,
        slidesToShow: 5,
        accessibility: false,
        slidesToScroll: 1,
        pauseOnHover: false,
        focusOnSelect: true,
        variableWidth: true,
        speed: 1000,
        swipeToSlide: true,
		responsive: [{
            breakpoint: 761,
            settings: {
                speed: 800,
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 4,
            }
        }]
    });

});


$(window).on('load resize', function () {
	$('#info .slick').slick('resize');
});

