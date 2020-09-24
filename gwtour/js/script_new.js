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

	$('#header').append('<div class="bg_pc"><div class="inner"></div></div>');

	$('.gnb_pc .depth_01 li').on('mouseover', function () {
		$('#header').addClass('active');
		$('.gnb_pc nav h2').removeClass('active');
		$(this).children('h2').addClass('active');
		$('.gnb_pc nav .depth_02').slideDown(300);
		$('.bg_pc').slideDown(300).addClass('active');
	});

	$('.gnb_pc .depth_01 li').on('mouseout', function () {
		$(this).children('h2').removeClass('active');
	});	

	$('.gnb_pc .depth_01 li:last-child').on('mouseover', function () {
		$('.bg_pc').addClass('on');
	});

	$('.gnb_pc .depth_01 li:last-child').on('mouseout', function () {
		$('.bg_pc').removeClass('on');
	});

	
	$('.gnb_pc h2 a').on('focusin', function () {
		$('#header').addClass('active');
		$('.gnb_pc nav h2').removeClass('active');
		$(this).parent().addClass('active');
		$('.gnb_pc nav .depth_02').slideDown(300);
		$('.bg_pc').slideDown(300).addClass('active');
	});

	$('#header').on('mouseleave', function () {
		$('#header').removeClass('active');
		$('.gnb_pc nav h2').removeClass('active');
		$('.bg_pc').slideUp(300).removeClass('active');
		$('.gnb_pc nav .depth_02').slideUp(300);
	});	

	$('.gnb_pc .depth_02 a:last').on('focusout', function () {
		$('.bg_pc').slideUp(300).removeClass('active');
		$('.gnb_pc nav .depth_02').slideUp(300);
		$('.gnb_pc nav h2').removeClass('active');
		$('#header').removeClass('active');
	});

	
	$('.gnb_pc h3 a').on('mouseover focusin', function () {
		$('.gnb_pc h3').removeClass('active');
		$(this).parent('h3').addClass('active');
	});

	$('.gnb_pc h3 a').on('mouseout focusout', function () {
		$(this).parent('h3').removeClass('active');
	});

	$('#header .sitemap').on('click', function () {
		if ($('#header').hasClass('active')) {
			$('#header').removeClass('active');
			$('.gnb_pc nav .depth_02').slideUp(300);
			$('.bg_pc').slideUp(300).removeClass('active');
			$('.gnb_pc nav h2').removeClass('active');
			} else {
			$('#header').addClass('active');
			$('.gnb_pc nav .depth_02').slideDown(300);
			$('.bg_pc').slideDown(300).addClass('active');
			
		}
	});

	$("#header .sitemap").on('keydown', function(key) {
		if ($('#header').hasClass('active') === false) {
			if (key.keyCode == 13) {
				$('.gnb_pc .depth_01 h2:first a').focus();
			}
		}	
	});

	$("#header").append('<div id="mask_mobile"></div>');

	$('.gnb_mobile .open').on('click', function () {
		$(this).css('display','none');
		$('.gnb_mobile .close').css('display','inline-block');
		$('#mask_mobile').show();
		$('.gnb_mobile .side').show();
		$('.gnb_mobile .side').animate({right:0},400);
		$('body').css('position', 'fixed');
	});

	$('.gnb_mobile .close, #mask_mobile').on('click', function () {
		$('#mask_mobile').hide();
		$('.gnb_mobile .close').css('display','none');
		$('.gnb_mobile .open').css('display','inline-block');
		$('.gnb_mobile .side').animate({right:-414},400, function(){
            $('.gnb_mobile .side').hide();
        });
		$('body').css('position', 'relative');
	});

	 $('.gnb_mobile .side').swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if( direction == "right" ){
                $('#mask_mobile').hide();
				$('.gnb_mobile .side').animate({right:-414},400, function(){
					$('.gnb_mobile .side').hide();
				});
				$('body').css('position', 'relative');
				$('.gnb_mobile .close').css('display','none');
				$('.gnb_mobile .open').css('display','inline-block');
			}
        },
        threshold:30,
		allowPageScroll:"vertical"
    });

	$('.gnb_mobile h2 a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_02').slideUp(300);
		} else{
			$('.gnb_mobile h2').removeClass('active');
			$('.gnb_mobile .depth_02').slideUp(300);
			$(this).parent().addClass('active');
			$(this).parent().next('.depth_02').slideDown(300);
		}
	});

	$('#footer .btn-relation').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).next('ul').slideToggle(300);
	});


});