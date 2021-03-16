$(function(){

function formDescription(){
	var IptWrppr = '.iptwrapper';
	var InputElement = 'input'; 
	var PElement = 'p';
	if(IptWrppr){
		$(IptWrppr+' >'+PElement).click(function(){
			$(this).siblings().focus();
		});	
		$(IptWrppr+' '+InputElement).bind('focusin blur',function(evt){
			if(evt.type=='focusin'){
				$(this).siblings().hide();
			}else if(evt.type=='blur'){
				var chk = $(this).val();
				if(chk == ''){
					$(this).siblings().show();
				}else{
					$(this).siblings().hide();
				}
			}
		});
	}
}
formDescription();

function downLoadCustom(){
	var FileWrppr ='.filewrapper';
	var BtnFile = '.btn_file';
	var FileFld = '.file_fld';
	var Txt = '.txt';
	var BtnDel ='.btn_del';
	var placeTxt = '선택된 파일이 없음';
	var checkBoxFile = '.checkBox_file';
	// 파일선택 클릭
	$(BtnFile).each(function(){
		$(this).click(function(){
			$(this).siblings(FileFld).click();
		});
	});
	
	// 파일필드 체인지
	$(FileFld).each(function(){
		$(this).change(function(){
			$(this).siblings(checkBoxFile).attr("checked",true);
			var fileVal = $(this).val();
			var fileValLength;
			fileVal = fileVal.split('\\');
			fileValLength = fileVal.length;
			$(this).siblings().text(fileVal[fileValLength-1]);
		});
	});

	// 파일 삭제
	$(FileWrppr).each(function(){
		$(BtnDel).click(function(){
			$(this).siblings(FileFld).val('');
			$(this).siblings(Txt).text(placeTxt);
			$(this).siblings(checkBoxFile).attr("checked",true);
		});	
	});
}
downLoadCustom();

/* Password Confirm 
--------------------------------------------------------- */
function boPswConfirmBodyCover(){
	var winH = $(window).height();
	var cover = '.bo_pswconfirm_bodycover';
	
	if($(cover).length!=0){
		$(cover).css({'height':winH});
		$('#header, #footer').css({'z-index':5});
	}
}
boPswConfirmBodyCover();

/* srch_opt 검색옵션
--------------------------------------*/
function optRadio(){
	var SelectInput = $('.combine_srch_form .opt_radio input');
	var clickChk=0;				
	var className = '_on';
	//radiobox의 라벨 오버했을 때
	$(SelectInput).each(function(){
		var labelClass = $(this).parent().attr('class');
		labelClass=labelClass.split(' ');
		
		$(this).parent().hover(function(evt){
			var chk = evt.target.childNodes[1].checked;
			if(!chk){
				$(this).addClass(labelClass[0]+className);
			}
			$(this).click(function(){
				$(this).siblings().removeClass(labelClass[0]+className);
			});
		},function(evt){
			var chk = evt.target.childNodes[1].checked;
			if(!chk){
				$(this).removeClass(labelClass[0]+className);
			}
		});

		$(this).focus(function(){
			$(this)[0].checked=true;
			$(this).parent().addClass(labelClass[0]+className);
			$(this).parent().siblings().removeClass(labelClass[0]+className);
		});
	});
}
optRadio();

/* tabNav autoHeight
 ---------------------------------------------------------------- */
 function tabNavAutoStyle(){
	var Target = '.tab_navwrapper';
	var allItem = [
	 	[],
	 	[],
	 	[]
	];
	var n = 0;
	$(Target).find('>ul li').each(function(idx){
		 if( (idx/5) < 1 ){
		 	n = 0;
		 }else if( (1 <= (idx/5)) && ((idx/5) < 2) ){
		 	n = 1;
		 }else if( (2 <= (idx/5)) && ((idx/5) < 3) ){
		 	n = 2;	
		 }
		 allItem[n].push($(this));
	});
	
	if($(Target).length != 0){	
		for(var n = 0; n <= allItem.length-1;n++){
			if(allItem[n][allItem[n].length-1] == undefined){
				break;
			}else{
				allItem[n][allItem[n].length-1].addClass('last');
			}
		} 
	}
 }
 tabNavAutoStyle();
 
 /* 리스트에서 세브내용  펼쳐보기 
 --------------------------------------- */
 function unfoldView(){
 	var BtnFoldList = '.btn_foldlist';
 	var UnfoldView = '.unfold_view';
 	var BtnUnFoldList = '.btn_unfoldlist'; 
 	var adClNm = 'btn_unfoldlist';
 	$(BtnFoldList).each(function(){
 		$(this).click(function(evt){
 			currentClass = evt.currentTarget.className.split(' ');
 			for(var i = 0; i < currentClass.length;i++){
 				if(currentClass[i] == adClNm){
 					$(this).removeClass(adClNm);
 					$(this).parents('tr').next(UnfoldView).hide();
 					return false; 
 				}	
 			}
 			$(this).parents('tr').next(UnfoldView).show();
 			$(this).addClass(adClNm);
 			return false;
 		});
 	});
 }
 unfoldView();
 
 /* 설문조사 팝업
----------------------------------------------------------------- */
function windowPop(){
	var BtnPOP = '.btn_join';
	$(BtnPOP).click(function(){
		//PopWin = window.open('erms_windowpopup.html','_blank','width=740,height=647');
	});
}
windowPop();

function windowPopClose(){
	var BtnClose = '.window_popup .btn_close';
	if(BtnClose.length != 0){
		$(BtnClose).click(function(){
			window.open('','_self').close();
		});
	}
}
windowPopClose();

/* 년도별 선택 이동
----------------------------------------------------------------- */
function selectMove(){
	var Target = '#yearSelect';
	
	var loValue;
	var link;
	if($(Target).length != 0){
		$(Target).change(function(){
			loValue = $(this).val();
			link = location.pathname + '?content_id=' + loValue;
			$(Target).siblings('.btn_move').attr('href',link);
			$(this).find('option').each(function(){
				if($(this).val() == loValue){
					$(Target).siblings('.btn_move').attr('title',$(this).text());
				}
			});
		});
	}
}
selectMove();

/* 텍스트 줄임.
----------------------------------------------------------------- */
function ellipsis(){
	if($('.bo_list td.sbj').length == 0 ){
		return false
	}
	var newIcon_w = 22;
	$('.bo_list td.sbj').each(function(){
		 var container_w = $(this).width();
		 var del_w=0;
		 if($(this).find('a').hasClass('new_icon')){
				container_w = container_w - newIcon_w;
		 }
		 $(this).find('span').not('.sbj_txt').each(function(){
				del_w += (5 + $(this).width());
		});
		 var t_w = $(this).find('span.sbj_txt').width();
		 var r_w = (container_w - del_w);
		 var w=0;
		 
		 if(t_w==r_w){
		 		w = t_w;
		 }else if(t_w<r_w){
		 		w = 'auto';
		 }else{
		 		w = r_w;	
		 }
		$(this).find('span.sbj_txt').css({
			'width':w,
			'white-space':'nowrap'
		});		
		 	
	});

}
ellipsis();
function clickMoveTop(){
	if($('.satisfaction .btn_top').length==0){
		return false;
	}
	$('.satisfaction .btn_top').attr('href','#yyConts');
}
clickMoveTop();
});