/**
 * 공통 스크립트
 */
$(document).ready(function() {

	$('.skinTb-wrapper').on('scroll', function () {
		$(this).addClass('scroll');
	});

	$('.skinTb.width320').parent().addClass('width320');
	$('.skinTb.width400').parent().addClass('width400');
	$('.skinTb.width640').parent().addClass('width640');
	$('.skinTb.width768').parent().addClass('width768');
});

function setPopup(popupList) {
	for (var i = 0; i < popupList.length; i++) {
		if (!$.cookie('popup_deny_'+popupList[i].popItemSeq)) {
			var title		= popupList[i].title;
			var top			= popupList[i].positiony;
			var left		= popupList[i].positionx;
			var width		= popupList[i].width;
			var height		= popupList[i].height;
			var type		= popupList[i].type;
			var url			= popupList[i].url;
			var popWindowType = popupList[i].popWindowType;

			if (top == 0 && left == 0) {
				top	= (screen.height - height) / 2;
				left = (screen.width	- width)	/ 2;
			}
			height = height + 36;
			
			// 윈도우 팝업
			if (popWindowType == 'Y') {
				window.open('/egf/bp/popup/article/view.do?popItemSeq=' + popupList[i].popItemSeq, title, 'width=' + width + ',height=' + height + ',top='	+ top + ',left=' + left);
			}
			// 레이어 팝업
			else if (popWindowType == 'N') {
				var style = 'position: absolute; top: ' + top + 'px; left : ' + left + 'px; z-index: 99999; width : ' + width + 'px; height : ' + height + 'px; background-color: white;';
				var popup = $('<iframe src="/egf/bp/popup/article/view.do?popItemSeq=' + popupList[i].popItemSeq +'" style="' + style + '" id="popup_frame_' + popupList[i].popItemSeq + '" title="' + title + '"></iframe>');
				$('body').append(popup);
			}
		}
	}
}

function popup(aTag) {
	var $aTag 	= $(aTag);
	var url		= $aTag.attr('href');
	var seq		= $aTag.data('seq');
	if (!url) {
		return;
	} else {
		url = '/egf/bp/popup-zone/article/view.do?popupZoneSeq=' + seq;
	}
	var top			= $aTag.data('top');
	var left		= $aTag.data('left');
	var width		= $aTag.data('width');
	var height		= $aTag.data('height');
	var target		= $aTag.attr('target');
	var condition 	= '';
	
	if (width > 0 && height > 0) {
		if (top == 0 && left == 0) {
			top	= (screen.height - height) / 2;
			left = (screen.width - width) / 2;
		}
		condition = 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
	}
	
	if (!condition) {
		window.open(url, target);
	} else {
		window.open(url, target, condition);
	}
}

// id A-Contents 인쇄
function contentPrint() {
	var printContents = document.getElementById('A-Contents').innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

// SNS 공유
function toSNS(sns) {
	var strTitle = document.title;
	var strURL = window.location.href;

    var snsArray = new Array();
    snsArray['twitter'] = "http://twitter.com/home?status=" + encodeURIComponent(strTitle) + ' ' + encodeURIComponent(strURL);
    snsArray['facebook'] = "http://www.facebook.com/share.php?u=" + encodeURIComponent(strURL);
    window.open(snsArray[sns]);
}

try {
	$(document).ready(function() {
		$('.onlyNum').css('ime-mode', 'disabled');
		$('.onlyNum').on('keydown', function(evt) {
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if (charCode != 46 && charCode > 31
			 && (charCode < 48 || charCode > 57)
			 && (charCode < 96 || charCode > 105))
				return false;
			return true;
		});
	});
} catch (e) {
	alert("keydown event exception");
}

function checkPrivatePopup(){
	if (!$('#Private').is(':checked')) {
		alert('개인정보 수집 및 이용목적에 동의 해주세요.')
		return;
	}
	$('.Ftr').css({zIndex: 20});
	$('.contsArea').css({zIndex: 10});
	$('.bgCover').hide();
	$('.privateConfirm').hide();
}


function setCookie(cookieName, closeBtnId, expDate) {
	if(expDate==null){
		expDate = 1;
	}
	$.cookie(cookieName, 'Y', { expires: expDate, path: '/'});
	if (closeBtnId) {
		$('#' + closeBtnId).click();
	}
}

function getStrWithoutTag(str) {
	if (str == null) {
		return str
	}

	return str.replace(/<[^>]*>/ig, "");
}

function onlyNumber(obj) {
    $(obj).keyup(function(){
         $(this).val($(this).val().replace(/[^0-9]/g,""));
    });
}
