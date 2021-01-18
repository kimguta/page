$(function() {

    $('#breadcrumb .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next('ul').slideUp(200);
			$(this).children('span').text('열기');
		} else{
			$('#breadcrumb .open').removeClass('active');
			$('#breadcrumb .box ul').slideUp(200);
			$(this).addClass('active');
			$(this).next('ul').slideDown(200);
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
		}
	});

	$('#breadcrumb .box ul li:last-child a').on('focusout', function () {
		$(this).parents('.box').children('.open').focus();
	});
	

	 $('#content .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next().fadeToggle(100);
	});

	$('#content .share ul a:last').on('focusout', function () {
		$('#content .share .open').focus();
	});


	$('.smart_db .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.smart_db .count').html('<em>' + i + '</em> <span>/ </span> <em class="sm">' + slick.slideCount + '</em>');
    });

    $('.smart_db .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('.smart_db .prev'),
        nextArrow: $('.smart_db .next'),
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1000,
		responsive: [{
            breakpoint: 992,
            settings: {
                adaptiveHeight: true
            }
        }]

    });

	$('.making_trip .open').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).next('.view').slideToggle(300);
	});

	$('.making_trip .view a:last-child').on('focusout', function () {
		$('.making_trip .open').removeClass('active');
		$('.making_trip .view').slideUp(300);
		$(this).parent('.view').prev('.open').focus();
	});

	$('.making_trip .select_tab .box > div').on('mouseleave', function () {
		$('.making_trip .open').removeClass('active');
		$('.making_trip .view').slideUp(300);
	});

	$('.making_trip .map_wrap .tab a:first-child').addClass('active');
	$('.making_trip .map_wrap .course > div:first-child').show();

	$('.making_trip .list_box .tab a:first-child').addClass('active');
	$('.making_trip .list_box .clist > div:first-child').show();

	$('.making_trip .map_wrap .tab a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).index();
		$('.making_trip .map_wrap .tab a').removeClass('active');
		$(this).addClass('active');
		$('.making_trip .map_wrap .course > div').hide();
		$('.making_trip .map_wrap .course > div').eq(idx).show();
		$('.making_trip .map_wrap .course > div > div:first-child .del').focus();
	});

	$('.making_trip .list_box .tab a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).index();
		$('.making_trip .list_box .tab a').removeClass('active');
		$(this).addClass('active');
		$('.making_trip .list_box .clist > div').hide();
		$('.making_trip .list_box .clist > div').eq(idx).show();
		$('.making_trip .list_box .clist > div > div:first-child .detail').focus();
	});

	$('.making_trip .item .detail').on('mouseenter', function () {
		$(this).parents('.item').addClass('active');
	});

	$('.making_trip .item .detail').on('mouseleave', function () {
		$(this).parents('.item').removeClass('active');
	});

	$('.making_trip .spot .close').on('click', function (e) {
		e.preventDefault();
		$(this).parents('.spot').hide();
	});

	$('.recommend .sbox01 a').on('click', function (e) {
		e.preventDefault();
		$(this).siblings('a').removeClass('active');
		$(this).addClass('active');
	});
	
	$('.recommend.v3 .sbox02 a').on('click', function (e) {
		e.preventDefault();
		$(this).siblings('a').removeClass('active');
		$(this).addClass('active');
	});

	$('.recommend.v2 .sbox02 a').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
	});

	$('.high_place .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
       $('.high_place .head_text').fadeOut(300);
    });

	$('.high_place .slick').on('afterChange', function(event, slick, currentSlide, nextSlide) {
       $('.high_place .head_text').fadeIn(300);
    });

	 $('.high_place .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('.high_place .prev'),
        nextArrow: $('.high_place .next'),
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1200,
		responsive: [{
            breakpoint: 761,
            settings: {
                 speed: 900
            }
        }]
    });

	$('.cool_place .group02 > div:first-child h5 a').addClass('active');
	$('.cool_place .group02 > div:first-child .movie').show();



	$('.cool_place h5 a').on('click', function (e) {
		e.preventDefault();
		$('#if01')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
		$('#if02')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
		$('#if03')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
		$('#if04')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
		$('#if05')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
		$('.cool_place h5 a').removeClass('active');
		$(this).addClass('active');
		$('.cool_place .movie').hide();
		$(this).parent('h5').next('.movie').show();
	});

	$('.cool_place .btn_box .night').on('click', function (e) {
		e.preventDefault();
		$('.cool_place .btn_box a').removeClass('active');
		$(this).addClass('active');
		$('.cool_place').removeClass('day');
		$('.cool_place').addClass('night');
	});

	$('.cool_place .btn_box .day').on('click', function (e) {
		e.preventDefault();
		$('.cool_place .btn_box a').removeClass('active');
		$(this).addClass('active');
		$('.cool_place').removeClass('night');
		$('.cool_place').addClass('day');
	});

	$('.special_romance .bg_btn a').on('click', function (e) {
		e.preventDefault();
		$('.special_romance').toggleClass('v2');
	});

	$('.special_romance .control a').on('click', function (e) {
		e.preventDefault();
		var Position = $('.special_romance .slick').offset();
		$('html, body').animate({
			scrollTop : Position.top + 20
		}, 500);
	});

	 $('.special_romance .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
		swipe:false,
        prevArrow: $('.special_romance .prev'),
        nextArrow: $('.special_romance .next'),
        accessibility: true,
        draggable: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
		adaptiveHeight: true,
        pauseOnHover: false,
        speed: 1200,
		responsive: [{
            breakpoint: 761,
            settings: {
                 speed: 900
            }
        }]
    });


	$('.special_romance .control').append("<p>화살표를 클릭해주세요</p>")

		
	$('.special_emotion .bg_btn a').on('click', function (e) {
		e.preventDefault();
		$('.special_emotion').toggleClass('v2');
		 if ($('.special_emotion').hasClass('v2')) {
            $('.special_emotion .bg_btn span').html('스위치를 눌러 낮감성으로!<br>태백 타임워프, 슝슝~');
        } else {
           $('.special_emotion .bg_btn span').html('스위치를 눌러 밤감성으로!<br>태백 타임워프, 슝슝~');
        }	
		$('#audio')[0].play();	
	});

	$('.special_emotion .bplay').on('click', function (e) {
		 if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).html('음악켜기');
			$('#audio')[0].pause();	
        } else {
			$(this).addClass('active');
			$(this).html('음악끄기');
			$('#audio')[0].play();	
        }		
	});

		
	 $('.special_emotion .slick').slick({
        autoplay: true,
        arrows: false,
        dots: false,
        accessibility: true,
        draggable: true,
        infinite: true,
		fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1500,
		autoplaySpeed: 4700
	});

	$('.always .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		$('.always .info ul, .always .info .control').fadeOut(300);
	 });
 
	 $('.always .slick').on('afterChange', function(event, slick, currentSlide, nextSlide) {
		$('.always .info ul, .always .info .control').fadeIn(300);
	 });
	
	$('.always .slick').slick({
        autoplay: true,
        arrows: true,
		dots: false,
		prevArrow: $('.always .prev'),
        nextArrow: $('.always .next'),
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
		speed: 1200,
		autoplaySpeed: 5000,
		responsive: [{
            breakpoint: 761,
            settings: {
                 speed: 1100
            }
        }]
	});

	$('.latte .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		$('.latte .slick_wrap .slick-arrow').fadeOut(300);
	 });
 
	 $('.latte .slick').on('afterChange', function(event, slick, currentSlide, nextSlide) {
		$('.latte .slick_wrap .slick-arrow').fadeIn(300);
	 });
	
	$('.latte .slick').slick({
        autoplay: true,
        arrows: true,
		dots: false,
		fade: true,
        accessibility: true,
        draggable: true,
		infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
		speed: 1000,
		autoplaySpeed: 5000,
		responsive: [{
            breakpoint: 761,
            settings: {
                 speed: 1000
            }
        }]
	});
	
	$('.qlstbx .audiobx.s1 .stbtn').on('click', function (e) {
		e.preventDefault();	
		if ($(this).hasClass('active')) {	
			$(this).removeClass('active');
			$('#audio01')[0].pause();
			$(this).find('span').text('이야기 듣기');

        } else {
			$('#audio02')[0].pause();
			$('.qlstbx .audiobx .stbtn').removeClass('active');
			$('.qlstbx .audiobx .stbtn span').text('이야기 듣기');
			$(this).addClass('active');
			$('#audio01')[0].play();
			$(this).find('span').text('이야기 중...');
        }
	});

	$('.qlstbx .audiobx.s2 .stbtn').on('click', function (e) {
		e.preventDefault();		
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('#audio02')[0].pause();
			$(this).find('span').text('이야기 듣기');

        } else {
			$('#audio01')[0].pause();
			$('.qlstbx .audiobx .stbtn').removeClass('active');
			$('.qlstbx .audiobx .stbtn span').text('이야기 듣기');
			$(this).addClass('active');
			$('#audio02')[0].play();
			$(this).find('span').text('이야기 중...');
        }
	});
	
});
