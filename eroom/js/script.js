$(function() {
    
	$(window).on('scroll load', function () {
	    if ($(document).scrollTop() > 80) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});


	$(window).on('load resize', function () {
	    if ($(document).width() > 1199) {
			$('#header').removeClass('mobile-mode');
			$('#header').addClass('pc-mode');
			pcMode();
	
		} else {
			$('#header').removeClass('pc-mode');
			$('#header').addClass('mobile-mode');
			mobileMode();	
		}
	});

	/*
	let timer = null;
	$(window).on('resize', function () {
		clearTimeout(timer);
		timer = setTimeout(function () {
			location.reload();
		}, 150);
	});
	*/


	function pcMode(){
		var highestBox = 0;
		$('.depth_02').each(function(){
			if($(this).height() > highestBox){
				highestBox = $(this).height() + 60;
			}
		});

		$('#gnb .depth_01 li').on('mouseover focusin', function () {
			$('#header').addClass('active');
			$('h2').removeClass('active');
			$(this).children('h2').addClass('active');
			$('.depth_02').stop().show();
			$('.bg_pc').show().css('height',highestBox);
			$('.mask').stop().show();
			var offset = $(this).position().left + ($(this).width() / 2 - 55);
			$('.cycle').stop().animate({'left':offset}, 600,'easeOutCubic');	
		});

		$('#gnb').on('mouseleave', function () {
			$('#header').removeClass('active');
			$('h2').removeClass('active');
			$('.depth_02, .bg_pc, .mask').hide();
		});	

		$('#gnb h2 a').on('focusin', function () {
			$('#header').addClass('active');
			$('h2').removeClass('active');
			$(this).parent().addClass('active');
			$('.depth_02, .mask').show();
			$('.bg_pc').show().css('height',highestBox);
		});

		$('#gnb a:last').on('focusout', function () {
			$('#header').removeClass('active');
			$('h2').removeClass('active');
			$('.depth_02, .bg_pc, .mask').hide();
		});
	};

	function mobileMode(){
		$('#gnb h2 a').on('click', function (e) {
			e.preventDefault();
			if ($(this).parent().hasClass('active')) {
				$(this).parent().removeClass('active');
			} else{
				$('h2').removeClass('active');
				$(this).parent().addClass('active');
			}
		});

		$('.mobile-on').on('click', function (e) {
			e.preventDefault();
			$('#header').addClass('active');
			$('.mask').stop().show();
		});

		$('.mobile-off, .mask').on('click', function (e) {
			e.preventDefault();
			$('#header').removeClass('active');
			$('.mask').stop().hide();
		});

		$('#gnb').swipe({
			swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData) {
				if( direction == "right"){	
					if(distance > 150){
						$('.mask').hide();
						$('#header').removeClass('active');
						$('#gnb').removeAttr('style');
					}else{
						if (phase=="move"){
							$('#gnb').css('right',-distance).css('transition','none'); 
						}
						if (phase=="end"){
							$('#gnb').removeAttr('style');
						}
					}
				}
			},
			allowPageScroll:"vertical",
			threshold:0,
			excludedElements: "a, label, button, input, select, textarea, .slick"
		});

	};
	

	$('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});	

	$('#btn_top').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 400);
	}); 

	var currentPosition = parseInt($("#btn_top").css("top"));
	$(window).on('scroll', function () {
		var posY = $(window).scrollTop();
		$("#btn_top").stop().animate({"top":posY+currentPosition+"px"},500);
		if ( posY > 100 ){
			$("#btn_top").css('opacity','.8');
		} else if(posY < 100) {
			$("#btn_top").css('opacity','0');
		};
	});


	$('#footer .control .bttn').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#footer .control .play').css('display','inline-block');
            $('#footer .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#footer .control .pause').css('display','inline-block');
            $('#footer .slick').slick('slickPlay');
        }
    });

	$('#footer .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
		prevArrow: $('#footer .prev'),
        nextArrow: $('#footer .next'),
        accessibility: true,
        infinite: true,
		slidesToShow: 7,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 300,
		variableWidth: true,
		swipeToSlide: true,
		autoplaySpeed: 3000,
		responsive: [{
            breakpoint: 761,
            settings: {
				slidesToShow: 3,
            }
        }]
    });

	$('#footer .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next('.view').slideUp(300);
		} else{
			$('#footer .open').removeClass('active');
			$(this).addClass('active');
			$('.view').slideUp(300);
			$(this).next('.view').slideDown(300);
		} 
	});

	$('#footer .view a:last-child').on('focusout', function () {
		$('#footer .open').removeClass('active');
		$('.view').slideUp(300);
		$(this).parent('.view').prev('.open').focus();
		
	});

	$('#footer .family').on('mouseleave', function () {
		$('#footer .open').removeClass('active');
		$('.view').slideUp(300);
	});	
});