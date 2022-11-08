

$(function() {
	$('.complex_detail_wrap .image_area .slick').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: '<a href="#" class="prev">이전</a>',
		nextArrow: '<a href="#" class="next">다음</a>',
		accessibility: true,
		swipeToSlide: true,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		pauseOnHover: false,
		variableWidth: true,
		speed: 600,
	});
});

//서브공통 스크립트
var ObjWin = $(window);
var ObjDoc = $(document);
var Wwidth = ObjWin.outerWidth();
var delay = 1;
var timer = null;

ObjWin.on({
	'resize load': function() {
		clearTimeout(timer);
		timer = setTimeout(function(){
			if(ObjWin.width() < 760){
				var mapwidth2 = (Wwidth - 40) / 889;
				var maphigth2 = mapwidth2 * 889;
				$('.estate_wrap .map_area_list').css({'height':maphigth2});
				$('.estate_wrap .map_area .map_box').css({'transform':'scale('+mapwidth2+') translate(-50%, 0)'});

			} else if(ObjWin.width()>=760 && ObjWin.width() < 1200 ){
				var mapwidth = (Wwidth - 60) / 1200;
				var maphigth = mapwidth * 889;
				$('.estate_wrap .map_area_list').css({'height':maphigth});
				$('.estate_wrap .map_area').css({'transform':'scale('+mapwidth+') translate(-50%, 0)'});
			} else{
				$('.estate_wrap .map_area_list').css({'height':'auto'});
				$('.estate_wrap .map_area').css({'transform':'none'});
			}
		}, delay);
	}
});

ObjDoc.on({
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
}, '#breadcrumb .share .view a:last')
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
}, '#pop_menu .city_conatact .menu_title')
.on({
	'click': function(e) {
		e.preventDefault();
		var idx = $('.status_wrap .chart_tab li a').index(this);
		$('.status_wrap .chart_tab li').removeClass('active');
		$(this).parent().addClass('active');
		$('.status_wrap .bar_chart .chart_img img').removeClass('active');
		$('.status_wrap .bar_chart .chart_img img').eq(idx).addClass('active');
	}
}, '.status_wrap .chart_tab li a')
.on({
	'click': function(e) {
		e.preventDefault();
		var idx = $('.estate_wrap .map_area .map_tab li a').index(this);
		$('.estate_wrap .map_area .map_tab ul').toggleClass('on');
		$('.estate_wrap .map_area .map_tab li').removeClass('active');
		$(this).parent().addClass('active');
		$('.estate_wrap .map_area .map_box .estate_item').removeClass('active');
		$('.estate_wrap .map_area .map_box .estate_item').eq(idx).addClass('active');
	}
}, '.estate_wrap .map_area .map_tab li a')
.on({
	'mouseover focusin': function(e) {
		e.preventDefault();
		$('.relevant_wrap .relevant_list li').removeClass('active');
		$(this).parent().addClass('active');
	}
}, '.relevant_wrap .relevant_list .list_item')
.on({
	'mouseleave focusout': function(e) {
		e.preventDefault();
		$('.relevant_wrap .relevant_list li').removeClass('active');
	}
}, '.relevant_wrap .relevant_list .list_item')
.on({
	'click': function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
	}
}, '#sub-detail-visual .view_btn.complex_shortcut')
// .on({
// 	'click': function(e) {
// 		e.preventDefault();
// 		$('#sub-detail-visual .view_btn.complex_shortcut').removeClass('active');
// 	}
// }, '#sub-detail-visual .view_btn_box .complex_list li a')
.on({
	'click': function(e) {
		e.preventDefault();
		$('.notice_layer').addClass('active');
		$('.dimmed').addClass('active');
	}
}, '#sub-detail-visual .notice_btn')
.on({
	'click': function(e) {
		e.preventDefault();
		$('.notice_layer').removeClass('active');
		$('.dimmed').removeClass('active');
	}
}, '.notice_layer .close_btn')
.on({
	'click focus': function(e) {
		e.preventDefault();
		$('.member_wrap .id_pw_wrap .input_row').removeClass('focus');
		$(this).parent().addClass('focus');
	}
}, '.member_wrap .id_pw_wrap input')
.on({
	'click focus': function(e) {
		e.preventDefault();
		var idx = $('.estate_wrap .district_tab li a').index(this);
		$('.estate_wrap .district_tab li').removeClass('active');
		$(this).parent().addClass('active');
		$('.estate_wrap .estate_tab ul').removeClass('active');
		$('.estate_wrap .estate_tab ul').eq(idx).addClass('active');
		$('.estate_wrap .estate_tab ul').eq(idx).find('li:first-child').addClass('active');
		$('.estate_wrap .district_map_area [class*="district_map_"]').removeClass('active');
		$('.estate_wrap .district_map_area [class*="district_map_"]').eq(idx).addClass('active');

	}
}, '.estate_wrap .district_tab li a')
.on({
	'click': function(e) {
		e.preventDefault();
		var idx = $('.liquid_hydrogen_wrap .round_tab_area li .tab_item').index(this);
		$('.liquid_hydrogen_wrap .round_tab_area li').removeClass('active');
		$(this).parent().addClass('active');
		$('.liquid_hydrogen_wrap .liquid_hydrogen_area').removeClass('active');
		$('.liquid_hydrogen_wrap .liquid_hydrogen_area').eq(idx).addClass('active');

	}
}, '.liquid_hydrogen_wrap .round_tab_area li .tab_item')
.on({
	'click': function(e) {
		e.preventDefault();
		var idx = $('.incentive_foreign_wrap .round_tab_area li .tab_item').index(this);
		$('#sub .title-bx h4').hide();
		$('#sub .title-bx h4').eq(idx).show();
		$('.incentive_foreign_wrap .round_tab_area li').removeClass('active');
		$(this).parent().addClass('active');
		$('.incentive_foreign_wrap .incentive_foreign_area').removeClass('active');
		$('.incentive_foreign_wrap .incentive_foreign_area').eq(idx).addClass('active');

	}
}, '.incentive_foreign_wrap .round_tab_area li .tab_item')
.on({
	'click': function(e) {
		e.preventDefault();
		$(this).parent().toggleClass('active');
	}
}, '.investment_simulation .calculation_item .select_box .box');


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
}, '.img-zoom-modal');

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

