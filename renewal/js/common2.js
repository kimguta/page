$( document ).ready( function() {
	


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
			breakpoint : 1000,
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

	// �곷떒�듯빀寃���

	$('.abtn_topSearchBtn').click(function(){      
		$('.topTotalSearch').slideToggle('fast');			
	})
	$('#abtn_topsearchClose').click(function(){      
		$('.topTotalSearch').slideToggle('fast');			
	});

	// �듯빀硫붾돱

	$('.global_btn').on("click",function(){
		$('.global_list').fadeIn(10);
		$('.global_over').fadeIn(10);
		$('.global_closebtn').css('display','block');
		$('body').css('position','fixed');
		$('.slick-slider').css('opacity','0');
		$('.total_descrip_inner a:first').focus();
	});

	$('.global_closebtn').on('click',function(){
		$('.global_list').fadeOut(10);
		$('.global_over').fadeOut(10);
		$('.global_closebtn').css('display','none');
		$('body').css('position','relative');
		$('.slick-slider').css('opacity','1');
		setTimeout(function() { 
			$('.global_btn').focus();
		}, 200);
	});

	
	$('.image_close').on("focusout",function(){
		$('.m_list_box').show();
		$('.m_list li').addClass('active');
		$('.m_list_box a:first').focus();
	});

	

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

	$(".btn_top").click(function(){
		$("body, html").animate({scrollTop : 0});
		return false;
	});

	$('.m_list li').click(function () {
		$('.m_list li').not(this).removeClass('active');
		$(this).toggleClass('active');
	});

	// �섎떒 踰꾪듉 �앹꽦
	$("#wrapper").append('<a href="javascript:;" class="btn_all_top" title="�곷떒�쇰줈 �대룞">�꾨줈媛�湲�</a>');
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

	$('#modal1, #modal2, #mail_modal1').on('click', function () {
		$.fn.custombox( this, {
			effect: 'fadein',
			overlayOpacity: 0.5
		});
		return false;
	});


});