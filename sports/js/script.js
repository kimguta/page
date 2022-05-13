


$(function() {
    
	$(window).on('scroll load', function () {
	    if ($(document).scrollTop() > 80) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});

	$('#header .depth_03').prev('h3').addClass('has_depth');
	$('#header .depth_02').prev('h2').addClass('has_depth');

	function responsive() {
		var ww = $(window).width();
		if(ww > 1199){ 
			pcMode();
		}
		else{
			mobileMode();
		}	
		false;
	}

	responsive();


	function pcMode(){
		$('#header').removeClass('mobile-mode');
		$('#header').addClass('pc-mode');
		$('#header h3 a').on('mouseover focusin', function () {
			$('#header h3').removeClass('active');
			$(this).parent('h3').addClass('active');
			$('.depth_03').stop().slideUp(300);
			$(this).parent('h3').next('.depth_03').stop().slideDown(300);
			
		});
		$('#header .depth_01 li').on('mouseover focusin', function () {
			$('#header').addClass('active');
			$('h2').removeClass('active');
			$(this).children('h2').addClass('active');
			$('.depth_02').stop().show();
			$('.bg_pc').stop().slideDown(350);
			$('#mask').show();
		});

		$('#header').on('mouseleave', function () {
			$('#header').removeClass('active');
			$('h2').removeClass('active');
			$('.depth_02, .bg_pc, #mask').stop().hide();
		});	

		$('#header a:last').on('focusout', function () {
			$('#header').removeClass('active');
			$('h2').removeClass('active');
			$('.depth_02, .bg_pc, #mask').stop().hide();
		});
		
	};

	function mobileMode(){
		$('#header').removeClass('pc-mode');
		$('#header').addClass('mobile-mode');

		$('#header h2.has_depth a').on('click', function (e) {
			e.preventDefault();
			if ($(this).parent().hasClass('active')) {
				$(this).parent('h2').removeClass('active');
				$('.depth_02, .depth_03').stop().slideUp(300);
			} else{
				$('#header h2').removeClass('active');
				$(this).parent('h2').addClass('active');
				$('.depth_02').stop().slideUp(300);
				$(this).parent('h2').next('.depth_02').stop().slideDown(300);
				
			}
		});	

		$('#header h3.has_depth a').on('click', function (e) {
			e.preventDefault();
			if ($(this).parent().hasClass('active')) {
				$(this).parent('h3').removeClass('active');
			} else{
				$('#header h3').removeClass('active');
				$(this).parent('h3').addClass('active');
				$('.depth_03').stop().slideUp(300);
				$(this).parent('h3').next('.depth_03').stop().slideDown(300);
				
			}
		});	

		$('#header .mobile-on').on('click', function (e) {
			e.preventDefault();
			$(this).toggleClass('active');
			$('#header nav').toggleClass('active');
			$('#header').toggleClass('active');
			$('#mask').toggle();
		});	

	};
	

	$('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
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

});

var Wwidth = $(window).outerWidth();
var Height = $(window).outerHeight();

$(window).on('resize orientationchange', function() {
	clearTimeout(window.resizedFinished);
	window.resizedFinished = setTimeout(function(){
	var Wwidth2 = $(window).outerWidth();
	var Height2 = $(window).outerHeight();
	if ( Wwidth != Wwidth2 && Height == Height2){
		document.location.reload();	
		responsive();
	}
	}, 500);
});