

function mobileMode(){
	$('#header .menu').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('#header nav, #header').toggleClass('active');
	});
};


$(function() {

	if($(window).width() < 1200){ 
		mobileMode();
	}
});

