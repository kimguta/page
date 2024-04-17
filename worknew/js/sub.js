
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
}, '.share ul li:last-child a')
.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parents('#breadcrumb, .box').removeClass('active');
			$(this).children('span').text('열기');
			$('#breadcrumb .box ul').slideUp(250);
		} else{
			$('#breadcrumb .open').removeClass('active');
			$('#breadcrumb .box').removeClass('active');
			$(this).addClass('active');
			$(this).parents('#breadcrumb, .box').addClass('active');
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
			$('#breadcrumb .box ul').slideUp(250);
			$(this).next('ul').slideDown(250);
		}
	}
}, '#breadcrumb .open')
.on({
	'mouseleave': function() { 
		$('#breadcrumb .open span').text('열기');
		$('#breadcrumb .box ul').slideUp(300);
		$('#breadcrumb .box .open, #breadcrumb .box, #breadcrumb').removeClass('active');
	}
}, '#breadcrumb')
.on({
	'focusout': function() { 
		$(this).parents('.box').find('.open').focus();
	}
}, '#breadcrumb .box li:last-child a')
//속초 시장실 공약이행현황
.on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).index();
		$('.pledge_fulfillment .city_btn a , .pledge_fulfillment ul > li').removeClass('active');
		$(this).addClass('active');
		$('.pledge_fulfillment ul > li').eq(Idx).addClass('active');
	}
}, '.pledge_fulfillment .city_btn a')
//  공약지도 클릭 이벤트
.on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).index();
		$('.pledge_map .pledge_wrap .pledge_tab a, .pledge_map_ct ul li').removeClass('active');
		$(this).addClass('active');
		$('.pledge_map .map_img img').removeClass('active');
		$('.pledge_map .map_img img').eq(Idx).addClass('active');
	 	$('.pledge_map_ct ul li').eq(Idx).addClass('active');
	}
}, '.pledge_map .pledge_wrap .pledge_tab a')
// 시정목표와비전 시정슬로건 보기
.on({
	'click': function(e) { 
		e.preventDefault();
		$(this).toggleClass('active');
	}
}, '.slogan_bx a');
/* $('.view_box .box_title').on('click', function (e) {
	e.preventDefault();
	$(this).toggleClass('active');
}); */
//콘텐츠 스크립트 (dom ready 후 동작)
function contentScript(){
	
	
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
});



