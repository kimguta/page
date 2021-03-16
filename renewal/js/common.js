$(function(){
	
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
	
	/* blur when click button
	----------------------------------------*/
	$('button').bind('mouseenter mouseout',function(e){
		if(e.type =='mouseenter'){
			this.style.outlineWidth=0;
		}else{ 
			$(this).blur();
			this.style.outlineWidth='2px';
		}
	});
	
	/* foreign 
	------------------------ */
	function foreign(){
		var Selector = '.header .foreign';
		var	SelectUl = '.header .foreign ul';
		var Btn = '.btn_lang';
		var chkClNm = 'foreign';
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
	
	/* setLableTxt 
	----------------------------------- */
	function setLableTxt(Obj,Select,Label){
		 var Select = Select;
		 var Label = Label;
		 
		$(Obj).find(Select).on('focusin focusout change',function(e){
			if(e.type=='change'){
				var txt = $(this).find('option:selected').text();
				
				$(this).siblings(Label).text(txt);
			}else if(e.type=='focusin'){
				$(this).siblings(Label).css('outline','1px dotted #292929');
			}else{ 
				$(this).siblings(Label).css('outline',0); 
			}
		});
	}
	setLableTxt('.srch .opt','select','label');
	
	/* gnb 
	-----------------------------------------*/
	function gnb(){
		var Header = '.header';
		var $GnbWrapper = $('.gnbwrapper');
		var $Gnb = $('.gnb');
		var Sub01 = '.gnb_sub_01';
		var IconMenu = '.icon_menu';
		var IconMenuSub = '.iconmenu_sub';
		var IconMenuCover = '.iconmenu_cover';
		var Tit = '.tit';
		var TitWrapper = '.titwrapper';
		var titOn ='tit_on'
		var TitWrapperOn = 'titwrapper_on';
		var Linker = '.yytour';
		var BodyCoverBg = '.body_cover_bg';
		var b_h = $('body').outerHeight();
		var nW = 'new_window';
		var btnClose = '.btn_close';
		var speed = 0;
		var IconArrow = '.iconmenu_arrow'; 
	
		//초기 설정
		$GnbWrapper.find(BodyCoverBg).css('height',b_h);
		
		function iconMenuStyle(curT){
			var $CurT = $(curT);
			var iconMenuWidth = $CurT.find(IconMenu).width();
			var iconMenuSize = $CurT.find(IconMenu).find('>ul>li').length;
			var iconTotalWidth = null;
			
			if(iconMenuWidth != $CurT.find(IconMenu).find('>ul').width()){
				return false;
			}else{
				for(var i = 0; i < iconMenuSize; i++){
					iconTotalWidth += $CurT.find(IconMenu).find('>ul>li').eq(i).width();
				}
				
				var iconM=parseInt((iconMenuWidth-iconTotalWidth)/iconMenuSize);
				var avgW,curW;
				
				if(iconMenuSize<6){
					$CurT.find(IconMenu).find('>ul>li').each(function(){
						var $this = $(this);
						
						avgW = ($this.find('img').width());
						curW = ($this.width());
						iconM2 = (curW > avgW)? (iconM - (curW - avgW)) : iconM;
						$this.css({'margin-left':iconM2/6,'margin-right':iconM2/6});
					});
				}else{
					$CurT.find(IconMenu).find('>ul>li').each(function(){
						var $this = $(this);
						
						if($this.parents('li').index()==3){
							avgW = iconM +($this.find('img').width());
							curW = iconM +($this.width());
							iconM2 = (curW > avgW)? (iconM - (curW - avgW)) : iconM;
							$this.css({'margin-left':(iconM2+5)/2,'margin-right':(iconM2+5)/2});
							
						}else{
							var $this = $(this);
							
							avgW = iconM +($this.find('img').width());
							curW = iconM +($this.width());
							iconM2 = (curW > avgW)? (iconM - (curW - avgW)) : iconM;
							$this.css({'margin-left':iconM2/2,'margin-right':iconM2/2});
						}
					});
				}
				//iconmenu ul 사이즈 조정.
				var m = null;  
				
				for(var i=0;i<iconMenuSize;i++){
					m += parseFloat($CurT.find(IconMenu).find('>ul>li').eq(i).css('margin-right'));
				}
				
				$CurT.find(IconMenu).find('>ul').width(iconTotalWidth+(m*2)+1);
			}
		}
	
		//mouse hover and focus
		$Gnb.find('>li').bind('mouseover focusin mouseout',function(e){
			if(e.type=='mouseover'||e.type=='focusin'){
				var $this = $(this);
				
				$this.find(TitWrapper).addClass(TitWrapperOn).parent().siblings().find(TitWrapper).removeClass(TitWrapperOn);
				$this.find(Sub01).show();
				$this.siblings().find(Sub01).hide();
				$GnbWrapper.find(BodyCoverBg).show();
				//아이콘 메뉴 스타일
				iconMenuStyle(this);
			}else{
				var chkClNm = 'gnb';
				var act = function($this){
					$GnbWrapper.find(Sub01).hide();
					$GnbWrapper.find(BodyCoverBg).hide();
				};	
				
				mouseRelative(e,chkClNm,act);
			}
		});
		
		//아이콘 이벤트 액션 정의
		$(IconMenu).find('>ul>li').each(function(){
			var $this = $(this);
			var imgFile = $this.find('img').attr('src'); // 원래의 이미지 경로를 집어넣는다.
			var preloadImage = new Image();  //이미지 객체를 만든다. 인스턴스 생성
			var imgExt  = /(\.\w{3,4}$)/;   // 정규식 패턴으로 .jpg와 .gif 매치한다. 
			
			preloadImage.src = imgFile.replace(imgExt,'_on$1');
			
			$this.bind('mouseover focusin mouseout focusout', function(e){
				if(e.type=='mouseover'||e.type=='focusin'){
					var iconMenuSubPos = $this.find(IconMenuSub).outerHeight(true);
					
					$this.find('img').attr('src',preloadImage.src);
					$this.find(IconArrow).show();
					$this.find(IconMenuSub).show().css('bottom',-iconMenuSubPos);
					$this.siblings().find(IconArrow).hide();
					$this.siblings().find(IconMenuSub).hide();
				}else{
					$(this).find('img').attr('src',imgFile);
				}
			});
		});
		
		// close the gnb
		$Gnb.find(btnClose).on('click keypress',function(e){
			var $this = $(this);
			
			if(e.keyCode == 13){ // check EnterKey
				if($this.parent().parent().index() == ($Gnb.find('>li').length-1)){
					$this.parent().hide();
					
					// focus next link    
					if( $('#a_lnb').length == 0 ){
						$('#a_contentContainer').focus();
					}else{ $('#a_lnb').focus(); }
					
				}else{
					$this.parent().hide().parent().next().find(Tit).focus();
				}
			}else{
				$this.parent().hide();
			}
			
			$GnbWrapper.find(BodyCoverBg).hide();
		});
		$Gnb.children().last().find(btnClose).focusout(function(){
			var $this = $(this);
			
			$this.parent().hide();
			$GnbWrapper.find(BodyCoverBg).hide();
		});
	}
	gnb();
		
	/* bnrOverview()
	----------------------------------------*/
	function bnrOverview(){
		var $View = $('.bnr_overview .view');	
		var $Btn = $('.bnr_overview .btn');
		var BtnPlay = '.btn_play';
		var BtnStop = '.btn_stop';
		var btnPrev = 'btn_prev';
		var btnNext = 'btn_next';
		var btnStop = 'btn_stop';
		var btnPlay = 'btn_play';
		var ulW=0;
		var speed = 1000;
		var delay = 500;
		var runTime = 1000;
		var ctrlNm= null
		
		//초기 설정
		$View.find('li').each(function(){
			ulW += $(this).outerWidth();
		});
		$View.find('ul').width(ulW+1);
		
		//기능설정
		function bnr_basic_sldr(){
			if(ctrlNm == btnStop||ctrlNm == btnPrev||ctrlNm == btnNext){
				clearTimeout(bnr_basic_sldr,0);
			}else{
				var fstW = $View.find('li').first().outerWidth();
				
				$View.find('ul').stop(true).animate({'left':-fstW},speed,function(){
					var $this = $(this);
					
					$this.find('li').first().appendTo($this);
					$this.css('left',0);
					setTimeout(bnr_basic_sldr,delay);
				});
			}
		}
		function bnr_left_sldr(){
			var fstW = $View.find('li').first().outerWidth();
			
			$View.find('ul').stop(true,true).animate({'left':-fstW},speed,function(){
				var $this = $(this);
				
				$this.find('li').first().appendTo($this);
				$this.css('left',0);
			});
		}
		function bnr_right_sldr(){
			var lstW = $View.find('li').last().outerWidth();
			
			$View.find('ul').find('li').last().clone().prependTo($View.find('ul'));
			$View.find('ul').css('left',-lstW);
			$View.find('ul').stop(true).animate({'left':0},speed,function(){
				$(this).css('left',0);
			});
			$View.find('ul').find('li').last().remove();
		}
		
		//초기 실행
		setTimeout(bnr_basic_sldr,runTime);
		
		//btn control
		$Btn.find(BtnPlay).hide();
		$Btn.find('button').bind('click mouseout', function(e){
			var $this = $(this);
			
			if(e.type=='click'){
				var thisClNm = $this.attr('class'); //버튼의 클래스 이름을 가지고 온다.
				
				ctrlNm = thisClNm;
				
				if(ctrlNm==btnStop){
					$Btn.find(BtnPlay).show();
					$Btn.find(BtnStop).hide();
				}else if(ctrlNm==btnPlay){
					$Btn.find(BtnPlay).hide();
					$Btn.find(BtnStop).show();
					setTimeout(bnr_basic_sldr,runTime);
					
				}else if(ctrlNm == btnPrev){
					bnr_left_sldr();
				}else if(ctrlNm == btnNext){
					bnr_right_sldr();
				}	
				return false;
			}else if(e.type=='mouseout'){
				if(ctrlNm == btnPrev||ctrlNm == btnNext){
					ctrlNm=null;  //버튼의 클래스이름을 초기화
					setTimeout(bnr_basic_sldr,runTime);
				}
			}
		});
	}
	bnrOverview();
	
	/* qnbConnection()
	-------------------------------------*/
	function qnbConnection(){
		var $Selector = $('.footer .qnb_connection');
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
			var $this = $(this);
			
			if(e.keyCode == 13){
				$this.parent().hide().parent().next().find(BtnMore).find('button').focus()
			}else{
				$this.parent().hide();
			}
			return false;
		});
	}
	qnbConnection();
	
	
	

});