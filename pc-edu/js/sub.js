
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
		$(this).toggleClass('active');
	}
}, '#sub-visual .sns-btn')
.on({
	'click': function(e) { 
		e.preventDefault();
		const $btn = $(this);
		const $content = $btn.next('div');

		// 다른 버튼 닫고 active 제거
		$('#breadcrumb .item button').not($btn).removeClass('active');
		$('#breadcrumb .item div').not($content).slideUp(300);

		// 클릭한 버튼 toggle
		$btn.toggleClass('active');
		$content.stop(true, true).slideToggle(300);
	}
}, '#breadcrumb .item button');



//콘텐츠 스크립트 (dom ready 후 동작)
function contentScript(){

	$('.skinTb-wrapper').on('scroll', function () {
		$(this).addClass('scroll');
	});
	$('.skinTb.width640').parent().addClass('width640');
	$('.skinTb.width768').parent().addClass('width768');
	$('.skinTb.width1000').parent().addClass('width1000');

	const swiper1 = new Swiper(".subSwiper1", {
        spaceBetween: 0,
		slidesPerView: 'auto', 
        centeredSlides: true,
        speed: 600,
        loop: true, 
		initialSlide: 0,
		loopedSlidesLimit: false,	
        navigation: {
            nextEl: ".subSwiper1 .swiper-button-next",
            prevEl: ".subSwiper1 .swiper-button-prev"
        },
        breakpoints: {
            1641:{ spaceBetween: 60}
        }
    });

	swiper1.slideToLoop(1, 0);

	 const swiper2 = new Swiper(".subSwiper2", {
		spaceBetween: 15,
		speed: 350,
		loop: true,  
		slidesPerView: 1,
		navigation: {
			nextEl: ".subSwiper2 .swiper-button-next",
			prevEl: ".subSwiper2 .swiper-button-prev"
		},
		breakpoints: {
			717: { spaceBetween: 30, slidesPerView: 2,},
			920: { spaceBetween: 50,slidesPerView: 2,},
			1641:{ spaceBetween: 70,slidesPerView: 2,}
		},
	});

	const swiper3 = new Swiper(".subSwiper3", {
		spaceBetween: 10,
		speed: 250,
		slidesPerView: 3,
		centeredSlides: true,
		loop: true,
		slideToClickedSlide: true,
		navigation: {
			nextEl: ".subSwiper3 .swiper-button-next",
			prevEl: ".subSwiper3 .swiper-button-prev"
		},
		breakpoints: {
			717: { spaceBetween: 10, centeredSlides: true, slidesPerView: 4, direction: "horizontal"},
			920: { spaceBetween: 15, direction: "vertical", slidesPerView: 3, centeredSlides: false,},
			1641:{ spaceBetween: 20, direction: "vertical", slidesPerView: 3, centeredSlides: false,}
		},
	});
};

$(function() {
	contentScript();

	

});

        