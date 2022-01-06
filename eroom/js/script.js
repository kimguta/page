$(function() {
    
	$(window).on('scroll load', function () {
	    if ($(document).scrollTop() > 30) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});

	$(window).on('resize load', function () {
		if ($(document).width() > 1200) {
			$('#header').removeClass('mobile-mode');
	        $('#header').addClass('pc-mode');

			var highestBox = 0;
			$('.depth_02').each(function(){
				if($(this).height() > highestBox){
					highestBox = $(this).height() + 65;
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
				$('.depth_02, .bg_pc, .mask').show();
				$('.bg_pc').show().css('height',highestBox);
			});

			$('#gnb a:last').on('focusout', function () {
				$('#header').removeClass('active');
				$('h2').removeClass('active');
				$('.depth_02, .bg_pc, .mask').hide();
			});


	    } else {
			$('#header').removeClass('pc-mode');
	        $('#header').addClass('mobile-mode');
	    }
	});

	
	



	/*
	
	

	
	$('#header .mopen').on('click', function (e) {
		e.preventDefault();
	    $(this).toggleClass('active');
		$('#gnb_mobile').toggleClass('active');
		$('.mask_mobile').fadeToggle(200);
		if ($(this).hasClass('active')) {
			$('body').addClass('fixed');
		} else{
			$('body').removeClass('fixed');
		}
	});

	$('.mask_mobile').on('click', function (e) {
		e.preventDefault();
		$('#gnb_mobile').removeClass('active');
		$('#header .mopen').removeClass('active');
		$('.mask_mobile').fadeOut(200);
		$('body').removeClass('fixed');
	});

	$('#gnb_mobile').swipe({
        swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData) {
			if( direction == "right"){	
				if(distance > 150){
					$('.mask_mobile').hide();
					$('#gnb_mobile').removeClass('active');
					$('#gnb_mobile').removeAttr('style');
					$('body').removeClass('fixed');
					$('#header .mopen').removeClass('active');
				}else{
					if (phase=="move"){
						$('#gnb_mobile').css('right',-distance).css('transition','none'); 
					}
					if (phase=="end"){
						$('#gnb_mobile').removeAttr('style');
					}
				}
			}
        },
		allowPageScroll:"vertical",
        threshold:0,
		excludedElements: "a, label, button, input, select, textarea, .slick"
    });





	$('#gnb_mobile .depth_01 h2.active').next('.depth_02').show();
    $('#gnb_mobile .depth_02 h3.active').next('.depth_03').show();

	$('#gnb_mobile h2 a').on('click', function (e) {
        e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_02').slideUp(300);
		} else{
            $('#gnb_mobile h2').removeClass('active');
            $('#gnb_mobile .depth_02').slideUp(300);
            $(this).parent().addClass('active');
            $(this).parent().next('.depth_02').slideDown(300);
		} 
	});


	$('#gnb_mobile .depth_03').prev('h3').addClass('has_depth');
	
    $('#gnb_mobile .depth_02 h3.has_depth a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_03').slideUp(300);
		} else{
			$('#gnb_mobile h3').removeClass('active');
			$('#gnb_mobile .depth_03').slideUp(300);
			$(this).parent().addClass('active');
			$(this).parent().next('.depth_03').slideDown(300);
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


	$('#footer .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else{
			$('#footer .open').removeClass('active');
			$(this).addClass('active');
		} 
	});


	$('#footer .view a:last-child').on('focusout', function () {
		$('#footer .open').removeClass('active');
		$(this).parent('.view').prev('.open').focus();
	});

	$('#footer .family').on('mouseleave', function () {
		$('#footer .open').removeClass('active');
	});	

	$('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});
*/
});