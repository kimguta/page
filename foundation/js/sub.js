$(function() {

    $('#breadcrumb .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).children('span').text('열기');
		} else{
			$('#breadcrumb .open').removeClass('active');
			$(this).addClass('active');
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

	$('.cities .list01').on('scroll', function (e) {
		$(this).addClass('scroll');
	});

	/*
	$('.cities .list01').on('wheel',function(e){
		var wheelDelta = e.originalEvent.wheelDelta;
		e.preventDefault(); 
		if(wheelDelta > 0){
			$(this).scrollLeft(-wheelDelta*3.5 + $(this).scrollLeft());
		}else{
			$(this).scrollLeft(-wheelDelta*3.5 + $(this).scrollLeft());
		}

	});

	*/
});
