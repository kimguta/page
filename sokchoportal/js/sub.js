
//서브공통 스크립트
var ObjDoc = $(document);		

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
}, '#img-modal .close')
.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).parent('.tlv-03').hasClass('active')) {
			$(this).parent('.tlv-03').removeClass('active');
			$(this).parent('.tlv-03').next('.depth-03').slideUp(200);
		} else{
			$('#side-menu .tlv-03').removeClass('active');
			$('#side-menu .depth-03').slideUp(300);
			$(this).parent('.tlv-03').addClass('active');
			$(this).parent('.tlv-03').next('.depth-03').slideDown(200);
		}
	}
}, '#side-menu .tlv-03.has-depth a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$(this).next('ul').toggle();
	}
}, '.share .open')
.on({
	'focusout': function() { 
		$('.share .open').focus();
	}
}, '.share ul li:last-child a')
.on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).index();
		$('.community-center-main .btn-bx a').removeClass('active');
		$(this).addClass('active');
		$('.map-img-bx img').hide();
		$('.map-img-bx img').eq(Idx).css('display','block');
		$('.item-bx .item').hide();
		$('.item-bx .item').eq(Idx).css('display','block');
	}
}, '.community-center-main .btn-bx a')
// 속초부서 탭메뉴
/* .on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).index();
		$('.division .btn-bx01 a , .division ul > li').removeClass('active');
		$(this).addClass('active');
		$('.division ul > li').eq(Idx).addClass('active');
	}
}, '.division .btn-bx01 a') */
// 속초소개 역사와유래 시대별 연혁 
.on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).index();
		$('.history .history_btn a, .history .sokcho-history').removeClass('active');
		$(this).addClass('active');
		$('.history .sokcho-history').eq(Idx).addClass('active');
	}
}, '.history .history_btn a')
// 속초소개 청사안내도 버튼
.on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).index();
		$('.office .map button, .office ul li').removeClass('active');
	/* 	$('.office .map button').eq(Idx).addClass('active'); */
		$(this).addClass('active');
		$('.office ul li').eq(Idx).addClass('active');
	}
}, '.office .map button')
.on({
	'click': function(e) {
		e.preventDefault();	
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parent('.slide').next('.box_wrap01').stop().slideUp(300);
			$(this).parent('.slide').removeClass('active');
			$(this).parent('.slide').children('em').removeClass('active');
		}
		else{
			$('.office .qa-bx a, .office .guide_bx .qa-bx em , .office .guide_bx .qa-bx .slide').removeClass('active');
			$('.box_wrap01').stop().slideUp(300);
			$(this).parent('.slide').next('.box_wrap01').stop().slideDown(300);
			$(this).parent('.slide').addClass('active');
			$(this).addClass('active');
			$(this).parent('.slide').children('em').addClass('active');
		}
	}
}, '.office .qa-bx a')



//콘텐츠 스크립트 (dom ready 후 동작)
function contentScript(){

	if ($('.img-zoom-modal').length){
		$.getScript('/page/common/js/VM11249.js');
		$.getScript('/page/sokchoportal/js/708e424f8f.js');
	}
	$('.skinTb-wrapper').on('scroll', function () {
		$(this).addClass('scroll');
	});
	$('.skinTb.width640').parent().addClass('width640');
	$('.skinTb.width768').parent().addClass('width768');
	$('.skinTb.width1000').parent().addClass('width1000');

};

var slickOptionSub1 = {
	autoplay: true,
	arrows: true,
	accessibility: false,
	dots:false,
	draggable: true,
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	pauseOnHover: false,
	speed: 350,
	autoplaySpeed: 6000,
	responsive: [
		{
			breakpoint: 717,
			settings: {
				variableWidth: true,
				centerMode: true,
			}
		}
	]
}; 

$(function() {
	contentScript();
	$('.depth-03').prev('.tlv-03').addClass('has-depth');
	
	initSlick($('.slick-board-bx .slick'), slickOptionSub1);
	var slickOptionSub2 = {
		autoplay: true,
		arrows: true,
		accessibility: false,
		dots:false,
		draggable: true,
		prevArrow: $('.community-center-entry .visual .prev'),
		nextArrow: $('.community-center-entry .visual .next'),
		infinite: true,
		slidesToShow: 1,
		fade: true,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 350,
		autoplaySpeed: 6000,
		responsive: [
			{
				breakpoint: 717,
				settings: {
					// variableWidth: true,
					// centerMode: true,
				}
			}
		]
	};
	
	var slickOptionSub3 = {
		autoplay: false,
		arrows: true,
		accessibility: false,
		dots:false,
		draggable: true,
		prevArrow: $('.community-center-entry .gallery .prev'),
		nextArrow: $('.community-center-entry .gallery .next'),
		infinite: true,
		slidesToShow: 4,
		swipeToSlide: true,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 350,
		responsive: [
			{
				breakpoint: 717,
				settings: {
					slidesToShow: 3,
				}
			}
		]
	};
	initSlick($('.community-center-entry .visual .slick'), slickOptionSub2);
	initSlick($('.community-center-entry .gallery .slick'), slickOptionSub3);
});





