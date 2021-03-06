$(function() {
    
    var navOffset = $('#header').offset();
	$(window).on('scroll', function () {
	    if ($(document).scrollTop() > navOffset.top) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});


	$('#gnb_pc .depth_01 li').on('mouseover focusin', function () {
		$('#header').addClass('active');
		$('#gnb_pc h2').removeClass('active');
		$(this).children('h2').addClass('active');
		$('#gnb_pc .depth_02').stop().slideDown(300);
		$('.bg_pc').show().addClass('active').stop().animate({height:430},300);
	});

	$('#gnb_pc .depth_01 li').on('mouseout', function () {
		$(this).children('h2').removeClass('active');
	});	

	$('#header').on('mouseleave', function () {
		$('#header').removeClass('active');
		$('#gnb_pc h2').removeClass('active');
		$('.bg_pc').stop().removeClass('active').animate({height:0},300);
		$('#gnb_pc .depth_02').stop().slideUp(300);
	});	

	$('#gnb_pc h2 a').on('focusin', function () {
		$('#header').addClass('active');
		$('#gnb_pc h2').removeClass('active');
		$(this).parent().addClass('active');
		$('#gnb_pc .depth_02').stop().slideDown(300);
		$('.bg_pc').show().stop().addClass('active').animate({height:430},300);
	});

	$('#gnb_pc .depth_02 a:last').on('focusout', function () {
		$('#header').removeClass('active');
		$('#gnb_pc h2').removeClass('active');
		$('.bg_pc').stop().removeClass('active').animate({height:0},300);
		$('#gnb_pc .depth_02').stop().slideUp(300);
	});

	
	$('#header .search').on('click', function (e) {
		e.preventDefault();
	    $('#search').slideToggle(200);
		$('#srch').focus();
	});

	$('#search .close').on('click focusout', function (e) {
		e.preventDefault();
	    $('#search').slideUp(200);
		$('#header .search').focus();
	});


	$('#header .sitemap').on('click', function (e) {
		e.preventDefault();
		$('#sitemap').toggle();
	});

	$('#sitemap .close').on('click', function (e) {
		e.preventDefault();
		$('#sitemap').toggle();
		$('#header .sitemap').focus();
	});


	$('#header .mopen').on('click', function (e) {
		e.preventDefault();
		$('#header').toggleClass('active2');
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
		$('#header').removeClass('active2');
		$('#gnb_mobile').removeClass('active');
		$('#header .mopen').removeClass('active');
		$('.mask_mobile').fadeOut(200);
		$('body').removeClass('fixed');
	});

	$('#gnb_mobile').swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if( direction == "right" ){
				$('#header').removeClass('active2');
                $('.mask_mobile').hide();
				$('#gnb_mobile').removeClass('active'); 
				$('body').removeClass('fixed');
				$('#header .mopen').removeClass('active');
			}
        },
		allowPageScroll:"vertical",
        threshold:30,
		excludedElements: "label, button, input, select, textarea, .slick"
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