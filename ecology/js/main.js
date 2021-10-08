$(function() {

    setTimeout(function() {
        AOS.init({
            easing: 'ease',
            duration: 1200,
            delay: 200,
            once: true,
            offset: 50,
        });
     }, 200);


    $('#visual .bg-bx > div a').on('mouseenter', function (e) {
        e.preventDefault();

        if ($(this).parent('div').hasClass('active')) {
            
        }
        else {
            $('#visual .bg-bx div').removeClass('bg');
            $('#visual .bg-bx div.active').addClass('bg').delay(100).removeClass('active');
            $(this).parent('div').addClass('active');

            var idx = $(this).parent('div').index();

            $('#visual .inner .item').hide();
            $('#visual .inner .item').eq(idx).fadeIn(1000);
        }
    });

    $('#vr360 .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#vr360 .prev'),
        nextArrow: $('#vr360 .next'),
        accessibility: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 800,
        autoplaySpeed: 10000
    });


    $('#gift .tab a').on('click', function (e) {
        e.preventDefault();
        $('#gift .tab a').removeClass('active');
        $(this).addClass('active');

        var idx = $(this).index();
        $('#gift .view-bx > div').hide();
        $('#gift .view-bx > div').eq(idx).show();

    });

 
});

