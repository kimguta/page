$(function() {
    $('#content .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next().fadeToggle(100);
	});

	$('#content .share ul a:last').on('focusout', function () {
		$('#content .share .open').focus();
	});

	$('.calendar01 td.possible > a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parents('tr').next('.schedule').fadeOut(300);
		} else {
			$('.calendar01 td').removeClass('active');
			$(this).parent().addClass('active');
			$('.calendar01 .schedule').fadeOut(300);
			$(this).parents('tr').next('.schedule').fadeIn(300);
		}
	});

	$('.event .slick_wrap .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        accessibility: true,
        prevArrow: $('.event .slick_wrap .prev'),
        nextArrow: $('.event .slick_wrap .next'),
        draggable: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
		swipeToSlide: true,
        pauseOnHover: false,
        speed: 1000,
        responsive: [{
            breakpoint: 761,
            settings: {
                slidesToScroll: 1,
                variableWidth: true
            }
        },
         {  
            breakpoint: 992,
            settings: {
                slidesToShow: 3
            }
        }]
    });

    $('.event .slick_wrap02 .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.event .slick_wrap02 .count').html('<em>' + i + '</em> <span>/ </span> <em class="sum">' + slick.slideCount + '</em>');
    });

    $('.event .slick_wrap02 .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        accessibility: true,
        prevArrow: $('.event .slick_wrap02 .prev'),
        nextArrow: $('.event .slick_wrap02 .next'),
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
		swipeToSlide: true,
        pauseOnHover: false,
        speed: 1000,
        responsive: [{
            breakpoint: 761,
            settings: {
                adaptiveHeight: true
            }
        }]
    });

    $('.outcenter .otab a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).index();
		var Position = $('.outbx > div').eq(idx).offset();

		var windowWidth = $(window).width();
		if (windowWidth < 481) {
			var Val = 80
		} else if (windowWidth > 480 && windowWidth < 1400) {
			var Val = 80
		} else {
			var Val = 110
		}
		$('html, body').animate({
			scrollTop : Position.top - Val
		}, 300);
    });
    
    $('.virtual .intro .skbtn').on('mouseover', function () {
		$('.rotate360').addClass('active');
    });
    
    $('.virtual .intro .skbtn').on('mouseout', function () {
		$('.rotate360').removeClass('active');
    });
    
    $('.virtual .mtab a').on('click', function (e) {
        e.preventDefault();
        var Position = $('.virtual .infobx .point').offset();
        var idx = $(this).index();
        var windowWidth = $(window).width();
		if (windowWidth < 481) {
			var Val = 80
        } else if (windowWidth > 480 && windowWidth < 992) {
			var Val = 190
		} else if (windowWidth > 991 && windowWidth < 1200) {
			var Val = 230
		} else {
			var Val = 300
        }
        
        $('iframe').each( function() {
            $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        });  

        if ($(this).hasClass('active')) {
            $(this).removeClass('active'); 
            $('.virtual .mlist').hide();
            $('.virtual .mlist .bx').hide();
        }else{
            $('.virtual .mtab a').removeClass('active');
            $(this).addClass('active');
            $('.virtual .mlist').show();
            $('.virtual .mlist .bx').fadeOut(300);
            $('.virtual .mlist .bx').eq(idx).fadeIn(300);
            $('html, body').animate({
                scrollTop : Position.top + Val
            }, 300);
        }
    });


    $('.touring .infobx a').on('click', function (e) {
        e.preventDefault();
        var idx = $(this).index();
        var Position = $('.touring .map').offset();
        var windowWidth = $(window).width();
		if (windowWidth < 1400) {
			var Val = 60
        } else {
			var Val = 90
        }

        $('.touring .infobx a').removeClass('active'); 
        $(this).addClass('active');
        $('.pinbx .pin').removeClass('active'); 
        $('.pinbx .pin').eq(idx - 1).addClass('active');
        $('.lnkbx a').removeClass('active'); 
        $('.lnkbx a').eq(idx - 1).addClass('active');

        if ($(this).hasClass('all')) {
            $('.lnkbx a').removeClass('active'); 
            $('.pinbx .pin').addClass('active');  
        }

        $('html, body').animate({
            scrollTop : Position.top - Val
        }, 300);
    });

});
