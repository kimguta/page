$(function() {

	 $('#content .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next('.view').fadeToggle(100);
	});

	$('#content .share .close').on('click', function (e) {
		e.preventDefault();
	   $(this).parents('.view').fadeToggle(100);
   });

	$('#content .share .view a:last').on('focusout', function () {
		$('#content .share .open').focus();
		$('.view').fadeOut(100);
	});

	$('.map-page-left .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent('.map-page-left').hasClass('active')) {
			$(this).parent('.map-page-left').removeClass('active');
			$(this).text('닫기');
			$(this).attr('title', '닫기');
			// hide search button
			$(".btn-search-choose-field").closest("div").hide();
		} else{
            $(this).parent('.map-page-left').addClass('active');
			$(this).text('열기');
			$(this).attr('title', '열기');
			// show search button
			$(".btn-search-choose-field").closest("div").show();
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
						$('.map-page-left').css('left',-distance).css('transition','none'); 
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
	
});
