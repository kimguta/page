$(document).ready(function() {
    //gnb
	var $gnb = $('.tour_nav_menu .sub_menu_depth1 a')
	$gnb.bind('mouseover focusin ',function(){
		$('.tour_gnb_over').fadeIn(0);
		$('.tour_gnb_wrap').stop().animate({'height':'586'},200);
		return false;
	});
	$('.tour_gnb_wrap').bind('mouseleave focusout',function(){
		$('.tour_gnb_over').fadeOut(0);
		$('.tour_gnb_wrap').stop().animate({'height':'97'},'easeInOutCubic');
		return false;
	});
	
	$('.tour_gnb_btn .search_btn').click(function(){      
		$('.tour_gnb_btn_open').toggleClass('on');
		return false;
	});

	$('.toptotalsearch_off').click(function(){      
		$('.tour_gnb_btn_open').toggleClass('on');
		return false;
	});

	$(".text_toptotalsearch").bind("change paste keyup", function() {
		$('.toptotalsearch_off').fadeOut(0);
		return false;
	});

	

	//gnb 모바일
	$('.tour_gnb_menubtn .menu_btn').on("click",function(){
		$('.mobile_list').fadeIn(0).animate({right:0},200);
		$('.mobile_over').fadeIn(10);
		$('.mobile_list .gnb_btnclose').css('display','block');
		$('body').css('position','fixed');
	});
	$('.mobile_list .gnb_btnclose').on("click",function(){
		$('.mobile_list').fadeIn(0).animate({right:-360},200);
		$('.mobile_over').fadeOut(10);
		$('.mobile_list .gnb_btnclose').css('display','none');
		$('body').css('position','relative');
		return false;
	});

	$('.m_list li').click(function () {
		$('.m_list li').not(this).removeClass('active');
		$(this).toggleClass('active');
	});
});


function p_sldr(opts){
	var $T = $(opts.seTarget);
	var $View = $T.find(opts.seView);
	if($View.length == 0){return;}
	var objSlider = $View.bxSlider({
			pager: opts.pager,
			controls: opts.controls,
			auto: opts.auto,
			autoStart: opts.autoStart,
			pause: opts.pause,
			speed: opts.speed,
			mode: opts.mode,
			useCSS: opts.useCSS,
			autoDelay: opts.autoDelay,
			slideSelector: opts.slideSelector,
			onSliderLoad: opts.onSliderLoad,
			onSlideAfter: opts.onSlideAfter,
			onSlideBefore: opts.onSlideBefore,
			touchEnabled: opts.touchEnabled,
			autoHover: opts.autoHover,
			slideWidth: opts.slideWidth,
			minSlides: opts.minSlides,
			maxSlides: opts.maxSlides,
			moveSlides: opts.moveSlides,
			preventDefaultSwipeX: opts.preventDefaultSwipeX,
			preventDefaultSwipeX: opts.preventDefaultSwipeY,
			swipeThreshold : opts.swipeThreshold
		});
	if(opts.reload){
		opts.reload(objSlider);
		$(window).resize(function(){
			opts.reload(objSlider);
		});
	}
	
	if(opts.seBtnPrev){
		$T.find(opts.seBtnPrev).click(function(){
			if($(this).data().notUse){
				return;
			}
			objSlider.goToPrevSlide();
			objSlider.stopAuto();
			return false;
		});
	}
	if(opts.seBtnNext){
		$T.find(opts.seBtnNext).click(function(){
			if($(this).data().notUse){
				return;
			}
			objSlider.goToNextSlide();
			objSlider.stopAuto();
			return false;
		});
	}
	if(opts.seBtnStop){
		$T.find(opts.seBtnStop).click(function(){
			$(this).hide();
			$T.find(opts.seBtnPlay).show();
			objSlider.stopAuto();
		});
	}
	if(opts.seBtnPlay){
		$T.find(opts.seBtnPlay).click(function(){
			$(this).hide();
			$T.find(opts.seBtnStop).show();
			objSlider.startAuto();
		});
	}
}

// 문서 로드 시 실행
$(document).ready(function() {
	p_sldr({
		seTarget:  '.boGalleryView',
		seView: '.boGalleryView-view',
		controls: false,
		auto: false,
		seBtnPrev: '.boGalleryView-btnPrev',
		seBtnNext: '.boGalleryView-btnNext'
	});	
});

/* 하단 바로가기 링크 */
function p_toggleQckSite(){
	var Targets = p_class('ftrQckSite');
	if(!Targets ){return;}
	var OneDepths = p_class('ftrQckSite-depth',null,Targets[0]);
	if(!OneDepths[0].children){return;}
	for(var i = 0; i < Targets.length;i++){
		p_ctrlToggle.call(Targets[i]);
	}
	function p_ctrlToggle(){
		
		var target = this; // 타겟 변수에 this를 담는다.
		var OneDepthLists = target.children[0].children;
		if(OneDepthLists.length>0){
			// 타겟에 높이값 보내기
			function setTargtH(){
				var h = OneDepthLists[0].clientHeight;
				var totalH = 0;
				var wW = window.innerWidth;
				if(wW < 400){
					totalH = h * OneDepthLists.length;
				}else if(400 <= wW && wW < 768){
					totalH = h * ((OneDepthLists.length/2)+(OneDepthLists.length%2));
				}else if(768 <= wW){
					totalH = h * ((OneDepthLists.length/4)+(OneDepthLists.length%4));
				}
				target.style.height = totalH+'px';
			}
			setTargtH();
			window.addEventListener('resize',function(){
				setTargtH();
			});
		}
		// 각메뉴 메뉴에 아래와 같이 설정
		for(var x = 0;x < OneDepthLists.length; x++){
			OneDepthLists[x].children[0].parentList = OneDepthLists[x]; 
			OneDepthLists[x].children[0].onclick = function(e){
				if(this.parentList.children[1]){
					this.parentList.children[1].style.display = 'block';
				}
				for(var i = 0;i < OneDepthLists.length; i++){
					if(this.parentList.children[1] != OneDepthLists[i].children[1]){
						if(OneDepthLists[i]){
							OneDepthLists[i].children[1].style.display = 'none';
						}
					}
				} 
			}
			var BtnClose = p_class('ftrQckSite-btnClose','button',OneDepthLists[x])[0];
			if(BtnClose){
				BtnClose.parentList = OneDepthLists[x];
				BtnClose.onclick = function(e){
					var $This = $(this);
					this.parentList.children[1].style.display = 'none';
					$This.parent().parent().parent().find("button").focus();
				}
			}
		};
	}
}