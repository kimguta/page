$(function() { 

     var slickOption1 = {
        autoplay: true,
        arrows: false,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        fade: true,
        speed: 1500,
        autoplaySpeed: 3500,
    };
    
    initSlick($('#visual .slick'), slickOption1);

    var slickOption2 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        prevArrow: $('#why .prev'),
        nextArrow: $('#why .next'),
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        pauseOnHover: false,
        cssEase: 'linear',
        speed: 500,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 741,
                settings: {
                    speed: 250,
                }
            }
        ]
    };
    
    initSlick($('#why .slick'), slickOption2);
});


function elemOffset(obj){
	$(obj).each(function(){
        var elemTop = $(this).offset().top;
        var elemBottom =$(this).offset().top + $(this).outerHeight() - 50;
		var winTop = $(document).scrollTop();
        var winBottom = $(document).scrollTop() + $(window).outerHeight()

		//요소 화면 인

		// if( elemTop <= winBottom ){
		// 	$(this).addClass('active');
		// }

		//요소 아래쪽 붙음
		if( elemBottom <= winBottom ){
			$(this).addClass('active');
		}

		// //요소 위쪽 붙음
		// if( elemTop <= winTop ){
		// 	$(this).addClass('elem-top');
		// }

		// //요소 화면 아웃
		// if( elemBottom <=  winTop ){
		// 	$(this).addClass('elem-out');
		// }
	});
}

$(window).on('scroll load', function(){
	elemOffset('.offset');
});


ObjDoc.on({
	'click': function(e) { 
		e.preventDefault(e);
        $('.alram .view-bx').show();
	}
}, '.alram .open')
.on({
	'click': function(e) { 
		e.preventDefault(e);
        $('.alram .view-bx').hide();
	}
}, '.alram .close')
.on({
	'click': function(e) { 
		e.preventDefault(e);
        Idx = $(this).index();
        $('#news .tab a').removeClass('active');
        $(this).addClass('active');
        $('#news .view-bx > div').removeClass('active');
        $('#news .view-bx > div').eq(Idx).addClass('active')
	}
}, '#news .tab a')
.on({
	'mouseover': function(e) { 
		e.preventDefault(e);
        $('.card-bx .item').removeClass('active');
        $(this).addClass('active');
	}
}, '.card-bx .item');