<%@ page contentType="text/html;charset=utf-8" errorPage="/common/error/error.jsp" %>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<title>사진 첨부하기</title>
<style type="text/css">
/* NHN Web Standard 1Team JJS 120106 */
/* Common */
body,p,h1,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,table,th,td,form,fieldset,legend,input,textarea,button,select {
	margin: 0;
	padding: 0
}

body,input,textarea,select,button,table {
	font-family: '돋움', Dotum, Helvetica, sans-serif;
	font-size: 12px
}

img,fieldset {
	border: 0
}
ul,ol {
	list-style: none
}

em,address {
	font-style: normal
}

a {
	text-decoration: none
}

a:hover,a:active,a:focus {
	text-decoration: underline
}

/* Contents */
.blind {
	visibility: hidden;
	position: absolute;
	line-height: 0
}

#pop_wrap {
	width: 383px
}

#pop_header {
	height: 26px;
	padding: 14px 0 0 20px;
	border-bottom: 1px solid #ededeb;
	background: #f4f4f3
}

#pop_footer {
	margin: 21px 20px 0;
	padding: 10px 0 16px;
	border-top: 1px solid #e5e5e5;
	text-align: center
}

h1 {
	color: #333;
	font-size: 14px;
	letter-spacing: -1px
}

.btn_area {
	word-spacing: 2px
}

.pop_container2 {
	padding: 46px 60px 20px
}

.pop_container2 .dsc {
	margin-top: 6px;
	color: #666;
	line-height: 18px
}

.pop_container2 .dsc strong {
	color: #13b72a
}

.upload {
	margin: 0 4px 0 0;
	_margin: 0;
	padding: 6px 0 4px 6px;
	border: solid 1px #d5d5d5;
	color: #a1a1a1;
	font-size: 12px;
	border-right-color: #efefef;
	border-bottom-color: #efefef;
	length: 300px;
}

:root	.upload {
	padding: 6px 0 2px 6px;
}
</style>
</head>
<body>
	<div id="pop_wrap">
		<!-- header -->
		<div id="pop_header">
			<h1>사진 첨부하기</h1>
		</div>
		<!-- //header -->
		<!-- container -->
		<div id="pop_container2" class="pop_container2">
			<!-- content -->
			<form id="editor_upimage" name="editor_upimage" action="file_uploader.jsp" method="post" enctype="multipart/form-data" onSubmit="return false;">
				<div id="pop_content2">
					<input type="file" class="upload" id="uploadInputBox" name="Filedata">
					<p class="dsc" id="info">
						<strong>10MB</strong>이하의 이미지 파일만 등록할 수 있습니다.<br>(JPG, GIF, PNG, BMP)
					</p>
				</div>
			</form>
			<!-- //content -->
		</div>
		<div id="pop_footer">
			<div class="btn_area">
				<a href="#"><img src="../../img/photoQuickPopup/btn_confirm.png" width="49" height="28" alt="확인" id="btn_confirm"></a> <a href="#"><img src="../../img/photoQuickPopup/btn_cancel.png"
					width="48" height="28" alt="취소" id="btn_cancel"></a>
			</div>
		</div>
		<!-- //footer -->
	</div>
	<script type="text/javascript" src="jindo.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="jindo.fileuploader.js" charset="utf-8"></script>

<script language="javascript">
	//변수 선언 및 초기화
	var oFileUploader;

	//마크업-공통 
	var welBtnConfirm = $Element("btn_confirm"); //확인 버튼
	var welBtnCancel = $Element("btn_cancel"); //취소 버튼

	//진도로 랩핑된 element
	var fnUploadImage = null;

	//--------------- html5 미지원 브라우저에서 (IE9 이하) ---------------
	/** 
	 * 이미지를 첨부 후 활성화된 버튼 상태
	 */
	function goStartMode() {
		var sSrc = welBtnConfirm.attr("src") || "";
		if (sSrc.indexOf("btn_confirm2.png") < 0) {
			welBtnConfirm.attr("src",
					"../../img/photoQuickPopup/btn_confirm2.png");
			fnUploadImage.attach(welBtnConfirm.$value(), "click");
		}
	}
	/**
	 * 이미지를 첨부 전 비활성화된 버튼 상태
	 * @return
	 */
	function goReadyMode() {
		var sSrc = welBtnConfirm.attr("src") || "";
		if (sSrc.indexOf("btn_confirm2.png") >= 0) {
			fnUploadImage.detach(welBtnConfirm.$value(), "click");
			welBtnConfirm.attr("src",
					"../../img/photoQuickPopup/btn_confirm.png");
		}
	}

	/**
	 * 일반 업로드 
	 * @desc oFileUploader의 upload함수를 호출함. 
	 */
	function generalUpload() {
		oFileUploader.upload();
	}

	/**
	 * 이미지 업로드 시작
	 * 확인 버튼 클릭하면 호출되는 msg
	 */
	function uploadImage(e) {
		generalUpload();
	}

	/**
	 * jindo에 파일 업로드 사용.(iframe에 Form을 Submit하여 리프레시없이 파일을 업로드하는 컴포넌트)
	 */
	function callFileUploader() {
		oFileUploader = new jindo.FileUploader(jindo.$("uploadInputBox"), {
			sUrl : location.href.replace(/\/[^\/]*$/, '')
					+ '/file_uploader.jsp', //샘플 URL입니다.
			sCallback : location.href.replace(/\/[^\/]*$/, '')
					+ '/callback.html', //업로드 이후에 iframe이 redirect될 콜백페이지의 주소
			sFiletype : "*.jpg;*.png;*.bmp;*.gif", //허용할 파일의 형식. ex) "*", "*.*", "*.jpg", 구분자(;)	
			sMsgNotAllowedExt : 'JPG, GIF, PNG, BMP 확장자만 가능합니다', //허용할 파일의 형식이 아닌경우에 띄워주는 경고창의 문구
			bAutoUpload : false, //파일이 선택됨과 동시에 자동으로 업로드를 수행할지 여부 (upload 메소드 수행)
			bAutoReset : false
		}).attach({
			select : function(oCustomEvent) {
				if (oCustomEvent.bAllowed === true) {
					goStartMode();
				} else {
					goReadyMode();
					oFileUploader.reset();
				}
			},
			success : function(oCustomEvent) {
				var aResult = [];
				aResult[0] = oCustomEvent.htResult;
				setPhotoToParent(aResult[0].sFileURL);
			},
			error : function(oCustomEvent) {
				alert(oCustomEvent.htResult.errstr);
			}
		});
	}
	
	function setPhotoToParent(sFileURL){
		var newImg = document.createElement("img");
		newImg.src = sFileURL;
		newImg.height = "30";
		newImg.width = "40";
		newImg.alt = "업로드이미지";
		var picture = opener.parent.document.getElementById('picture');
		picture.value = sFileURL;
		alert("이미지가 정상적으로 등록되었습니다.");
		var target = opener.parent.document.getElementById('sns_image');
		target.appendChild(newImg);
		window.close();
	}
	
	/**
	 * 페이지 닫기 버튼 클릭
	 */
	function closeWindow() {
		window.close();
	}

	window.onload = function() {
		callFileUploader();
		fnUploadImage = $Fn(uploadImage, this);
		$Fn(closeWindow, this).attach(welBtnCancel.$value(), "click");
	};

</script>

</body>
</html>
