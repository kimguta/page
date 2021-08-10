$('#visual .slick').slick({
    autoplay: true,
    arrows: true,
    dots: true,
    prevArrow: ('#visual .prev'),
    nextArrow: ('#visual .next'),
    appendDots: ('#visual .dots'),
    accessibility: false,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500
});
$('#visual .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('#visual h2').fadeOut();
});
$('#visual .slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    $('#visual h2').fadeIn();
});
// $('#course .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
//     $('#course header').fadeOut();
// });
// $('#course .slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
//     $('#course header').fadeIn();
// });

$('#course .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
    $('#course .slick .slick-slide:not(.slick-active) a').attr('tabindex','-1');
    $('#course .slick .slick-slide.slick-active a').attr('tabindex','0');
 });

$('#course .slick').slick({
    autoplay: false,
    arrows: true,
    dots: false,
    prevArrow: ('#course .prev'),
    nextArrow: ('#course .next'),
    accessibility: false,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500
});

$('#event .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
    $('#event .slick .slick-slide:not(.slick-active) a').attr('tabindex','-1');
    $('#event .slick .slick-slide.slick-active a').attr('tabindex','0');
 });



$('#event .slick').slick({
    autoplay: false,
    arrows: true,
    dots: false,
    prevArrow: ('#event .prev'),
    nextArrow: ('#event .next'),
    accessibility: false,
    draggable: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    zIndex: 1,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500,
    responsive: [{
            breakpoint: 426,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
    ]
});
$('#visual .control button').not('.prev, .next').on('click', function (e) {
    e.preventDefault();
    var targetClass = $(this).attr('class');
    console.log(targetClass);
    if (targetClass === 'pause') {
        $(this).hide();
        $('#visual .play').show();
        $('#visual .slick').slick('pause');
    } else if (targetClass === 'play') {
        $(this).hide();
        $('#visual .pause').show();
        $('#visual .slick').slick('play');
    }
});
$('#visual .searchs > button').on('click', function (e) {
    e.preventDefault();
    $('#visual .searchs > button').removeClass('active');
    $(this).addClass('active');
    $('#visual .searchs > div').hide();
    $(this).next('div').show();
    $('.keyword-wrap a:first').focus();
    
});
$('#visual .searchs > div .btn-close').on('click', function (e) {
    e.preventDefault();
    $('#visual .searchs > button').removeClass('active');
    $(this).parent().hide();
});
// $(window).on('load resize', function () {
//     var slickHeight = $('#visual .slick-wrap').height();
//     if ($(window).width() > 1024) {
//         $('#visual .dots').css('top', (slickHeight - $('#visual .dots').height() - 137));
//         $('#visual .control').css('top', (slickHeight - $('#visual .control').height() - 113));
//     }
// });


$('#notify .slick').slick({
    autoplay: true,
    arrows: true,
    dots: false,
    prevArrow: ('#notify .prev'),
    nextArrow: ('#notify .next'),
    accessibility: false,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    zIndex: 1,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500
});

$('#notify .control p').html('<em>1</em> / ' + parseInt($('#notify .slick a').size()));
$('#notify .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('#notify .control p').html('<em>' + i + '</em> / ' + slick.slideCount);
});

$('#notify .control button').not('.prev, .next').on('click', function (e) {
    e.preventDefault();
    var targetClass = $(this).attr('class');
    console.log(targetClass);
    if (targetClass === 'pause') {
        $(this).hide();
        $('#notify .play').show();
        $('#notify .slick').slick('pause');
    } else if (targetClass === 'play') {
        $(this).hide();
        $('#notify .pause').show();
        $('#notify .slick').slick('play');
    }
});


$('#course .next').on('focusout', function () {
    $('#course .slick-active a').focus();
});

$('.searchs').append('<a href="/tour/course/road" class="staroad">속초길자리</a>');
