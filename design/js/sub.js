$(function() {

    $('#lnb .depth_03').parent('li').addClass('has_depth');
    	
    $('#lnb .has_depth h3 a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_03').slideUp(300);
            $(this).children('span').text('열기');
		} else{
			$('#lnb h3').removeClass('active');
			$('#lnb .depth_03').slideUp(300);
			$(this).parent().addClass('active');
			$(this).parent().next('.depth_03').slideDown(300);
            $('#lnb h3 a').children('span').text('열기');
            $(this).children('span').text('닫기');
		}
	});

    $('#contents .share button').on('click', function () {
		$(this).next().fadeToggle(100);
	});

	$('#contents .share ul a:last').on('focusout', function () {
		$('#contents .share button').focus();
	});

	$('#search_wrap .btn_box').parent('div').addClass('has_attach');

	$('.tech_doctor .btn_more').on('mouseenter', function () {
		$(this).parents('.box').addClass('active');
	});
	$('.tech_doctor .btn_more').on('mouseleave', function () {
		$(this).parents('.box').removeClass('active');
	});

	$('.rental .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;
		$('.rental .count').html('<em>' + i + '</em> / ' + slick.slideCount);
	});

	$('.rental .slick').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: $('.rental .prev'),
		nextArrow: $('.rental .next'),
		accessibility: false,
		draggable: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		autoplaySpeed: 4000,
		speed: 1500,
	});

	$('.tech_doctor .pop_start a').on('click', function (e) {
		e.preventDefault();
		$(this).parents('.box').fadeOut(200);
		$('.tech_doctor .pop1').fadeIn(200);
		$('.tech_doctor').addClass('start');
	});

	$('.tech_doctor .select_box a').on('click', function (e) {
		e.preventDefault();
		var select = $(this).attr('data-move');
		var showbox = '.' + select
		$(this).parents('.box').fadeOut(200);
		$(showbox).fadeIn(300);
	});

	$('.tech_doctor .pop9 .select_box .no').on('click', function (e) {
		e.preventDefault();
		$('.tech_doctor .pop5 a:first').focus();
		$('.tech_doctor .pop5 .yes').attr('data-move','pop7');
	});

	$('.login .tab a').on('click', function (e) {
		e.preventDefault();
		$('.login .tab li').removeClass('active');
		$(this).parent().addClass('active');
		var idx = $(this).parent().index();
		if(idx == '0') {
			$('.login .btn_login').attr('value', '개인회원 로그인');
		}else{
			$('.login .btn_login').attr('value', '기업회원 로그인');
		}	
	});

	$('.join > div a').on('mouseenter', function () {
		$(this).parent().addClass('active');
	});
	$('.join > div a').on('mouseleave', function () {
		$(this).parent().removeClass('active');
	});

	$('.certification a').on('mouseenter', function () {
		$(this).parent().addClass('active');
	});
	$('.certification a').on('mouseleave', function () {
		$(this).parent().removeClass('active');
	});


	$('.rent_tab .btn_open').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).next('ul').slideToggle(300);
	});


	$('.rent .info_box .slick').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: $('.info_box .slick_wrap .prev'),
		nextArrow: $('.info_box .slick_wrap .next'),
		accessibility: false,
		draggable: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 1000,
		adaptiveHeight: true
	});

	$('.tlist01 .down').on('mouseenter', function () {
		$(this).parents('li').addClass('active');
	});
	$('.tlist01 .down').on('mouseleave', function () {
		$(this).parents('li').removeClass('active');
	});


});
