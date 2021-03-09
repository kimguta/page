$(function() {
    
     var navOffset = $('#header').offset();
	$(window).on('scroll', function () {
	    if ($(document).scrollTop() > navOffset.top) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});

	$('#gnb_pc .depth_01 h2 a').on('mouseenter focusin', function () {
		$('#header').addClass('active');
		$('#gnb_pc .depth_01 h2').removeClass('active');
		$('#gnb_pc .depth_02').hide();
	    $(this).parent('h2').addClass('active');
		$(this).parent('h2').next('.depth_02').show();
		$('.bg_pc').show().stop().animate({height:130},300);
		$('.bg_pc').addClass('active');
	});

	$('#header').on('mouseleave', function () {
		$('#header').removeClass('active');
		$('#gnb_pc .depth_01 h2').removeClass('active');
		$('#gnb_pc .depth_02').hide();
		$('.bg_pc').stop().animate({height:0},300);
		$('.bg_pc').removeClass('active');
	});

	$('#gnb_pc .depth_01 a:last').on('focusout', function () {
        $('#header').removeClass('active');
		$('#gnb_pc .depth_01 h2').removeClass('active');
		$('#gnb_pc .depth_02').hide();
		$('.bg_pc').animate({height:0},300);
		$('.bg_pc').removeClass('active');
	});	


	$('#header .mobile_open').on('click', function (e) {
		e.preventDefault();
		$('#gnb_mobile').addClass('active');
		$('.mask_mobile').fadeIn(200);
		$('body').addClass('fixed');
	});


	$('#header .mobile_close').on('click', function (e) {
		e.preventDefault();
		$('#gnb_mobile').removeClass('active');
		$('.mask_mobile').fadeOut(200);
		$('body').removeClass('fixed');
	});

	$('.mask_mobile').on('click', function (e) {
		e.preventDefault();
		$('#gnb_mobile').removeClass('active');
		$('#header .mobile_open').removeClass('active');
		$('.mask_mobile').fadeOut(200);
		$('body').removeClass('fixed');
	});

	$('#gnb_mobile').swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if( direction == "right" ){
                $('.mask_mobile').hide();
				$('#gnb_mobile').removeClass('active'); 
				$('body').removeClass('fixed');
			}
        },
		allowPageScroll:"vertical",
        threshold:30,
		excludedElements: "label, button, input, select, textarea, .slick"
    });

	$('#gnb_mobile h2 a').on('click', function (e) {
        e.preventDefault();		
		if ($(this).parents('li').hasClass('active')) {
			$(this).parents('li').removeClass('active');
			$(this).parent().next('.depth_02').slideUp(300);
		} else{
            $('#gnb_mobile .depth_01 > li').removeClass('active');
            $('#gnb_mobile .depth_02').slideUp(300);
            $(this).parents('li').addClass('active');
            $(this).parent().next('.depth_02').slideDown(300);
		} 
	});

    
	$('#btn_top').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 400);
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

	/*

	$('#footer .open').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('#footer .view').slideToggle(300);
	});

	$('#footer .view a:last').on('focusout', function () {
		$('#footer .open').removeClass('active');
		$('#footer .view').slideUp(300);
		$('#footer .open').focus();
	});

	$('#footer .family').on('mouseleave', function () {
		$('#footer .open').removeClass('active');
		$('#footer .view').slideUp(300);
		$('#footer .open').focus();
	});
	*/

	$('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});

});