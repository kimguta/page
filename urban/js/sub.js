$(function() {

    $('#breadcrumb .box .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).children('span').text('열기');
			$(this).next('ul').slideUp(200);
		} else{
			$('#breadcrumb .open').removeClass('active');
			$(this).addClass('active');
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
			$('#breadcrumb .box ul').slideUp(300);
			$(this).next('ul').slideDown(200);
		}
	});

	$('#svisual').on('mouseleave', function (e) {
		e.preventDefault();
		$(this).children('span').text('열기');
		$('#breadcrumb .box ul').slideUp(300);
		$('#breadcrumb .box .open').removeClass('active');
	});

	$('#breadcrumb .box ul li:last-child a').on('focusout', function () {
		$(this).parents('.box').children('.open').focus();
	});
	

	 $('#breadcrumb .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next().fadeToggle(100);
		$(this).toggleClass('active');
	});

	$('#breadcrumb .share ul a:last').on('focusout', function () {
		$('#breadcrumb .share .open').focus();
	});



	/*
	$(window).on('load resize', function () {
		var windowWidth = $(this).width();
		if (windowWidth > 1199) {
			$('.cities .list01').swipe({
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					if( direction == "left" ){
						$(this).scrollLeft(distance*8 + $(this).scrollLeft());
					}
					else if( direction == "right" ){
						$(this).scrollLeft(-distance*8 + $(this).scrollLeft());
					}
				},
				triggerOnTouchEnd: false,
				allowPageScroll:"vertical",
				threshold: 50,
				excludedElements: "label, button, input, select, textarea, .slick, a",
			});
		}
	});

	*/

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
