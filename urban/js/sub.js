$(function() {

	$('#svisual').on('mouseleave', function (e) {
		e.preventDefault();
		$(this).children('span').text('열기');
		$('#breadcrumb .box ul').slideUp(300);
		$('#breadcrumb .box .open').removeClass('active');
	});

	$('#breadcrumb .box ul li:last-child a').on('focusout', function () {
		$(this).parents('.box').children('.open').focus();
	});

	$('#breadcrumb .share ul a:last').on('focusout', function () {
		$('#breadcrumb .share .open').focus();
	});

	$('.map-page-left .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent('.map-page-left').hasClass('active')) {
			$(this).parent('.map-page-left').removeClass('active');
			$(this).text('열기');
		} else{
            $(this).parent('.map-page-left').addClass('active');
			$(this).text('닫기');
		} 
	});

	$('.map-page-left').swipe({
        swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData) {
			if( direction == "left"){	
				if(distance > 150){
					$('.map-page-left').removeClass('active');
					$('.map-page-left .open').removeClass('active');
					$('.map-page-left .open').text('열기');
					$('.map-page-left').removeAttr('style');
				}else{
					if (phase=="move"){
						$('.map-page-left').css('left',-distance); 
					}
					if (phase=="end"){
						$('.map-page-left').removeAttr('style');
					}
				}
			}
        },
		allowPageScroll:"vertical",
        threshold:0,
		excludedElements: "a, label, button, input, select, textarea, .slick"
    });
	

	$('.map-page-left .all').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parents('.libx').find('input').prop('checked', false);
		} else{
            $(this).addClass('active');
			$(this).parents('.libx').find('input').prop('checked', true);
		} 
	});


	$('.map_view .slick').slick({
        autoplay: false,
        arrows: true,
        dots: true,
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 600
    });

	$('.map_view .year .open').on('click', function (e) {
		$(this).toggleClass('active');
		$(this).next('.ylist').slideToggle(200);
	});

});
