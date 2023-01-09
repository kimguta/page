
// slick 함수
function initSlick(target, options) {
	var ControlBtn = target.parent().find('.control .ps-btn');
	var PlayBtn  = target.parent().find('.control .play');
	var PauseBtn  = target.parent().find('.control .pause');
	target.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		// 슬라이드 체인지 전
		if ($(this).hasClass('move1')) {
			$('#gift h2').removeClass('active');
	    }
	});
	target.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
	// 초기 후, 슬라이드 체인지 후
		if ($(this).hasClass('move1')) {
			$('#gift h2').addClass('active');
		}
		var nowSlide = (currentSlide ? currentSlide : 0) + 1;
		var allSlide = slick.slideCount
		if(nowSlide < 10){ 
			var nowSlide = '0' + nowSlide
		}
		if(allSlide < 10){ 
			var allSlide = '0' + allSlide
		}
		target.parent().find('.count').html( nowSlide + '<span>-</span>' + '<strong>'+ allSlide + '<strong>');
		target.find('.slick-slide:not(.slick-active)').attr('tabindex','-1');
		target.find('.slick-active').attr('tabindex','0');
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
	'resize load': function() { 
		if(ObjWin.width() > 1499){ 
			$('#header').removeClass('mobile-mode');
			$('#header').addClass('pc-mode');
		}
		else{
			$('#header').removeClass('pc-mode');
			$('#header').addClass('mobile-mode');
		}
	}
})
.on({
	'resize': function() { 
		var Wwidth2 = $(window).outerWidth();
		if (Wwidth2 > 1499 && Wwidth < 1500){
			$('#header h2').removeClass('active');
		}
	}
})
.on({
	'load': function() {
		$('a[role="button"]').on('keypress', function (key) {
			if (key.keyCode == 32) {
				$(this).trigger('click');
				return false
			}
		});
	setTimeout(function() {
			var menuDom = $('#header nav').clone();
			$('#header .site-map').append(menuDom);
			$('#header .site-map nav').removeAttr('class');
			$('#header .site-map a').attr('tabindex','-1');

			$('#header .depth-02').prev('h2').addClass('has-depth');
			$('#header .depth-03').prev('h3').addClass('has-depth');


		$("#header .depth-02").prev('h2').each(function(index){
			console.log($(this).find('span:eq(0)').html());

			if(index == 6) {
				$(this).removeClass("has-depth")
			}

		});


		 }, 300);
		 $('#wrapper').append('<a href="#" id="btn-top">top</a>');
	}
});



// $(window).on('mousewheel',function(e){
//     if(e.originalEvent.wheelDelta < 0){
//         $('html, body').stop().animate({
//             scrollTop:'+=200px'
//         },200, 'easeOutQuad');
//     } else {
//         $('html,body').stop().animate({
//             scrollTop:'-=200px'
//         },200, 'easeOutQuad');
//     }
//     return false;
// });


ObjDoc.on({
	'mouseover focusin': function() { 
		$('#header').addClass('active');
		$('#header .pc-menu h2').removeClass('active');
		$('.pc-menu .depth-02').removeClass('active');
		$(this).children('h2').addClass('active');
		$(this).children('.depth-02').addClass('active');
	}
}, '#header .pc-menu .depth-01 li')
.on({
	'focusout': function() { 
		$('#header').removeClass('active');
		$('#header .pc-menu h2').removeClass('active');
		$('.pc-menu .depth-02').removeClass('active');
	}
}, '#header .pc-menu .depth-01 a:last')
.on({
	'mouseleave': function() { 
		$('#header').removeClass('active');
		$('#header  .pc-menu h2').removeClass('active');
		$('.pc-menu .depth-02').removeClass('active');
	}
}, '#header .pc-menu')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header').toggleClass('search');
		$(this).toggleClass('active');
	}
}, '#header .seach-open')
.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h2').removeClass('active');
			$('#header .site-map .depth-02').stop().slideUp(250);
		} else{
			$('#header .site-map h2').removeClass('active');
			$(this).parent('h2').addClass('active');
			$('#header .site-map .depth-02').stop().slideUp(250);
			$(this).parent('h2').next('.depth-02').stop().slideDown(300);
			
		}
	}
}, '#header .site-map h2.has-depth a')
.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h3').removeClass('active');
			$('#header .site-map .depth-03').stop().slideUp(250);
		} else{
			$('#header .site-map h3').removeClass('active');
			$(this).parent('h3').addClass('active');
			$('#header .site-map .depth-03').stop().slideUp(250);
			$(this).parent('h3').next('.depth-03').stop().slideDown(300);
			
		}
	}
}, '#header .site-map h3.has-depth a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 0);
	}
}, '#btn-top')
.on({
	'focusout': function() { 
		$('.map-close').focus();
	}
}, '#header .site-map a:last, #header .site-map li:last-child h2:not(.active) a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header .site-map').removeClass('active');
		$('#header .site-map a').attr('tabindex','-1');
		$('.map-open').focus();
	}
}, '#header .site-map .map-close')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header .site-map').addClass('active');
		$('#header .site-map a').attr('tabindex','0');
	}
}, '#header .map-open')
.on({
	'focusout': function() { 
		$('.seach-open').focus();
	}
}, '#header .search-bx input[type="submit"]')
.on('click', '.family .open', function(e){
	e.preventDefault();
	$(this).toggleClass('active');
	$(this).next('.view').slideToggle(250);
});

$(function() {
	ObjWin.on({
		'scroll': function() { 
			var posY = ObjWin.scrollTop();
			if ( posY > 100 ){
				$("#btn-top").addClass('active');
			} else if(posY < 100) {
				$("#btn-top").removeClass('active');
			};
		}	
	});

	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);

	window.addEventListener("resize", () => {
	console.log("resize");
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
	});
});

