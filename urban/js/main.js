$(function() {

     $('#visual .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('#visual .tcbx h2').removeClass('active');
    }); 

    $('#visual .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        $('#visual .tcbx h2').addClass('active');
        var i = (currentSlide ? currentSlide : 0) + 1;
        if( i < 10 && slick.slideCount > 10){
            $('#visual .control .count').html('<em>0' + i + '</em><span>/</span>' + slick.slideCount);
        }
        else if(i > 10 && slick.slideCount < 10){
            $('#visual .control .count').html('<em>' + i + '</em><span>/</span>0' + slick.slideCount);
        }
        else if(i < 10 && slick.slideCount < 10){
            $('#visual .control .count').html('<em>0' + i + '</em><span>/</span>0' + slick.slideCount);
        }
        else{
            $('#visual .control .count').html('<em>' + i + '</em><span>/</span>' + slick.slideCount);
        }
    });

    $('#visual .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        accessibility: true,
        prevArrow: $('#visual .control .prev'),
        nextArrow: $('#visual .control .next'),
        draggable: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1000,
        autoplaySpeed: 5500
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

    $('#topbx .popbtn').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.popup').fadeToggle(200);
        $('.tip').toggleClass('active');
    });

    $('#topbx .closebtn').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.popup').fadeOut(200);
        $('.tip').removeClass('active');
    });

    $('#topbx .tip').on('click', function (e) {
        e.preventDefault();
        $('.popup').fadeOut(200);
        $('.tip').removeClass('active');
    });

    $('#topbx .topbtn').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.topic').toggleClass('active');
        $('.topic > div').fadeToggle(200);
    });
    
    $('#topbx .topic').on('click', function (e) {
        e.preventDefault();
        $('.topic').removeClass('active');
        $('.topic > div').fadeOut(200);
    });

    $('.topic > div a').on('click', function (e) {
        e.stopPropagation();
    });


    $('#map .imgbx a').on('mouseover', function (e) {
        e.preventDefault();
        var idx = $(this).index();
        $('#map').removeAttr('class')
        $('#map').addClass('mp'+idx);
    });


    $('#map .btnbx a').on('click', function (e) {
        e.preventDefault();
        var idx = $(this).index();
        var Offset = $('#map').offset();
        $('#map').removeAttr('class')
        $('#map').addClass('mp'+idx);
        $('#map .btnbx a').removeClass('active');
        $(this).addClass('active');
        $('html, body').animate({
            scrollTop : Offset.top - 70
        }); 
    });

    $('#map .imgbx a').on('mouseout', function (e) {
        e.preventDefault();
        $('#map').removeAttr('class')
        $('#map .btnbx a').removeClass('active');
    });

});

