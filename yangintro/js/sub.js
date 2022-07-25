
var ObjDoc = $(document);		

ObjDoc.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).children('span').text('열기');
			$('#breadcrumb-bx .box ul').slideUp(250);
		} else{
			$('#breadcrumb-bx .open').removeClass('active');
			$(this).addClass('active');
			$('#breadcrumb-bx .open span').text('열기');
			$(this).children('span').text('닫기');
			$('#breadcrumb-bx .box ul').slideUp(250);
			$(this).next('ul').slideDown(250);
		}
	}
}, '#breadcrumb-bx .bx .open')
.on({
	'mouseleave': function() { 
		$('#breadcrumb-bx .open span').text('열기');
		$('#breadcrumb-bx .box ul').slideUp(300);
		$('#breadcrumb-bx .box .open').removeClass('active');
	}
}, '#breadcrumb-bx')
.on({
	'focusout': function() { 
		$(this).parents('.box').children('.open').focus();
	}
}, '#breadcrumb-bx .box ul li:last-child a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$(this).next('.view').fadeToggle(100);
	}
}, '#title-bx .share .open')
.on({
	'click': function(e) { 
		e.preventDefault();
		$(this).parents('.view').fadeToggle(100);
	}
}, '#title-bx .share .close')
.on({
	'focusout': function() { 
		$('#title-bx .share .open').focus();
		$('.view').fadeOut(100);
	}
}, '#title-bx .share .view a:last');


$(window).on('load', function() {
	//로드 후 스크립트 (ex - slick)

	

});


