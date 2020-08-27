$(function() {
    
     var navOffset = $('#header').offset();
	$(window).on('scroll', function () {
	    if ($(document).scrollTop() > navOffset.top) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});

    $('#gnb_pc .depth_01 li').on('mouseover', function () {
        /*
		var Ttext = $(this).children('h2').text();
		var idx = $(this).index() + 1;
        */
		$('#header').addClass('active');
		$('#gnb_pc nav h2').removeClass('active');
		$(this).children('h2').addClass('active');
		$('#gnb_pc nav .depth_02').slideDown(400);
		$('.bg_pc').slideDown(400).addClass('active');
		/*
		$('.bg_pc h2').text(Ttext);
		$('.bg_pc').attr('class','bg_pc p0'+idx);
		*/
	});

    $('#gnb_pc h2 a').on('focusin', function () {
		$('#header').addClass('active');
		$('#gnb_pc nav h2').removeClass('active');
		$(this).parent().addClass('active');
		$('3gnb_pc nav .depth_02').slideDown(300);
		$('.bg_pc').slideDown(300).addClass('active');
	});

    $('#gnb_pc .depth_01 li').on('mouseout', function () {
		$(this).children('h2').removeClass('active');
	});

    $('#header').on('mouseleave', function () {
		$('#header').removeClass('active');
		$('#gnb_pc nav h2').removeClass('active');
		$('.bg_pc').slideUp(300).removeClass('active');
		$('#gnb_pc nav .depth_02').slideUp(300);
	});	

    $('#gnb_pc .depth_02 a:last').on('focusout', function () {
        $('#header').removeClass('active');
		$('.bg_pc').slideUp(400).removeClass('active');
		$('#gnb_pc nav .depth_02').slideUp(400);
		$('#gnb_pc nav h2').removeClass('active');
	});


    $('#gnb_pc h3 a').on('mouseover focusin', function () {
		$('#gnb_pc h3').removeClass('active');
		$(this).parent('h3').addClass('active');
	});

	$('#gnb_pc h3 a').on('mouseout focusout', function () {
		$(this).parent('h3').removeClass('active');
	});

    $('#header .sitemap').on('click', function () {
		if ($('#header').hasClass('active')) {
            $('#header').removeClass('active');
            $('#gnb_pc nav .depth_02').slideUp(300);
            $('.bg_pc').slideUp(300).removeClass('active');
            $('#gnb_pc nav h2').removeClass('active');
            $(this).text('메뉴열기').attr('title', '메뉴열기');
		} else {
            $('#header').addClass('active');
            $('#gnb_pc nav .depth_02').slideDown(300);
            $('.bg_pc').slideDown(300).addClass('active');
            $(this).text('메뉴닫기').attr('title', '메뉴닫기');
		}
	});

    $("#header .sitemap").on('keydown', function(key) {
		if ($('#header').hasClass('active') === false) {
			if (key.keyCode == 13) {
				$('#gnb_pc .depth_01 h2:first a').focus();
			}
		}	
	});



    $('#gnb_mobile .open').on('click', function () {
		$(this).css('display','none');
        $('.mask_mobile').show();
		$('#gnb_mobile .close').css('display','inline-block');
		$('#gnb_mobile .side').addClass('active');
		$('body').css('position', 'fixed');
	});

	$('#gnb_mobile .close, .mask_mobile').on('click', function () {
		$('.mask_mobile').hide();
		$('#gnb_mobile .close').css('display','none');
		$('#gnb_mobile .open').css('display','inline-block');
		$('#gnb_mobile .side').removeClass('active'); 
		$('body').css('position', 'relative');
	});

    $('#gnb_mobile .side').swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if( direction == "right" ){
                $('.mask_mobile').hide();
				$('#gnb_mobile .side').removeClass('active'); 
				$('body').css('position', 'relative');
				$('#gnb_mobile .close').css('display','none');
				$('#gnb_mobile .open').css('display','inline-block');
			}
        },
		allowPageScroll:"vertical",
        threshold:30,
		excludedElements: "label, button, input, select, textarea, .slick"
    });

    $('#gnb_mobile .depth_02').closest('li').addClass('has_depth');
    $('#gnb_mobile .depth_03').closest('li').addClass('has_depth');
    $('#gnb_mobile .depth_01 h2.active').next('.depth_02').show();
    $('#gnb_mobile .depth_02 h3.active').next('.depth_03').show();

	$('#gnb_mobile .has_depth h2 a').on('click', function (e) {
        e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_02').slideUp(300);
		} else{
            $('#gnb_mobile h2').removeClass('active on');
            $('#gnb_mobile h3').removeClass('on');
            $('#gnb_mobile .depth_02').slideUp(300);
            $(this).parent().addClass('active');
            $(this).parent().next('.depth_02').slideDown(300);
		} 
	});

    $('#gnb_mobile .depth_02 .has_depth h3 a').on('click', function (e) {
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

	$(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('#btn_top').fadeIn(100);
        } else {
            $('#btn_top').fadeOut(100);
        }
    });
    
    $("#btn_top").on('click', function() {
        $('html, body').animate({
            scrollTop : 0
        }, 300);
        return false;
    });


});