
$(function() {
    
    var navOffset = $('#header').offset();

	$(window).on('scroll load', function () {
	    if ($(document).scrollTop() > 30) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});

	var highestBox = 0;
		$('#gnb_pc .depth_02').each(function(){
				if($(this).height() > highestBox){
				highestBox = $(this).height();
			}
		});
		
	
	$('#gnb_pc .depth_01 li').on('mouseover focusin', function () {
		$('#header').addClass('active');
		$('#gnb_pc h2').removeClass('active');
		$(this).children('h2').addClass('active');
		$('#gnb_pc .depth_02').stop().css('height',highestBox).show();
		$('.bg_pc').stop().css('height',highestBox).show();
		$('.mask_pc').stop().fadeIn(300);
	});
	
		/*
	$('#gnb_pc .depth_01 li').on('mouseover focusin', function () {
		$('#header').addClass('active');
		$('#gnb_pc h2').removeClass('active');
		$(this).children('h2').addClass('active');
		$('#gnb_pc .depth_02').show().stop().animate({height:highestBox},300);
		$('.bg_pc').show().stop().animate({height:highestBox},200);
		$('.mask_pc').stop().fadeIn(300);
	});
	*/

	$('#gnb_pc .depth_01 li').on('mouseout', function () {
		$(this).children('h2').removeClass('active');
	});	
	
	$('#header').on('mouseleave', function () {
		$('#header').removeClass('active');
		$('#gnb_pc h2').removeClass('active');
		$('.bg_pc').stop().delay(150).slideUp(300);
		$('#gnb_pc .depth_02').stop().slideUp(300);
		$('.mask_pc').stop().fadeOut(300);
	});	

	$('#gnb_pc h2 a').on('focusin', function () {
		$('#header').addClass('active');
		$('#gnb_pc h2').removeClass('active');
		$(this).parent().addClass('active');
		$('#gnb_pc .depth_02').stop().css('height',highestBox).show();
		$('.bg_pc').stop().css('height',highestBox).show();
		$('.mask_pc').fadeIn(300);
	});

	$('#gnb_pc .depth_02 a:last').on('focusout', function () {
		$('#header').removeClass('active');
		$('#gnb_pc h2').removeClass('active');
		$('.bg_pc').stop().delay(150).slideUp(300);
		$('#gnb_pc .depth_02').stop().slideUp(300);
		$('.mask_pc').fadeOut(300);
	});


	$('#header .search').on('click', function (e) {
		e.preventDefault();
	    $('#search').slideToggle(200);
		$('#srch').focus();
	});

	$('#search .close').on('click focusout', function (e) {
		e.preventDefault();
	    $('#search').slideUp(200);
		$('#header .search').focus();
	});


	$('#header .sitemap').on('click', function (e) {
		e.preventDefault();
		$('#sitemap').show();
		$('.sitemapbg').show();
	});

	$('#sitemap .close').on('click', function (e) {
		e.preventDefault();
		$('#sitemap').hide();
		$('#header .sitemap').focus();
		$('.sitemapbg').hide();
	});


	$('#header .mopen').on('click', function (e) {
		e.preventDefault();
		$('#header').toggleClass('active2');
	    $(this).toggleClass('active');
		$('#gnb_mobile').toggleClass('active');
		$('.mask_mobile').fadeToggle(200);
		if ($(this).hasClass('active')) {
			$('body').addClass('fixed');
		} else{
			$('body').removeClass('fixed');
		}
	});

	$('.mask_mobile').on('click', function (e) {
		e.preventDefault();
		$('#header').removeClass('active2');
		$('#gnb_mobile').removeClass('active');
		$('#header .mopen').removeClass('active');
		$('.mask_mobile').fadeOut(200);
		$('body').removeClass('fixed');
	});

	$('#gnb_mobile').swipe({
        swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData) {
			if( direction == "right"){	
				if(distance > 150){
					$('#header').removeClass('active2');
					$('.mask_mobile').hide();
					$('#gnb_mobile').removeClass('active');
					$('#gnb_mobile').removeAttr('style');
					$('body').removeClass('fixed');
					$('#header .mopen').removeClass('active');
				}else{
					if (phase=="move"){
						$('#gnb_mobile').css('right',-distance); 
					}
					if (phase=="end"){
						$('#gnb_mobile').removeAttr('style');
					}
				}
			}
        },
		allowPageScroll:"vertical",
        threshold:0,
		excludedElements: "a, label, button, input, select, textarea, .slick"
    });





	$('#gnb_mobile .depth_01 h2.active').next('.depth_02').show();
    $('#gnb_mobile .depth_02 h3.active').next('.depth_03').show();

	$('#gnb_mobile h2 a').on('click', function (e) {
        e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_02').slideUp(300);
		} else{
            $('#gnb_mobile h2').removeClass('active');
            $('#gnb_mobile .depth_02').slideUp(300);
            $(this).parent().addClass('active');
            $(this).parent().next('.depth_02').slideDown(300);
		} 
	});


	$('#gnb_mobile .depth_03').prev('h3').addClass('has_depth');
	
    $('#gnb_mobile .depth_02 h3.has_depth a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_03').slideUp(300);
		} else{
			$('#gnb_mobile h3').removeClass('active');
			$('#gnb_mobile .depth_03').slideUp(300);
			$(this).parent().addClass('active');
			$(this).parent().next('.depth_03').slideDown(300);
		}
	});

	$('#btn_top').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 400);
	}); 

	var currentPosition = parseInt($("#btn_top").css("top"));
	$(window).on('scroll', function () {
		var posY = $(window).scrollTop();
		$("#btn_top").stop().animate({"top":posY+currentPosition+"px"},500);
		if ( posY > 100 ){
			$("#btn_top").css('opacity','.8');
		} else if(posY < 100) {
			$("#btn_top").css('opacity','0');
		};
	});


	$('#footer .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else{
			$('#footer .open').removeClass('active');
			$(this).addClass('active');
		} 
	});


	$('#footer .view a:last-child').on('focusout', function () {
		$('#footer .open').removeClass('active');
		$(this).parent('.view').prev('.open').focus();
	});

	$('#footer .family').on('mouseleave', function () {
		$('#footer .open').removeClass('active');
	});	


	$('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});



var focusTarget = null;
var windowWidth = $(window).width();
$('.support-policy > article header').on('click', function(e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $(this).parent().siblings('article').children('header').removeClass('active');
        $(this).addClass('active');
    }
});

$('.support-policy .list article header button').on('click', function(e) {
    e.preventDefault();
});
$('.tab-menu.nav li.active').on('click', function(e) {
    e.preventDefault();
    if (windowWidth < 768) {
        $(this).toggleClass('on');
        $('.tab-menu.nav li').not('li.active').toggle();
    }
});

$('.api .box5 .clearfix > a').on('click', function(e) {
    var idx = $(this).index();
    $('.api .box5 .clearfix > a').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
    $('.term .tab').hide();
    $('.term .tab').eq(idx).show();

});

$('.page-header h2 a').on('click', function(e) {
    if (windowWidth >= 1024) {
        e.preventDefault();
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
        } else {
            $('.page-header h2').not($(this).parent()).removeClass('active');
            $(this).parent().addClass('active');
        }
    } else {

    }
});

$('.toggle-wrap .btn-toggle').on('click', function(e) {
    e.preventDefault();
    $(this).parent().siblings().toggle();
    $(this).parent().toggleClass('wrap');
    if ($(this).parent().hasClass('wrap')) {
        $(this).text('맞춤형 검색조건 닫기');
        $('.jobs').show();
    } else {
        $(this).text('맞춤형 검색조건 열기');
        $('.jobs').hide();
    }
});

$('.btn-share').on('click', function(e) {
    e.preventDefault();
    $(this).next().toggle();
});

$('.radios input[type=radio]').bind('click keypress', function() {
    $(this).siblings('input[type=radio]').prop('checked', false);
    $(this).prop('checked', true);
});

$('.action1 input[type=text], .action1 input[type=password], .form2 input[type=password]').on('focusout', function() {
    if ($(this).val()) {
        $(this).addClass('active');
    } else {
        $(this).removeClass('active');
    }
});

$('.btn-modal').bind('click keypress', function(e) {
    e.preventDefault();
    modal($(this));
});

$('.job-result .btn11').on('click', function(e) {
    e.preventDefault();
    $('.category-wrap').removeClass('deactive').addClass('active');
});

$('.edu.view .status button').on('click', function(e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).children('.sr-only').text('접수현황 펼치기');
        $(this).parent().next().hide();
    } else {
        $(this).addClass('active');
        $(this).children('.sr-only').text('접수현황 닫기');
        $(this).parent().next().show();
    }
});


if (windowWidth >= 768) {
    $('.select-content').css('height', $('.selector').height());
}
$("input.date").datepicker({
    dateFormat: 'yy-mm-dd', //Input Display Format 변경
    showOtherMonths: true, //빈 공간에 현재월의 앞뒤월의 날짜를 표시
    showMonthAfterYear: true, //년도 먼저 나오고, 뒤에 월 표시
    showOn: "both", //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
    changeYear: true, //년도 변경
    buttonImage: "/page/gwjob/images/ico_calendar.png", //버튼 이미지 경로
    buttonImageOnly: true, //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
    buttonText: "선택", //버튼에 마우스 갖다 댔을 때 표시되는 텍스트
    yearSuffix: "년", //달력의 년도 부분 뒤에 붙는 텍스트
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], //달력의 월 부분 텍스트
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], //달력의 월 부분 Tooltip 텍스트
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], //달력의 요일 부분 텍스트
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
});

/* 조직도 */
$('.org h2 button').on('click', function(e) {
    e.preventDefault();
    if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active').addClass('deactive');
        $(this).parent().next().next('.org-wrap').toggle();
        $(this).children('span').text('하위 조직도 보기');
    } else {
        $(this).parent().removeClass('deactive').addClass('active');
        $(this).parent().next().next('.org-wrap').toggle();
        $(this).children('span').text('하위 조직도 숨기기');
    }
});

$('.org h3 button').not('.off button').on('click', function(e) {
    e.preventDefault();
    if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active').addClass('deactive');
        $(this).parent().next().next('.pack').hide();
        $(this).children('span').text('하위 조직도 보기');
    } else {
        $(this).parent().removeClass('deactive').addClass('active');
        $(this).parent().next().next('.pack').show();
        $(this).children('span').text('하위 조직도 숨기기');
    }
});

$('.org h4 button').not('.off button').on('click', function(e) {
    e.preventDefault();
    if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active').addClass('deactive');
        $(this).parent().nextAll('.binder').eq(0).hide();
        $(this).children('span').text('하위 조직도 보기');
    } else {
        $(this).parent().removeClass('deactive').addClass('active');
        $(this).parent().nextAll('.binder').eq(0).show();
        $(this).children('span').text('하위 조직도 숨기기');
    }
});

$('.org h5 button').on('click', function(e) {
    e.preventDefault();
    if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active').addClass('deactive');
        $(this).parent().next().next('.bundle').toggle();
        $(this).children('span').text('하위 조직도 보기');
    } else {
        $(this).parent().removeClass('deactive').addClass('active');
        $(this).parent().next().next('.bundle').toggle();
        $(this).children('span').text('하위 조직도 숨기기');
    }
});

});

