$(function() {

	 $('#sub .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next().fadeIn(200);
	});

	$('#sub .share .close').on('click', function (e) {
		e.preventDefault();
	   $(this).parent('div').fadeOut(200);
   });

	$('#sub .share ul a:last').on('focusout', function () {
		$('#content .share .open').focus();
	});

	
});
