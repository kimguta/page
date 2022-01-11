$(document).on('ready ajaxComplete', function(){

    setTimeout(function() {
        AOS.init({
            easing: 'ease',
            duration: 1200,
            delay: 200,
            once: true,
            offset: 50,
        });
     }, 200);

  
     $('#visual .slick').slick({
        autoplay: true,
        arrows: false,
        dots: true,
        accessibility: true,
        customPaging: function(slick,index) {
            return '<a href="#" onclick="return false;" role="button">' + index + '</a>';
        },
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 800,
        autoplaySpeed: 6000
    });



    $('#web .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('#web .prev'),
        nextArrow: $('#web .next'),
        accessibility: true,
        infinite: true,
        fade: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        variableWidth: true,
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

    $("#header").prepend('<a href="#" class="logo-bx"><img src="/page/eroom/images/common/logo01.png" alt="강원도평생교육정보망 이룸"></a>');
    
});

