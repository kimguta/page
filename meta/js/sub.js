
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
}, '#title-bx .share .view a:last')
.on({
	'click': function() {
		var idx = $('.introduce_wrap .process_area .area_tab ul li a').index(this);
		$('.introduce_wrap .process_area .area_tab ul li').removeClass('active');
		$(this).parent().addClass('active');
		$('.process_box_wrap .process_box').removeClass('active');
		$('.process_box_wrap .process_box').eq(idx).addClass('active');
	}
}, '.introduce_wrap .process_area .area_tab ul li a')
.on({
	'click': function() {
		var idx = $('.round_tab_area li a').index(this);
		$('.round_tab_area li').removeClass('active');
		$(this).parent().addClass('active');
		$('.multimedia_area .multimedia_box').removeClass('active');
		$('.multimedia_area .multimedia_box').eq(idx).addClass('active');
	}
}, '.round_tab_area li a')
.on({
	'click': function() {
		$(this).parent().find('img').hide();
		$(this).parent().find('video').css('display', 'block');
		$(this).parent().find('video').get(0).play();
		$(this).hide();
	}
}, '.multimedia_wrap .multimedia_box .play_btn');


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
			maxScale: 3,
			minScale: 0.3,
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
	'keydown': function(e) {
		if (e.keyCode == 9) {
			$('#img-modal a:first').focus();
			return false;
		}
	},
	'click': function(e) {
		e.preventDefault();
		$('#img-modal').remove();
		$('.img-zoom-modal.active').focus().removeClass('active');
	}
}, '#img-modal .close');


//콘텐츠 스크립트 (dom ready 후 동작)
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
	function sliderSet(slickfor,slicknav){
		slickfor.not('.slick-initialized').slick({
			autoplay: false,
			arrows: true,
			dots: true,
			prevArrow: '<a href="#" class="prev">이전</a>',
			nextArrow: '<a href="#" class="next">다음</a>',
			accessibility: true,
			swipeToSlide: true,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			pauseOnHover: false,
			speed: 600,
			asNavFor: '.slick-nav',
			fade: true,
		});
		slicknav.not('.slick-initialized').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.slick-for',
			dots: false,
			centerMode: true,
			focusOnSelect: true
		});
	}
	$('.summary_area.mirror_world .img_area_wrap').each(function(i,el){
	i+=1;
		var slickfor = $(el).find('.slick-for').addClass('for'+ i)
		var slicknav = $(el).find('.slick-nav').addClass('nav'+ i)
		sliderSet(slickfor,slicknav);
	})
};


$(function() {
	contentScript();
});



