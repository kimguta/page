$(function() {

$(window).on('scroll load', function () {
	if ($(document).scrollTop() > 120) {
		$('#header').addClass('fixed');
	} else {
		$('#header').removeClass('fixed');
	}
});	

$('a[role="button"]').on('keypress', function (key) {
	if (key.keyCode == 32) {
		$(this).trigger('click');
		return false
	}
});


$('#footer .footer_link button').click(function() {
	if ($('#footer .button_link').css('display') == 'none') {
		$('#footer .footer_link button.open').hide();
		$('#footer .footer_link button.close').show();
		$('#footer .button_link').show();

	} else {
		$('#footer .footer_link button.open').show();
		$('#footer .footer_link button.close').hide();
		$('#footer .button_link').hide();
	}
});


});

var Wwidth = $(window).outerWidth();

$(window).on('resize', function() {
	clearTimeout(window.resizedFinished);
	window.resizedFinished = setTimeout(function(){
	var Wwidth2 = $(window).outerWidth();
	if ( (Wwidth > 1199 && Wwidth2 < 1200) || (Wwidth < 1200 && Wwidth2 > 1199) ){
		document.location.reload();	
	}
	}, 500);
});
