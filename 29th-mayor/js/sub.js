$(function() {

	$('#breadcrumb .bx .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).children('span').text('열기');
			$('#breadcrumb .box ul').slideUp(250);
		} else{
			$('#breadcrumb .open').removeClass('active');
			$(this).addClass('active');
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
			$('#breadcrumb .box ul').slideUp(250);
			$(this).next('ul').slideDown(250);
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


	$('#title-bx .share .open').on('click', function (e) {
		e.preventDefault();
	   $(this).next('.view').fadeToggle(100);
   });

   $('#title-bx .share .close').on('click', function (e) {
	   e.preventDefault();
	  $(this).parents('.view').fadeToggle(100);
  });

   $('#title-bx .share .view a:last').on('focusout', function () {
	   $('#title-bx .share .open').focus();
	   $('.view').fadeOut(100);
   });
   $('.core_strategy ul li .item_menu').on('click', function (e) {
		e.preventDefault();
		$(this).parent().parent().find('li').removeClass('active');
		$(this).parent().addClass('active');
	});
	$('.core_strategy ul li .item_menu').on('click', function (e) {
		e.preventDefault();
		$(this).parent().parent().find('li').removeClass('active');
		$(this).parent().addClass('active');
	});
	$('.view_box .box_title').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
	});
	$('#A-Gallery.slick').slick({
        autoplay: false,
		arrows: true,
		dots: false,
		prevArrow: '<a href="#" class="prev">이전</a>',
		nextArrow: '<a href="#" class="next">다음</a>',
		accessibility: true,
		swipeToSlide: true,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		speed: 600,
    });
});
