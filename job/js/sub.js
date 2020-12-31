$(function() {

	 $('#breadcrumb .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next().fadeToggle(100);
	});

	$('#breadcrumb .share ul a:last').on('focusout', function () {
		$('#breadcrumb .share .open').focus();
	});

});
