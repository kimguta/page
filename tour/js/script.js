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
	    $('#gnb_pc .depth_01 h2').removeClass('active');
		$('#gnb_pc .depth_02').hide();
	    $(this).parent('h2').addClass('active');
		$(this).parent('h2').next('.depth_02').slideDown(300);
		$('.depth_02 > li:first-child h3').addClass('active');
		$('.depth_02 > li:first-child .depth_03').show();
		$('.bg_pc').stop().animate({height:122},300);
	});

	$('#gnb_pc .depth_01 li:nth-child(4) h2 a').on('mouseenter focusin', function () {
		$('.bg_pc').stop().animate({height:172},300);
	});

	$('#gnb_pc .depth_02 h3 a').on('mouseover focusin', function () {
	    $('#gnb_pc .depth_02 h3').removeClass('active');
		$('#gnb_pc .depth_03').hide();
	    $(this).parent('h3').addClass('active');
		$(this).parent('h3').next('.depth_03').show();
	});


	$('#header').on('mouseleave', function () {
		$('#gnb_pc .depth_01 h2').removeClass('active');
		$('#gnb_pc .depth_02').hide();
		$('#gnb_pc .depth_02 h3').removeClass('active');
		$('#gnb_pc .depth_03').hide();
		$('.bg_pc').stop().animate({height:0},300);
	});

	$('#gnb_pc .depth_01 a:last').on('focusout', function () {
        $('#header').removeClass('active');
		$('#gnb_pc .depth_01 h2').removeClass('active');
		$('#gnb_pc .depth_02').hide();
		$('#gnb_pc .depth_03').hide();
		$('.bg_pc').animate({height:0},300);
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
		$('#sitemap').fadeToggle(200);
		if ($(this).hasClass('active')) {
			$('body').css('position', 'fixed');
		} else{
			$('body').css('position', 'relative');
		}
	});

	$('#sitemap a:last').on('focusout', function (e) {
		$('#header .sitemap').focus();
	});

	$('#sitemap').on('mouseover', function (e) {
		$('#gnb_pc .depth_01 h2').removeClass('active');
		$('#gnb_pc .depth_02').hide();
		$('#gnb_pc .depth_02 h3').removeClass('active');
		$('#gnb_pc .depth_03').hide();
		$('.bg_pc').stop().slideUp(300);
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

});
