
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
		$.getScript('/page/gwtour2022/js/panzoom.min.js');
		$.getScript('/page/gwtour2022/js/708e424f8f.js');
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
	
};


$(function() {
	contentScript();
});



