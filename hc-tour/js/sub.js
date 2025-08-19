
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
};

$(function() {
	contentScript();

	

});

let scrollY = 0;
let currentY = 0;

function animate() {
  currentY += (scrollY - currentY) * 0.1;

  // 패럴랙스 이동
  const translateY = currentY * 0.5;  // 스크롤 속도 조절

  // 밝기 감소
  const brightness = Math.max(1 - currentY / 500, 0.1);

  // 커짐 효과
  const scale = 1 + Math.min(currentY / 2000, 0.2);

  $('#sub-visual .visual-img-bx img').css({
    transform: `scale(${scale})`,
    filter: `brightness(${brightness})`
  });

  requestAnimationFrame(animate);
}

$(window).on('scroll', function() {
  scrollY = $(this).scrollTop();
});

// 애니메이션 시작
animate();
        