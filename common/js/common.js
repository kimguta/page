
$(window).on('load resize', function() {
	$('.skinTb-wrapper').on('scroll', function () {
		$(this).addClass('scroll');
	});
	$('.skinTb.width640').parent().addClass('width640');
	$('.skinTb.width768').parent().addClass('width768');
	$('.skinTb.width1000').parent().addClass('width1000');
});

function setPopup(popupList) {
	for (var i = 0; i < popupList.length; i++) {
		let popItemSeq = popupList[i].popItemSeq;
		if (!$.cookie('popup_deny_' + popItemSeq)) {
			var title		= popupList[i].title;
			var top			= popupList[i].positiony;
			var left		= popupList[i].positionx;
			var width		= popupList[i].width;
			var height		= popupList[i].height;
			var type		= popupList[i].type;
			var url			= popupList[i].url;
			var popWindowType = popupList[i].popWindowType;
			let userAgent = navigator.userAgent.toLocaleLowerCase();

			if (top == 0 && left == 0) {
				top	= (screen.height - height) / 2;
				left = (screen.width - width) / 2;
			}

			// 윈도우 팝업
			if (popWindowType == 'Y') {
				// 듀얼모니터일 경우 전체 모니터 좌표에서 현재 모니터의 X,Y 영점좌표
				let scX = window.screenLeft;
				let scY = window.screenTop;

				// 현재 모니터의 X,Y 영점좌표 기준 팝업창 위치 값
				left = scX + left;
				top = scY + top;

				let popWidth = parseInt(width);
				// let popHeight = parseInt(height);
				let popHeight = parseInt(height) + 37;
				if(userAgent.indexOf("edg") == -1 && userAgent.indexOf("chrome") > 0) {
					popWidth = popWidth + 1;
					popHeight = popHeight + 1;
				}

				var p = window.open('/egf/bp/popup/article/view.do?popItemSeq=' + popItemSeq, "FrontPopup" + i, 'width=' + popWidth + ',height=' + popHeight + ',top='	+ top + ',left=' + left);
				p.focus();
			}
			// 레이어 팝업
			else if (popWindowType == 'N') {
				$.get("/egf/bp/popup/article/view.do?popItemSeq=" + popItemSeq, function(data) {
					$("body").append(data);
					let deviceWidth = screen.width;
					if(deviceWidth < 400) {
						// initial position
						$(".popup-box-line").css({"top": "0px", "left":"0px"});
						// initial size
						$(".popup-box-line").each(function (i, e) {
							let popupWidth = $(this).data("width");
							if(400 < popupWidth) {
								$(this).css({"max-width": "320px", "overflow":"auto"});
								$(this).find(".popup-box-content").css({"max-width": "320px", "overflow":"auto"});
							}
						});
					}

					// close today event
					$("input[name='popupTodayClose']").on("click", function (event) {
						let seq = $(this).data("seq");
						$.cookie('popup_deny_' + seq, 'Y', {
							expires: 1
							, path: '/'
						});

						fnPopupClose(seq, $(this).data("popup-type"));
					});
				});
			}
		}
	}
}

// popup(window or layout)
function fnPopupClose(seq, popupType) {
	if (popupType == 'Y') {
		window.close();
	} else if (popupType == 'N') {
		$(".popup-box-line" + seq).remove();
	}
}

function popup(aTag) {
	var $aTag 	= $(aTag);
	var url		= $aTag.attr('href');
	var seq		= $aTag.data('seq');
	if (!url) {
		return;
	} else {
		// url = '/egf/bp/popup-zone/article/view.do?popupZoneSeq=' + seq;
		url = '/egf/bp/alert/notification/article/view.do?anSeq=' + seq;
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

var initBody;
function beforePrint() {
	initBody = document.body.innerHTML;
	document.body.innerHTML = document.getElementById('content').outerHTML;
}

function afterPrint() {
	document.body.innerHTML = initBody;
}

// print
function fnPrint() {
	alert("크롬, 오페라 브라우저 사용 시 배경이 안나오는 경우, 인쇄창 컬러 항목 아래 +설정 더보기 > 배경 그래픽에 체크 후 다시 시도해주세요.");

	var inbody = document.body.innerHTML; // 이전 body 영역 저장

	window.onbeforeprint = beforePrint;
	window.onafterprint = afterPrint;
	window.print();
}

// sns 공유 (기능) - 2021-08-20 jylee
function fnShareSNS(sns){
	// 공유하는 페이지 <title> 태그 가져오기
	var strTitle = document.title;
	var strURL = window.location.href;

	var snsArray = new Array();
	// encodeURIComponent() : HTML 특수개체 문자 처리방식
	snsArray['twitter'] = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(strTitle) + "&url=" + encodeURIComponent(strURL);
	snsArray['facebook'] = "http://www.facebook.com/share.php?u=" + encodeURIComponent(strURL);
	snsArray['kakao'] = "http://story.kakao.com/share?url=" + encodeURIComponent(strURL);
	snsArray['naver'] = "http://share.naver.com/web/shareView.nhn?url=" + encodeURIComponent(strURL) + "&title=" + encodeURIComponent(strTitle);
	// 새 창으로 snsArray 링크 열기
	window.open(snsArray[sns], "SNS 공유하기 새창", "width=800, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes");
}

// start loading bar - add by YJ.SON :: 2021-07-08
function fnStartLoading() {
	$("body").append('<div class="loader-back"><div class="loader" id="div-main-loader"></div></div>');
}

// end loading bar - add by YJ.SON :: 2021-07-08
function fnEndLoading() {
	$(".loader-back").remove();
}

// form validate with document element id
function fnFormValidate(_id) {
	var error = false;
	var forms = document.querySelectorAll("#" + _id);
	$.each(forms[0], function(i, e) {
		if($(this).attr("required") !== undefined && $(this).attr("placeholder") !== undefined) {
			var value = $.trim($(this).val());
			var placeholder = $(this).attr("placeholder");

			// check field value
			if(value == "" && ($(this).attr("type") !== "file" ||  $(this).attr("type") === "file" && $(this).data("previous-file") === "")) {
				alert(placeholder);
				$(this).focus();
				error = true;
				return false;
			}

			// check for number
			if(value != "" && ($(this).data("data-type") == "number" || $(this).data("data-type") == "number-dash")) {
				let thisValue = $(this).val().replace(/-/g, "");
				let dataType = $(this).data("data-type");
				let message = "숫자만 가능합니다.";
				if("number-dash" === dataType) {
					message = "숫자, -만 가능합니다."
				}

				if(!$.isNumeric(thisValue)) {
					alert(message);
					$(this).val("");
					$(this).focus();
					error = true;
					return false;
				}
			}

			// check for radio / checkbox
			if(($(this).attr("type") === "radio" || $(this).attr("type") === "checkbox") && $("input[name='" + $(this).attr("name") + "']:checked").length == 0) {
				alert(placeholder);
				$(this).focus();
				error = true;
				return false;
			}
		}
	});

	return error;
}

function fnMessagePopup(message) {
	alert(message);
}

$(document).ready(function () {
	// copy by board url on clipboard
	var clipboard = new ClipboardJS('.btn-clipboard', {
		text: function(trigger) {
			var seq = $(trigger).data("article-seq");
			return location.href + "?articleSeq=" + seq;
		}
	});

	// 복사 성공 이벤트 처리
	clipboard.on('success', function(e) {
		alert("바로가기 주소를 복사하였습니다.\nCtrl + V로 붙여넣기 하시면 됩니다.");
		e.clearSelection();
	});
});