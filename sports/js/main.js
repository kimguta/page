var startCountDown = 0;
var endCountDown = Math.abs(moment().diff(moment("2022-06-10"), "days"));
$(function() {
    setTimeout(function() {
        AOS.init({
            easing: 'ease',
            duration: 1000,
            delay: 300,
            once: true,
            offset: 50,
        });
     }, 200);

     $('#visual .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('#visual .text, #visual .inner .day .character').removeClass('active');
    });

     $('#visual .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        $('#visual .text, #visual .inner .day .character').addClass('active');
    });

     $('#visual .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        accessibility: true,
        prevArrow: '<a class="slick-prev" href="#">이전</a>',
        nextArrow: '<a class="slick-next" href="#">다음</a>',
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1200,
        autoplaySpeed: 8000
    });

     if(endCountDown > 0) {
         fnCountDownDisplay(startCountDown, endCountDown);
     }

    $('#event .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: '<a class="slick-prev" href="#">이전</a>',
        nextArrow: '<a class="slick-next" href="#">다음</a>',
        accessibility: true,
        infinite: true,
        fade: false,
        slidesToShow: 7,
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide :true,
        speed: 600,
        responsive: [{
            breakpoint: 1200,
            settings: {
                variableWidth: true,
            }
        }]
    });

    $('#tour .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: '<a class="slick-prev" href="#">이전</a>',
        nextArrow: '<a class="slick-next" href="#">다음</a>',
        accessibility: true,
        infinite: true,
        fade: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide :true,
        speed: 700,
    });  
});

$(window).on('resize', function () {
    $('#event .slick').slick('resize');		
});

var countDownInterval;
function fnCountDownDisplay() {
    countDownInterval = setInterval(fnCountDown, 100);
};

function fnCountDown() {
    startCountDown++;
    if (startCountDown > endCountDown) {
        clearInterval(countDownInterval);
    } else {
        $("#visual .d-num").text(startCountDown);
    }
}