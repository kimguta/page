$(function() {

    AOS.init({
        easing: 'ease',
        duration: 900,
        delay: 300,
        once: true,
        offset: 50,   
    });

     $(window).on('resize', function() {
        if ($(window).width() > 1023) {
            clearTimeout(window.resizedFinished);
            window.resizedFinished = setTimeout(function(){
                document.location.reload();    
            }, 1000);
        }
    });


     $('#fp-nav li:first-child a').addClass('active');
     $('#main > div:last-child').addClass('last');
	 $('html, body').stop().animate({scrollTop : 0}, 200);

    if ($(window).width() > 1023) {

        $('.section').on('wheel', function (e) {
            e.preventDefault();
            var Offset1 = $(this).prev('.section').offset();
            var Offset2 = $(this).next('.section').offset();
            if (e.originalEvent.deltaY < 0) {
                $('html, body').stop().animate({scrollTop : Offset1.top}, 700, 'easeInOutQuad');  
            } 
            else if (e.originalEvent.deltaY > 0) {
                if ($(this).hasClass('last')) {
                    $('html, body').stop().animate({scrollTop : $(document).height()}, 700, 'easeInOutQuad');	
                } else  {
                    $('html, body').stop().animate({scrollTop : Offset2.top}, 700, 'easeInOutQuad');
                }
            }
        });	

        $(window).on('scroll', function () {
            
            var Offset1 = $('#section0').offset();
            var Offset2 = $('#section1').offset();
            var Offset3 = $('#section2').offset();
            var Offset4 = $('#section3').offset();
            $('#fp-nav li a').removeClass('active');
            if ($(document).scrollTop() < Offset2.top - 200) {
                $('#fp-nav').removeClass('active');
                $('#fp-nav li a').eq(0).addClass('active');
            }
            else if ($(document).scrollTop() > Offset2.top - 200 && $(document).scrollTop() < Offset3.top - 200) {
                $('#fp-nav').addClass('active');
                $('#fp-nav li a').eq(1).addClass('active');
            }
            else if ($(document).scrollTop() > Offset3.top - 200 && $(document).scrollTop() < Offset4.top - 200) {
                $('#fp-nav').removeClass('active');
                $('#fp-nav li a').eq(2).addClass('active');
            }
            else if ($(document).scrollTop() > Offset4.top - 200) {
                $('#fp-nav').addClass('active');
                $('#fp-nav li a').eq(3).addClass('active');
            }
        });

    }; 

    $('#fp-nav li').on('click', function (e) {
        e.preventDefault();
        var Index2 = $(this).index();
        var Offset = $('#main .section').eq(Index2).offset();
        $('html, body').stop().animate({scrollTop : Offset.top}, 600, 'easeOutQuad');
    });

    $('#section0 .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('#section0 .tit-bx').hide();

    });

    $('#section0 .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        $('#section0 .tit-bx').show();
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('#section0 .count').html( i + '<span></span>' + slick.slideCount);
    });

    $('#section0 .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#section0  .prev'),
        nextArrow: $('#section0  .next'),
        accessibility: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 700,
        autoplaySpeed: 15000
    });


    $('#section1 .slick').slick({
        autoplay: false,
        arrows: true,
        dots: true,
        prevArrow: $('#section1  .prev'),
        nextArrow: $('#section1  .next'),
        appendDots: $('#section1 .dots'),
        customPaging: function(slick,index) {
            return '<a href="#" onclick="return false;" role="button">' + (index + 1) + '</a>';
        },
        accessibility: true,
        infinite: false,
        slidesToScroll: 1,
        variableWidth: true,
        pauseOnHover: false,
        speed: 700,
    });


    $('#section3 .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('#section3  .prev'),
        nextArrow: $('#section3  .next'),
        accessibility: true,
        infinite: false,
        slidesToScroll: 1,
        variableWidth: true,
        pauseOnHover: false,
        speed: 700,
    });

   
});

