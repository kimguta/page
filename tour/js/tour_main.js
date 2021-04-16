$( document ).ready( function() {

	/*메인 배너*/
	var $bannerSlide = $('.banner_list_area .banner_list_wrap'),
	$bannerList = $bannerSlide.children('.banner_list'),
	$bannerControl = $bannerSlide.children('.banner_control'),
	$bannerControlNext = $bannerControl.children('.btn_next'),
	$bannerControlPrev = $bannerControl.children('.btn_prev'),
	$bannerControlPause = $bannerControl.children('.btn_pause'),
	$bannerControlPlay = $bannerControl.children('.btn_play');

	$bannerList.slick({
		draggable : false,
		swipe : false,
		slidesToShow : 1,
		autoplay : true,
		autoplaySpeed : 4000,
		arrows : true,
		fade : true,
		prevArrow : $bannerControlPrev,
		nextArrow : $bannerControlNext,
		pauseOnDotsHover : true,
		dots : true,
		appendDots: '.banner_control .append_dots',
		responsive: [{
			breakpoint : 1000,
			settings : {
				draggable : true,
				swipe : true
			}
		}]
	});

	$bannerControlPause.on('click.main', function(event) {
		$bannerControlPause.hide();
		$bannerControlPlay.show().focus();
		$bannerList.slick('slickPause').slick('slickSetOption', 'pauseOnDotsHover', false);
	});

	$bannerControlPlay.on('click.main', function(event) {
		$bannerControlPause.show().focus();
		$bannerControlPlay.hide();
		$bannerList.slick('slickPlay').slick('slickSetOption', 'pauseOnDotsHover', true);
	});

	/*뉴스 배너*/
	var $newsSlide = $('.news_list_area .news_list_wrap'),
	$newsList = $newsSlide.children('.news_list'),
	$newsControl = $newsSlide.children('.news_control'),
	$newsControlNext = $newsControl.children('.btn_next'),
	$newsControlPrev = $newsControl.children('.btn_prev'),
	$newsControlPause = $newsControl.children('.btn_pause'),
	$newsControlPlay = $newsControl.children('.btn_play');

	$newsList.slick({
		draggable : false,
		swipe : false,
		slidesToShow : 2,
		slidesToScroll: 1,
		autoplay : true,
		autoplaySpeed : 4000,
		arrows : true,
		prevArrow : $newsControlPrev,
		nextArrow : $newsControlNext,
		pauseOnDotsHover : true,
		responsive: [{
			breakpoint : 1000,
			settings : {
				draggable : true,
				swipe : true,
				slidesToShow : 1,
			}
			
		}]
	});

	$newsControlPause.on('click.main', function(event) {
		$newsControlPause.hide();
		$newsControlPlay.show().focus();
		$newsList.slick('slickPause').slick('slickSetOption', 'pauseOnDotsHover', false);
	});

	$newsControlPlay.on('click.main', function(event) {
		$newsControlPause.show().focus();
		$newsControlPlay.hide();
		$newsList.slick('slickPlay').slick('slickSetOption', 'pauseOnDotsHover', true);
	});


	/*팝업 배너*/
	var $popSlide = $('.pop_list_area .pop_list_wrap'),
	$popList = $popSlide.children('.pop_list'),
	$popControl = $popSlide.children('.pop_control'),
	$popControlNext = $popControl.children('.btn_next'),
	$popControlPrev = $popControl.children('.btn_prev'),
	$popControlPause = $popControl.children('.btn_pause'),
	$popControlPlay = $popControl.children('.btn_play'),
	$addUp = $('.pop_list_area .pop_list_wrap .count'),
	$addUpCnt = $('.pop_list_area .pop_list_wrap .count .cnt'),
	$addUpAll = $('.pop_list_area .pop_list_wrap .count .all');

	$popList.on('init.main reInit.main afterChange.main', function(event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;

		$addUpCnt.text(i);
		$addUpAll.text(slick.slideCount);
	});

	$popList.slick({
		draggable : false,
		swipe : false,
		slidesToShow : 1,
		autoplay : true,
		autoplaySpeed : 4000,
		arrows : true,
		prevArrow : $popControlPrev,
		nextArrow : $popControlNext,
		pauseOnDotsHover : true,
		responsive: [{
			breakpoint : 1000,
			settings : {
				draggable : true,
				swipe : true
			}
		}]
	});

	$popControlPause.on('click.main', function(event) {
		$popControlPause.hide();
		$popControlPlay.show().focus();
		$popList.slick('slickPause').slick('slickSetOption', 'pauseOnDotsHover', false);
	});

	$popControlPlay.on('click.main', function(event) {
		$popControlPause.show().focus();
		$popControlPlay.hide();
		$popList.slick('slickPlay').slick('slickSetOption', 'pauseOnDotsHover', true);
	});
	
});

$(function() {
	var windowWidth = $(window).width();
	$('.page-container').on('mousemove', function(e) {
		var moveX = (($(window).width() / 2) - e.pageX) * 0.20;
		var moveY = (($(window).height() / 2) - e.pageY) * 0.38;	
		if (windowWidth > 1199) {
			$('#page-back').css('margin-left', moveX + 'px');
			$('#page-back').css('margin-top', moveY + 'px');
		}
	});

	var video = $('#v01');
	
	$('.poiner').on('mouseenter', function(e) {
		$(this).addClass('stop');
		$('.dim').fadeIn(200);
		video[0].pause();
		$('.test1').addClass('active');
		$('.test1').text('영상재생');
	});
	
	$('.poiner').on('mouseleave', function(e) {
		$(this).removeClass('stop');
		$('.dim').fadeOut(200);
		video[0].play();
		$('.test1').removeClass('active');
		$('.test1').text('영상정지');
	});

	video.on('timeupdate', function() {

		if (video[0].currentTime < 26) {
			$('#page-back').removeClass('ps05');
			$('#page-back').addClass('ps01');
			$('.map > div').hide();
			$('.map .m01').show();
		}
		else if (video[0].currentTime > 26 && video[0].currentTime < 59) {
			$('#page-back').removeClass('ps01');
			$('#page-back').addClass('ps02');
			$('.map > div').hide();
			$('.map .m02').show();
		}
		else if (video[0].currentTime > 59 && video[0].currentTime < 84) {
			$('#page-back').removeClass('ps02');
			$('#page-back').addClass('ps03');
			$('.map > div').hide();
			$('.map .m03').show();
		}
		else if (video[0].currentTime > 84 && video[0].currentTime < 111) {
			$('#page-back').removeClass('ps03');
			$('#page-back').addClass('ps04');
			$('.map > div').hide();
			$('.map .m04').show();
		}
		else if (video[0].currentTime > 111) {
			$('#page-back').removeClass('ps04');
			$('#page-back').addClass('ps05');
			$('.map > div').hide();
			$('.map .m05').show();
		}

		var Time = video[0].currentTime / video[0].duration * 100
		$('.control em').css('width',Time + "%");
		$('.timer').text(parseInt(video[0].currentTime));
	});

	$('.control .next').on('click', function(e) {
		e.preventDefault();
		$('.page-container').addClass('scroll');
		if ($('#page-back').hasClass('ps01')) {
			$('#page-back').removeClass('ps01');
			$('#page-back').addClass('ps02');
			video[0].currentTime = 26
		}
		else if ($('#page-back').hasClass('ps02')) {
			$('#page-back').removeClass('ps02');
			$('#page-back').addClass('ps03');
			video[0].currentTime = 59
		}
		else if ($('#page-back').hasClass('ps03')) {
			$('#page-back').removeClass('ps03');
			$('#page-back').addClass('ps04');
			video[0].currentTime = 84
		}
		else if ($('#page-back').hasClass('ps04')) {
			$('#page-back').removeClass('ps04');
			$('#page-back').addClass('ps05');
			video[0].currentTime = 111
		}
		else if ($('#page-back').hasClass('ps05')) {
			$('#page-back').removeClass('ps05');
			$('#page-back').addClass('ps01');
			video[0].currentTime = 0
		}
	});
	
	$('.control .prev').on('click', function(e) {
		e.preventDefault();
		if ($('#page-back').hasClass('ps05')) {
			$('#page-back').removeClass('ps05');
			$('#page-back').addClass('ps04');
			video[0].currentTime = 84
		}
		else if ($('#page-back').hasClass('ps04')) {
			$('#page-back').removeClass('ps04');
			$('#page-back').addClass('ps03');
			video[0].currentTime = 59
		}
		else if ($('#page-back').hasClass('ps03')) {
			$('#page-back').removeClass('ps03');
			$('#page-back').addClass('ps02');
			video[0].currentTime = 26
		}
		else if ($('#page-back').hasClass('ps02')) {
			$('#page-back').removeClass('ps02');
			$('#page-back').addClass('ps01');
			video[0].currentTime = 0
		}
		else if ($('#page-back').hasClass('ps01')) {
			video[0].currentTime = 0
			$('#page-back').removeClass('ps01',function(e){$('#page-back').addClass('ps01');});
		}
	});

	$('.sound').on('click', function(e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			video[0].muted = true;
			$(this).text('음원재생');
		}
		else {
			$(this).addClass('active');
			video[0].muted = false;
			$(this).text('음원중지');
		}
	});		

	$('.test1').on('click', function(e) {
		e.preventDefault();
		video[0].pause();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			video[0].play();
			$(this).text('영상정지');
			$('.poiner').removeClass('stop');
			$('.dim').fadeOut(200);
		}
		else {
			$(this).addClass('active');
			video[0].pause();
			$(this).text('영상재생');
			$('.poiner').addClass('stop');
			$('.dim').fadeIn(200);
		}
	});	
	
});	

$(window).on('load resize', function () {
    var windowWidth = $(this).width();
	var Sposition =  ($('#page-back').width() - windowWidth) / 2;
    if (windowWidth < 1200) {
		$('.page-wp').scrollLeft(Sposition);
    }
});

