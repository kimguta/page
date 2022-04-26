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


    var cnt0 = 0;
    var cntend = $("#visual .d-num").text();
    counterFn();

    function counterFn() {
        id0 = setInterval(count0Fn, 100);
        function count0Fn() {
            cnt0++;
            if (cnt0 > cntend) {
            clearInterval(id0);
            } else {
            $("#visual .d-num").text(cnt0);
            }
        }
    };



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
    });




    
    $('#gallery .control .bttn').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#gallery .control .play').css('display','inline-block');
            $('#gallery .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#gallery .control .pause').css('display','inline-block');
            $('#gallery .slick').slick('slickPlay');
        }
    });

    $('#gallery .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#gallery .prev'),
        nextArrow: $('#gallery .next'),
        accessibility: true,
        infinite: true,
        fade: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide :true,
        speed: 500,
        autoplaySpeed: 5000,
        responsive: [{
            breakpoint: 761,
            settings: {
				slidesToShow: 3,
                variableWidth: true,
                centerMode: true,
            }
        }]
    });

    let timer = null;
	$(window).on('resize', function () {
		clearTimeout(timer);
		timer = setTimeout(function () {
			$('#visual .slick').slick('refresh');
            $('#web .slick').slick('refresh');
            $('#gallery .slick').slick('refresh');
		}, 150);
	});

    
});

