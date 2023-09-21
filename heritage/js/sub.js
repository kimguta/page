
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
}, '#img-modal .close');



//콘텐츠 스크립트 (dom ready 후 동작)
function contentScript(){
	
	if ($('.img-zoom-modal').length){
		$.getScript('/page/heritage/js/panzoom.min.js');
		$.getScript('/page/heritage/js/708e424f8f.js');
	}
	$('.skinTb-wrapper').on('scroll', function () {
		$(this).addClass('scroll');
	});
	$('.skinTb.width640').parent().addClass('width640');
	$('.skinTb.width768').parent().addClass('width768');
	$('.skinTb.width1000').parent().addClass('width1000');


	$('.specialty-store .slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
		$('.specialty-store .sp-bx a, .specialty-store .tab-bx a').removeClass('active');
		$('.specialty-store .sp-bx a').eq(currentSlide).addClass('active');
		$('.specialty-store .tab-bx a').eq(currentSlide).addClass('active');
	});

	$('.gourmet-road .slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
		$('.gourmet-road .sp-bx a, .gourmet-road .tab-bx a').removeClass('active');
		$('.gourmet-road .sp-bx a').eq(currentSlide).addClass('active');
		$('.gourmet-road .tab-bx a').eq(currentSlide).addClass('active');
		$('.gourmet-road .view-bx > div').hide();
		$('.gourmet-road .view-bx > div').eq(currentSlide).show();
	});

};

$(function() {
	contentScript();
});

function elemOffset(obj){
	$(obj).each(function(){
        var elemTop = $(this).offset().top;
        var elemBottom =$(this).offset().top + $(this).outerHeight();
		var winTop = $(document).scrollTop();
        var winBottom = $(document).scrollTop() + $(window).outerHeight()

		//요소 화면 인

		if( elemTop <= winBottom ){
			$(this).addClass('active');
		}

		// //요소 아래쪽 붙음
		// if( elemBottom <= winBottom ){
		// 	$(this).addClass('elem-bottom');
		// }

		// //요소 위쪽 붙음
		// if( elemTop <= winTop ){
		// 	$(this).addClass('elem-top');
		// }

		// //요소 화면 아웃
		// if( elemBottom <=  winTop ){
		// 	$(this).addClass('elem-out');
		// }
	});
}

$(window).on('scroll load', function(){
	elemOffset('.offset');
});

