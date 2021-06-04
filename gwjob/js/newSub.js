$(function() {


	$('#breadcrumb .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).children('span').text('열기');
		} else{
			$('#breadcrumb .open').removeClass('active');
			$(this).addClass('active');
			$('#breadcrumb .open span').text('열기');
			$(this).children('span').text('닫기');
		}
	});

	$('#breadcrumb .box ul li:last-child a').on('focusout', function () {
		$(this).parents('.box').children('.open').focus();
	});
	

	 $('#breadcrumb .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next().fadeToggle(100);
	});

	$('#breadcrumb .share ul a:last').on('focusout', function () {
		$('#breadcrumb .share .open').focus();
	});



	$('.location .container > ul > li > h2').click(function() {
		if ($($(this)).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$('.location .container > ul > li > h2').removeClass('active');
			$(this).addClass('active');
		}
	});
	
	$('button.share').click(function() {
		if ($('button.share + ul').css('display') == 'none') {
			$('button.share + ul').show();
		} else {
			$('button.share + ul').hide();
		}
	});

	$(".tab_content").hide();
    $(".tab_content:first").show();

    $("ul.content_tabs li").click(function() {
        $("ul.content_tabs li").removeClass("active");
        $(this).addClass("active");
        $(".tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn();
    });

	
});
