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


	$('.annual .bx h6 a').on('click', function (e) {
		e.preventDefault();

		if ($(this).parents('h6').hasClass('active')) {
			$(this).parents('h6').removeClass('active');
		} else{
			$('.annual .bx h6').removeClass('active');
			$(this).parents('h6').addClass('active');
		}
	});

	$('.annual .bx > div').on('scroll', function (e) {
		$(this).addClass('scroll');
	});


	$('.monthly .bcalendar').on('click', function (e) {
		e.preventDefault();
		$('.blist').removeClass('active');
		$(this).addClass('active');
		$('.listbx').hide();
		$('.calendarbx').show();
   });

   $('.monthly .blist').on('click', function (e) {
		e.preventDefault();
		$('.bcalendar').removeClass('active');
		$(this).addClass('active');
		$('.calendarbx').hide();
		$('.listbx').show();
	});

	$('.tab2 a').on('click', function (e) {
		e.preventDefault();
		$('.tab2 a').removeClass('active');
		$(this).addClass('active');

		if ($(this).hasClass('ty01')) {
			$('.pin').show();
		}
		else if ($(this).hasClass('ty02')){
			$('.pin').hide();
			$('.pin.p01').show();
		}
		else if ($(this).hasClass('ty03')){
			$('.pin').hide();
			$('.pin.p02').show();
		}
		else if ($(this).hasClass('ty04')){
			$('.pin').hide();
			$('.pin.p03').show();
		}
		else if ($(this).hasClass('ty05')){
			$('.pin').hide();
			$('.pin.p04').show();
		}
		else if ($(this).hasClass('ty06')){
			$('.pin').hide();
			$('.pin.p05').show();
		}
	});

});
