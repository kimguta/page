
//서브공통 스크립트
var ObjDoc = $(document);

ObjDoc.on({
	'click': function(e) {
		e.preventDefault();
		$('.pageTab >li').removeClass('active');
		$(this).parent().addClass('active');
	}
}, '#sub .pageTab >li .pageTab-tab')
.on({
	'click': function(e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).children('span').text('열기');
			$('#breadcrumb .box ul').slideUp(250);
		} else{
			$('#breadcrumb .open').removeClass('active');
			$(this).addClass('active');
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
			$('#breadcrumb .box ul').slideUp(250);
			$(this).next('ul').slideDown(250);
		}
	}
}, '#breadcrumb .bx .open')
ObjDoc.on({
	'click': function(e) {
		e.preventDefault();
		$('.pageTab >li').removeClass('active');
		$(this).parent().addClass('active');
	}
}, '#sub .pageTab >li .pageTab-tab')
.on({
	'mouseleave': function() {
		$('#breadcrumb .open span').text('열기');
		$('#breadcrumb .box ul').slideUp(300);
		$('#breadcrumb .box .open').removeClass('active');
	}
}, '#breadcrumb')
.on({
	'focusout': function() {
		$(this).parents('.box').children('.open').focus();
	}
}, '#breadcrumb .box ul li:last-child a')
.on({
	'click': function(e) {
		e.preventDefault();
		$(this).next('ul').fadeToggle(100);
	}
}, '#breadcrumb .share .open')
.on({
	'click': function(e) {
		e.preventDefault();
		$(this).parents('ul').fadeToggle(100);
	}
}, '#breadcrumb .share .close')
.on({
	'focusout': function() {
		$('#title-bx .share .open').focus();
		$('.view').fadeOut(100);
	}
}, '#breadcrumb .share .view a:last');

ObjDoc.on({
	'click': function(e) {
		e.preventDefault();
		var fileUrl = $(this).find('img').attr('src');
		var fileName = $(this).find('img').attr('alt');
		$("body").append(`
		<div id="img-modal">
			<div class="title-bx">
				<h1>`+ fileName +`</h1>
				<div class="btn-bx">
					<a href="#" class="zoom-in" id="zoom-in"><i class="fa-solid fa-magnifying-glass-plus"></i> 확대</a>
					<a href="#" class="zoom-out" id="zoom-out"><i class="fa-solid fa-magnifying-glass-minus"></i> 축소</a>
				</div>
			</div>
			<div class=thumb>
				<img id="panzoom" src="`+fileUrl+`" alt="`+ fileName +`">
			</div>
			<a href="#" class="close"><i class="fa-solid fa-xmark"></i></a>
		</div>
		`);
		const element = document.getElementById('panzoom');
		const zoomInButton = document.getElementById('zoom-in');
		const zoomOutButton = document.getElementById('zoom-out');
		const panzoom = Panzoom(element, {
		});
		const parent = element.parentElement
		parent.addEventListener('wheel', panzoom.zoomWithWheel);
		zoomInButton.addEventListener('click', panzoom.zoomIn);
		zoomOutButton.addEventListener('click', panzoom.zoomOut);
		$(this).addClass('active');
		$('#img-modal a:first').focus();
	}
}, '.img-zoom-modal')
.on({
	'click': function(e) {
		e.preventDefault();
		$('#img-modal').remove();
		$('.img-zoom-modal.active').focus().removeClass('active');
	}
}, '#img-modal .close')
.on({
	'click': function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
	}
}, '#pop_menu .city_conatact .menu_title');



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

	if ($('.img-zoom-modal').length){
		$.getScript('https://cdn.jsdelivr.net/npm/@panzoom/panzoom/dist/panzoom.min.js');
		$.getScript('https://kit.fontawesome.com/708e424f8f.js');
	}
};

$(function() {
	contentScript();
});

