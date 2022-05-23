


function pcMode(){
	$('#header .depth_01 li').on('mouseover focusin', function () {
		$('#header').addClass('active');
		$('#header .depth_01 li').removeClass('active');
		$(this).addClass('active');
		$('.depth_02').stop().slideDown(250);
	});

	$('#header').on('mouseleave', function () {
		$('#header').removeClass('active');
		$('#header .depth_01 li').removeClass('active');
		$('.depth_02').stop().slideUp(250);
	});	

	$('#header .depth_01 a:last').on('focusout', function () {
		$('#header').removeClass('active');
		$('#header .depth_01 li').removeClass('active');
		$('.depth_02').stop().slideUp(250);
	});	
};


function mobileMode(){
	$('#header .depth_01 > li:first-child').addClass('active');
	$('#header h2 a').on('click', function (e) {
		e.preventDefault();
		$('#header .depth_01 li').removeClass('active');
		$(this).parents('li').addClass('active');
	});
	$('#header .menu').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('#header nav').toggleClass('active');
	});
};


$(function() {

	if($(window).width() > 1199){ 
		pcMode();
	}
	else{
		mobileMode();
	}
});
