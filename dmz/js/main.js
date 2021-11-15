$(function() {

    setTimeout(function() {
        AOS.init({
            easing: 'ease',
            duration: 900,
            delay: 350,
            once: true,
            offset: 50,
            
        });
     }, 200);


     $('#visual .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('#visual .slick .text').hide();
        $('#visual .slick .slide').removeClass('slick-zoom');
        $('#visual .dots li').removeClass('loading');
    });

    $('#visual .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        $('#visual .slick .text').show();
        $('#visual .slick .slick-current').addClass('slick-zoom');
        $('#visual .dots .slick-active').addClass('loading');
    });

    $('#visual .slick').slick({
        autoplay: true,
        arrows: true,
        dots: true,
        appendDots: $('#visual .dots'),
        prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        customPaging: function(slick,index) {
            return '<a href="#" onclick="return false;" role="button" class="v' + (index + 1) + '"><em></em><span></span></a>';
        },
        accessibility: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 500,
        autoplaySpeed: 15000
    });

    setTimeout(function() {
        $('#visual .slick .slick-current').addClass('slick-zoom');
        $('#visual .dots .slick-active').addClass('loading');
    },100);


    $('#visual .dots .v1 span').text('DMZ의 과거 길');
    $('#visual .dots .v2 span').text('DMZ의 현재 길');
    $('#visual .dots .v3 span').text('DMZ의 미래 길');

    $('#visual .control .bttn').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#visual .control .play').css('display','inline-block');
            $('#visual .slick').slick('slickPause');
            $('#visual .dots').addClass('stop');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#visual .control .pause').css('display','inline-block');
            $('#visual .slick').slick('slickPlay');
            $('#visual .dots').removeClass('stop');
        }
    });

    $('#visual .slick02').slick({
        autoplay: false,
        arrows: false,
        dots: true,
        customPaging: function(slick,index) {
            return '<a href="#" onclick="return false;" role="button">' + (index + 1) + '</a>';
        },
        accessibility: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 500,
    });


    $('#visual .toggle').on('click', function (e) {
        e.preventDefault();
        $('#visual .notify').toggleClass('active');
    });


    if ($(window).width() > 1399) {

        
        $('#guide-news, #exhibit, #archive, #sns').on('wheel', function (e) {
            e.preventDefault();
            var Offset1 = $(this).prev('section').offset();
            var Offset2 = $(this).next('section').offset();

            if (e.originalEvent.deltaY < 0) {
                $('html, body').stop().animate({scrollTop : Offset1.top - 95}, 500);
                
            } 
            else if (e.originalEvent.deltaY > 0) {
                $('html, body').stop().animate({scrollTop : Offset2.top - 95}, 500);
                
            }
        });

        $('#visual').on('wheel', function (e) {
            e.preventDefault();
            var Offset1 = $(this).next('section').offset();

            if (e.originalEvent.deltaY > 0) {
                $('html, body').stop().animate({scrollTop : Offset1.top - 130}, 500);
                
            } 
        });


        $('#tour').on('wheel', function (e) {
            e.preventDefault();
            var Offset1 = $(this).prev('section').offset();
            if (e.originalEvent.deltaY < 0) {
                $('html, body').stop().animate({scrollTop : Offset1.top - 95}, 500);
                
            }
            else if (e.originalEvent.deltaY > 0) {
                
                $('html, body').stop().animate({scrollTop : $(document).height()}, 1000);
                
            } 
        });
  
    }

    $('#exhibit .slick').on('init reInit', function (event, slick, currentSlide, nextSlide) {
        $('#exhibit .slick-current').addClass('active');
    });

    $('#exhibit .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('#exhibit .slide').removeClass('active');
        if ((currentSlide > nextSlide && (nextSlide !== 0 || currentSlide === 1)) || (currentSlide === 0 && nextSlide === slick.slideCount - 1)) {
            $('#exhibit .slick-current').prev('.slide').addClass('active');
        }
        else {
            $('#exhibit .slick-current').next('.slide').addClass('active');
        }
    });

    $('#exhibit .slick').slick({
        autoplay: false,
        arrows: true,
        dots: true,
        appendDots: $('#exhibit .dots'),
        prevArrow: $('#exhibit .prev'),
        nextArrow: $('#exhibit .next'),
        customPaging: function(slick,index) {
            return '<a href="#" onclick="return false;" role="button">' + (index + 1) + '</a>';
        },
        accessibility: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 500,
        centerMode: true,
        swipeToSlide: true,
        variableWidth: true,
        responsive: [{
            breakpoint: 761,
            settings: {
                slidesToShow: 1,
				slidesToScroll: 1,
                variableWidth: true,
                swipeToSlide: true,
				speed: 500,
				centerMode: true,
            }
        }]
    });


    $('#archive .slick').slick({
        autoplay: false,
        arrows: true,
        dots: true,
        prevArrow: '<a role="button" class="slick-prev prev arrow" href="#">이전</a>',
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">다음</a>',
        customPaging: function(slick,index) {
            return '<a href="#" onclick="return false;" role="button">' + (index + 1) + '</a>';
        },
        accessibility: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        pauseOnHover: false,
        speed: 900,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 1,
				slidesToScroll: 1,
                variableWidth: true,
                swipeToSlide: true,
				speed: 500,
				centerMode: true,
            }
        }]
    });


    $('#sns .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: '<a role="button" class="slick-prev prev arrow" href="#">이전</a>',
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">다음</a>',
        accessibility: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        pauseOnHover: false,
        speed: 500,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 1,
				slidesToScroll: 1,
                variableWidth: true,
                swipeToSlide: true,
				speed: 500,
				centerMode: true,
            }
        }]
    });

    $('#tour .slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $('#tour .map').removeAttr('data-map');
        $('#tour .map').attr('data-map',currentSlide);
        $('#tour .tab a').removeClass('active');
        $('#tour .tab a').eq(currentSlide).addClass('active');
    });

    $('#tour .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('#tour .prev'),
        nextArrow: $('#tour .next'),
        accessibility: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        vertical: true,
        verticalSwiping:true,
        speed: 500,
        responsive: [{
            breakpoint: 761,
            settings: {
                verticalSwiping:false, 
                
            }
        }]
    });


    $('#tour .tab a').on('click', function (e) {
		e.preventDefault();
        var idx = $(this).index();
        $('#tour .slick').slick('slickGoTo', idx);
        $('#tour .tab a').removeClass('active');
		$(this).addClass('active');
	});

});

