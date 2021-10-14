$(function() {

	 $('#visual-bx .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next('.view').fadeToggle(100);
	});

	$('#visual-bx .share .close').on('click', function (e) {
		e.preventDefault();
	   $(this).parents('.view').fadeToggle(100);
   });

	$('#content .share .view a:last').on('focusout', function () {
		$('#content .share .open').focus();
		$('.view').fadeOut(100);
	});

	$('#breadcrumb .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).children('span').text('열기');
			$('#breadcrumb .box ul').slideUp(300);
		} else{
			$('#breadcrumb .open').removeClass('active');
			$(this).addClass('active');
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
			$('#breadcrumb .box ul').slideUp(300);
			$(this).next('ul').slideDown(300);
		}
	});

	$('#breadcrumb').on('mouseleave', function (e) {
		e.preventDefault();
		$('#breadcrumb .open span').text('열기');
		$('#breadcrumb .box ul').slideUp(300);
		$('#breadcrumb .box .open').removeClass('active');
	});

	$('#breadcrumb .box ul li:last-child a').on('focusout', function () {
		$(this).parents('.box').children('.open').focus();
	});

	$('.delicious .tab a').on('click', function (e) {
		e.preventDefault();
		$('.delicious .tab a').removeClass('active');
		$(this).addClass('active');

		var idx = $(this).index();
		$('.delicious .view-bx > div').hide();
		$('.delicious .view-bx > div').eq(idx).show();
   });
	
});
