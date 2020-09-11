$(function() {

	var navOffset = $('#header').offset();
	$(window).on('load scroll', function() {
		if ( $(document).scrollTop() > 10 ) {
			$('#header').addClass('fixed');
		}
		else {
			$('#header').removeClass('fixed');
		}
	});

	$('#gnb_pc nav h2 a').on('mouseenter focusin', function () {
		$('#gnb_pc nav h2').removeClass('active');
		$(this).parent().addClass('active');
		$('#gnb_pc nav .depth_02').hide();
		$(this).parent().next('.depth_02').slideDown(400);
	});

	$('#gnb_pc nav .depth_01 > li').on('mouseleave', function () {
		$(this).children('h2').removeClass('active');
		$(this).children('.depth_02').hide();
	});

	$('#gnb_pc nav h3 a').on('mouseenter focusin', function () {
		$('#gnb_pc nav h3').removeClass('active');
		$(this).parent().addClass('active');
		$('#gnb_pc nav .depth_03').hide();
		$(this).parent().next('.depth_03').slideDown(400);
	});

	$('#gnb_pc nav .depth_02 > li').on('mouseleave', function () {
		$(this).children('h3').removeClass('active');
		$(this).children('.depth_03').hide();
	});

	$('#gnb_pc nav .depth_02 a:last').on('focusout', function () {
		$('#gnb_pc nav .depth_02').hide();
		$('#gnb_pc nav h2').removeClass('active');
	});

	$('#gnb_pc nav .depth_03').parent('li').addClass('has_depth');

	$('#gnb_pc .search, #gnb_mobile .search').on('click', function () {
		$('#search').slideToggle(200);
		$('#search_keyword').focus();
	});

	$('#search .go').on('focusout', function () {
		$('#search').slideUp(200);
		$('#gnb_pc .search').focus();
	});

	/*
	$('#search .close').on('click', function () {
		$('#search').slideUp(200);
		$('#gnb_pc nav .search').focus();
	});
	*/

	$('#gnb_pc .sitemap').on('click', function () {
		$('#sitemap').fadeIn(200);
		$('body').css('position', 'fixed');
	});

	$('#sitemap .close').on('click focusout', function () {
		$('#sitemap').fadeOut(200)
		$('#gnb_pc .sitemap').focus()
		$('body').css('position', 'relative');
	});

	$('#sitemap .site_03').parent('li').addClass('has_site');

	$('#sitemap .has_site h3 a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.site_03').slideUp(300);
		} else{
			$('#sitemap .has_site h3').removeClass('active');
			$('#sitemap .site_03').slideUp(300);
			$(this).parent().addClass('active');
			$(this).parent().next('.site_03').slideDown(300);
		}
	});

	$("#header").append('<div id="mask_mobile"></div>');

	$('#gnb_mobile .gnb_open').on('click', function () {
		$('#mask_mobile').show();
		$('#gnb_mobile .side').show();
		$('#gnb_mobile .side').animate({right:0},400);
		$('body').css('position', 'fixed');
	});

	$('#gnb_mobile .close, #mask_mobile').on('click', function () {
		$('#mask_mobile').hide();
		$('#gnb_mobile .side').animate({right:-414},400, function(){
            $('#gnb_mobile .side').hide();
        });
		$('body').css('position', 'relative');
	});

	 $('#gnb_mobile .side').swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if( direction == "right" ){
                $('#mask_mobile').hide();
				$('#gnb_mobile .side').animate({right:-414},400, function(){
					$('#gnb_mobile .side').hide();
				});
				$('body').css('position', 'relative');
			}
        },
        threshold:30,
		allowPageScroll:"vertical"
    });

	$('#gnb_mobile .depth_03').parent('li').addClass('has_site');

	$('#gnb_mobile .depth_01 h2 a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_02').slideUp(300);
		} else{
			$('#gnb_mobile .depth_01 h2').removeClass('active');
			$('#gnb_mobile .depth_02').slideUp(300);
			$(this).parent().addClass('active');
			$(this).parent().next('.depth_02').slideDown(300);
		}
	});

	$('#gnb_mobile .depth_02 .has_site h3 a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_03').slideUp(300);
		} else{
			$('#gnb_mobile .has_site h3').removeClass('active');
			$('#gnb_mobile .depth_03').slideUp(300);
			$(this).parent().addClass('active');
			$(this).parent().next('.depth_03').slideDown(300);
		}
	});

	$('#footer .open').on('click', function () {
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

	$('#btn_top').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 400);
	});

});