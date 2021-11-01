$(function() {
    
    var navOffset = $('#header').offset();

	$(window).on('scroll load', function () {
	    if ($(document).scrollTop() > 30) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});

	var highestBox = 0;
		$('#gnb_pc .depth_02').each(function(){
			if($(this).height() > highestBox){
			highestBox = $(this).height() + 30;
		}
	});
	
	$('#gnb_pc .depth_01 li').on('mouseover focusin', function () {
		var offset = $(this).position().left + ($(this).width() / 2 - 52);
		$('#header').addClass('active');
		$('#gnb_pc h2').removeClass('active');
		$(this).children('h2').addClass('active');
		$('#gnb_pc .depth_02').stop().hide();
		$(this).children('.depth_02').stop().show();
		$('#gnb_pc .cycle').stop().animate({'left':offset}, 600,'easeOutCubic');
		$('.mask_pc').show();
	});

	$('#header').on('mouseleave', function () {
		$('#header').removeClass('active');
		$('#gnb_pc h2').removeClass('active');
		$('#gnb_pc .depth_02').stop().fadeOut(200);
		$('.mask_pc').hide();
	});	
	

	$('#gnb_pc a:last').on('focusout', function () {
		$('#header').removeClass('active');
		$('#gnb_pc h2').removeClass('active');
		$('#gnb_pc .depth_02').stop().hide();
		$('.mask_pc').hide();
	});



	$('#header .lang .btn').on('click', function (e) {
        e.preventDefault();
		$(this).toggleClass('active');
	});

	$('#header .lang > div a:last').on('focusout', function (e) {
        e.preventDefault();
		$('#header .lang .btn').removeClass('active').focus();
	});
	
	$('#header .btn_sitemap').on('click', function (e) {
        e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('#sitemap').hide().removeClass('active');
			$('.mask_mobile').hide();
			$('#header').removeClass('active-m');
		} else{
			$(this).addClass('active');
			$('#sitemap').show().addClass('active');
			$('#sitemap a:first').focus();
			$('.mask_mobile').show();
			$('#header').addClass('active-m');
		}
	});

	$('.mask_mobile').on('click', function (e) {
		e.preventDefault();
		$('#header .btn_sitemap').removeClass('active');
		$('#sitemap').hide().removeClass('active');
		$(this).hide();
		$('#header').removeClass('active-m');
	});

	$('#sitemap .bx').prev('h3').addClass('has_depth');
	
	$('#sitemap h3.has_depth a').on('click', function (e) {
        e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.bx').slideUp(400);
		} else{
			$('#sitemap h3').removeClass('active');
			$('#sitemap .bx').slideUp(400);
			$(this).parent().addClass('active');
			$(this).parent().next('.bx').slideDown(400);
		}
	});

	if($(window).width() < 1400) { 
		$('#sitemap').swipe({
			swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData) {
				if( direction == "right"){	
					if(distance > 150){
						$('.mask_mobile').hide();
						$('#sitemap').removeClass('active');
						$('#sitemap').removeAttr('style');
						$('#header .btn_sitemap').removeClass('active');
					}else{
						if (phase=="move"){
							$('#sitemap').css('right',-distance).css('transition','none'); 
						}
						if (phase=="end"){
							$('#sitemap').removeAttr('style');
						}
					}
				}
			},
			allowPageScroll:"vertical",
			threshold:0,
			excludedElements: "a, label, button, input, select, textarea, .slick"
		});
		$('#sitemap h3').prev('h2').addClass('has_depth');

		$('#sitemap h2.has_depth a').on('click', function (e) {
			e.preventDefault();
			if ($(this).parent().hasClass('active')) {
				$(this).parent().removeClass('active');
				$(this).parents('li').removeClass('active');
				$(this).parents('li').find('h3').stop().slideUp(400).removeClass('active');
				$('#sitemap .bx').stop().slideUp(400);
			} else{
				$('#sitemap h2').removeClass('active');
				$('#sitemap li').removeClass('active');
				$('#sitemap h3').stop().slideUp(400).removeClass('active');
				$(this).parent().addClass('active');
				$(this).parents('li').addClass('active');
				$(this).parents('li').find('h3').stop().slideDown(400);
				$('#sitemap .bx').stop().slideUp(400);
			}
		});

	};	

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
