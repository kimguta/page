$(function() {
    $('#content .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next().fadeToggle(100);
	});

	$('#content .share ul a:last').on('focusout', function () {
		$('#content .share .open').focus();
	});

	$('.calendar01 td.possible > a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parents('tr').next('.schedule').fadeOut(300);
		} else{
			$('.calendar01 td').removeClass('active');
			$(this).parent().addClass('active');
			$('.calendar01 .schedule').fadeOut(300);
			$(this).parents('tr').next('.schedule').fadeIn(300);
		}
	});

});
