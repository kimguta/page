

$(function() {

    $('#visual .text-bx > div').eq(0).show();

    $('#visual .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('#visual .slick .slide').removeClass('slick-zoom');
        $('#visual .text-bx > div').fadeOut(300);
    });

    $('#visual .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('#visual .count').html( i + '<span> / </span>' + slick.slideCount);
        $('#visual .slick .slick-current').addClass('slick-zoom');
        $('#visual .text-bx > div').eq(currentSlide).fadeIn(300);
    });

    $('#visual .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        accessibility: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 800,
        autoplaySpeed: 10000
    });

    $('#visual .control .bttn').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#visual .control .play').css('display','inline-block');
            $('#visual .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#visual .control .pause').css('display','inline-block');
            $('#visual .slick').slick('slickPlay');
        }
    });

    $('#work .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('#work .slick .slide p').addClass('hi');
    });

    $('#work .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        $('#work .slick .slide p').removeClass('hi');
    });

    $('#work .slick').slick({
        autoplay: false,
        arrows: false,
        dots: true,
        accessibility: true,
        customPaging: function(slick,index) {
            return '<a href="#" onclick="return false;" role="button">'+ index + '</a>';
        },
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        asNavFor: '#work .slick02',
        speed: 800,
    });


    $('#work .slick02').slick({
        autoplay: false,
        arrows: false,
        dots: false,
        accessibility: true,
        swipeToSlide: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping:true,
        asNavFor: '#work .slick',
        pauseOnHover: false,
        focusOnSelect: true,
        speed: 800,
        responsive: [{
            breakpoint: 992,
            settings: {
                vertical: false,
                verticalSwiping:false,
                variableWidth: true,
                centerMode: true,
                swipeToSlide: true,
            }
        }]
    });

    $('#work .slick02 .slide').on('click', function (e) {
        e.preventDefault();
    });

    $('#work .slick02').on('wheel', function (e) {
        e.preventDefault();
        if (e.originalEvent.deltaY < 0) {
            $(this).slick('slickPrev');
        } else {
            $(this).slick('slickNext');
        }
    });

    $('#story .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: '<a href="#" class="prev">이전</a>',
        nextArrow: '<a href="#" class="next">다음</a>',
        accessibility: true,
        swipeToSlide: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 600,
        responsive: [{
            breakpoint: 1400,
            settings: {
                variableWidth: true
            }
        }]
    });
   
});

