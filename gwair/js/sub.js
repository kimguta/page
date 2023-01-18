
//서브공통 스크립트
var ObjDoc = $(document);		

ObjDoc.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parents('#breadcrumb-bx, .box').removeClass('active');
			$(this).children('span').text('열기');
			$('#breadcrumb-bx .box ul').slideUp(250);
		} else{
			$('#breadcrumb-bx .open').removeClass('active');
			$('#breadcrumb-bx .box').removeClass('active');
			$(this).addClass('active');
			$(this).parents('#breadcrumb-bx, .box').addClass('active');
			$('#breadcrumb-bx .open span').text('열기');
			$(this).children('span').text('닫기');
			$('#breadcrumb-bx .box ul').slideUp(250);
			$(this).next('ul').slideDown(250);
		}
	}
}, '#breadcrumb-bx .open')
.on({
	'mouseleave': function() { 
		$('#breadcrumb-bx .open span').text('열기');
		$('#breadcrumb-bx .box ul').slideUp(300);
		$('#breadcrumb-bx .box .open, #breadcrumb-bx .box, #breadcrumb-bx').removeClass('active');
	}
}, '#breadcrumb-bx')
.on({
	'focusout': function() { 
		$(this).parents('.box').find('.open').focus();
	}
}, '#breadcrumb-bx .box li:last-child a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$(this).toggleClass('active');
	}
}, '#sub-visual .sns-open')
.on({
	'focusout': function() { 
		$('#sub-visual .sns-open').focus();
	}
}, '#sub-visual .sns .view a:last-child');


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


ObjDoc.on({
	'click': function(e) { 
        e.preventDefault();
		var idx = $(this).index();
        $(this).toggleClass('active');
	}
}, '#sub .select .open')
.on({
	'click': function(e) { 
        e.preventDefault();
		var Name = $(this).text();
        var idx = $(this).index();
        $('#sub .select .open').text(Name).removeClass('active');
        $('#sub .spot-bx a').removeClass('active');
        $('#sub .spot-bx a').eq(idx).addClass('active');
	}
}, '#sub .select .view a')
.on({
	'click': function(e) { 
        e.preventDefault();
		var Name = $(this).text();
        $('#sub .select .open').text(Name).removeClass('active');
        $('#sub .spot-bx a').removeClass('active');
        $(this).addClass('active');
	}
}, '#sub .spot-bx a')
.on({
	'click': function(e) { 
        e.preventDefault();
		var idx = $(this).parents('tr').index();
        $('.district-bx table tbody tr').removeClass('active');
        $(this).parents('tr').addClass('active');
        $('.map-wrap .notes img').hide();
        $('.map-wrap .notes img').eq(idx).show();
	}
}, '.district-bx table a');


//콘텐츠 스크립트 (dom ready 후 동작)
function contentScript(){
	
	if ($('.img-zoom-modal').length){
		$.getScript('/page/gwair/js/panzoom.min.js');
		$.getScript('/page/gwair/js/708e424f8f.js');
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
});



