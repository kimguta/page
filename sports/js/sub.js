$(function() {

	$('#breadcrumb .bx .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).children('span').text('열기');
			$('#breadcrumb .box ul').slideUp(250);
		} else{
			$('#breadcrumb .open').removeClass('active');
			$(this).addClass('active');
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
			$('#breadcrumb .box ul').slideUp(250);
			$(this).next('ul').slideDown(250);
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


	$('#breadcrumb .share .open').on('click', function (e) {
		e.preventDefault();
	   $(this).next('.view').fadeToggle(100);
   });

   $('#breadcrumb .share .close').on('click', function (e) {
	   e.preventDefault();
	  $(this).parents('.view').fadeToggle(100);
  });

   $('#breadcrumb .share .view a:last').on('focusout', function () {
	   $('#breadcrumb .share .open').focus();
	   $('.view').fadeOut(100);
   });
	
});
