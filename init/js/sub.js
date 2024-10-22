
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
		if ($(this).parent('.Stlv01').hasClass('active')) {
			$(this).parent('.Stlv01').removeClass('active');
			$(this).parent('.Stlv01').next('.Sdepth02').slideUp(200);
		} else{
			$('#side-menu .Stlv01').removeClass('active');
			$('#side-menu .Sdepth02').slideUp(300);
			$(this).parent('.Stlv01').addClass('active');
			$(this).parent('.Stlv01').next('.Sdepth02').slideDown(200);
		}
	}
}, '#side-menu .Stlv01.has-depth a')
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

	var slickOptionSub1 = {
		autoplay: false,
		arrows: true,
		accessibility: false,
		dots:false,
		draggable: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: $('.facility-info .prev'),
		nextArrow: $('.facility-info .next'),
		pauseOnHover: false,
		swipeToSlide: true,
		speed: 500,
		responsive: [
			{
				breakpoint: 1181,
				settings: {
					// variableWidth: true,
					// centerMode: true,
				}
			}
		]
	};


	initSlick($('.facility-info .slick'), slickOptionSub1);
	
	$('.Sdepth02').prev('.Stlv01').addClass('has-depth');
});





