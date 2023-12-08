
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
		if ($(this).parent('h3').hasClass('active')) {
			$(this).parent('h3').removeClass('active');
			$(this).parent('h3').next('.depth-03').slideUp(200);
		} else{
			$('#side-menu h3').removeClass('active');
			$('#side-menu .depth-03').slideUp(300);
			$(this).parent('h3').addClass('active');
			$(this).parent('h3').next('.depth-03').slideDown(200);
		}
	}
}, '#side-menu h3.has-depth a')
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
}, '.share ul li:last-child a');


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

//콘텐츠 스크립트 (dom ready 후 동작)
function contentScript(){

	if ($('.img-zoom-modal').length){
		$.getScript('/page/sokchoportal/js/panzoom.min.js');
		$.getScript('/page/sokchoportal/js/708e424f8f.js');
	}
	$('.skinTb-wrapper').on('scroll', function () {
		$(this).addClass('scroll');
	});
	$('.skinTb.width640').parent().addClass('width640');
	$('.skinTb.width768').parent().addClass('width768');
	$('.skinTb.width1000').parent().addClass('width1000');
	
};


$(function() {
	contentScript();
	$('.depth-03').prev('h3').addClass('has-depth');
	initSlick($('.slick-board-bx .slick'), slickOptionSub1);
});





