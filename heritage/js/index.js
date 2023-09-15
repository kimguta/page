
function elemOffset(obj){
	$(obj).each(function(){
        var elemTop = $(this).offset().top;
        var elemBottom =$(this).offset().top + $(this).outerHeight();
		var winTop = $(document).scrollTop();
        var winBottom = $(document).scrollTop() + $(window).outerHeight()

		//요소 화면 인

		if( elemTop <= winBottom ){
			$(this).addClass('active');
		}

		// //요소 아래쪽 붙음
		// if( elemBottom <= winBottom ){
		// 	$(this).addClass('elem-bottom');
		// }

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

$(function() { 
    var mainSlickOption1 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: $('.popup .next'),
        pauseOnHover: false,
        speed: 350,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    variableWidth: true,
                    centerMode: true,
                }
            }
        ]
    };
    initSlick($('.popup .slick'), mainSlickOption1);
   
});

// ObjDoc.on({
// 	'click': function(e) { 
//         e.preventDefault();
//         var Idx = $(this).index();
//         $('#news-popup .tab a').removeClass('active');
//         $(this).addClass('active');
//         $('#news-popup .view-bx > div').removeClass('active').eq(Idx).addClass('active');
// 	}
// }, '#news-popup .tab a');
