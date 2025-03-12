
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
        if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next('div').slideUp(300);
        } else {
			$('#breadcrumb button').removeClass('active').filter(this).addClass('active');
			$(this).addClass('active');
			$('#breadcrumb .item > div').slideUp(300);
			$(this).next('div').slideDown(300);
        }
    }
}, '#breadcrumb button')
.on({
    'mouseover click': function(e) {
        e.preventDefault();
        $('.flex-fold-bx .item').removeClass('active').filter(this).addClass('active');
    }
}, '.flex-fold-bx .item');


//콘텐츠 스크립트 (dom ready 후 동작)
function contentScript(){
	
	$('.skinTb-wrapper').on('scroll', function () {
		$(this).addClass('scroll');
	});
	$('.skinTb.width640').parent().addClass('width640');
	$('.skinTb.width768').parent().addClass('width768');
	$('.skinTb.width1000').parent().addClass('width1000');
	
	var slickOptionSub1 = {
		autoplay: true,
		arrows: true,
		accessibility: false,
		dots: true,
		draggable: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 500,
		autoplaySpeed: 5000,
		appendDots: null, // 개별적으로 설정할 것이므로 초기값은 null
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
	
	$('.histoty-slick-wrap .slick').each(function() {
		let $this = $(this);
		let $dotsContainer = $this.parent().find('.dots'); // 현재 슬라이더의 .dots 요소 찾기
		let customOptions = $.extend({}, slickOptionSub1, {
			appendDots: $dotsContainer.length ? $dotsContainer : null
		});
	
		// 슬라이더 초기화
		initSlick($this, customOptions);
	});


	var slickOptionSub2 = {
		autoplay: true,
		arrows: true,
		accessibility: false,
		dots: true,
		draggable: true,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		pauseOnHover: false,
		speed: 500,
		autoplaySpeed: 5000,
		appendDots: null, // 개별적으로 설정할 것이므로 초기값은 null
		responsive: [
			{
				breakpoint: 1181,
				settings: {
					variableWidth: true,
					slidesToScroll: 1,
					swipeToSlide: true,
					speed: 300,
				}
			}
		]
	};
	
	$('.history-bg-bx .slick').each(function() {
		let $this = $(this);
		let $dotsContainer = $this.parent().find('.dots'); // 현재 슬라이더의 .dots 요소 찾기
		let customOptions = $.extend({}, slickOptionSub2, {
			appendDots: $dotsContainer.length ? $dotsContainer : null
		});
	
		// 슬라이더 초기화
		initSlick($this, customOptions);
	});



	var slickOptionSub4 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots: false,
        draggable: true,
        prevArrow: $('.department-bx .prev'),
        nextArrow: $('.department-bx .next'),
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        variableWidth: true,
        swipeToSlide: true,
        speed: 350,
		autoplaySpeed: 6000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('.department-bx .slick'), slickOptionSub4);


	var slickOptionSub5 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots: false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        swipeToSlide: true,
        speed: 350,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // variableWidth: true,
                }
            }
        ]
    }; 
    initSlick($('.top-slick-bx .slick'), slickOptionSub5);

	

};

$(function() {
	contentScript();

	$('.Sdepth02').prev('.Stlv01').addClass('has-depth');
	
});


       
        