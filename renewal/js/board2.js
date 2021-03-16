
// W3CDOM 체크 변수
var W3CDOM = document.createElement && document.getElementsByTagName;

/* 마우스 아웃 체크 */
function p_mouseRelative(e,chkClNm,act){
	var	e =	e.relatedTarget;
	var	chk = 0;
	// check e
	if(e == null){
		chk = 0;
	}else{
		clMatch:
		while(e != null){ 
			if((e.className !='') && (e.className != undefined)){  
				var classes = e.className.split(' ');		
				for(idx in classes){
					if(classes[idx] == chkClNm){
						chk = 1;
						break clMatch;
					}
				}
			}
			e = e.parentNode;
		}
	}
	// if no same parents, set action
	chk == 0 ? act() : null;
};

// id 선택자
function p_id(name) {
	return document.getElementById(name);
}

// 이벤트 기본 동작 막기
function p_stopDefault(e){
	if(e && e.preventDefault){
		e.preventDefault();
	}else{
		window.event.returnValue = false;
	}
}
/* url 체크 */
function p_chkURL(name){ 
	var lo = location.href;
	var loArray = lo.split('/');
	var chkPage = false;
	for( x in loArray){
		if(loArray[x] == name) {
			chkPage = true;
			break;
		};
	}
	return  chkPage;
}
/* 스타일 보내기 */
function p_setStyle(obj,s){
	if(Array.isArray(obj)){
		for(var e = 0;e < obj.length; e++){
			for(var i in s){
				obj[e].style[i] = s[i];
			}
		} 
	}else{
		for(var i in s){
			obj.style[i] = s[i];
		}
	};
}


/* tag 선택자 */
function p_tag(name, elem){
	return (elem || document).getElementsByTagName(name);
}
/* 오브젝트 타입 검사 */
function p_chkType(e){
	var obj = new Object();
	var str = obj.toString.call(e);
	var arrChk = ['Number','Undefined','Null','HTML','Array','String'];
	var m;
	for(var i = 0;i < arrChk.length; i++){
		m = str.match(arrChk[i]);
		if(Array.isArray(m)){
			break;
		}
	}
	return m;
}

// 클래스 선택자
function p_class(name,type,elem){
	var r = [];
	// 클래스 이름을 찾는다. (복수개의 이름도 허용)
	var re = new RegExp("(^|\\s)" + name + "(\\s|$)");
	
	// 특정 타입만 검색하도록 범위를 좁히거나, 아니면 전체 엘리먼트를 살펴본다.
	var e = (elem || document).getElementsByTagName(type || "*");
	for (var j = 0; j< e.length; j++){
		// 엘리먼트가 이 클래스를 포함한 경우 반환값에 추가한다.
		if (re.test(e[j].className)) r.push( e[j] );
	}
	return r.length > 0 ? r : false;
}
// 버블 멈추기
function p_stopBubble(e){
	// 이벤트 객체가 제공되면 ie 브라우저가 아님
	if(e){
		// w3c 표준 버블 정지 메소드
		e.stopPropagation();
	}else{
		// 익스플로러 방식의 버블현상 정지 메소드
		window.event.cancleBubble = true;
	}
}

// 브라우저의 기본 이벤트 동작 막기
function p_stopDefault(e){
	// prevent 디폴트 메소드가 있는 지 확인
	if(e && e.preventDefault){
		e.preventDefault();
	}else{
		window.event.returnValue = false;
	}
	return false;
}


// 컨트롤 헤더
function p_ctrlHdr(){
	
	var	objSrch = { 
			$srchHdrTotal : $('.srchHdrTotal'),
			$btnSrchOpen : $('.btnOpenSrchHdrTotal'),
			$btnSrchClose : $('.btnCloseSrchHdrTotal')
	}
	
	var objGnb = {
			$topBannBtnOpenGroup : $('.topBann-btnOpenGroup'),
			$topBannInner : $('.topBann-inner'),
			$btnGnbOpen : $('.gnb-btnOpen'),
			$btnGnbClose : $('.gnb-btnClose'),
			$gnb : $('.gnb'),
			$gnbBg : function(){
				return $('<div class="gnb-bg"></div>').insertBefore(this.$gnb);
			},
			$gnbDepth : $('.gnb-list'),
			$gnbDepth2 : $('.gnb-list2'),
			$all : $('.allMenu'),
			$allGov : $('.allMenugovernor'),
			$allDepth : $('.allMenu-list'),
			$allDepth2 : $('.allMenu-list2'),
			$allAddInfo : $('.allMenu-addInfo-inner'),
			$gnbSubBg : $('.gnb-subBg')
	}
	objGnb.$gnbBg = objGnb.$gnbBg();

	// gnb와 검색창 순서
	function p_ctrlGnbAndSrch(){
		if(objSrch.$srchHdrTotal.length == 0) {
			return;
		}
		var getBtnGnbH = objGnb.$btnGnbOpen.height();
		var getTopBanBtnOpenGroupH = objGnb.$topBannBtnOpenGroup.height();
		var getTopBanInnerH = objGnb.$topBannInner.height();
		var btnGnbItems = [objGnb.$btnGnbOpen, objGnb.$btnGnbClose];
		if(window.innerWidth > 999){
			return;
		}
		var getSrchH = objSrch.$srchHdrTotal.outerHeight();
		if(objSrch.$srchHdrTotal.data().open && objGnb.$gnb.data().open){
			var h =	window.innerHeight - getSrchH - getBtnGnbH - getTopBanBtnOpenGroupH - getTopBanInnerH;
			objGnb.$gnb.css({'top': getSrchH + getBtnGnbH, height: h});
			//objGnb.$gnb.outerHeight(h);
			objGnb.$gnbDepth.outerHeight(h);
			objGnb.$gnbBg.css('top', getSrchH + getBtnGnbH + getTopBanBtnOpenGroupH + getTopBanInnerH);
			// gnb 버튼의 위치 조정
			btnGnbItems.forEach(function($item){
				$item.css('top',-(getSrchH + getBtnGnbH));
			});
		}else if(objGnb.$gnb.data().open){
			var h =	window.innerHeight - getBtnGnbH - getTopBanBtnOpenGroupH - getTopBanInnerH;
			objGnb.$gnbBg.css({'top': getBtnGnbH + getTopBanBtnOpenGroupH + getTopBanInnerH, height: h});
			objGnb.$gnb.css({'top': getBtnGnbH, height: objGnb.$gnbBg.height()});
			objGnb.$gnbDepth.outerHeight(objGnb.$gnbBg.height());
			// gnb 버튼의 위치 조정
			btnGnbItems.forEach(function($item){
				$item.css('top',-getBtnGnbH);
			});
		}else if(objSrch.$srchHdrTotal.data().open){
			objGnb.$gnbBg.css({'top': getSrchH + getTopBanBtnOpenGroupH + getTopBanInnerH, height: 0});
			objGnb.$gnb.css({'top': getSrchH, height: 0});
			objGnb.$gnbDepth.outerHeight(0);
			// gnb 버튼의 위치 조정
			btnGnbItems.forEach(function($item){
				$item.css('top',-getSrchH);
			});
		}
	}

	// gnb 함수
	function p_gnb(){
		if(objGnb.$gnb.length == 0){return;}
		
		var active = 'active';
		var chkEvt = 0;
		objGnb.$gnb.data('open',0);
		// 배경 감춤
		objGnb.$gnbBg.hide();
		objGnb.$gnbSubBg.hide();
		 
		// 전체메뉴 초기 실행 TODO 서브페이지의 경우 해당 메뉴가 액티브 상태여야 함
		objGnb.$allDepth.children().eq(0).addClass(active);
		
		function p_chkSize(){
			return window.innerWidth < 1023? 'mob' : 'pc';
		}
		window.oldW = p_chkSize();
			
		// gnb 속성 설정
		function p_setProp(){
			if( p_chkSize() != window.oldW){
				objSrch.$btnSrchClose.click();
				chkEvt = 0;
			}
			// 전체 버튼  toggle 
			if(chkEvt){
				objGnb.$btnGnbOpen.hide();
				objGnb.$btnGnbClose.show();
				objGnb.$gnbSubBg.hide();
				objGnb.$gnbBg.hide();
			}else{
				objGnb.$btnGnbOpen.show();
				objGnb.$btnGnbClose.hide();
				objGnb.$allGov.hide();
				objGnb.$all.hide();
			}

			// 모바일 버전
			if(p_chkSize() == 'mob'){
				var btnH =	objGnb.$btnGnbOpen.height() + objGnb.$topBannBtnOpenGroup.height() + objGnb.$topBannInner.height();		
				objGnb.$gnbBg.css({position:'fixed', top:btnH, height: window.innerHeight - btnH});
				// 높이 설정.
				objGnb.$gnbDepth.height(window.innerHeight - btnH -50);
				var scrollH = objGnb.$gnbDepth[0].scrollHeight;
				objGnb.$gnb.css({height: window.innerHeight - btnH});
				objGnb.$gnbDepth2.css({
					minHeight: scrollH > window.innerHeight - btnH ?
							 scrollH : window.innerHeight - btnH
				});
				
				// 전체 메뉴 오픈상태
				if(chkEvt){
					//objGnb.$gnbDepth.css({right: '-100%'});
					// 전제 메뉴가 오픈 상태라면 처음 자식에 활성화 클래스를 추가한다.
					objGnb.$gnbDepth.stop().animate({right: 0},500,'easeOutQuad').children().eq(0).addClass(active);
					objGnb.$gnbBg.show();
				// 전체 메뉴 닫힌상태
				}else{
					objGnb.$gnbDepth.stop().animate({right: '-100%'},500,'easeInQuad',function(){
						objGnb.$gnb.css({height: 0});
					});
					objGnb.$gnbBg.hide();
				}
				// pc 버전일 경우
			}else{
				var btnH =	$('#Hdr').height();
				objGnb.$gnbBg.css({position:'absolute', top:btnH, height: ($('#Main').outerHeight(true) + $('#Sub').outerHeight(true) + $('#Ftr').outerHeight(true))});
				objGnb.$gnbDepth.children().removeClass(active);
				objGnb.$gnb.removeAttr('style');
				objGnb.$gnbDepth.removeAttr('style');
				objGnb.$gnbDepth2.removeAttr('style');
				objGnb.$btnGnbOpen.removeAttr('style');
				objGnb.$btnGnbClose.removeAttr('style');
				// 전체 메뉴 오픈상태
				if(chkEvt){
					objGnb.$gnbBg.show();
				// 전체 메뉴 닫힌상태
				}else{
					objGnb.$gnbBg.hide();
				}
			}
			window.oldW = p_chkSize();
		};
		p_setProp();

		// 메뉴 활성화 이벤트 설정
		var evtInObjs = [objGnb.$gnbDepth, objGnb.$allDepth];
		evtInObjs.forEach(function(elem){
			
			// 메뉴마다 이벤트 연결
			elem.find('li').on('click focusin mouseover',function(e){
				var $this = $(this); 
				var chkNewWin = $this.children('[target=_blank]').length;
				var chkAllMenu = $this.parent().hasClass(objGnb.$allDepth.selector.replace('.',''));
				// pc 버전
				if( p_chkSize() == 'pc'){ 
					if(chkEvt && chkAllMenu){
						$this.addClass(active).siblings().removeClass(active);
						
						// 먼저 부모 요소 높이를 초기화
						$this.parent().css({height: 'auto'});
						
						// 부모의 순수한 높이를 구한다
						var pH = parseInt( $this.parent().innerHeight() );
						
						// 만약 2뎁스가 있다면
						if($this.find(objGnb.$allDepth2.selector).length != 0){
							var cH = parseInt( $this.find(objGnb.$allDepth2.selector).innerHeight() );
						}
						
						// 부모의 높이와 2뎁스의 높이를 비교하여 높이를 동기화한다.
						pH < cH ? $this.parent().innerHeight(cH+1): $this.find(objGnb.$allDepth2.selector).innerHeight(pH+1);
						var allAddInfo_H = objGnb.$allAddInfo.find('img').height();
						pH < cH ? objGnb.$allAddInfo.css("top",cH-allAddInfo_H) : objGnb.$allAddInfo.css("top",pH-allAddInfo_H);
					// 전체 메뉴 비활성화
					}else if(!chkEvt && !chkAllMenu){
						if(!chkNewWin){
							$this.addClass(active).siblings().removeClass(active);
							var h = $this.find(objGnb.$gnbDepth2.selector).innerHeight();
							var btnH =	$('#Hdr').height();
							objGnb.$gnbSubBg.outerHeight(h+1).width(document.body.clientWidth).show();
							objGnb.$gnbBg.css({position:'absolute', top:btnH, height: ($('#Main').outerHeight(true) + $('#Sub').outerHeight(true) +$('#Ftr').outerHeight(true))}).show();
							$this.addClass(active).siblings().removeClass(active);
						}
						else{
							$this.siblings().removeClass(active);
							objGnb.$gnbSubBg.hide();
							objGnb.$gnbBg.hide();
						}
					}
				
				// 모바일 버전
				}else {
					if(!chkNewWin && e.type=="click"){
						$this.addClass(active).siblings().removeClass(active);
						// 하위 요소가 있다면 기본 액션을 막는다.
						if(e.target.nodeName.toLowerCase() != 'li'){
							eNode = e.target.parentNode;
								while(eNode.nodeName.toLowerCase() != 'li'){
									eNode = eNode.parentNode;
								}
								
							if($(eNode).children('[class*=gnb-list]').children().length != 0){
								if(!$(eNode).children('[class*=gnb-list]').children().eq(0).hasClass('none')){
									return false;
								}
							}
						}
					}
				}
			});
		});
		
		// 마우스 아웃
		var evtOutObjs = [objGnb.$gnb, objGnb.$gnbDepth2];
		evtOutObjs.forEach(function(elem){
			elem.on('mouseout', function(e){
				if(p_chkSize() == 'pc'){ 
					var chkClNm = objGnb.$gnb.selector.replace('.');
					var act = function(){
						objGnb.$gnbDepth.children().removeClass(active);
						objGnb.$gnbSubBg.hide();
						// 전체 메뉴 오픈상태
						if(chkEvt){
							objGnb.$gnbBg.show();
						// 전체 메뉴 닫힌상태
						}else{
							objGnb.$gnbBg.hide();
						}
					}
					p_mouseRelative(e,chkClNm,act);
				}
			});
		});
			
		// gnb 전체메뉴 이벤트 실행
		var btnAllMenus = [objGnb.$btnGnbOpen, objGnb.$btnGnbClose];
		btnAllMenus.forEach(function(elem){
			elem.on('click keypress focusin',function(e){
				if( e.type == 'keypress' && e.keyCode != 13 ){
					//return false;
				}
				else if( e.type == 'focusin' ){
					if(p_chkSize() == 'pc'){ 
						objGnb.$gnbDepth.children().removeClass(active);
						objGnb.$gnbSubBg.hide();
						objGnb.$gnbBg.hide();
					}
				}
				else{
					switch(elem){
						case objGnb.$btnGnbOpen:	
								chkEvt = 1;
								objGnb.$gnb.data().open = 1;
								p_setProp();
								objGnb.$btnGnbOpen.hide(); 
								objGnb.$btnGnbClose.show();
								
								// 만약 오픈 버튼이고 1000보다 크다면
								if( p_chkSize() == 'pc'){
									objGnb.$allGov.show();
									objGnb.$all.show();
									var lH = parseInt( objGnb.$allDepth.outerHeight() );
									var d2H = parseInt( objGnb.$allDepth.find('>li').eq(0).find(objGnb.$allDepth2.selector).outerHeight() );
									lH > d2H ? objGnb.$allDepth.find('>li').eq(0).find(objGnb.$allDepth2.selector).outerHeight(lH) : objGnb.$allDepth.outerHeight(d2H);
								}
								
								// body 스크롤 감춤
								if(p_chkSize() == 'mob'){
									p_ctrlGnbAndSrch();
									document.body.style.overflow = "hidden";
								}
								break;
						case objGnb.$btnGnbClose:
								objGnb.$all.hide();
								chkEvt = 0;
								p_setProp();
								objGnb.$btnGnbClose.hide();
								objGnb.$btnGnbOpen.show();
								objGnb.$gnb.data().open = 0;
								p_ctrlGnbAndSrch();
								
								// body 스크롤 자동 설정
								document.body.style.overflow = "auto";
								break;
					}
				}
				//return false;
			});
		});
		
		// 리사이즈
		$(window).resize(function(){
			p_setProp();
		});
	}
	
	// 검색창 토글 
	function p_toggleSrch(){
		if(objSrch.$srchHdrTotal.length == 0){
			return false;
		}
		
		var evtElems = [objSrch.$btnSrchOpen,objSrch.$btnSrchClose];
		var chkEvt;
		
		if(window.innerWidth < 1000){
			objSrch.$srchHdrTotal.attr('data-hidden','true');
		}
		objSrch.$srchHdrTotal.data('open',0);
		// 버튼에 이벤트 연결
		evtElems.forEach(function($elem, idx){
			$elem.on('click',function(){
				if($elem == objSrch.$btnSrchOpen){
					objSrch.$srchHdrTotal.attr('data-hidden','false');
					objSrch.$btnSrchClose.show();
					objSrch.$btnSrchOpen.hide();
					objSrch.$srchHdrTotal.data().open = 1;
					p_ctrlGnbAndSrch();
				}
				if($elem == objSrch.$btnSrchClose){
					objSrch.$srchHdrTotal.attr('data-hidden','true');
					objSrch.$btnSrchOpen.show();
					objSrch.$btnSrchClose.hide();
					objSrch.$srchHdrTotal.data().open = 0;
					p_ctrlGnbAndSrch();
				}
			});
		});

		$(window).resize(function(){
			var chkHidden = objSrch.$srchHdrTotal.attr('data-hidden');
			if(window.innerWidth < 1000 && (chkHidden == 'false' || chkHidden == null )){
				objSrch.$srchHdrTotal.attr('data-hidden','false');
			}
		});
	}
	
	
	p_toggleSrch();
	p_gnb();
	
}

// lnb 기능 정의
function p_lnb(){
	var opts = {
		target: 'breadCrumbs',
		active: 'active',
		sub: 'ul',
		seMenu: '.breadCrumbs-depth',
		btnMenu: 'breadCrumbs-btn',
		txtLong: 'breadCrumbs-btn-dataLong'
	}
	var T = p_class(opts.target)[0];
	if(!T){return;}
	var mn = 320;
	var mx = 1000;
	function chkLnb(){
		/*
		 * var w = window.innerWidth; if(mn < w && w < mx){ return false; }else
		 * if(mx <= w){
		 *  }
		 */
		return	true;
	}
	function p_active(){
		// 사이즈 체크해서 1000사이즈 이상이면 lnb 기능 활성화
		var arrBtnMenu = p_class(opts.btnMenu,null,T);
		if(!chkLnb()){ 
			arrBtnMenu.forEach(function(elem){
				elem.style.width = 'auto';
				$(elem).siblings(opts.sub).hide();
			});
			return;
		} 
		// 클릭, 포커스 이벤트 핸들링
		var $T = $(T); 
		$T.find(opts.seMenu).find('>li').not('.item-home').on('click focusin',function(e){
			var $this = $(this); 
			$this.addClass(opts.active).siblings().removeClass(opts.active);
			$this.find(opts.sub).show();
			$this.siblings().find(opts.sub).hide();
			
			// 현재 target이 currentTarget과 같은지 비교. 
			if(e.currentTarget == e.target || e.currentTarget == e.target.parentNode || e.currentTarget == e.target.parentNode.parentNode){
				p_stopDefault(e);	
			}
		});

		// 아웃 이벤트
		$('.'+opts.target).on('mouseout focusout',function(e){
			var act = function(){ $T.find(opts.seMenu).find(opts.sub).hide(); }
			var chkClNm = opts.target.replace('.','');
			p_mouseRelative(e,chkClNm,act);
		});
	}
	p_active();
	window.onresize = function(){
		p_active();
	}
};


// 높이 자동화 함수 정의
function p_setAutoHeight(t,w,h){
	var rW = $(t).width();
	var rH = (rW/w)*h;
	$(t).height(rH);
}


// tab 함수
function p_tab(opts){
	/*
	 * target: tab: conts: activeClass:
	 */
	var $T = $(opts.seTarget);
	if($T.length == 0){return;}
	$T.find('.'+opts.activeClass).find(opts.seConts).show();
	if(opts.evts){
		evts = opts.evts;
	}else {
		evts = 'focusin mouseover';
	}
	$T.find(opts.seTab).on(evts, function(){
		var $This = $(this);
		$This.parent().addClass(opts.activeClass).find(opts.seConts).show();
		$This.parent().siblings().removeClass(opts.activeClass).find(opts.seConts).hide();
	});
}


// 슬라이더 함수
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

function p_toggleForeign(){
	var Obj = p_class('toggleForeign')[0]
	// check object
	if(!Obj){return;}
	var	List = p_class('toggleForeign-list',null,Obj)[0];
	var Btn = p_class('toggleForeign-btn',null,Obj)[0];
	var chkClNm = 'toggleForeign';
	var activeClass = 'active';
	List.style.display = 'none';
 	// 마지막 언어 선택에서 focus 아웃이 되면 리스트를 숨긴다.
	List.children[List.children.length-1].addEventListener('focusout', function(){
		List.style.display = 'none';
	});
	
	// 클릭 이벤트시 리스트 보임
	Btn.addEventListener('click', function(){
		List.style.display = 'block';
		$(this).addClass(activeClass);
	});
	
	// 마우스 아웃시 리스트 숨김.
	Obj.addEventListener('mouseout',function(e){
		var act = function(){ 
			List.style.display = "none";
			Btn.className = Btn.className.replace(activeClass,null);
		}
		p_mouseRelative(e,chkClNm,act);
	});
}


// 팝업 레이어 정의
function p_popLayer(opts){
	/*
	 * @ opts properties seTarget: select target, seLayer: layerClassName,
	 * btnOpen: handleClassName, events: mouseover focusin ..., left : half,
	 * chkMouseout : true, seBtnClose : btnClose className
	 */
	var $obj = $(opts.seTarget);
	if($obj.length == 0){return;}
	var chkClNm = opts.seTarget.replace('.','');
    // 핸들러 이벤트가 있다면
	
	if(opts.seBtnOpen){
		
		$obj.find(opts.seBtnOpen).on(opts.events,function(e){
			if(e.type =='mouseover' || e.type =='focusin' || e.type =='click'){
				var $this = $(this); 
				$this.parents(opts.seTarget).find(opts.seLayer).show();
				var layerW = $this.parents(opts.seTarget).find(opts.seLayer).width();
				layerW = parseInt(layerW);
				if(opts.half){
					$this.parents(opts.seTarget).find(opts.seLayer).css('left',-layerW/2);
				}else if(opts.right){
					$this.parents(opts.seTarget).find(opts.seLayer).css('right',0);
				}
			}
		});
    }
    // 마우스 이벤트 옵션에 체크되었다면
	if(opts.chkMouseout){
		  
		function p_mouseOut(elem,idx){
			elem.on('mouseout focusout',function(e){
				var act = function(){elem.find(opts.seLayer).hide();}
				p_mouseRelative(e,chkClNm + idx,act);
			});
		}
		
		// 오브젝트 요소에 숫자로 넘버링 한다.
		$obj.each(function(idx){
			var $this = $(this); 
			$this.addClass(chkClNm + idx);
			// 마우스 아웃 이벤트 추가
			p_mouseOut($this,idx);
			
		});
	}
	// 닫기 버튼이 있다면
	if(opts.seBtnClose){
		$obj.find(opts.seBtnClose).click(function(){
			if(isEmpty(opts.seLayer)){
				$obj.hide();
			}else{
				$obj.find(opts.seLayer).hide();	
			}
		}); 
	}
	
}

// 파일 컨트롤
function p_ctrlFiles(){
	var $obj = $('.ctrlFile'); 
	if($obj.length == 0){ return; }
	var $btnFile = $('.ctrlFile-btnFile');
	var $txt = $('.ctrlFile-fileTxt');
	var placeTxt = '선택된 파일이 없음';
	var $btnDel = $('.ctrlFile-btnDel');
	
	//$btnDel.hide();
	
	// click file button
	$obj.each(function(){
		var $this = $(this);
		$this.find($btnFile.selector).click(function(){
			$this.find($txt.selector).parent().find('input[type=file]').click();
		});
		
		$this.find('input[type=file]').change(function(){
			var $this = $(this);
			var fileVal = $this.val();
			var fileValLength;
			// action
			fileVal = fileVal.split('\\');
			fileValLength = fileVal.length;
			$this.parent().find($txt.selector).text(fileVal[fileValLength-1]);
			$this.parent().find($btnDel.selector).show();
		});
		
		$this.find($btnDel.selector).click(function(){
			var $this = $(this);
			$this.parent().find('input[type=file]').val('');
			$this.parent().find($txt.selector).text(placeTxt);
			$this.hide();
		});
	});
	 
}


function left_menu(){
    var lm = $("#left_submenu");
    lm.a = lm.find(">li>a");
    lm.dep2 = lm.find(">li>ul");
    lm.dep2.a = lm.dep2.find(">li>a");
    lm.dep3 = lm.dep2.find(">li>ul");
    lm.dep3.a = lm.dep3.find(">li>a");

    var winW = $(window).width() + 17;
    var m_length = 0;
    var dep2W = 0;

    lm.dep2.hide();
    lm.dep3.hide();

    lm.a.each(function () {
        if(!$(this).next().length){
            $(this).addClass("empty");
        }
        if($(this).hasClass("on")){
            $(this).next("ul").show();
        }
    });

    $("#left_submenu>li").show();
    $("#left_submenu>li>ul>li").css({width:"100%"});
    lm.a.on("click",function () {
        lm.a.removeClass("on");
        $(this).addClass("on");

        if($(this).next("ul").is(":hidden")){
            lm.dep2.slideUp("fast");
            lm.a.removeClass("on");
            lm.dep2.slideUp("fast");
            lm.dep2.a.removeClass("on");
            $(this).addClass("on");
            $(this).next("ul").slideDown("fast");
        }else{
            $(this).removeClass("on");
            $(this).next("ul").slideUp("fast");
        }
        if($(this).next("ul").length){
            return false;
        }
    });
    lm.dep2.a.on("click",function () {
        lm.dep2.a.removeClass("on");
        $(this).addClass("on");
    });
}

// 문서 로드 시 실행
$(function(){
	// 언어 선택  
	p_toggleForeign();	

	// 헤더 컨트롤
	p_ctrlHdr();
	
	// lnb
	p_lnb({
		target: '.cmct-bCrumbs',
		active: 'active',
		menu: '.cmct-bCrumbs-depth',
		sub: 'ul',
		btnMenu: '.cmct-bCrumbs-button',
		cTxtLong: 'cmct-bCrumbs-button_long' 
	});

	// 목록 파일 보기 팝업
	p_popLayer({
		seTarget: '.popLy',
		seLayer: '.popLy-files',
		seBtnOpen: '.popLy-btnMore',
		events: 'click',
		right: true,
		chkMouseout: true
	});

	// 파일 컨트롤 
	p_ctrlFiles();

	p_sldr({
		seTarget:  '.boGalleryView',
		seView: '.boGalleryView-view',
		controls: false,
		auto: false,
		seBtnPrev: '.boGalleryView-btnPrev',
		seBtnNext: '.boGalleryView-btnNext'
	});

	
});