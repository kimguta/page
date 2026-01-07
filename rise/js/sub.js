
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
}, '#breadcrumb .item button')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('.specific-bx').stop(true, true).slideToggle(350);
	}
}, '.specific-toggle')
.on({
  'click': function(e) {
    e.preventDefault();
    const Index = $(this).index();
    $('.map-img-bx img, .table-wrap > div').removeClass('active');
    $('.map-img-bx img').eq(Index).addClass('active');
    $('.table-wrap > div').eq(Index).addClass('active');
    $('.map-btn-bx').each(function() {
        $(this).find('button').removeClass('active');
        $(this).find('button').eq(Index).addClass('active');
    });
  },
  'mouseover': function(e) {
    e.preventDefault();
    const Index = $(this).index();
    $('.map-img-bx img').eq(Index).addClass('over');
  },
  'mouseleave': function(e) {
    e.preventDefault();
    const Index = $(this).index();
    $('.map-img-bx img').eq(Index).removeClass('over');
  }
}, '.map-btn-bx button');

//콘텐츠 스크립트 (dom ready 후 동작)
function contentScript(){

	$('.skinTb-wrapper').on('scroll', function () {
		$(this).addClass('scroll');
	});
	$('.skinTb.width640').parent().addClass('width640');
	$('.skinTb.width768').parent().addClass('width768');
	$('.skinTb.width1000').parent().addClass('width1000');

	const swiper1 = new Swiper(".subSwiper1", {
        slidesPerView:1,
		grid: {
			rows: 3,
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
    });


	(() => {
	const onReady = (fn) =>
		document.readyState === 'loading'
		? document.addEventListener('DOMContentLoaded', fn, { once: true })
		: fn();

	onReady(() => {
		const io = new IntersectionObserver((entries) => {
		entries.forEach(({ isIntersecting, target }) => {
			target.classList.toggle('active', isIntersecting);
		});
		}, {
		threshold: [0, 0.3],
		rootMargin: '0px'
		});

		document.querySelectorAll('.scroll-show').forEach(el => io.observe(el));
	});
	})();
};

$(function() {
	contentScript();

	

});

        