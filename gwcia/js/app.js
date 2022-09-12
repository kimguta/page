
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
		target.parent().find('.count').html( nowSlide + '<span>-</span>' + '<strong>'+ allSlide + '<strong>');

	});
	target.slick(options);
	ControlBtn.on('click', function (e) {
	    e.preventDefault();
	    if ($(this).hasClass('pause')) {
	        $(this).hide();
			PlayBtn.css('display','inline-block');
	        target.slick('slickPause');
			$('#visual .dots').addClass('stop');
	    } else if ($(this).hasClass('play')) {
	        $(this).hide();
	        PauseBtn.css('display','inline-block');
	        target.slick('slickPlay');
			$('#visual .dots').removeClass('stop');
	    }
	});
};
$(function() {
    setTimeout(function() {
        AOS.init({
            easing: 'ease',
            duration: 700,
            delay: 350,
            once: true,
            offset: 50,

        });
     }, 200);

	$('#visual .text-bx > div').eq(0).show().find('h2').addClass('active');
	$('#visual .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('#visual .slick .slide').removeClass('slick-zoom');
		$('#visual .slick .slick-current').removeClass('loading');
		$('#visual .text-bx > div').fadeOut(300);
	});

	$('#visual .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;
		$('#visual .count').html( i + '<span> / </span>' + slick.slideCount);
		$('#visual .slick .slick-current').addClass('slick-zoom');
		$('#visual .slick-dots .slick-active').addClass('loading');
		$('#visual .text-bx > div').eq(currentSlide).fadeIn(300);
		$('#visual .text-bx > div').eq(currentSlide).find('h2').addClass('active');
	});


	$('#visual .slick').slick({
		autoplay: true,
        arrows: false,
        dots: true,
        appendDots: $('#visual .dots'),
        customPaging: function(slick,index) {
            return '<a href="#" onclick="return false;" role="button" class="v' + (index + 1) + '"><em></em><span></span></a>';
        },
        accessibility: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 500,
        autoplaySpeed: 15000
	});

	$('#visual .control .bttn').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('pause')) {
			$(this).hide();
			$('#visual .control .play').css('display','inline-block');
			$('#visual .slick').slick('slickPause');
		} else if ($(this).hasClass('play')) {
			$(this).hide();
			$('#visual .control .pause').css('display','inline-block');
			$('#visual .slick').slick('slickPlay');
		}
	});



	$('.relevant_banner .slick').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: '<a href="#" class="prev">이전</a>',
		nextArrow: '<a href="#" class="next">다음</a>',
		accessibility: true,
		swipeToSlide: true,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		pauseOnHover: false,
		variableWidth: true,
		speed: 600,
	});

	$('#footer .relevant_banner .slick02').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: '<a href="#" class="prev">이전</a>',
		nextArrow: '<a href="#" class="next">다음</a>',
		accessibility: true,
		swipeToSlide: true,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		pauseOnHover: false,
		variableWidth: true,
		speed: 600,
	});
});

//dots 커스텀 함수
function imgPaging(slick,index){
    var targetImage = slick.$slides.eq(index).find('img').attr('src');
    return '<a href="#" role="button" onclick="return false;"><img src=" ' + targetImage + ' "></a>';
}

function imgNumber(slick,index){
    return '<a href="#" role="button" onclick="return false;">' + (index + 1) + '</a>';
}

var ObjWin = $(window);
var ObjDoc = $(document);
var Wwidth = ObjWin.outerWidth();



ObjWin.on({
	'scroll load': function() {
		if (ObjDoc.scrollTop() > 80) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	}
})
.on({
	'load': function() {
		$('#header').append('<span class="bg_pc"></span>');
	}
});
ObjDoc.on({
	'click': function(e) {
		e.preventDefault();
		$('body').css('overflow','hidden');
		$('#header').addClass('active');
	}
}, '#header nav')
.on({
	'click': function(e) {
		e.preventDefault();
		$('body').css('overflow','hidden');
		$('#header').addClass('active');
		$('#header .site_map a:first').focus();
	}
}, '#header .sitemap')
.on({
	'click': function(e) {
		e.preventDefault();
		$('#header .site_map h2').removeClass('active');
		$('#header .site_map h3').removeClass('active');
		$('#header .site_map h4').removeClass('active');
		$(this).parent().addClass('active');
	}
}, '#header .site_map .depth-01 h2 a')
.on({
	'click': function(e) {
		e.preventDefault();
		$('#header .site_map h2').removeClass('active');
		$('#header .site_map h3').removeClass('active');
		$('#header .site_map h4').removeClass('active');
		$(this).parent().addClass('active');
	}
}, '#header .site_map .depth-02 h3 a')
.on({
	'click': function(e) {
		e.preventDefault();
		$('#header .site_map h2').removeClass('active');
		$('#header .site_map h3').removeClass('active');
		$('#header .site_map h4').removeClass('active');
		$(this).parent().addClass('active');
	}
}, '#header .site_map .depth-03 h4 a')
.on({
	'click': function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('body').css('overflow','visible');
		$('#header').removeClass('active');
		$('#header .sitemap').focus();
	}
}, '#header .site_map .close_btn')
.on({
	'click': function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 400);
	}
}, '#btn-top')

$(function() {
	var currentPosition = parseInt($("#btn-side").css("top"));
	ObjWin.on({
		'scroll': function() {
			var posY = ObjWin.scrollTop();
			$("#btn-side").stop().animate({"top":posY+currentPosition+"px"},500);
			if ( posY > 100 ){
				$("#btn-top").addClass('active');
			} else if(posY < 100) {
				$("#btn-top").removeClass('active');
			};
		}
	})

	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);

	window.addEventListener("resize", () => {
	console.log("resize");
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
	});




});
