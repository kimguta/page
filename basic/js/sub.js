
//서브공통 스크립트
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


//콘텐츠 스크립트
function contentScript(){
	var TestOption = {
		autoplay: false,	
		arrows: true,
		accessibility: false,
		dots: false,
		draggable: true,
		infinite: true,
		slidesToShow: 1,
		swipeToSlide: true,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 500,
	};
	initSlick($('.test-slick .slick'), TestOption);

	$('.content1 .btn-test').on('click', function(e){
		e.preventDefault();
		alert('안녕하세요 디큐입니다!!')
	});		

	$('.boGalleryView .boGalleryView-view').slick({
		autoplay: false,
		arrows: true,
		accessibility: false,
		dots:true,
		prevArrow: $('.boGalleryView .boGalleryView-btnPrev'),
		nextArrow: $('.boGalleryView .boGalleryView-btnNext'),
		draggable: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 600,
		adaptiveHeight: true,
	});
};

$(function() {
	contentScript();
});

