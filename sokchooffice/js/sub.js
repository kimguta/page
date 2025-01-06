

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

//보건소_공중위생서비스평가공표 btn
.on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).parent('li').index();
		$('.announcement_bx li a, .announcement .announcement_chart > li').removeClass('active');
		$(this).addClass('active');
		$('.announcement .announcement_chart > li').eq(Idx).addClass('active');
	}
}, '.announcement_bx li a')

//보건소_생애주기별건강관리
.on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).index();
		$('.life_bx a, .short_cut01').removeClass('active');
		$(this).addClass('active');
		$('.short_cut01').eq(Idx).addClass('active');
	}
}, '.life_bx a')
//보건소_층별관리
.on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).index();
		$('.floor .floor_btn a, .floor .floor_img ul > li').removeClass('active');
		$(this).addClass('active');
		$('.floor .floor_img').show();
		$('.floor .floor_img01').hide();
		$('.floor .floor_img ul > li').eq(Idx).addClass('active');
	}
}, '.floor .floor_bx .floor_btn a')
.on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).index();
		$('.floor .floor_btn a, .floor .floor_img01 ul > li').removeClass('active');
		$('.floor .floor_img').hide();
		$('.floor .floor_img01').show();
		$(this).addClass('active');
		$('.floor .floor_img01 ul > li').eq(Idx).addClass('active');
	}
}, '.floor .floor_bx01 .floor_btn a')
//보건소_의약업소 자율점검
.on({
	'click': function(e) { 
		$('.ui-modal.v2').hide();
	}
}, '.ui-modal.v2 .bx .close')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('.ui-modal.v2').show();
	}
}, '.examine .search a')
//보건소_전화번호안내
.on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).parent('li').index();
		$('.call_bx li a, .call_guide .call_chart > li').removeClass('active');
		$(this).addClass('active');
		$('.call_guide .call_chart > li').eq(Idx).addClass('active');
	}
}, '.call_bx li a')
// 맑은물관리사업소_조직도 버튼
.on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).parent().parent('li').index();
		$('.organization-bx .level-02 a, .organization .organization_chart > li').removeClass('active');
		$(this).addClass('active');
		$('.organization .organization_chart > li').eq(Idx).addClass('active');
	}
}, '.organization-bx .level-02 a')
// 맑은물관리사업소_수도요금민원 버튼
.on({
	'click': function(e) { 
		e.preventDefault(e);
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).siblings('.box').removeClass('active');
		}
		else{
			$('.question > div > a, .question div .box').removeClass('active');  
			$(this).addClass('active');
			$(this).siblings('.box').addClass('active');
		}
	}
}, '.question > div > a')
// 맑은물관리사업소_민원이용안내
.on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).parent().parent().parent('tr').index();
		$('.formula_wrap .contsBtn-more, .formula_wrap .stop > li').removeClass('active');
		$(this).addClass('active');
		$('.formula_wrap .stop  > li').eq(Idx).addClass('active');
	}
}, '.formula_wrap .contsBtn-more')

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


$(function() {
	
	contentScript();
	$('.depth-03').prev('.tlv-03').addClass('has-depth');

	$(".root_daum_roughmap").each(function(index, item){
		if ($(".root_daum_roughmap[data-time]").length) {
			var time = $(this).attr('data-time');
			var key = $(this).attr('data-key');
			var width = $(this).attr('data-width');
			var height = $(this).attr('data-height');
			new daum.roughmap.Lander({
				"timestamp" : time,
				"key" : key,
				"mapWidth" : width,
				"mapHeight" : height
			}).render();
		}
	});
});




