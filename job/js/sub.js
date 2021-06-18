$(function() {

	 $('#breadcrumb .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next().fadeToggle(100);
	});

	$('#breadcrumb .share ul a:last').on('focusout', function () {
		$('#breadcrumb .share .open').focus();
	});

	$('#breadcrumb .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next('.bx').slideUp(200);
			$(this).children('span').text('열기');
		} else{
			$('#breadcrumb .open').removeClass('active');
			$('#breadcrumb .btn .bx').slideUp(200);
			$(this).addClass('active');
			$(this).next('.bx').slideDown(200);
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
		}
	});

	$('.toggletap > li a').on('click', function(e) {
		e.preventDefault();
		var idx = $(this).parent().index();
		$('.toggletap > li').removeClass('active');
		$(this).parent().addClass('active');
		$('.terms > div').hide();
		$('.terms > div').eq(idx).show();

	});

	$(".datepicker").datepicker({
        showOn: "button",
        buttonImage: "/page/job/images/sub/calendar.png",
        buttonImageOnly: true,
        dateFormat: 'yy-mm-dd',
        buttonText: "납부일자",  
    });

	/* popup_중도해지 */
	//$('.pop_box_warning').show(300);
	
	$('.pop_box_warning a.confirm').click(function() {
        $('.pop_box_warning').hide(300);
        $('body').css('overflow', '');
    });
	
	$('.pop_box_warning a.cancel').click(function() {
        $('.pop_box_warning').hide(300);
        $('body').css('overflow', '');
    });


	/* 카드뉴스 */
	$('.view1 .slick1 .slick').slick({
		autoplay: false,
		arrows: true,
		prevArrow: ('.view1 .slick1 .prev'),
		nextArrow: ('.view1 .slick1 .next'),
		accessibility: true,
		dots: false,
		draggable: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		zIndex: 1,
		asNavFor: '.view1 .slick1 .thumbs',
		pauseOnHover: false,
		autoplaySpeed: 4000,
		speed: 1500
	});

	$('.view1 .slick1 .thumbs').slick({
		autoplay: false,
		arrows: false,
		dots: false,
		accessibility: false,
		draggable: false,
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		zIndex: 1000,
		asNavFor: '.view1 .slick1 .slick',
		pauseOnHover: false,
		focusOnSelect: true
	});


	$('.faq .bbx a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).index();
		$('.faq .bbx a').removeClass('active');
		$(this).addClass('active');
		$('.lstbx > div').hide();
    	$('.lstbx > div').eq(idx).show();
	});

	$('.faq h5 a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent('h5').hasClass('active')) {
			$(this).parent('h5').removeClass('active');
		} else {
			$('.faq h5').removeClass('active');
			$(this).parent('h5').addClass('active');
		}
	});

	$('.faq .titbx a').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).parents('.sbx').find('h5').removeClass('active');
			$(this).text('+ 전체 펼쳐보기');
			$(this).removeClass('active');
		} else {
			$(this).parents('.sbx').find('h5').addClass('active');
			$(this).text('+ 전체 접기');
			$(this).addClass('active');
		}
	});

});



