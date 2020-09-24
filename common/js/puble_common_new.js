
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
	
}

/* 페이지탭 높이 자동화 */
function p_pageTabAutoHeight(){
	var arrT = p_class('pageTab','ul');
	if(!Boolean(arrT)){return;} 
	var setMb = 20;  // 높이 옵션
	// 탭 높이 보내기 함수
	function p_setH(n){
		var arrEl = [];
		var h = 0;
		var getTH = 0;
		var S;
		for(var i=0; i<this.children.length;i++){
			if(!Boolean(this.children[i])){break;} // 자식요소가 없으면 빠져나옴.
			arrEl.push(this.children[i]);// 배열 생성
			var tH = this.children[i].clientHeight;
			h = h < tH ? tH : h ;
			if(((i+1) % n)==0 || i == (this.children.length-1)){
				arrEl.forEach(function(el,idx,list){
					el.style.height = h+'px'; // 최종 높이값을 대입
				});
				
				// 총 높이
				getTH += h;  
				
				// 배열 초기화
				arrEl.splice(0,arrEl.length); 
				
				// 높이 초기화
				h = 0; 
			}
			// 서브탭을 찾는다.
			var chkS = p_class('pageTab-sub','ul',this.children[i])[0];
			// 서브탭이 있고 디스플레이 속성이 블락이면 실행
			if(Boolean(chkS) && (getComputedStyle(chkS).display == 'block')){
				S = chkS;
				p_setH.call(S,n);// 호출
			}
		}
		if(Boolean(S)){
			S.style.top = getTH+setMb+'px'; // 서브탭의 위치 재설정
			this.style.height = (getTH + setMb + S.clientHeight)+'px';
		}else{
			this.style.height = getTH + 'px';
		}
		
	}
	// 초기화 함수 정의
	function p_resetH(){
		for(var i=0;i<this.children.length;i++){
			this.children[i].style.height = 'auto';
			var chkS = p_class('pageTab-sub','ul',this.children[i])[0];
			if(Boolean(chkS)){
				p_resetH.call(chkS);
			}
		}
	}
	// 높이 보내기 함수 정의
	function p_ctrlHeight(){
		var wW = window.innerWidth;
		var n;
		for(var i= 0; i < arrT.length; i++){
			p_resetH.call(arrT[i]); // 첫번째 탭 그룹의 높이 구함.
		}
		// 높이 초기화
		if(0 <= wW && wW < 640){
			n = 1;
		}else if(640 <= wW && wW < 1000){
			n = 3;
		}else if(1000 <= wW){
			n = 4;
		}
		for(var i= 0; i < arrT.length; i++){
			// 첫번째 탭 그룹의 높이 구함.
			p_setH.call(arrT[i],n); 
		}
	}
	// 초기 실행
	p_ctrlHeight(); 
	// 리사이즈일 때 실행
	$(window).resize(function(){
		p_ctrlHeight();
	});
}

function p_customDaumMapApi(m){
	if($('.root_daum_roughmap').length == 0){
		return;
	}
	var mapInfo = m;
	for(var x in mapInfo){
		if(p_chkURL(mapInfo[x][0])){
			new daum.roughmap.Lander({
		        "timestamp" : mapInfo[x][1],
		        "key" : mapInfo[x][2],
		        "mapWidth" : mapInfo[x][3],
		        "mapHeight" : mapInfo[x][4]
		    }).render();
			if(!mapInfo[x][5]){
				break;
			}
		}	
	}
}

// 높이 자동화 함수 정의
function p_setAutoHeight(t,w,h){
	var rW = $(t).width();
	var rH = (rW/w)*h;
	$(t).height(rH);
}

// 웹에디터
function p_webEditor(){
	var $T = $('.fnWebEditor');
	$(T).each(function(i, item) {
		var getHtml =  $(item).html();
		if (typeof getHtml != 'undefined') {
			getHtml = getHtml.replace(/<font[\s\S]*?>/g,'');
			getHtml = getHtml.replace(/<\/font>/g,'');
			$(item).html(getHtml);
		}
	});
}

/* 플레이스 홀더 자동화 */
function p_placehold(){
	var t = document.querySelector('.fmPlaceholder');
	if(!t){return;}
	var title = t.getAttribute('title');
	t.onfocusin = function(){
		if(this.value == title){
			this.value = '';
		}
	}
	t.onfocusout = function(){
		if(this.value == null || this.value == ''){
			t.value = title;
		} 
	}
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
// 컨트롤 개인정보 방침 컨틀롤
function p_ctrlPrivateConfirm(){
	var $privateConfirm = $('.privateConfirm');
	if($privateConfirm.length == 0){return;}
	function p_set(){
		 var getH = window.innerHeight - $privateConfirm.height();
		// set position top
		 $privateConfirm.css({top: getH/2});
	}
	p_set();
	$(window).resize(function(){
		p_set();
	});
	
	$('#Ftr').css({zIndex: 5});
	$('.contsArea').css({zIndex: 25});
}

function p_ellipsis(selector,lines){
	var $obj = $(selector); 
	if($obj.length == 0) return;
	// 두줄 줄임 함수 정의
	function p_fnEllipsis($this, lines){
		var multiLines = parseInt($this.css('line-height'))*lines;
		var txt = $this.text(), 
			txtL,
			chk = 0;
		
		// 폰트 사이즈 곱하기 라인 높이가 보다 현 엘리먼트가 크다면 
		do{
			if(multiLines >= $this.innerHeight()){ chk = 1; break;}
			txtL = txt.length;
			// 4글자 씩 줄임.
			txt = txt.substr(0,txtL-5);
			$this.text(txt);
		}while(multiLines < $this.innerHeight())
		
		if(!chk){
			// 한번더 4글자를 줄이고 .... 을 붙인다.
			txtL = txt.length;
			txt = txt.substr(0,txtL-5);
			txt += "....";
			$this.text(txt);
		}
	};
	// 오브젝트에 메소드 및 프로퍼티 설정, 그리고 실행.
	$obj.each(function(){
		$this = $(this);
		var txt = $this.text();
		$this.data({
			originTxt: txt
		});
		p_fnEllipsis($this,lines);
	});
	// 리사이즈시 반복
	$(window).resize(function(){
		$obj.each(function(){
			$this = $(this);
			$this.text($this.data().originTxt);
			p_fnEllipsis($this,lines);
		});
	});
	
}

// 데이터
function p_dataPicker(){
	var	$datePicker = $( ".datePicker" );
	if($datePicker.length == 0){return;}
	var bgClassName = 'ui-datepicker-bg';
	
	$datePicker.datepicker({
	  showOn: "button",
      buttonImage: "/page/common/images/btn-calendar.png",
      buttonImageOnly: true,
      buttonText: "",
      beforeShow: function(input, inst) {
		  var bg = document.createElement('div');
		  bg.className = bgClassName;
		  document.body.appendChild(bg);
      },
      onSelect: function(){
    	  $('div').remove('.' + bgClassName);
      },
      onClose: function(){
    	  $('div').remove('.' + bgClassName);
      },
      dateFormat: "yy-mm-dd"
    });
	/*
	$('.ui-datepicker-trigger').click(function(){
		if ($(this).css('cursor') != 'default') {
			var bg = document.createElement('div');
			bg.className = bgClassName;
			document.body.appendChild(bg);
		}
	});
	*/
}



function p_popIntro(){
	var $popIntro = $('.popIntro');
	if($popIntro.length == 0){
		setTimeout("$('.topBann-btnOpen').trigger('click');", 1000);
		setTimeout("$('.topBann-btnClose').trigger('click');", 8000);
		return;
	}
	var $bg = $('<div id="topBann-wrapper"></div>').prependTo('body');
	
	$bg.css({
		position: 'fixed',
		zIndex: 45,
		top: 0,
		width: window.innerWidth,
		height: window.innerHeight,
		backgroundColor:'rgba(0,0,0,.5)'
	});

	var $btnClose = $('.popIntro-btnClose');
	$btnClose.click(function(){
		$popIntro.hide();
		$bg.hide();
		$('.topBann-btnOpen').trigger('click');
		setTimeout("$('.topBann-btnClose').trigger('click');", 7000);
	});
	var $bgClose = $('#topBann-wrapper');
	$bgClose.click(function(){
		$popIntro.hide();
		$bg.hide();
		$('.topBann-btnOpen').trigger('click');
		setTimeout("$('.topBann-btnClose').trigger('click');", 7000);
	});
	
	function p_setIntro(){
		if($popIntro.css('display') == 'block'){
			$bg.css({width: window.innerWidth, height: window.innerHeight});
			var $elWidth = $('.mainGroupArea').width(),
			$elHeight = $('.mainGroupArea').width() * $('.popIntro-inner').height() / $('.popIntro-inner').width() ,
			docWidth = $(document).width(),
			docHeight = $(document).height(),
			winHeight = window.innerHeight;
			if($elHeight > winHeight){
				$elHeight = winHeight-52;
				$elWidth = (winHeight-52) * $('.popIntro-inner').width() / $('.popIntro-inner').height();
			}
			$('.popIntro-inner').width($elWidth);
			$('.popIntro-inner').height($elHeight);
			// 화면의 중앙에 레이어를 띄운다. 
			if ($elHeight < docHeight || $elWidth < docWidth) {
				$popIntro.css({
					marginTop: -$elHeight /2,
					marginLeft: -$elWidth/2
				})
			} else {
				$popIntro.css({top: 0, left: 0});
			}
		}
	}
	
	p_setIntro();
	if($popIntro.css('display') == 'none'){
		return;
	}
	$(window).resize(function(){
		
		p_setIntro();
	})
	
	
}


function p_boardSlide(){
	if(window.innerWidth < 620){
		var leftPos = $('.tabMain-tabList').width() - $('.tabMain-tabList ul').width();
		setTimeout("$('.tabMain-tabList ul li').stop().animate({left: "+leftPos+"},3000);", 2000);
		setTimeout("$('.tabMain-tabList ul li').stop().animate({left: 0},2000);", 6000);
	}
}


// 문서 로드 시 실행
$(function(){

	// 헤더 컨트롤
	p_ctrlHdr();
	
	// 플레이스 홀더 
	p_placehold();

	p_pageTabAutoHeight();

	// 파일 컨트롤 
	p_ctrlFiles();
	
	// 목록 파일 보기 팝업
	p_popLayer({
		seTarget: '.popLy',
		seLayer: '.popLy-files',
		seBtnOpen: '.popLy-btnMore',
		events: 'click',
		right: true,
		chkMouseout: true
	});
	
	// 개인정보동의 
	p_ctrlPrivateConfirm();

	// 두 줄  말줄임. css로 처리함
	//p_ellipsis('.srchResult-contsTxt', 2);
	
	// 데이터 피커
	p_dataPicker();
	
	// 인트로 팝업
	p_popIntro();
	
	//// 최상단 배너
	//p_ctrlTopBann();

	// 모바일 게시판 슬라이드
	p_boardSlide();
	
	//// 프로그래스 
	//progressbar();

	$('.pageTab > li.active > a').on('click', function () {
		$(this).parents('.pageTab').toggleClass('on');
		return false;
	});


	$('.pageTab-sub > li.active > a').on('click', function () {
		$(this).parents('.pageTab-sub').toggleClass('on');
		return false;
	});

	$('.pageTab > li').not('li.active').last('li').addClass('last');

});