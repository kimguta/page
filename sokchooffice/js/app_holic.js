
// slick 함수
function initSlick(target, options) {
	var ControlBtn = target.parent().find('.control .ps-btn');
	var PlayBtn  = target.parent().find('.control .play');
	var PauseBtn  = target.parent().find('.control .pause');
	target.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		// 슬라이드 체인지 전
	});
	target.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
	// 초기 후, 슬라이드 체인지 후
		var nowSlide = (currentSlide ? currentSlide : 0) + 1;
		var allSlide = slick.slideCount
		if(nowSlide < 10){ 
			var nowSlide = '0' + nowSlide
		}
		if(allSlide < 10){ 
			var allSlide = '0' + allSlide
		}
		target.parent().find('.count').html( '<strong>'+ nowSlide + '</strong>' + '<span>/</span>' + allSlide) ;
		target.find('.slick-slide:not(.slick-active)').attr('tabindex','-1');
		target.find('.slick-active').attr('tabindex','0');
		if($(this).hasClass('visual')){ 
			
		}
	});
	target.slick(options);
	ControlBtn.on('click', function (e) {
	    e.preventDefault();
	    if ($(this).hasClass('pause')) {
	        $(this).hide();
			PlayBtn.css('display','inline-block');
	        target.slick('slickPause');
	    } else if ($(this).hasClass('play')) {
	        $(this).hide();
	        PauseBtn.css('display','inline-block');
	        target.slick('slickPlay');
	    }
	});
};



// dots 커스텀 함수
function imgPaging(slick,index){
    var targetImage = slick.$slides.eq(index).find('img').attr('src');
    return '<a href="#" role="button" onclick="return false;"><img src=" ' + targetImage + ' "></a>';
}

function imgNumber(slick,index){
    return '<a href="#" role="button" onclick="return false;">' + (index + 1) + '</a>';
}

$(document).on({
	'click': function(e) { 
		e.preventDefault();
		$(this).next('ul').toggle();
	}
}, '.share .open');

$(window).on('load', function() {
    var $headerOff = $('#header').offset().top; // 윈도우가 로드된 후 초기 오프셋 값을 가져옴
    var lastScrollTop = 0; // 마지막 스크롤 위치 저장 변수

    $(window).on('scroll', function() {
        var currentScrollTop = $(this).scrollTop(); // 현재 스크롤 위치 가져오기
        // $('#header').toggleClass('scrolled', $(document).scrollTop() > 0);
        $('#header').toggleClass('fixed', $(document).scrollTop() > 0);
        $('#header').toggleClass('down', currentScrollTop > lastScrollTop); 

        lastScrollTop = currentScrollTop; // 마지막 스크롤 위치 업데이트
    });
});


$(function() { 

    var slickOption1 = {
        autoplay: false,
        arrows: false,
        accessibility: false,
        dots:true,
        draggable: true,
		variableWidth: true,
		swipeToSlide: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 350,
        responsive: [
            // {
            //     breakpoint: 992,
            //     settings: {
            //         variableWidth: true,
            //     }
            // }
        ]
    }; 
    initSlick($('#magazine .slick'), slickOption1);


});
