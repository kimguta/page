$(function() {

    $('#breadcrumb .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next('ul').slideUp(300);
			$(this).children('span').text('열기');
		} else{
			$('#breadcrumb .open').removeClass('active');
			$('#breadcrumb .box ul').slideUp(300);
			$(this).addClass('active');
			$(this).next('ul').slideDown(300);
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
		}
	});

	$('#breadcrumb .box ul li:last-child a').on('focusout', function () {
		$(this).parents('.box').children('.open').focus();
	});

    $('#lnb .depth_01 h3.active').next('.depth_02').show();
	$('#lnb .depth_02').closest('li').addClass('has_depth');

    $('#lnb .has_depth h3 a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_02').slideUp(300);
			$(this).children('span').text('열기');
		} else{
			$('#lnb h3').removeClass('active');
			$('#lnb .depth_02').slideUp(300);
			$(this).parent().addClass('active');
			$(this).parent().next('.depth_02').slideDown(300);
			$('#lnb h3 a span').text('열기');
			$(this).children('span').text('닫기');
		}
	});

});
