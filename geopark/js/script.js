$(function() {
    
    var navOffset = $('#header').offset();

	$(window).on('scroll load', function () {
	    if ($(document).scrollTop() > 30) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});



	$('#gnb_pc .depth_01 li').on('mouseover focusin', function () {
		var offset = $(this).position().left + ($(this).width() / 2 - 16);
		$('#header').addClass('active');
		$('#gnb_pc h2').removeClass('active');
		$(this).children('h2').addClass('active');
		$('#gnb_pc .depth_02').stop().fadeOut(50);
		$(this).children('.depth_02').stop().show();
		$('.bg_pc').show().stop().animate({height:385},250);
		$('#gnb_pc .cycle').stop().animate({'left':offset}, 600,'easeOutCubic');
		$('.mask_pc').show();
	});

	$('#gnb_pc .depth_03').prev('h3').addClass('has_depth');

	$('#header #gnb_pc h3 a').on('mouseenter focusin', function (e) {
		$('#header #gnb_pc h3').removeClass('active');
		/*
		$('#header #gnb_pc .depth_03').slideUp(250);
		*/
		$(this).parents('li').siblings('li').find('.depth_03').stop().delay(200).slideUp(200);
		$(this).parent().addClass('active');
		$(this).parent().next('.depth_03').stop().slideDown(200);
	});

	$('#header').on('mouseleave', function () {
		$('#header').removeClass('active');
		$('#gnb_pc h2').removeClass('active');
		$('#gnb_pc .depth_02').stop().hide();
		$('.bg_pc').stop().animate({height:0},250);
		$('.mask_pc').hide();
	});	
	

	$('#gnb_pc a:last').on('focusout', function () {
		$('#header').removeClass('active');
		$('#gnb_pc h2').removeClass('active');
		$('#gnb_pc .depth_02').stop().hide();
		$('.bg_pc').stop().animate({height:0},250);
		$('.mask_pc').hide();
	});


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

	$('#header .btn_sitemap').on('click', function (e) {
		e.preventDefault();
	    $('#sitemap').show();
		$('html, body').animate({scrollTop: 0}, 400);
	});

	$('#sitemap .close').on('click', function (e) {
		e.preventDefault();
	    $('#sitemap').hide();
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

});