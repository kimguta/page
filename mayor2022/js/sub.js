$(function() {

	$('#sub .share .open').on('click', function (e) {
		e.preventDefault();
		$(this).next().fadeIn(200);
	});

	$('#sub .share .close').on('click', function (e) {
		e.preventDefault();
		$(this).parent('div').fadeOut(200);
	});

	$('#sub .share ul a:last').on('focusout', function () {
		$('#content .share .open').focus();
	});

	 $('.pledge h4 a').on('click', function (e) {
		var Position = $('.pledge .bx02').offset();
		e.preventDefault();
		if ($(this).parent('h4').hasClass('active')) {
            $(this).parent('h4').removeClass('active');
			$(this).parent('h4').next('ul').slideUp(300);
        }else{
            $('.pledge h4').removeClass('active');
			$('.pledge .bx02 ul').slideUp(300);
			$(this).parent('h4').addClass('active');
			$(this).parent('h4').next('ul').slideDown(300);
        }
		$('html, body').animate({
			scrollTop : Position.top
		}, 300);
	});

	$('.schedule li a').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
            $(this).removeClass('active');
			$(this).next('.bx').fadeOut(100);
        }else{
            $('.schedule li a').removeClass('active');
			$('.schedule li .bx').fadeOut(100);
			$(this).addClass('active');
			$(this).next('.bx').fadeIn(100);
        }
	});


	$('.promise h5 a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent('h5').hasClass('active')) {
            $(this).parent('h5').removeClass('active');
        }else{
            $('.promise h5').removeClass('active');
			$(this).parent('h5').addClass('active');
        }
	});

	
});
