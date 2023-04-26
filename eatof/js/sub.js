

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

	if ($('.img-zoom-modal').length){
		$.getScript('/page/eatof/js/panzoom.min.js');
		$.getScript('/page/eatof/js/708e424f8f.js');
	}

	var SOptionSub1 = {
        autoplay: false,
        arrows: true,
        swipeToSlide:true,
        dots: false,
        draggable: true,
        infinite: true,
		slidesToScroll: 1,
        slidesToShow: 1,
        pauseOnHover: false,
        speed: 500,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                speed: 350,
                }
            }
        ]
    };
	initSlick($('.space-bx .view-bx .slick'), SOptionSub1);


	var SOptionSub2 = {
        autoplay: true,
		autoplaySpeed: 5000,
        arrows: false,
        swipeToSlide:true,
        dots: false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
		centerMode: true,
		variableWidth: true,
        pauseOnHover: false,
		pauseOnfocus: false,
        speed: 350,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                speed: 300,
                }
            }
        ]
    };
	initSlick($('.space-bx .map-bx .slick'), SOptionSub2);

	initSlick($('.center-bx .slick'), SOptionSub1);

};

ObjWin.on({
	'load': function() { 
		if (ObjDoc.scrollTop() > 70) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	}		
})

$(function() {
	contentScript();
});

/*콘텐츠 스크립트*/
ObjDoc.on({
	'click': function(e) { 
		e.preventDefault();
		$(this).toggleClass('active');
		$('.select-bx .select-list').toggle();
	}
}, '.select-bx button')
.on({
	'click': function(e) { 
		e.preventDefault();
		var btnText = $(this).text();
		var Idx = $(this).index();
		$('.select-bx button').removeClass('active').text(btnText);
		$('.select-bx .select-list').hide();
		$('.view-bx article').hide().eq(Idx).show().find('.slick').slick('resize');
	}
}, '.select-bx .select-list a')
.on({
	'click': function(e) { 
		e.preventDefault(e);
        $('#sub-visual .tab ').toggleClass('active');
	}
}, '#sub-visual .tab .active')
.on({
	'click': function(e) { 
		e.preventDefault();
		var Idx = $(this).index();
		$('.img-bx img, .btn-bx button').removeClass('active');	
        $('.img-bx img').eq(Idx).addClass('active');
		$(this).addClass('active');

		var imgNum = [0, 4, 11, 13, 14, 16];	
		for (var i = 0; i< imgNum.length; i++) {		
			if (Idx == i) {
				$('.space-bx .map-bx .slick').slick('slickGoTo', imgNum[i]);
			}
		};
	}
}, '.floor-bx .btn-bx button');


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
}, '#img-modal .close');

