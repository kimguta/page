$(function() {

    $('#breadcrumb .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next('ul').slideUp(200);
			$(this).children('span').text('열기');
		} else{
			$('#breadcrumb .open').removeClass('active');
			$('#breadcrumb .box ul').slideUp(200);
			$(this).addClass('active');
			$(this).next('ul').slideDown(200);
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
		}
	});

	$('#breadcrumb .box ul li:last-child a').on('focusout', function () {
		$(this).parents('.box').children('.open').focus();
	});
	

	 $('#content .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next().fadeToggle(100);
	});

	$('#content .share ul a:last').on('focusout', function () {
		$('#content .share .open').focus();
	});


});
