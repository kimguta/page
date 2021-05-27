$(function() {

	 $('#breadcrumb .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next().fadeToggle(100);
	});

	$('#breadcrumb .share ul a:last').on('focusout', function () {
		$('#breadcrumb .share .open').focus();
	});

	$('#breadcrumb .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next('.bx').slideUp(200);
			$(this).children('span').text('열기');
		} else{
			$('#breadcrumb .open').removeClass('active');
			$('#breadcrumb .btn .bx').slideUp(200);
			$(this).addClass('active');
			$(this).next('.bx').slideDown(200);
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
		}
	});

	$('.toggletap > li a').on('click', function(e) {
		e.preventDefault();
		var idx = $(this).parent().index();
		$('.toggletap > li').removeClass('active');
		$(this).parent().addClass('active');
		$('.terms > div').hide();
		$('.terms > div').eq(idx).show();

	});

	$(".datepicker").datepicker({
        showOn: "button",
        buttonImage: "/page/job/images/sub/calendar.png",
        buttonImageOnly: true,
        dateFormat: 'yy-mm-dd',
        buttonText: "납부일자",  
    });

});


	