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

	$('.calendar01 td.possible > a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parents('tr').next('.schedule').fadeOut(300);
		} else{
			$('.calendar01 td').removeClass('active');
			$(this).parent().addClass('active');
			$('.calendar01 .schedule').fadeOut(300);
			$(this).parents('tr').next('.schedule').fadeIn(300);
		}
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
        speed: 1200
    });

});
