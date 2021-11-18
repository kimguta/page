$(function() {

	$('#breadcrumb .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).children('span').text('열기');
			$('#breadcrumb .box ul').slideUp(300);
		} else{
			$('#breadcrumb .open').removeClass('active');
			$(this).addClass('active');
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
			$('#breadcrumb .box ul').slideUp(300);
			$(this).next('ul').slideDown(300);
		}
	});

	$('#breadcrumb').on('mouseleave', function (e) {
		e.preventDefault();
		$('#breadcrumb .open span').text('열기');
		$('#breadcrumb .box ul').slideUp(300);
		$('#breadcrumb .box .open').removeClass('active');
	});

	$('#breadcrumb .box ul li:last-child a').on('focusout', function () {
		$(this).parents('.box').children('.open').focus();
	}); 
	/*
	$('#visual-bx .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		$('#visual-bx .title-bx').fadeOut(300);
	});

	$('#visual-bx .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
		$('#visual-bx .title-bx').fadeIn(300);
	});
	*/

	$('#visual-bx .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('#visual-bx .prev'),
        nextArrow: $('#visual-bx .next'),
        accessibility: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1000,
    });

	$('.vr-navi .slick').slick({
        autoplay: false,
        arrows: false,
        dots: false,
        accessibility: true,
        infinite: false,
		slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
		swipeToSlide: true,
        speed: 300,
		variableWidth: true,
    });

	$('.archive-search .search-btn').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).text('상세검색');
			$('.archive-search .sort-bx').stop().slideUp(600, 'linear');

		} else{
			$(this).addClass('active');
			$(this).text('키워드검색');
			$('.archive-search .sort-bx').stop().slideDown(600, 'linear');
		}
	});


	$('#content .share .open').on('click', function (e) {
		e.preventDefault();
	   $(this).next().fadeToggle(100);
   });

   $('#content .share ul a:last').on('focusout', function () {
	   $('#content .share .open').focus();
   });


	$('.archive-end .slick01').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		$('.archive-end .slick01 .slide a').fadeOut(100);
	});

	$('.archive-end .slick01').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
		$('.archive-end .slick01 .slide a').fadeIn(100);
	});

   $('.archive-end .slick01').slick({
		autoplay: false,
		arrows: false,
		dots: false,
		accessibility: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 700,
		asNavFor: '.archive-end .slick02',
	});


	$('.archive-end .slick02').slick({
		autoplay: false,
		arrows: false,
		dots: false,
		accessibility: true,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		pauseOnHover: false,
		focusOnSelect: true, 
		swipeToSlide: true,
		centerMode: true,
		speed: 700,
		asNavFor: '.archive-end .slick01',
		responsive: [{
            breakpoint: 761,
            settings: {
				slidesToShow: 3,
            }
        }]
	});
	
	$('.archive-end .slick02 .slide').on('click', function (e) {
		e.preventDefault();
	});


	$('.archive-pop .close').on('click', function (e) {
		e.preventDefault();
		$('.archive-pop').fadeOut(200);
		$(this).parent('div').hide();
		$('iframe').each( function() {
            $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        });
	});

	$('.archive-pop .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.archive-pop .count').html('<em>' + i + '</em> / ' + slick.slideCount);
    });

	$('.archive-pop .slick').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		accessibility: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 700,
	});


	$('.archive-end .btn-pop a').on('click', function (e) {
		e.preventDefault();
		$('.archive-pop').fadeIn(200);
		if ($(this).hasClass('movie')) {
			$('.archive-pop .video-bx').show();
		}
		else if ($(this).hasClass('pdf')){
			$('.archive-pop .pdf-bx').show();
		}
		else if ($(this).hasClass('image')){
			$('.archive-pop .img-bx').show();
			$('.archive-pop .slick').slick('setPosition');
		}
	});


	$('.vr-map .slick').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: $('.vr-map .prev'),
        nextArrow: $('.vr-map .next'),
		accessibility: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 700,
	});

	$('.video_promotion .bx').on('click', function (e) {
		e.preventDefault();

		$('.video_promotion .bx, .video-popbx').removeClass('active');
		$(this).addClass('active');
		$('.video-popbx').addClass('active');

		var windowWidth = $(window).width();
		if (windowWidth > 1399) {
			setTimeout(function(){
				var Offset = $('.video-popbx').position();
				$('html, body').animate({
					scrollTop : Offset.top + 600
				}, 300);
			},100);
		} 


		var idx = $(this).index();
		$('.video-popbx').removeClass('ty01 ty02 ty03');
		if (idx < 4) {
			$('.video-popbx').addClass('ty01');
		} else if (idx > 3 && idx < 8) {
			$('.video-popbx').addClass('ty02');
		} else {
			$('.video-popbx').addClass('ty03');
		}

		var windowWidth = $(window).width();
		if (windowWidth < 761) {
			var Val2 = 5
		} else if (windowWidth > 480 && windowWidth < 1400) {
			var Val2 = 10
		} else {
			var Val2 = 20
		}

		var Offset2 = $(this).position().left + ($(this).width() / 2) + Val2;
		$('.video-popbx i').stop().animate({'left':Offset2}, 600,'easeOutCubic');
	});

	$('.video-popbx .close').on('click', function (e) {
		e.preventDefault();
		$('.video_promotion .bx').removeClass('active');
		$('.video-popbx').removeClass('active');
		$('iframe').each( function() {
            $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        });
		$('video').stop();
	});

	$('.question .ask').on('click', function (e) {
		e.preventDefault();
	
		if ($(this).hasClass('active')) {
			$(this).next('.answer').hide();
			$(this).removeClass('active');
		}
		else{
			$('.question .answer').hide();
			$('.question .ask').removeClass('active');
			$(this).next('.answer').show();
			$(this).addClass('active');
		}
	});

	
	$('.facility-info .slick').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: '<a role="button" class="slick-prev prev arrow" href="#">이전</a>',
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">다음</a>',
		accessibility: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 700,
	});

	$('.facility-add .slick').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: '<a role="button" class="slick-prev prev arrow" href="#">이전</a>',
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">다음</a>',
		accessibility: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 700,
	});

	
	$('.all-guide .btn-bx .out').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.all-guide .map img').css('display','block');
			$('.all-guide .map .outside').css('display','none');
		}
		else{
			$(this).addClass('active');
			$('.question .answer').hide();
			$('.all-guide .map img').css('display','none');
			$('.all-guide .map .outside').css('display','block');
		}
	});


	$('.all-guide .btn-bx .vr').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.all-guide .pin-bx').toggle();
	});

	$('.rental .slick').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: '<a role="button" class="slick-prev prev arrow" href="#">이전</a>',
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">다음</a>',
		accessibility: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 700,
	});


	$('.calendar td a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent('td').hasClass('active')) {
			$(this).parent('td').removeClass('active');
		}
		else{
			$('.calendar td').removeClass('active');
			$(this).parent('td').addClass('active');
		}
	});


	$('.calendar-bx .sort-tab a').on('click', function (e) {
		e.preventDefault();

		if ($(this).hasClass('all')) {
			$('.calendar td p').show();
		}
		else if ($(this).hasClass('ty01')){
			$('.calendar td p').hide();
			$('.calendar td p.ty01').show();
		}
		else if ($(this).hasClass('ty02')){
			$('.calendar td p').hide();
			$('.calendar td p.ty02').show();
		}
		else if ($(this).hasClass('ty03')){
			$('.calendar td p').hide();
			$('.calendar td p.ty03').show();
		}
		else if ($(this).hasClass('ty04')){
			$('.calendar td p').hide();
			$('.calendar td p.ty04').show();
		}
		else if ($(this).hasClass('ty05')){
			$('.calendar td p').hide();
			$('.calendar td p.ty05').show();
		}
	});


	$('.per-exhibition .tab a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).index();
		$('.per-exhibition .tab a').removeClass('active');
		$(this).addClass('active');
		$('.per-exhibition .view > div').hide();
		$('.per-exhibition .view > div').eq(idx).show();
	});

	$('.per-exhibition .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
		if ($(window).width() > 1399) {
			if ( i > 1) {
				var i = Math.ceil(i / 4);
			}
			var count = Math.ceil(slick.slideCount / 4);
		}
		else{
			var count = slick.slideCount
		}
        $('.per-exhibition .count').html('<em>' + i + '</em> / ' + count);
    });


	$('.per-exhibition .slick').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: $('.per-exhibition .prev'),
        nextArrow: $('.per-exhibition .next'),
		accessibility: true,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		pauseOnHover: false,
		speed: 700,
		responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 1,
				slidesToScroll: 1,
                variableWidth: true,
                swipeToSlide: true,
				speed: 350,
				centerMode: true,
            }
        }]
	});


	$('.edu-view .slick').slick({
		autoplay: false,
		arrows: false,
		dots: true,
		accessibility: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 500,
	});


	$('.edu-ex a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).index();
		$('.edu-view').show();
		$('.edu-view > div').eq(idx).show();
		$('.edu-view .slick').slick('setPosition');
		setTimeout(function(){
			var Offset = $('#sub_container').offset();
			$('html, body').animate({
				scrollTop : Offset.top 
			}, 300);
		},10);
	});


	$('.edu-view .close').on('click', function (e) {
		e.preventDefault();
		$('.edu-view, .edu-view > div').hide();	
	});


	$('.outdoor_exhibition .tab a').on('click', function (e) {
		e.preventDefault();
		$('.outdoor_exhibition .tab a').removeClass('active');
		$(this).addClass('active');
		$('.outdoor_exhibition .view').addClass('active');
		/*
		var windowWidth = $(window).width();
		if (windowWidth > 1399) {
			setTimeout(function(){
				var Offset = $('.outdoor_exhibition .tab').position();
				$('html, body').animate({
					scrollTop : Offset.top + 600
				}, 300);
			},100);
		} 
		*/
		var idx = $(this).index();
		$('.outdoor_exhibition .view > div').hide();
		$('.outdoor_exhibition .view > div').eq(idx).show();
		var windowWidth = $(window).width();
		if (windowWidth < 761) {
			var Val2 = 5
		} else if (windowWidth > 480 && windowWidth < 1400) {
			var Val2 = 10
		} else {
			var Val2 = 20
		}


		var Offset2 = $(this).position().left + ($(this).width() / 2);
		$('.outdoor_exhibition .tab i').stop().animate({'left':Offset2}, 600,'easeOutCubic');
	});


	$('.sp_exhibition .slick').slick({
		autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: '<a role="button" class="slick-prev prev arrow" href="#">이전</a>',
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">다음</a>',
		accessibility: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 700,
		adaptiveHeight: true,
		
	});

	$('.history .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {

		$('.history .slick-bx').removeClass('ty01 ty02 ty03 ty04');

        if ($('.history .slick .slick-current').hasClass('ty01')) {
			$('.history .slick-bx').addClass('ty01');
		}
		else if ($('.history .slick .slick-current').hasClass('ty02')){
			$('.history .slick-bx').addClass('ty02');
		}
		else if ($('.history .slick .slick-current').hasClass('ty03')){
			$('.history .slick-bx').addClass('ty03');
		}
		else if ($('.history .slick .slick-current').hasClass('ty04')){
			$('.history .slick-bx').addClass('ty04');
		}
    });

	$('.history .slick').slick({
		autoplay: true,
		arrows: false,
		dots: false,
		accessibility: true,
		infinite: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 500,
		vertical: true,
        verticalSwiping:true,
		cssEase: 'linear',
		autoplaySpeed: 8000,
		responsive: [{
            breakpoint: 760,
            settings: {
                speed: 350,
            }
        }]
	});

	
	$('.history .slick').on('wheel', function (e) {
		e.preventDefault();
		if (e.originalEvent.deltaY < 0) {
			$(this).slick('slickPrev');
		} else {
			$(this).slick('slickNext');
		}
	});

});
