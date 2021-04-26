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
		var moveX = (($(window).width() / 2) - e.pageX) * 0.15;
		var moveY = (($(window).height() / 2) - e.pageY) * 0.25;	
		if (windowWidth > 1199) {
			$('#page-back').css('margin-left', moveX + 'px');
			$('#page-back').css('margin-top', moveY + 'px');
		}
	});
	

	$('.sound').on('click', function(e) {
		e.preventDefault();
		$('#playerVideo1').YTPToggleVolume();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).text('음원재생');
		}
		else {
			$(this).addClass('active');
			$(this).text('음원중지');
		}
	});
	
	$('.poiner').on('mouseenter', function(e) {
		$(this).addClass('stop');
		$('.dim').fadeIn(200);
		$('#playerVideo1').YTPPause();
		$('.test1').addClass('active');
		$('.test1').text('영상재생');
	});
	
	$('.poiner').on('mouseleave', function(e) {
		$(this).removeClass('stop');
		$('.dim').fadeOut(200);
		$('#playerVideo1').YTPPlay();
		$('.test1').removeClass('active');
		$('.test1').text('영상정지');
	});

	$('.test1').on('click', function(e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$('#playerVideo1').YTPPlay();
		}
		else {
			$(this).addClass('active');
			$('#playerVideo1').YTPPause();
		}
	});	

	myPlayer = $("#playerVideo1").YTPlayer();


	myPlayer.on("YTPTime", function (e) {
		var currentTime = e.time;
		if (currentTime < 26) {
			$('#page-back').removeClass('ps05 ps02');
			$('#page-back').addClass('ps01');
			$('.page-wp').removeClass('ps05 ps02');
			$('.page-wp').addClass('ps01');
		}
		else if (currentTime > 26 && currentTime < 59) {
			$('#page-back').removeClass('ps01 ps03');
			$('#page-back').addClass('ps02');
			$('.page-wp').removeClass('ps01 ps03');
			$('.page-wp').addClass('ps02');
		}
		else if (currentTime > 59 && currentTime < 84) {
			$('#page-back').removeClass('ps02 ps04');
			$('#page-back').addClass('ps03');
			$('.page-wp').removeClass('ps02 ps04');
			$('.page-wp').addClass('ps03');
		}
		else if (currentTime > 84 && currentTime < 111) {
			$('#page-back').removeClass('ps03 ps05');
			$('#page-back').addClass('ps04');
			$('.page-wp').removeClass('ps03 ps05');
			$('.page-wp').addClass('ps04');
		}
		else if (currentTime > 111) {
			$('#page-back').removeClass('ps04 ps01');
			$('#page-back').addClass('ps05');
			$('.page-wp').removeClass('ps04 ps01');
			$('.page-wp').addClass('ps05');
		}
		var bTime = currentTime / 120 * 100
		$('.control em').css('width',bTime + "%");
	});

	$('.control .next').on('click', function(e) {
		e.preventDefault();
		$('#page-back .bx').fadeOut(0);
		$('#page-back .bx').delay(3000).fadeIn(300);
		if ($('#page-back').hasClass('ps01')) {
			$('#playerVideo1').YTPSeekTo(26);
		}
		else if ($('#page-back').hasClass('ps02')) {
			$('#playerVideo1').YTPSeekTo(59);
		}
		else if ($('#page-back').hasClass('ps03')) {
			$('#playerVideo1').YTPSeekTo(84);
			
		}
		else if ($('#page-back').hasClass('ps04')) {
			$('#playerVideo1').YTPSeekTo(111);
			
		}
		else if ($('#page-back').hasClass('ps05')) {
			$('#playerVideo1').YTPSeekTo(0);
			
		}
	});
	
	$('.control .prev').on('click', function(e) {
		e.preventDefault();
		if ($('#page-back').hasClass('ps05')) {
			$('#playerVideo1').YTPSeekTo(84);
		}
		else if ($('#page-back').hasClass('ps04')) {
			$('#playerVideo1').YTPSeekTo(59);
		}
		else if ($('#page-back').hasClass('ps03')) {
			$('#playerVideo1').YTPSeekTo(26);
		}
		else if ($('#page-back').hasClass('ps02')) {
			$('#playerVideo1').YTPSeekTo(0);
		}
		else if ($('#page-back').hasClass('ps01')) {
			$('#playerVideo1').YTPSeekTo(0);
		}
	});

	myPlayer.on("YTPPlay", function(){
		$('.poiner').removeClass('stop');
		$('.dim').fadeOut(200);
		$('.test1').removeClass('active').text('영상정지');
	});

	myPlayer.on("YTPPause", function(){
		$('.poiner').addClass('stop');
		$('.dim').fadeIn(200);
		$('.test1').addClass('active').text('영상재생');
	});

	
});	

$(window).on('load resize', function () {
    var windowWidth = $(this).width();
	var Sposition =  ($('#page-back').width() - windowWidth) / 2;
    if (windowWidth < 1200) {
		$('.page-wp').scrollLeft(Sposition);
    }
});

