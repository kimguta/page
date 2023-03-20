

//콘텐츠 스크립트 (dom ready 후 동작)
function contentScript(){
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

	
	$('.skinTb-wrapper').on('scroll', function () {
		$(this).addClass('scroll');
	});
	$('.skinTb.width640').parent().addClass('width640');
	$('.skinTb.width768').parent().addClass('width768');
	$('.skinTb.width1000').parent().addClass('width1000');

	$('.map-wrap .item-bx > div:first-child, .map-wrap .tab-bx a:first-child, .city-wrap .tab-bx a:first-child, .city-wrap .item-bx > div:first-child').addClass('active');
	$('.map-slick-bx > div:first-child').addClass('active');

	if ($('.img-zoom-modal').length){
		$.getScript('/page/comz-field/js/panzoom.min.js');
		$.getScript('/page/comz-field/js/708e424f8f.js');
	}
	$('.skinBtnBo i').parent().addClass('icon');

	ObjWin.on({
		'scroll': function() { 
			var nowOffset = $('#sub-visual').outerHeight();
			if ($(document).scrollTop() > nowOffset){
				$('.now-visual-bx01').addClass('fixed');
			} else {
				$('.now-visual-bx01').removeClass('fixed');
			}
		}	
	});

	var imgSrc = $('.now-festival-bx .img-bx img').attr('src');
	$('.now-festival-bx .img-bx').append('<span style=background-image:url('+imgSrc+') class="bg-img"></span>');

	$('.brochure-bx a div').each(function(index,item){
		var imgSrc = $(item).children('img').attr('src');
		$(item).append('<span style=background-image:url('+imgSrc+') class="bg-img"></span>');
	});
	
	var SlickOptionSub1 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        swipeToSlide:true,
        dots: true,
        draggable: true,
        infinite: true,
		slidesToScroll: 1,
        slidesToShow: 2,
        pauseOnHover: false,
        speed: 600,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                speed: 500,
                centerMode: true,
				variableWidth: true,
				slidesToShow: 3,
                }
            }
        ]
    };
	initSlick($('.sub-slick-wrap1 .slick'), SlickOptionSub1);
	$('#search-wrap').parents('#wrapper').find('.seach-open.header-btn').hide();

	var SlickOptionSub4 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        swipeToSlide:true,
        dots: false,
        draggable: true,
        infinite: true,
		slidesToScroll: 1,
        slidesToShow: 4,
        pauseOnHover: false,
        speed: 500,
		responsive: [
            {
                breakpoint: 1500,
                settings: {
				speed: 300,
				variableWidth: true,
				slidesToShow: 3,
                }
            }
        ]
    };
	initSlick($('.theme-slick-wrap .slick'), SlickOptionSub4);

	var SlickOptionSub5 = {
		autoplay: false,
		arrows: true,
		accessibility: false,
		swipeToSlide:true,
		dots: true,
		draggable: true,
		infinite: true,
		slidesToScroll: 1,
		slidesToShow: 1,
		pauseOnHover: false,
		speed: 700,
		responsive: [
			{
				breakpoint: 717,
				settings: {
				speed: 350,
				adaptiveHeight: true,
				// centerMode: true,
				// variableWidth: true,
				// slidesToShow: 3,
				}
			}
		]
	};
	initSlick($('.sub-slick-wrap .slick'), SlickOptionSub5);

	var SlickOptionSub6 = {
		autoplay: false,
		arrows: true,
		accessibility: false,
		dots: false,
		draggable: true,
		infinite: true,
		slidesToScroll: 1,
		slidesToShow: 4,
		pauseOnHover: false,
		swipeToSlide:true,
		speed: 350,
		responsive: [
			{
				breakpoint: 1500,
				settings: {
					centerMode: true,
					variableWidth: true,
					slidesToShow: 3,
				}
			}
		]
	};
	initSlick($('.map-slick-bx .slick'), SlickOptionSub6);

	var SlickOptionSub7 = {
		autoplay: false,
		arrows: true,
		accessibility: false,
		dots: false,
		draggable: true,
		infinite: true,
		slidesToScroll: 1,
		slidesToShow: 4,
		pauseOnHover: false,
		swipeToSlide:true,
		speed: 350,
		responsive: [
			{
				breakpoint: 1500,
				settings: {
					variableWidth: true,
					centerMode: true,
				}
			}
		]
	};
	initSlick($('.korean-wave .slick'), SlickOptionSub7);


	/*콘텐츠 스크립트*/
};

$(function() {
	contentScript();
});


//서브공통 스크립트
var ObjDoc = $(document);

var SlickOptionSub2 = {
	autoplay: false,
	arrows: true,
	accessibility: false,
	swipeToSlide:true,
	dots: true,
	customPaging: imgPaging,
	draggable: true,
	infinite: true,
	slidesToScroll: 1,
	slidesToShow: 1,
	pauseOnHover: false,
	speed: 500,
};

var SlickOptionSub3 = {
	autoplay: false,
	arrows: true,
	accessibility: false,
	swipeToSlide:true,
	dots: true,
	draggable: true,
	infinite: true,
	slidesToScroll: 1,
	slidesToShow: 1,
	pauseOnHover: false,
	speed: 500,
	responsive: [
		{
			breakpoint: 717,
			settings: {
			centerMode: true,
			speed: 300,
			variableWidth: true,
			slidesToShow: 3,
			}
		}
	]
};


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
					<a href="#" class="zoom-in" id="zoom-in"><i class="fa-solid fa-magnifying-glass-plus"></i> zoom-in</a>
					<a href="#" class="zoom-out" id="zoom-out"><i class="fa-solid fa-magnifying-glass-minus"></i> zoom-out</a>
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
		var ParentOffSet = $(this).parents('.modal-slick-bx').offset().top;
		$('.modal-slick-bx .slick-wrap').show();
		$('.modal-slick-bx .slick-wrap .slick-prev').focus();
		initSlick($('.modal-slick-bx .slick'), SlickOptionSub2);
		$('html, body').animate({scrollTop: ParentOffSet}, 300);
	}
}, '.modal-slick-bx .modal-show')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('.modal-slick-bx .slick-wrap').hide();
	}
}, '.modal-slick-bx .modal-hide')
.on({
	'click': function(e) { 
		
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.food-item').removeClass('active');
		}else{
			$('.food-list a').removeClass('active');
			$(this).addClass('active');
			$('.food-item').removeClass('active', function(){
				$('.food-item').addClass('active');
			});
			// $(".food-item").removeClass('active').delay(0).queue(function(){
			// 	$(this).addClass('active').dequeue();
			// });
			$('.food-item').css('top',$(this).position().top + $(this).innerHeight());
			initSlick($('.food-item .slick'), SlickOptionSub3);
			if(ObjWin.width() > 1499){ 
				$('html, body').animate({scrollTop: $('.food-item').position().top + $('.food-item').innerHeight() + 120}, 400);
			}
		}
	}
}, '.food-list a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('.food-item').removeClass('active');
		$('.food-list a').removeClass('active');
	}
}, '.food-item .close')
.on({
	'change': function() { 
		if($(".check-all").is(":checked")) {
			$('input[type="checkbox"]').each(function(index, item){
				$(item).prop("checked", true);
			});
		}
		else {
			$('input[type="checkbox"]').each(function(index,item){
				$(item).prop("checked", false);
			});
		}
	}
}, '.check-bx .check-all')
.on({
	'change': function() { 
		if($('input[type="checkbox"]').is(":checked")) {
			$('.check-bx .skinBtnBo').addClass('active');
		}
		else {
			$('.check-bx .skinBtnBo').removeClass('active');
		}
	}
}, '.check-bx input[type="checkbox"]')
.on({
	'click': function(e) { 
		e.preventDefault();
		var idx = $(this).index();
        $('.map-wrap .item-bx > div, .map-wrap .tab-bx a, .map-slick-bx > div').removeClass('active');
        $('.map-wrap .item-bx > div').eq(idx).addClass('active');
		$('.map-slick-bx > div').eq(idx).addClass('active').find('.slick-prev').click();
        $(this).addClass('active');
	}
}, '.map-wrap .tab-bx a')
.on({
	'click': function(e) { 
		e.preventDefault();
		var idx = $(this).index();
        $('.city-wrap .item-bx > div, .city-wrap .tab-bx a').removeClass('active');
        $('.city-wrap .item-bx > div').eq(idx).addClass('active');
        $(this).addClass('active');
	}
}, '.city-wrap .tab-bx a')
.on({
	'click': function(e) { 
		e.preventDefault();
        $(this).toggleClass('active');
		if($('.select-list a').hasClass('active')) {
			$('.select-btn').addClass('active');
		}
		else {
			$('.select-btn').removeClass('active');
		}
	}
}, '.select-list a')
.on({
	'click': function(e) { 
		e.preventDefault();
        $('#sub-visual .tab ').toggleClass('active');
	}
}, '#sub-visual .tab .active');

