
//서브공통 스크립트
var ObjDoc = $(document);		

ObjDoc.on({
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
}, '#breadcrumb .box li:last-child a');	



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
	'change': function() { 
		if($(this).is(":checked")) {
			$(this).parents('.city-bx').find('input[type="checkbox"]').each(function(index, item){
				$(item).prop("checked", true);
			});
		}
		else {
			$(this).parents('.city-bx').find('input[type="checkbox"]').each(function(index,item){
				$(item).prop("checked", false);
			});
		}
	}
}, '.check-bx .check-all')
.on({
	'click': function(e) { 
		e.preventDefault();
		$(this).parents('.item').addClass('active');
	}
}, '.article-list .item > a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$(this).parents('.item').removeClass('active');
	}
}, '.article-list .item .close');


//콘텐츠 스크립트 (dom ready 후 동작)
function contentScript(){
	
	if ($('.img-zoom-modal').length){
		$.getScript('/page/contract/js/panzoom.min.js');
		$.getScript('/page/contract/js/708e424f8f.js');
	}
	$('.skinTb-wrapper').on('scroll', function () {
		$(this).addClass('scroll');
	});
	$('.skinTb.width640').parent().addClass('width640');
	$('.skinTb.width768').parent().addClass('width768');
	$('.skinTb.width1000').parent().addClass('width1000');

	var slickOptionSub1 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        prevArrow: $('.sub-slick-wrap-01 .prev'),
        nextArrow: $('.sub-slick-wrap-01 .next'),
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 250,
        responsive: [
            {
                breakpoint: 1181,
                settings: {
					slidesToShow: 3,
					variableWidth: true,
                }
            }
        ]
    };
    
    initSlick($('.sub-slick-wrap-01 .slick'), slickOptionSub1);


	var slickOptionSub1 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        prevArrow: $('.corporate-slick-wrap .prev'),
        nextArrow: $('.corporate-slick-wrap .next'),
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 350,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
					slidesToShow: 3,
					variableWidth: true,
                }
            }
        ]
    };
    
    initSlick($('.corporate-slick'), slickOptionSub1);
};


$(function() {
	contentScript();
});



