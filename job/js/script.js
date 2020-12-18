$(function() {

	$(window).on('scroll', function () {
	    if ($(document).scrollTop() > 10) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});


	$('#gnb_pc h2 a').on('mouseover focusin', function () {
		$('#header').addClass('active');
		$('#gnb_pc h2').removeClass('active');
		$(this).parent('h2').addClass('active');
		$('.sitemap').addClass('active');
		$('#gnb_pc .depth_02').stop().slideDown(200);
		$('.bg_pc').show().stop().animate({height:300},200);
	});

	$('#gnb_pc h2 a').on('mouseout', function () {
		$(this).parent('h2').removeClass('active');
	});	


	$('#header').on('mouseleave', function () {
		$('#header').removeClass('active');
		$('#gnb_pc h2').removeClass('active');
		$('.bg_pc').stop().animate({height:0},200);
		$('#gnb_pc .depth_02').stop().slideUp(200);
		$('.sitemap').removeClass('active');
	});	

	$('#gnb_pc .depth_02 a:last').on('focusout', function () {
		$('#header').removeClass('active');
		$('#gnb_pc h2').removeClass('active');
		$('.bg_pc').stop().animate({height:0},200);
		$('.gnb_pc .depth_02').stop().slideUp(200);
		$('.sitemap').removeClass('active');
	});

	
	$('#gnb_pc h3 a').on('mouseover focusin', function () {
		$('.gnb_pc h3').removeClass('active');
		$(this).parent('h3').addClass('active');
	});

	$('#gnb_pc h3 a').on('mouseout focusout', function () {
		$(this).parent('h3').removeClass('active');
	});

	$('#header .sitemap').on('click', function (e) {
		e.preventDefault();
		if ($('#header').hasClass('active')) {
				$('#header').removeClass('active');
				$('#gnb_pc .depth_02').stop().slideUp(200);
				$('.bg_pc').stop().animate({height:0},200);
				$('.gnb_pc h2').removeClass('active');
				$(this).removeClass('active');
			} 
		else {
				$('#header').addClass('active');
				$('#gnb_pc .depth_02').stop().slideDown(200);
				$('.bg_pc').show().stop().animate({height:300},200);
				$(this).addClass('active');
			}
	});

	$("#header .sitemap").on('keydown', function(key) {
		if ($('#header').hasClass('active') === false) {
			if (key.keyCode == 13) {
				$('#gnb_pc h2:first a').focus();
			}
		}	
	});

	$('#header .mobile_open').on('click', function (e) {
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
		$('#header .mobile_open').removeClass('active');
		$('.mask_mobile').fadeOut(200);
		$('body').css('position', 'relative');
	});

	$('#gnb_mobile').swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if( direction == "right" ){
                $('.mask_mobile').hide();
				$('#gnb_mobile').removeClass('active'); 
				$('body').css('position', 'relative');
				$('#header .mobile_open').removeClass('active');
			}
        },
		allowPageScroll:"vertical",
        threshold:30,
		excludedElements: "label, button, input, select, textarea, .slick"
    });


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

	$('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});

});