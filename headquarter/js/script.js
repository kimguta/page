$(function() {

	var navOffset = $('#header').offset();
	$(window).on('scroll', function () {
	    if ($(document).scrollTop() > navOffset.top) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});

    $('.gnb_pc .depth_01 li').on('mouseover', function () {
		var Ttext = $(this).children('h2').text();
		var idx = $(this).index() + 1;
		$('#header').addClass('active');
		$('.gnb_pc nav h2').removeClass('active');
		$(this).children('h2').addClass('active');
		$('.gnb_pc nav .depth_02').stop().slideDown(400);
		$('.bg_pc').stop().slideDown(400).addClass('active');
		/*
		$('.bg_pc h2').text(Ttext);
		$('.bg_pc').attr('class','bg_pc p0'+idx);
		*/
	});

    $('.gnb_pc .depth_01 li').on('mouseout', function () {
		$(this).children('h2').removeClass('active');
	});	

    $('.gnb_pc h2 a').on('focusin', function () {
		$('#header').addClass('active');
		$('.gnb_pc nav h2').removeClass('active');
		$(this).parent().addClass('active');
		$('.gnb_pc nav .depth_02').slideDown(400);
		$('.bg_pc').slideDown(400).addClass('active');
	});

	$('#header').on('mouseleave', function () {
		$('#header').removeClass('active');
		$('.gnb_pc nav h2').removeClass('active');
		$('.bg_pc').stop().slideUp(400).removeClass('active');
		$('.gnb_pc nav .depth_02').stop().slideUp(400);
	});	

	$('.gnb_pc .depth_02 a:last').on('focusout', function () {
		$('.bg_pc').slideUp(400).removeClass('active');
		$('.gnb_pc nav .depth_02').slideUp(400);
		$('.gnb_pc nav h2').removeClass('active');
		$('#header').removeClass('active');
	});

	
	$('.gnb_pc h3 a').on('mouseover focusin', function () {
		$('.gnb_pc h3').removeClass('active');
		$(this).parent('h3').addClass('active');
	});

	$('.gnb_pc h3 a').on('mouseout focusout', function () {
		$(this).parent('h3').removeClass('active');
	});

	$('#header .sitemap').on('click', function (e) {
		e.preventDefault();
		if ($('#header').hasClass('active')) {
			$('#header').removeClass('active');
			$('.gnb_pc nav .depth_02').slideUp(400);
			$('.bg_pc').slideUp(400).removeClass('active');
			$('.gnb_pc nav h2').removeClass('active');
			} else {
			$('#header').addClass('active');
			$('.gnb_pc nav .depth_02').slideDown(400);
			$('.bg_pc').slideDown(400).addClass('active');
		}
	});

	$("#header .sitemap").on('keydown', function(key) {
		if ($('#header').hasClass('active') === false) {
			if (key.keyCode == 13) {
				$('.gnb_pc .depth_01 h2:first a').focus();
			}
		}	
	});

    $("#header").append('<div id="mask_mobile"></div>');

	$('.gnb_mobile .open').on('click', function () {
		$(this).css('display','none');
		$('.gnb_mobile .close').css('display','inline-block');
		$('#mask_mobile').show();
		$('.gnb_mobile .side').addClass('active');
		$('body').css('position', 'fixed');
	});

	$('.gnb_mobile .close, #mask_mobile').on('click', function () {
		$('#mask_mobile').hide();
		$('.gnb_mobile .close').css('display','none');
		$('.gnb_mobile .open').css('display','inline-block');
		$('.gnb_mobile .side').removeClass('active'); 
		$('body').css('position', 'relative');
	});

	 $('.gnb_mobile .side').swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if( direction == "right" ){
                $('#mask_mobile').hide();
				$('.gnb_mobile .side').removeClass('active'); 
				$('body').css('position', 'relative');
				$('.gnb_mobile .close').css('display','none');
				$('.gnb_mobile .open').css('display','inline-block');
			}
        },
		allowPageScroll:"vertical",
        threshold:30,
		excludedElements:".noswipe"
    });


	$('.gnb_mobile .depth_02').parents('li').addClass('has_depth');

	$('.gnb_mobile h2 a').on('click', function (e) {
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_02').slideUp(300);
		} else{
             if ($(this).parent().hasClass('on')) {
                $('.gnb_mobile h2, .gnb_mobile h3').removeClass('on');
                $(this).parent().next('.depth_02').slideUp(300);
            }
            else{
                $('.gnb_mobile h2').removeClass('active on');
                $('.gnb_mobile h3').removeClass('on');
                $('.gnb_mobile .depth_02').slideUp(300);
                $(this).parent().addClass('active');
                $(this).parent().next('.depth_02').slideDown(300);
            }
		}
		if ($(this).parents('li').hasClass('has_depth')) {
			e.preventDefault();
		}   
	});

    $('.gnb_mobile .close, #mask_mobile').on('click', function () {
		$('#mask_mobile').hide();
		$('.gnb_mobile .close').css('display','none');
		$('.gnb_mobile .open').css('display','inline-block');
		$('.gnb_mobile .side').removeClass('active'); 
		$('body').css('position', 'relative');
	});

	$('.gnb_mobile .depth_01 h2.on').next('.depth_02').show();

	$(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('#btn_top').fadeIn(100);
        } else {
            $('#btn_top').fadeOut(100);
        }
    });
    
    $("#btn_top").on('click', function() {
        $('html, body').animate({
            scrollTop : 0
        }, 300);
        return false;
    });

	$('#family .slick').slick({
        autoplay: true,
		autoplaySpeed: 3000,
        arrows: true,
        variableWidth: true,
        accessibility: false,
        slidesToScroll: 1,
        draggable: true,
        swipeToSlide: true,
		prevArrow: $('#family .prev'),
        nextArrow: $('#family .next'),
        speed: 1000,
        responsive: [{
                breakpoint: 500, 
                settings: {
                    slidesToScroll: 2,
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1401,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 9999,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                }
            }
        ]
    });

	$('#family .button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
        $(this).hide();
        $('#family .play').css('display','block');
        $('#family .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
        $(this).hide();
        $('#family .pause').css('display','block');
        $('#family .slick').slick('slickPlay');
        }
    });
});