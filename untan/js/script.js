$(function() {


var navOffset = $('#header').offset();

$(window).on('scroll load', function () {
	if ($(document).scrollTop() > 30) {
		$('#header').addClass('fixed');
	} else {
		$('#header').removeClass('fixed');
	}
});


$('#gnb_pc .depth_01 li').on('mouseover focusin', function () {
	$('#header').addClass('active');
	$(this).children('h2').addClass('active');
});

$('#gnb_pc .depth_01 li').on('mouseleave focusout', function () {
	$('#header').addClass('active');
	$(this).children('h2').removeClass('active');
});


$('#gnb_mobile .depth_02').prev('h2').addClass('has_depth');
$('#gnb_mobile h2.active').next('.depth_02').show();

	
$('#gnb_mobile h2.has_depth a').on('click', function (e) {
	e.preventDefault();
	if ($(this).parent().hasClass('active')) {
		$(this).parent().removeClass('active');
		$(this).parent().next('.depth_02').slideUp(300);
	} else{
		$('#gnb_mobile h2').removeClass('active');
		$('#gnb_mobile .depth_02').slideUp(400);
		$(this).parent().addClass('active');
		$(this).parent().next('.depth_02').slideDown(300);
	}
});

$('#header .btn_box .menu').on('click', function (e) {
	e.preventDefault();
	$('#gnb_mobile').addClass('active');
});

$('#gnb_mobile .close').on('click', function (e) {
	e.preventDefault();
	$('#gnb_mobile').removeClass('active');
});


$('#gnb_mobile').swipe({
	swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData) {
		if( direction == "right"){	
			if(distance > 150){
				$('#gnb_mobile').removeClass('active');
				$('#gnb_mobile').removeAttr('style');
			}else{
				if (phase=="move"){
					$('#gnb_mobile').css('right',-distance).css('transition','none'); 
				}
				if (phase=="end"){
					$('#gnb_mobile').removeAttr('style');
				}
			}
		}
	},
	allowPageScroll:"vertical",
	threshold:0,
	excludedElements: "a, label, button, input, select, textarea, .slick"
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


$('#footer .family').on('mouseleave', function () {
	$('#footer .open').removeClass('active');
});	

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
