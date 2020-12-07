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
		var gheight = $(this).parent('h2').next('.depth_box').outerHeight();
	    $('#gnb_pc .depth_01 h2').removeClass('active');
		$('#gnb_pc .depth_box').hide();
		$('#header').addClass('active');
	    $(this).parent('h2').addClass('active');
		$(this).parent('h2').next('.depth_box').fadeIn(200);
		$('.bg_pc').show().stop().animate({height:gheight},200);
	});

	$('#header').on('mouseleave', function () {
		$('#header').removeClass('active');
		$('#gnb_pc .depth_01 h2').removeClass('active');
		$('#gnb_pc .depth_box').fadeOut(200);
		$('.bg_pc').stop().animate({height:0},200);
	});

	$('#sitemap').on('mouseenter', function () {
		$('#header').removeClass('active');
		$('#gnb_pc .depth_01 h2').removeClass('active');
		$('#gnb_pc .depth_box').fadeOut(200);
		$('.bg_pc').stop().animate({height:0},200);
	});

	$('#header').on('mouseleave', function () {
		$('#header').removeClass('active');
		$('#gnb_pc .depth_01 h2').removeClass('active');
		$('#gnb_pc .depth_box').fadeOut(200);
		$('.bg_pc').stop().animate({height:0},200);
	});

	$('#gnb_pc .depth_01 a:last').on('focusout', function () {
		$('#gnb_pc .depth_01 h2').removeClass('active');
		$('#header').removeClass('active');
		$('#gnb_pc .depth_box').fadeOut(300);
		$('.bg_pc').stop().animate({height:0},200);
	});	

	$('#header .mobile_open').on('click', function (e) {
		e.preventDefault();
	    $(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$('body').addClass('fixed');
			$('#gnb_mobile').addClass('active');
			$('.mo_mask').fadeToggle(200);
			$('#header').addClass('active2');
		} else{
			$('body').removeClass('fixed');
			$('#header .mobile_open').removeClass('active');
			$('#gnb_mobile').removeClass('active');
			$('.mo_mask').fadeOut(200);
			$('body').removeClass('fixed');
			$('#header').removeClass('active2');
		}
	});

	$('.mo_mask').on('click', function (e) {
		e.preventDefault();
		$('#gnb_mobile').removeClass('active');
		$('#header .mobile_open').removeClass('active');
		$(this).fadeOut(200);
		$('body').css('position', 'relative');
	});

	$('#gnb_mobile').swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if( direction == "right" ){
                $('.mo_mask').hide();
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
			$(this).parent().next('.depth_box').slideUp(300);
		} else{
            $('#gnb_mobile h2').removeClass('active');
            $('#gnb_mobile .depth_box').slideUp(300);
            $(this).parent().addClass('active');
            $(this).parent().next('.depth_box').slideDown(300);
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

	$('#header .language .open').on('click', function (e) {
		e.preventDefault();
	    $(this).toggleClass('active');
		$(this).next('ul').slideToggle(200);
	});

	$('#header .language ul a:last').on('focusout', function (e) {
		$('#header .language .open').focus();
	});

	$('#header .sitemap').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$('#sitemap').fadeIn(200);
			$('body').css('position', 'fixed');
			$('.bg_mask').fadeIn(200);
        } else {
			$('#sitemap').fadeOut(200);
			$('body').css('position', 'relative');
			$('.bg_mask').fadeOut(200);
        }
	});

	$('#sitemap a:last').on('focusout', function (e) {
		$('#header .sitemap').focus();
	});

	$('#sitemap .depth_03').prev('h3').addClass('has_depth');

	$('#sitemap .depth_02 h3.has_depth a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_03').slideUp(300);
		} else{
			$('#sitemap h3').removeClass('active');
			$('#sitemap .depth_03').slideUp(300);
			$(this).parent().addClass('active');
			$(this).parent().next('.depth_03').slideDown(300);
		}
	});

	$('#footer .open').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('#footer .view').slideToggle(300);
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

	$('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});


	
});