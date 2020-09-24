

$(window).on('load resize', function () {
    var windowWidth = $(this).width();
    if (windowWidth < 480) {
        device = 'mobile';
    } else if (windowWidth > 480 && windowWidth < 1024) {
        device = 'tablet';
    } else {
        device = 'pc';
    }
});

$(function() {

    $('#breadcrumb .btn_open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next('ul').slideUp(300);
			$(this).children('span').text('열기');
		} else{
			$('#breadcrumb .btn_open').removeClass('active');
			$('#breadcrumb .box ul').slideUp(300);
			$(this).addClass('active');
			$(this).next('ul').slideDown(300);
			$('#breadcrumb .btn_open span').text('열기');
			$(this).children('span').text('닫기');
		}
	});

	$('#breadcrumb .box ul li:last-child a').on('focusout', function () {
		$(this).parents('.box').children('.btn_open').focus();
	});

	$(".depth_02 .active").parent('ul').show();
	$(".depth_02").prev('h3').addClass('has_depth');

	$('#lnb h3.has_depth a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_02').slideUp(300);
			$(this).children('span').text('열기');
		} else{
			$('#lnb h3').removeClass('active');
			$('#lnb .depth_02').slideUp(300);
			$(this).parent().addClass('active');
			$(this).parent().next('ul').slideDown(300);
			$('#lnb h3 a span').text('열기');
			$(this).children('span').text('닫기');
		}
	});
	
	var Aidx = $('.tab_box li.active').index('.tab_box li');
	$('.tab_content > div').eq(Aidx).show();

	$('.tab_box li a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).parent('li').index();
		$('.tab_box li').removeClass('active');
		$(this).parent().addClass('active');
		$('.tab_content > div').hide();
		$('.tab_content > div').eq(idx).show();		
	});

	$('.gallery_box .box01 .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.gallery_box .count').html('<em>' + i + '</em><span>/</span><em class="sum">' + slick.slideCount + '</em>');
    });

	$('.gallery_box .box01 .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('.gallery_box .prev'),
        nextArrow: $('.gallery_box .next'),
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
		asNavFor: '.gallery_box .box02 .slick',
        speed: 1500
    });

	$('.box02 .slick a').on('click', function (e) {
		e.preventDefault();	
	});

	$('.gallery_box .box02 .slick').slick({
		vertical:true,
		arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
		accessibility: false,
		focusOnSelect: true,
		asNavFor: '.gallery_box .box01 .slick',
        speed: 1500,
		responsive: [{
				breakpoint: 500,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					vertical:false
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					vertical:false
				}
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
					vertical:false
				}
			}
			,
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 1,
					vertical:false
				}
			}
		]
    });

//	$('.promotion .list01 .select').on('click', function (e) {
//		e.preventDefault();
//		$(this).parents('li').toggleClass('active');	
		
//	});

	$('.festival_list a').on('mouseover', function () {
		$(this).parents('li').addClass('active');
	});

    $('.festival_list a').on('mouseout focusout', function () {
		$(this).parents('li').removeClass('active');
	});

	/*임시*/

	$('.festival .slick').slick({
		autoplay: false,
		arrows: true,
		accessibility: false,
		dots: false,
		prevArrow: $('.festival .prev'),
		nextArrow: $('.festival .next'),
		draggable: true,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		zIndex: 5,
		pauseOnHover: false,
		autoplaySpeed: 4000,
		speed: 1500,
		responsive: [{
				breakpoint: 426,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			}
		]
	});

	$('#btn-top').click(function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 300);
	});


	$('.slick1 .slick').slick({
		autoplay: false,
		arrows: true,
		accessibility: false,
		dots: false,
		prevArrow: $('.slick1 .prev'),
		nextArrow: $('.slick1 .next'),
		draggable: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		zIndex: 1,
		pauseOnHover: false,
		autoplaySpeed: 4000,
		speed: 1500
	});
	$('.slick1 .slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
		$('.slick1 .thumbs li').removeClass('active');
		$('.slick1 .thumbs li').eq(currentSlide).addClass('active');
	});
	$('.slick1 .thumbs li a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).parent().index();
		$('.slick1 .slick').slick('slickGoTo', idx);
	});
	/* 주변 관광정보 관광/숙박
	$('.area1 .btn').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).index();
		console.log(idx);
		$('.area1 .btn').removeClass('active');
		$(this).addClass('active');
		$('.tabs-wrap > div').hide();
		$('.tabs-wrap > div').eq(idx).show();
	}); 
	*/
	$('.select-pack > button, .purpose-wrap > button, .select-pack2 > button').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
	});
	$('.tab-nav li a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).parent().index();
		$('.tab-nav li').removeClass('active');
		$(this).parent().addClass('active');
		$('.tabs > div').hide();
		$('.tabs > div').eq(idx).show();
	});
	$('.plan1 .course-list + fieldset button').on('click', function (e) {
		e.preventDefault();
		searchAddress()
	});
	$('.course1 .btn-route').on('click', function (e) {
		e.preventDefault();
		$('.course1 .route').hide();
		$(this).siblings('.route').show();
	});
	$('.route .btn-close').on('click', function (e) {
		e.preventDefault();
		$('.route').hide();
	});
	$('.responsive').on('scroll', function (e) {
		$(this).addClass('moved');
	});
	$("input.date").datepicker({
		dateFormat: 'yy-mm-dd', //Input Display Format 변경
		showOtherMonths: true, //빈 공간에 현재월의 앞뒤월의 날짜를 표시
		showMonthAfterYear: true, //년도 먼저 나오고, 뒤에 월 표시
		showOn: "both", //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
		changeYear: true, //년도 변경
		// buttonImage: "./images/ico_calendar.png", //버튼 이미지 경로
		buttonImageOnly: true, //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
		buttonText: "선택", //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
		yearSuffix: "년", //달력의 년도 부분 뒤에 붙는 텍스트
		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], //달력의 월 부분 텍스트
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], //달력의 월 부분 Tooltip 텍스트
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], //달력의 요일 부분 텍스트
		dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
	});

	//여행플래너 수정 추가

	$('.plan1 .result-wrap .close').on('click', function (e) {
		e.preventDefault();
		$('.result-wrap').hide();
	});


	$('.plan1 .plan_pop .close').on('click', function (e) {
		e.preventDefault();
		$('.plan_pop').hide();
	});

	$('.plan1 .slick').slick({
		autoplay: false,
		arrows: false,
		dots: true,
		appendDots: $('.plan1 .dots'),
		accessibility: false,
		draggable: true,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false
	});

	$('.three-depth li.active a').on('click', function (e) {
		if (device != 'pc') {
			e.preventDefault();
			$(this).parent().toggleClass('on');
			$(this).parents('.three-depth').toggleClass('on');
		}
	});

});


