$(function() {	
	$(window).on('scroll load', function () {
	    if ($(document).scrollTop() > 45) {
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

	$('#header .open').on('click', function (e) {
        e.preventDefault();
		$('#header nav').toggleClass('active');
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

	$('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});
});
