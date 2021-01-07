$( document ).ready( function() {

	$('.skinTb-wrapper').on('scroll', function(e) {
		$(this).addClass('moved');
	});

	/* find parent element when mouse out
	------------------------------------------------- */
	function mouseRelative(e,chkClNm,act){
		var	e =	e.relatedTarget;
		var	chk = null;
		
		if(e == null){
			chk = 0;
		}else{
			while(e != null){
				if(e.className==chkClNm){
					chk = 1; //같은 부모이라면 1
					break;
				}else{
					chk = 0; //같은 부모가 아니라면 0
					e = e.parentNode;
				}
			}	
		}
		//같은 부모가 아니라면 
		if(chk==0){
			act();
		} 
	};	

	//언어 선택
	function foreign(){
		var Selector = '#header .foreign_box';
		var	SelectUl = '#header .foreign_box ul';
		var Btn = '.btn_lang';
		var chkClNm = 'foreign_box';
		var linkLength = $(SelectUl).find('li').length;
		
		$(SelectUl).hide().find('li').eq(linkLength-1).focusout(function(){
			$(this).parent().hide();
		});
		$(Selector+' '+ Btn).click(function(){
			$(SelectUl).toggle();
			return false;
		});
		//클릭했을 때 이벤트 숨김
		$(Selector).click(function(){
			$(SelectUl).hide();
		});
		
		//이벤트 발생
		$(Selector+','+Selector+' a'+','+SelectUl+' '+'a').bind('mouseout',function(e){
			//mouseout이벤트 일때
			if(e.type=='mouseout'){
				var act = function(){
						$(SelectUl).hide();			
					}
				mouseRelative(e,chkClNm,act);
			}
		});
	}
	foreign();
	
	/* qnbConnection()
	-------------------------------------*/
	function qnbConnection(){
		var $Selector = $('.qnb_connection');
		var BtnMore = '.btn_more'; 
		var View = '.view';
		var BtnClose = '.btn_close';
		
		$Selector.find(View).hide();
		$Selector.find(BtnMore).click(function(){
			var $this = $(this);
			
			$this.siblings().show();
			$this.parents('li').siblings().find(View).hide();
			return false
		});
		$Selector.find(View).find(BtnClose).on('click keypress focusout',function(e){
			$(this).parent().siblings(BtnMore).find('a').focus();
			$(this).parent().hide();
			return false;
		});
	}
	qnbConnection();

	// 상단통합검색

	$('.abtn_topSearchBtn').click(function(){      
		$('.topTotalSearch').slideToggle('fast');	
	})
	$('#abtn_topsearchClose').click(function(){      
		$('.topTotalSearch').slideToggle('fast');	
	});

	// GNB
	 $('.gnb > li').bind('mouseover focusin', function () {
		$('.gnb > li').removeClass('on');
		$(this).addClass('on');
		$(this).children('.navSub').show();
		$('#header .bg2').hide();
		$('#header .bg').css('height', $(this).children('.navSub').height()+1); 
		$('#header .bg').show();
		$('.gnb_bg').show();
		
	});

	 $('.gnb > li.icon_gnb').bind('mouseover focusin', function () {
		$('#header .bg_2').css('height', $(this).children('.navSub').height()+1); 
		$('#header .bg_2').show();
		$('#header .bg').hide();
		$('.gnb_bg').show();
	});


	$('.navSub .pc .nav h3').bind('mouseover focusin', function () {
		$('.navSub .pc .nav h3').removeClass('on');
		$(this).addClass('on');
	});
	$('.navSub .pc .nav li a').bind('mouseover focusin', function () {
		$('.navSub .pc .nav h3').removeClass('on');
		$(this).parent().parent().prev('h3').addClass('on');
	});
	$('#header .navSub').bind('mouseleave', function () {
		$('.gnb > li').removeClass('on');
		$('.navSub .pc .nav h3').removeClass('on');
		$('.navSub .pc .nav li').removeClass('on');
		$('.navSub').hide();
		$('#header .bg').hide();
		$('#header .bg_2').hide();
		$('.gnb_bg').hide();
	});
	$('#header').append('<div class="pc area"></div>');
	$('#header .area').on('mouseover', function () {
		$('.gnb > li').removeClass('on');
		$('.navSub .pc .nav h3').removeClass('on');
		$('.navSub .pc .nav li').removeClass('on');
		$('.navSub').hide();
		$('#header .bg').hide();
		$('.gnb_bg').hide();
	});
	$('.gnb > li:last-child .nav > div:last-child ul li:last-child a').bind('focusout', function () {
		$('.gnb > li').removeClass('on');
		$('#header .bg').hide();
		$('#header .bg_2').hide();
		$('.gnb_bg').hide();
	});

	// 모바일 GNB

	$('.mobile_gnb_open').on("click",function(){
		$('.mobile_gnb').fadeIn(10);
		$('.mobile_gnb_bg').fadeIn(10);
		$('.mobile_gnb_close').css('display','block');
		$('body').css('position','fixed');
		$('.slick-slider').css('opacity','0');
		$(this).hide();
	});

	$('.mobile_gnb_close').on("click",function(){
		$('.mobile_gnb').fadeOut(10);
		$('.mobile_gnb_bg').fadeOut(10);
		$('.mobile_gnb_close').css('display','none');
		$('body').css('position','relative');
		$('.slick-slider').css('opacity','1');
		$('.mobile_gnb_open').show();
	});

	$('.depth1_ul > li').click(function () {
		$('.depth1_ul > li > a').not(this).removeClass('ov');
		$(this).children('a').toggleClass('ov');
		
		$('.depth1_ul li .depth2_ul').removeClass('on');
		$(this).children('.depth2_ul').toggleClass('on');
	});

	$('.depth2_ul > li a').click(function () {
		$('.depth2_ul > li > a').not(this).removeClass('ov');
		$(this).toggleClass('ov');

		$(this).siblings('ul').toggle();
		$('.depth2_ul > li > a').not(this).siblings('ul').hide();

	});

	$('.mobile_gnb_other').css('display','none');
	
	$('.topUtile .link_wrap .n1').click(function () {
		$('.topUtile .link_wrap li').removeClass('on');
		$(this).addClass('on');
		$('.mobile_gnb_potal').css('display','block');
		$('.mobile_gnb_other').css('display','none');
		$('.mobile_gnb_potal .depth1_ul .n1 > a').addClass('ov');
		$('.mobile_gnb_potal .n1 .depth2_ul').addClass('on');
	});

	$('.topUtile .link_wrap .n2').click(function () {
		$('.topUtile .link_wrap li').removeClass('on');
		$(this).addClass('on');
		$('.mobile_gnb_potal').css('display','none');
		$('.mobile_gnb_other').css('display','block');
		$('.mobile_gnb_other .depth1_ul .n1 > a').addClass('ov');
		$('.mobile_gnb_other .n1 .depth2_ul').addClass('on');
	});




	// LNB

	$('.lnb li .sub').siblings('.tit').append('<a href="#" class="plus"><span class="blind">접힘상태</span></a>');
    $('.lnb li .sub').siblings('.tit_on').children('.plus').children('span').html('펼침상태');
    
	$('.lnb li .plus').click(function () {

        if( $(this).children('span').html() == '접힘상태' ) {
            $(this).children('span').html('펼침상태');
        }
        else {
            $(this).children('span').html('접힘상태');
        };
		if ($(this).parent().parent().siblings('li').children('a').hasClass('tit_on')) {
			$(this).parent().parent().siblings('li').children('a').removeClass('tit_on');
		}
        $(this).parent().toggleClass('tit_on');
		return false;
	});

	

	// 하단 다른 사이트
	var $othersiteSlide = $('.othersite_area .othersite_wrap'),
		$othersiteList = $othersiteSlide.children('.othersite_list'),
		$othersiteControl = $othersiteSlide.children('.othersite_control'),
		$othersiteControlNext = $othersiteControl.children('.btn_next'),
		$othersiteControlPrev = $othersiteControl.children('.btn_prev'),
		$othersiteControlPause = $othersiteControl.children('.btn_pause'),
		$othersiteControlPlay = $othersiteControl.children('.btn_play');

	$othersiteList.slick({
		draggable : false,
		swipe : false,
		slidesToShow : 11,
		autoplay : true,
		autoplaySpeed : 4000,
		arrows : true,
		prevArrow : $othersiteControlPrev,
		nextArrow : $othersiteControlNext,
		pauseOnDotsHover : true,
		variableWidth: true,
		responsive: [
			{
			breakpoint : 1024,
			settings : {
				draggable : true,
				swipe : true,
				slidesToShow : 5
			}
			},
			{
			breakpoint : 640,
			settings : {
				draggable : true,
				swipe : true,
				slidesToShow : 3
			}
		}]
	});

	$othersiteControlPause.on('click.main', function(event) {
		$othersiteControlPause.hide();
		$othersiteControlPlay.show().focus();
		$othersiteList.slick('slickPause').slick('slickSetOption', 'pauseOnDotsHover', false);
	});

	$othersiteControlPlay.on('click.main', function(event) {
		$othersiteControlPause.show().focus();
		$othersiteControlPlay.hide();
		$othersiteList.slick('slickPlay').slick('slickSetOption', 'pauseOnDotsHover', true);
	});

	// 하단 버튼 생성
	$("#wrapper").append('<a href="javascript:;" class="btn_all_top" title="상단으로 이동">위로가기</a>');
	$(".btn_all_top").hide();
	$(window).scroll(function(){
		var top = $(window).scrollTop();
		if ( top > 100 ){
			$(".btn_all_top").fadeIn();
		} else if(top < 100) {
			$(".btn_all_top").fadeOut();
		};
	});
	
	$(".btn_all_top").click(function(){
		$("body, html").animate({scrollTop : 0});
		return false;
	});

});

// 프린트 버튼
function cf_printContent() {
	window.onbeforeprint = beforePrint;
	window.onafterprint = afterPrint;
	window.print();
}
function cf_sidoprint(content) {
	 top.minwon.focus();
   window.print();
}

var initBody;
function beforePrint() {
	initBody = document.body.innerHTML;
	document.body.innerHTML = document.getElementById('subContainer').outerHTML;
}

function afterPrint() {
	document.body.innerHTML = initBody;
}

