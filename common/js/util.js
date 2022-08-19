/*************************************************************
	만든이      : 장정호
	작성일      : 2001.10.10
	최종 수정일 :
	프로젝트 명 : 라이브러리
	모듈 명     : 웹상에서 이용되는 자바스크립트 함수 모음
	기타 설명   :
	수정 내용	 : 2002.04.10
		2002.04.15 jf_checkHHMM, jf_checkHHMMSS 함수 추가
		2002.04.23 Cookie에 관한 함수 추가
		2002.04.29 변수명 수정
		2002.04.30 jf_isArry 추가
		2002.05.17 jf_isUserName 추가
		2002.05.17 jf_isSizeOver 추가
		2002.05.26 jf_imageSizeFix 추가
		2002.06.08 jf_select 추가
		2002.07.01 jf_selectMsg 추가
		2002.07.07 jf_openWindow 추가			: DEPRECATED 2005/10/13
		2003.08.22 jf_diffDay 추가
		2004.02.01 jf_getExt 추가
		2004.02.10 jf_checkboxAll 추가
		2004.06.22 jf_replace 추가
		2004.07.31 jf_openWindowRtn 추가		: DEPRECATED 2005/10/13
					jf_void	추가
		2004.08.26 jf_isValidEmail2 추가
		2004.12.09 jf_getObject 추가
		2005.04.20 jf_isURL 추가
		2005.05.04 jf_checkboxAllRange, jf_selectBoxMove, jf_selectBoxBumpUp, jf_selectBoxSortD 추가
		2005.05.06 jf_getDate 추가
		2005.05.19 jf_isChoicedSelectBox 추가
		2005.06.10 jf_layerToggle 추가
		2005.06.12 jf_selectValue 추가
		2005.06.18 jf_numberInput 추가
		2005.06.22 jf_isChoicedRadio 추가
		2005.07.07 jf_isLengOverRtnMsg 추가
		2005.08.10 jf_nextFocus() 추가
		2005.09.13 jf_swapImage() 추가
		2005.09.24 jf_dumpObject() 추가
		2005.10.13 jf_popupWindow(),
					jf_popupWindowEx(),
					jf_popupWindowCenter() 추가
		2005.10.29 jf_realtime_MaxLen() 추가
		2005.11.05 jf_valueClear() 추가
		2005.11.05 jf_dumpObjectAsHTML(Object obj) 추가
		2005.12.21 jf_imgToggle() 추가
		2005.12.23 jf_modalOpen(), jf_modalessOpen(), jf_modalOpen_c() 추가
		2006.09.07 jf_copyClipboard(text) 추가
		2007.07.31 jf_inputLimitSize() 추가
		2007.08.12 jf_setCookieInstacne() 추가
		2007.08.17 jf_businessNumber() 추가
		2007.10.16 jf_setFontSize() 추가
		2008.02.25 jf_updateChar() 추가
		2008.02.25 jf_calculate_msglen() 추가
		2008.02.25 jf_assert_msglen() 추가
		2008.04.29 jf_photoView() 추가
		2008.05.01 cls_imageRotation() // 이미지 로테이션 객체
		2008.11.03 jf_makeArrayForm() 추가
*************************************************************/

var _JF_LIBRARY_IDENTIFIER__UTIL_JS_ = "UTIL.JS 2005-11-14 23:20:00";

     /*******************************************/
     /*******************************************/
     /*       DATE  VALIDATION  CHECK           */
     /*******************************************/
     /*******************************************/
var JF_montharrAY= new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var JF_PADDASH   = new Array(" ", ",");
var JF_ALPHABET  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function jf_generalDate(strDate) {
  strDate       	= jf_Trim(strDate);
  var tmpDate   	= "";

  for(var i = 0, j=0; i < strDate.length ; i++) {
    if (strDate.charAt(i) == "-") {
      tmpDate    += JF_PADDASH[j];
      j++;
      continue;
    }
    tmpDate      += strDate.charAt(i);
  }

  tmpDate         = new Date(tmpDate);

  with(tmpDate) {
      tmpDate   = jf_LPadChar(getFullYear().toString(),  4, "0") +
                  jf_LPadChar((getMonth()+1).toString(), 2, "0") +
                  jf_LPadChar(getDate().toString(),      2, "0") +
                  jf_LPadChar(getHours().toString(),     2, "0") +
                  jf_LPadChar(getMinutes().toString(),   2, "0") +
                  jf_LPadChar(getSeconds().toString(),   2, "0");
	}

	return tmpDate;
}


function jf_initClock(f) {
  var tmptickcount = "";
  var currdate     = new Date();
  var sysdate      = "";
  var tmpsysdate   = "";
  var tmpDate1     = "";
  var tmpDate2     = "";

  if (f.subtickcount.value == null)
    f.subtickcount.value = "";

  with(currdate) {
  	tmpDate1       = JF_montharrAY[getMonth()]    + " " +
                     jf_LPadChar(getDate().toString(), 2, "0")     + ", " +
                     jf_LPadChar(getFullYear().toString(), 4, "0") + " " +
                     jf_LPadChar(getHours().toString(), 2, "0")    + ":" +
                     jf_LPadChar(getMinutes().toString(), 2, "0")  + ":" +
                     jf_LPadChar(getSeconds().toString(), 2, "0");
  }

  if (f.subtickcount.value == "") {

  	tmpsysdate       = jf_deleteChar(f.systemdate.value, "/")+"59";

    sysdate          = new Date(parseFloat(tmpsysdate.substring(0, 4)),
                                parseFloat(tmpsysdate.substring(4, 6)) - 1,
                                parseFloat(tmpsysdate.substring(6, 8)),
                                parseFloat(tmpsysdate.substring(8, 10)),
                                parseFloat(tmpsysdate.substring(10, 12)),
                                parseFloat(tmpsysdate.substring(12)));
    with(sysdate) {
    	tmpDate2       = JF_montharrAY[getMonth()]   + " " +
                       jf_LPadChar(getDate().toString(), 2, "0")     + ", " +
                       jf_LPadChar(getFullYear().toString(), 4, "0") + " " +
                       jf_LPadChar(getHours().toString(), 2, "0")    + ":" +
                       jf_LPadChar(getMinutes().toString(), 2, "0")  + ":" +
                       jf_LPadChar(getSeconds().toString(), 2, "0");
    }

    tmptickcount = Math.floor( (Date.parse(tmpDate2) - Date.parse(tmpDate1))/1000);

    f.subtickcount.value = tmptickcount.toString();
  }
}


function jf_realtime_MaxLen(obj1, obj2, Max_size, msg)	{
	var str = obj1.value;
	var len = jf_strLeng(str);
	if (Max_size > len) {
		obj1.isValid = true;
		obj2.value = len;
	}
	else {
		if (obj1.isValid) {
			obj1.isValid = false;
		  alert(msg);
			obj1.value = jf_cutAbsStr(str, Max_size);
	  	obj2.value = jf_strLeng(obj1.value);
	  }
	}
}

function jf_sysDate(tmptickcount) {
  var sysDate 	= "";
  var currdate 	= new Date();

  currdate.setMilliseconds(parseFloat(tmptickcount)*1000);

  with(currdate){
      sysDate   = jf_LPadChar(getFullYear().toString(),  4, "0") +
                  jf_LPadChar((getMonth()+1).toString(), 2, "0") +
                  jf_LPadChar(getDate().toString(),      2, "0") +
                  jf_LPadChar(getHours().toString(),     2, "0") +
                  jf_LPadChar(getMinutes().toString(),   2, "0") +
                	jf_LPadChar(getSeconds().toString(),   2, "0");
 }

 return sysDate;
}

//=============================================
//  inputValue에서 delChar를 모두 제거한 값을
//  return한다.
//=============================================
function jf_deleteChar(inputValue, delChar) {
 var tmpValue = "";
   inputValue = jf_Trim(inputValue);
   for(var i=0; i < inputValue.length; i++) {
     if ( inputValue.charAt(i) != delChar )
         tmpValue += inputValue.charAt(i);
   }

   return tmpValue;
}


//=============================================
//  inputValue값의 cnt에서 inputValue의 길이를
//  뺀 수만큼 padChar문자로 채워줌
//=============================================
function jf_LPadChar(inputValue, cnt, padChar) {
    var tmpValue = "";
    inputValue = jf_Trim(inputValue);

		for(var i=0; i < (cnt-inputValue.length); i++)
      tmpValue += padChar;
    return (tmpValue + inputValue);
}


//=============================================
//  inputValue값의 cnt에서 inputValue의 길이를
//  뺀 수만큼 padChar문자로 채워줌
//=============================================
function jf_RPadChar(inputValue, cnt, padChar) {
    var tmpValue = "";
    inputValue = jf_Trim(inputValue);
    for(var i=0; i < (cnt-inputValue.length); i++)
      tmpValue += padChar;
    return (inputValue + tmpValue);
}


//=============================================
// b의 양쪽 공백을 제거해주는 함수
//=============================================
function jf_Trim(b) {
    var i, startIdx, endIdx;

    if (b == null)
        return "";

    startIdx = 0;
    endIdx   = b.length;

     for(i=0; i < b.length ; i++)
        if ( b.charAt(i) != " " )
        {
            startIdx = i;
            break;
        }

     for(i=b.length; i >= 0 ; i--)
        if ( b.charAt(i-1) != " " )
        {
            endIdx = i;
            break;
        }

     return b.substring(startIdx, endIdx);
}


//========================================
//  Month Array 생성
//========================================
function jf_montharr(m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11) {
    this[0] = m0;
    this[1] = m1;
    this[2] = m2;
    this[3] = m3;
    this[4] = m4;
    this[5] = m5;
    this[6] = m6;
    this[7] = m7;
    this[8] = m8;
    this[9] = m9;
    this[10] = m10;
    this[11] = m11;
}


//========================================
//  YYYY 를 check한다.
//========================================
function jf_checkYYYY(toCheck) {
  return ( ( toCheck.length == 4) && ( jf_isInteger(toCheck)  ) && ( toCheck != "0000") );
}


//========================================
//  MM 를 check한다.
//========================================
function jf_checkMM(toCheck) {
  return ((!jf_isEmpty(toCheck)) && (jf_isInteger(toCheck)) && ( parseFloat(toCheck) > 0 ) && (parseFloat(toCheck) < 13));
}


//========================================
//  YYYY,MM,DD를 check한다.
//========================================
function jf_checkDD( yyyy, mm, toCheck) {
    var isYMD   = false;
    var monthDD = new jf_montharr(31,28,31,30,31,30,31,31,30,31,30,31);
    var im      = eval(mm) - 1;

    if ( toCheck.length == 0 )
         return false;

    if ( !jf_isInteger(toCheck)  )
         return false;

    var dd = toCheck;

    if ( ( (yyyy%4 == 0) && (yyyy%100 != 0) ) || (yyyy%400 == 0) )
    {
         monthDD[1] = 29;
    }

    if ( (0 < dd) && (dd <= monthDD[im]) )
         isYMD = true;

    return isYMD;
}


//========================================
//  YYYYMMDD를 check한다.
//========================================
function jf_checkDate( dateVal ) {
  var isDate  = true ;

	if ( dateVal.length != 8 )  {
		isDate = false ;
	}
	else {
		var yy = dateVal.substring(0,4) +"" ;
		var mm = dateVal.substring(4,6) +"" ;
		var dd = dateVal.substring(6,8) +"" ;

		if (!jf_checkYYYY(yy)) {
				isDate = false ;
		}

		else if (!jf_checkMM(mm))	{
			isDate = false ;
		}

		else if (!jf_checkDD(yy,mm,dd))	{
			isDate = false ;
		}
	}
	return isDate ;
}

//========================================
//  YYYY-MM-DD를 check한다.
//========================================
function jf_checkDate2( dateVal ) {
  var isDate  = true ;
	if ( dateVal.length != 10 ) {
		isDate = false ;
	}
	else {
		var yy = dateVal.substring(0,4) +"" ;
		var mm = dateVal.substring(5,7) +"" ;
		var dd = dateVal.substring(8,10) +"" ;

		if (!jf_checkYYYY(yy)) {
			isDate = false ;
		}
		else if (!jf_checkMM(mm)) {
			isDate = false ;
		}
		else if (!jf_checkDD(yy,mm,dd))	{
			isDate = false ;
		}
	}
	return isDate ;
}


//================================
// HH를 Check한다.
//================================
function jf_checkHH( toCheck ) {
  return ((!jf_isEmpty(toCheck)) && (jf_isInteger(toCheck)) && ( parseFloat(toCheck) >= 0 ) && (parseFloat(toCheck) <= 23));
}


//================================
// HHMM를 Check한다.
//================================
function jf_checkHHMM( hh, mm ) {
 	if ( jf_checkHH(hh) ){
  	return ((!jf_isEmpty(mm)) && (jf_isInteger(mm)) && ( parseFloat(mm) >= 0 ) && (parseFloat(mm) <= 59));
	}
	return false;
}

//================================
// HHMMSS를 Check한다.
//================================
function jf_checkHHMMSS( hh, mm, ss ) {
 	if ( jf_checkHHMM(hh,mm) ){
  	return ((!jf_isEmpty(ss)) && (jf_isInteger(ss)) && ( parseFloat(ss) >= 0 ) && (parseFloat(ss) <= 59));
	}
	return false;
}


//================================
// MI를 Check한다.
//================================
function jf_checkMI( toCheck ) {
    return ((!jf_isEmpty(toCheck)) && (jf_isInteger(toCheck)) && ( parseFloat(toCheck) >= 0 ) && (parseFloat(toCheck) <= 59));
}


//================================
// HHMI를 Check한다.
//================================
function jf_timeCheck( inputValue ) {
	var chkval =  jf_Trim(inputValue);

	if ( jf_isInteger ( chkval ) ) {
		if ( parseFloat(chkval) < 2400 ){
			if ( chkval.substring(0,1) > 2 )
				return false;
			else if ( chkval.substring(1,2) > 9 )
				return false ;
			else if ( chkval.substring(2,3) > 5  )
				return false ;
			else if ( chkval.substring(3,4) > 9 )
				return false;
			else
				return true ;
		}
		else {
			return false ;
		}
	}
	else{
			return false ;
	}
}

 /*******************************************/
 /*******************************************/
 /*       COMMON VALIDATION CHECK           */
 /*******************************************/
 /*******************************************/

//---------------------------------------------------
//  기능   : 영문자.한글 별로 length를 return ..IE4.0 이상
//----------------------------------------------------
function jf_strLeng(strIn) {
	var strOut  = 0;
	var agr     = navigator.userAgent;
	var isIE   = agr.indexOf("MSIE");

	if(isIE != -1){
		for ( i = 0 ; i < strIn.length ; i++)	{
			ch = strIn.charAt(i);
			if ((ch == "\n") || ((ch >= "ㅏ") && (ch <= "히")) || ((ch >="ㄱ") && (ch <="ㅎ")))
					strOut += 2;
			else
					strOut += 1;
		}
	}
	else{
		strOut = strIn.length ;
	}
	return (strOut);
}


//---------------------------------------------------
//  기능   : Check NULL OR Space RETURN T/F
//---------------------------------------------------
function jf_isEmpty(toCheck) {
	var chkstr = jf_Trim(toCheck) + "";
	var is_Space = true ;

	if ( ( chkstr == "") || ( chkstr == null ) )
		return true;

	for ( j = 0 ; is_Space && ( j < chkstr.length ) ; j++) {
		if( chkstr.substring( j , j+1 ) != " " )
			is_Space = false ;
	}

	return is_Space;
}


//---------------------------------------------------
//  기능   : Check NULL OR Space RETURN T/F , Msg
//---------------------------------------------------
function jf_isEmptyRtnMsg(obj, msg, len) {

	var toCheck  = obj.value ;
	var chkstr   = jf_Trim(toCheck) + "";
	var is_Space = true ;

	if (jf_isEmpty(toCheck)) {
		alert( msg );
		if (obj.focus != null) obj.focus();
		if (obj.select != null) obj.select();
		return true ;
	}

	for (j = 0 ; is_Space && (j < chkstr.length) ; j++) {
		if (chkstr.substring(j , j+1) != " ")
			is_Space = false ;
	}

	if (is_Space) {
		alert( msg );
		obj.focus();
		obj.select();
		return true ;
	}

	if (len != null) {
		if (jf_strLeng(obj.value) > len) {
			alert( msg +" 한글 "+len/2+",영문 "+len+"자 이내로 입력하십시오.");
			obj.focus();
			obj.select();
			return true ;
		} else {
			return false ;
		}
	} else
		return false ;
}

// obj객체 값이 len 이상인지 체크
function jf_isLengOverRtnMsg(obj, len) {
	if (jf_strLeng(obj.value) > len) {
		alert("한글 "+len/2+",영문 "+len+"자 이내로 입력하십시오.");
		obj.focus();
		obj.select();
		return true ;
	}
	else {
		return false ;
	}
}

// 다른것 jf_isEmptyRtnMsg와 같고, len만 이하체크를 한다.
function jf_isEmptyRtnMsg2(obj, msg, len) {
	var toCheck  = obj.value ;
	var chkstr   = jf_Trim(toCheck) + "";
	var is_Space = true ;

	if ( jf_isEmpty(toCheck) ) {
		alert( msg );
		obj.focus();
		obj.select();
		return true ;
	}

	for ( j = 0 ; is_Space && ( j < chkstr.length ) ; j++) {
		if( chkstr.substring( j , j+1 ) != " " )
				is_Space = false ;
	}

	if ( is_Space )	{
		alert( msg );
		obj.focus();
		obj.select();
		return true ;
	}

	if (len != null) {
		if (jf_strLeng(obj.value) < len) {
			alert( msg );
			obj.focus();
			obj.select();
			return true ;
		}
		else {
			return false ;
		}
	}
	else
		return false ;
}

//---------------------------------------------------
//  Check Space in String RETURN T/F
//  사용 : 개인입력시 이름
//---------------------------------------------------
function jf_isContentSpace(str) {
	var inx    = str.indexOf(" ");
	var inx1   = str.indexOf("#");
	var inx2   = str.indexOf("!");
	var inx3   = str.indexOf("$");
	var inx4   = str.indexOf("@");
	var inx5   = str.indexOf("%");
	var inx6   = str.indexOf("^");
	var inx7   = str.indexOf("&");
	var inx8   = str.indexOf("*");
	var inx9   = str.indexOf("(");
	var inx10  = str.indexOf("?");
	var inx11  = str.indexOf(")");

	if ( (inx != -1 ) || (inx1 != -1 ) || (inx2 != -1 ) || (inx3 != -1 ) ||
			(inx4 != -1 ) || (inx5 != -1 ) || (inx6 != -1 ) || (inx7 != -1 ) ||
			(inx8 != -1 ) || (inx9 != -1 ) || (inx10 != -1 ) || (inx11 != -1 ) ) {
		return true ;
	}
	else {
		return false ;
	}
}


//---------------------------------------------------
//  기능   : Check Integer RETURN T/F
//---------------------------------------------------
function jf_isInteger(st) {
	if (!jf_isEmpty(st)) {
		for (j=0; j<st.length; j++) {
			if (((st.substring(j, j+1) < "0") || (st.substring(j, j+1) > "9")))
					return false;
		}
	}
	else {
			return false ;
	}
  return true ;
}

//---------------------------------------------------
//  기능   : Check Number RETURN T/F
//---------------------------------------------------
function jf_isDigit(st) {
	st = st.replace(".", "");
	st = jf_Trim(st);
	if (!jf_isEmpty(st)) {
		for (j=0; j<st.length; j++) {
			if ( (st.charAt(j) < "0") || (st.charAt(j) > "9") )
				return false;
		}
	}
	else {
		return false ;
	}
	return true ;
}


//---------------------------------------------------
//  기능   : Check Integer RETURN T/F , Msg
//---------------------------------------------------
function jf_isIntegerRtnMsg(obj, msg, len) {
	var st = jf_Trim(obj.value);
	if (!jf_isEmpty(st)) {
		for (j=0; j<st.length; j++)	{
			if (((st.substring(j, j+1) < "0")||(st.substring(j, j+1)>"9")))	{
				alert( msg +" 숫자로 입력하십시오.");
				obj.focus();
				obj.select();
				return false;
			}
		}
	}
	else {
		alert( msg +" 입력하십시오.");
		obj.focus();
		obj.select();
		return false ;
	}

	if ( len != null ) {
		if ( jf_strLeng(st) != len ) {
			alert( msg +" " +len+"자로 입력하십시오.");
			obj.focus();
			obj.select();
			return false ;
		}
	}

	return true ;
}


//---------------------------------------------------
//  기능   : Check Integer RETURN T/F , Msg
//---------------------------------------------------
function jf_isIntegerRtnMsg1(obj, msg, slen, elen) {
	var st = jf_Trim(obj.value);
	if (!jf_isEmpty(st)) {
		for (j=0; j<st.length; j++)	{
			if (((st.substring(j, j+1) < "0")||(st.substring(j, j+1)>"9")))	{
				alert( msg +" 숫자로 입력하십시오.");
				obj.focus();
				obj.select();
				return false;
			}
		}
	}
  else {
		alert( msg +" 입력하십시오.");
		obj.focus();
		obj.select();
		return false ;
  }
  if ( elen != null ) {
		if ( jf_strLeng(st) < slen || jf_strLeng(st)> elen ) {
			alert( msg +" " +slen+" ~ "+elen+"자로 입력하십시오.");
			obj.focus();
			obj.select();
			return false ;
		}
  }
  return true ;
}

//---------------------------------------------------
//  기능   : Check Letter RETURN T/F
//---------------------------------------------------
function jf_isLetter(inputValue) {
	inputValue = jf_Trim(inputValue);
	inputValue = inputValue.toUpperCase();

	for (var i=0; i<inputValue.length; i++)
		if ((inputValue.charAt(i) < "A") || (inputValue.charAt(i) > "Z"))
			return false;

	return true;
}

//---------------------------------------------------
//  기능   : Check Alphanumeric RETURN T/F
//---------------------------------------------------
function jf_isAlphanumeric(inputValue) {
	inputValue = jf_Trim(inputValue);
	inputValue = inputValue.toUpperCase();

	if (jf_isEmpty(inputValue))
		return false;

	for (i=0; i<inputValue.length; i++)	{
		if (((inputValue.charAt(i) < "A") || (inputValue.charAt(i) > "Z")) && ((inputValue.charAt(i) < "0") || (inputValue.charAt(i) > "9")))
			return false;
	}
 return true;
}

//============================================
// Select Option Check
//                    - return checked value
//============================================
function jf_seletboxCheck ( sb ) {
	var SelectValue = null ;

	for ( var i=0 ; i < sb.length  ; i++)	{
		if ( sb.options[i].selected == true )	{
			if ( sb.options[i].value != "" ) {
				SelectValue = sb.options[i].value ;
				break;
			}
		}
	}
	return SelectValue  ;
}

//================================
// PASSWORD 구성 Check
//================================

function jf_pswdCheck(obj1, obj2) {
  var str = obj1.value;

	if (jf_strLeng(obj1.value) < 4){
		alert("비밀번호는 4자 이상으로 입력하십시오");
		obj1.focus();
		obj1.select();
		return false;
	}

	for (i=0 ; i<str.length; i++){
		if (((str.charAt(i) >= "ㅏ") && (str.charAt(i) <= "히")) || ((str.charAt(i) >="ㄱ") && (str.charAt(i) <="ㅎ")))	{
			alert("\n비밀번호에 한글 입력하실 수 없습니다.");
			obj1.select();
			obj1.focus();
			return false;
		}
	}

	if ( obj2.value == "" ){
	alert("비밀번호 확인을 위하여 비밀번호를 다시 입력하십시오.");
			obj2.focus();
			obj2.select();
			return false;
	}
	if ( obj1.value != obj2.value ){
			alert("비밀번호와 비밀번호 확인이 다릅니다.비밀번호를 확인후 다시 입력하십시오.");
			obj2.focus();
			obj2.select();
			return false;
	}
	return true ;
}

function jf_pswdCheck1(obj1, obj2) {
  var str = obj1.value;

	if (jf_strLeng(obj1.value) < 4){
		alert("Must enter more than 4 letters.");
		obj1.focus();
		obj1.select();
		return false;
	}

	for (i=0 ; i<str.length; i++){
		if (((str.charAt(i) >= "ㅏ") && (str.charAt(i) <= "히")) || ((str.charAt(i) >="ㄱ") && (str.charAt(i) <="ㅎ")))	{
			alert("\nError");
			obj1.select();
			obj1.focus();
			return false;
		}
	}

	if ( obj2.value == "" ){
	alert("Error");
			obj2.focus();
			obj2.select();
			return false;
	}
	if ( obj1.value != obj2.value ){
			alert("Error");
			obj2.focus();
			obj2.select();
			return false;
	}
	return true ;
}

function jf_date() {
  var aaa = new Date(2000, 3, 20, 10, 10, 86400);
  alert(aaa.getDate()+"/"+aaa.getMonth()+"/"+(aaa.getFullYear())+"/ hour"+aaa.getHours() + " / Minutes " + aaa.getMinutes());

  var aaaa = "12345678901234567";
  alert(parseFloat(aaaa));
}


//================================
// 주민번호 구성 Check
//================================
function jf_juminCheck(obj1, obj2) {
	str1 = obj1.value ;
	str2 = obj2.value ;

	var v_yy = "";

	if ((str2.substring(0,1) == "1" ) || (str2.substring(0,1) == "2" ) ) {
			v_yy = "19" ;
	}
	else if ((str2.substring(0,1) == "3" ) || (str2.substring(0,1) == "4" ) ) {
			v_yy = "20" ;
	}
	else if ((str2.substring(0,1) == "0" ) || (str2.substring(0,1) == "9" ) )	{
			v_yy = "18" ;
	}

	li_value = new Array(13);

	var li_lastid,li_mod,li_minus,li_last;

	if(!jf_checkDate(v_yy+str1)) {
			alert("\n주민번호 앞자리가 잘못입력되었습니다");
			obj1.select();
			obj1.focus();
			return false;
	}

	if(str2.length != 7 )	{
			alert("\n주민번호 뒷자리를 7자리로 입력하십시오.");
			obj2.select();
			obj2.focus();
			return false;
	}

	if (jf_isInteger(str1) && jf_isInteger(str2))	{
			li_lastid    = parseFloat(str2.substring(6,7));
			li_value[0]  = parseFloat(str1.substring(0,1))  * 2;
			li_value[1]  = parseFloat(str1.substring(1,2))  * 3;
			li_value[2]  = parseFloat(str1.substring(2,3))  * 4;
			li_value[3]  = parseFloat(str1.substring(3,4))  * 5;
			li_value[4]  = parseFloat(str1.substring(4,5))  * 6;
			li_value[5]  = parseFloat(str1.substring(5,6))  * 7;
			li_value[6]  = parseFloat(str2.substring(0,1))  * 8;
			li_value[7]  = parseFloat(str2.substring(1,2))  * 9;
			li_value[8]  = parseFloat(str2.substring(2,3))  * 2;
			li_value[9]  = parseFloat(str2.substring(3,4))  * 3;
			li_value[10] = parseFloat(str2.substring(4,5))  * 4;
			li_value[11] = parseFloat(str2.substring(5,6))  * 5;
			li_value[12] = 0;

			for (var i = 0; i<12;i++)
					li_value[12] = li_value[12] + li_value[i];

			li_mod      = li_value[12] %11;
			li_minus    = 11 - li_mod;
			li_last     = li_minus % 10;

			if (li_last != li_lastid)	{
					alert("\n주민번호가 잘못입력되었습니다.");
					obj2.select();
					obj2.focus();
					return false;
			 }
			 else
					return true;
	 }
	 else {
			alert("\n주민번호가 잘못입력되었습니다.");
			obj2.select();
			obj2.focus();
			return false;
	 }
}
//========================================
// tab order (field 자동 이동)
//========================================
function js_tab_order(arg,nextname,len) {
	if (arg.value.length==len)  {
		nextname.focus() ;
		return;
	}
}

function jf_isValidEmail(obj){
	valid = false;
	val   = obj.value;

	// space within email?
	if (val.indexOf(" ") != -1)
		alert("Email주소에 공백은 허용되지 않습니다.!");
	else if (val.indexOf("@") < 1)
		alert("Email주소 지정이 잘못되었습니다. '@'이 누락되었습니다.");
	else if (val.indexOf(".") == -1)
		alert("Email주소 지정이 잘못되었습니다. '.'이 누락되었습니다.");
	else if (val.indexOf(".") - val.indexOf("@") == 1)
		alert("Email주소 지정이 잘못되었습니다. '@' 다음에 바로 '.'이 올 수 없습니다.");
	else if (val.charAt(val.length-1) == '.')
		alert("Email주소 지정이 잘못되었습니다. '.'은 Email주소 끝에 올 수 없습니다.");
	else
		valid = true;

	if (valid == false){
		obj.focus();
		obj.select();
	}

	return valid;
}

function	jf_isValidEmail2(obj) {
  email = obj.value;
  var pattern = /^(.+)@(.+)$/;
  var atom = "\[^\\s\\(\\)<>#@,;:!\\\\\\\"\\.\\[\\]\]+";
  var word="(" + atom + "|(\"[^\"]*\"))";
  var user_pattern = new RegExp("^" + word + "(\\." + word + ")*$");
  var ip_pattern = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
  var domain_pattern = new RegExp("^" + atom + "(\\." + atom +")*$");

  var arr = email.match(pattern);
  if (!arr){
		obj.focus();
		obj.select();
	  alert("Email address seems incorrect (check @ and .'s)");
		return false;
	}
  if (!arr[1].match(user_pattern)){
		obj.focus();
		obj.select();
		alert("The username doesn't seem to be valid.");
		return false;
	}

  var ip = arr[2].match(ip_pattern);
  if (ip) {
	  for (var i=1; i<5; i++)
			if (ip[i] > 255) {
				obj.focus();
				obj.select();
				alert("Destination IP address is invalid!");
				return false;
			}
  }
  else {
	  if (!arr[2].match(domain_pattern)) {
			obj.focus();
			obj.select();
			alert("The domain name doesn't seem to be valid.");
			return false;
		}
	  var domain = arr[2].match(new RegExp(atom,"g"));
	  if (domain.length<2){
			obj.focus();
			obj.select();
			alert("This address is missing a hostname!");
			return false;
		}
	  if (domain[domain.length-1].length<2 || domain[domain.length-1].length>3){
 			 obj.focus();
			 obj.select();
			 alert("The address must end in a three-letter domain, or two letter country.");
			 return false;
		}
  }
  return true;
}

function jf_typeCheck(obj, cmt, astr, lmin, lmax) {
	var i;
	var t = obj.value;

	if (t.length < lmin || t.length > lmax)	{
		if (lmin == lmax)
			alert(cmt + '는 ' + lmin + ' 자 이어야 합니다');
		else
			alert(cmt + '는 ' + lmin + ' ~ ' + lmax + ' 자 이내로 입력하셔야 합니다');

		obj.focus();
		obj.select();
		return true;
	}

	if (astr.length > 1) {
		for (i=0; i<t.length; i++) {
			if(astr.indexOf(t.substring(i,i+1))<0) {
				alert(cmt + '에 허용할 수 없는 문자가 입력되었습니다');
				obj.focus();
				return true;
			}
		}
	}

	return false;
}

// 숫자인지를 체크
function jf_isNumber(val, allowable) {
	valid = true;
	cmp = "0123456789" + allowable;
	for (i=0; i<val.length; i++) {
		if (cmp.indexOf(val.charAt(i)) < 0)	{
			valid = false;
			break;
		}
	}
	return valid;
}

// 전화번호인지 체크
function jf_isPhoneNumber(val) {
	var number = "0123456789";
	var dash = '-';
	var numberCnt = 0;
	var dashCnt = 0;
	
	for (var i = 0; i < val.length; i++) {
		if (number.indexOf(val.charAt(i)) >= 0)
			numberCnt++;
		if (dash.indexOf(val.charAt(i)) >= 0)
			dashCnt++;
	}
	
	if (numberCnt >= 8 && dashCnt >= 1)
		return true;
	
	return false;
}

// 한글인지를 체크
function jf_isHangul(str) {
	var re = /[a-zA-Z0-9\s~!@#\$%\^&\*\(\)_\+\{\}|:"<>\?`\-=\[\]\\;',\.\/]/;
	if (re.test(str))
		return false;

	return true;
}

function jf_checkLength(obj, min, max, nullable) {
	if (!nullable) {
		len = obj.value.length;

		if (len < min || len > max)
			return false;
	}
	return true;
}

function jf_checkUserName(obj) {
	if (!jf_checkLength(obj, 2, 10, false))	{
		alert("이름이 등록되지 않았거나 유효한 이름이 아닙니다.");
		obj.focus();
		obj.select();
		return false;
	}
	else {
		if (!jf_isHangul(obj.value)) {
			alert("이름을 공백 없이 한글로 써 주세요.");
			obj.focus();
			obj.select();
			return false;
		}
	}
	return true;
}


function jf_isUserName(obj) {
	if (!jf_checkLength(obj, 2, 10, false))	{
		obj.focus();
		obj.select();
		return false;
	}
	else {
		if (!jf_isHangul(obj.value)) {
			obj.focus();
			obj.select();
			return false;
		}
	}
	return true;
}

function jf_getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1) endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}



function jf_getCookie (name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {	//while open
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			 return jf_getCookieVal (j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}	//while close
	return null;
}

// 시간은 분단위
function jf_setCookieVal (name, value, time) {
	pathname = location.pathname;
	var ExpDate = new Date();
  var myDomain = pathname.substring(0, pathname.lastIndexOf('/')) +'/';

	// 이렇게 쓸수도 있다.
  var myDomain = '/';

  ExpDate.setTime(ExpDate.getTime() + 1000*60* time);
  jf_setCookie(name, value, ExpDate, myDomain);
}

function jf_setCookie (name, value) {
	var argv = jf_setCookie.arguments;
	var argc = jf_setCookie.arguments.length;
	var expires = (2 < argc) ? argv[2] : null;
	var path = (3 < argc) ? argv[3] : null;
	var domain = (4 < argc) ? argv[4] : null;
	var secure = (5 < argc) ? argv[5] : false;
	document.cookie = name + "=" + escape (value) +
		((expires == null) ? "" :
			 ("; expires=" + expires.toGMTString())) +
		((path == null) ? "" : ("; path=" + path)) +
		((domain == null) ? "" : ("; domain=" + domain)) +
		((secure == true) ? "; secure" : "");
}
// 블라우저 인스턴스 쿠기 남김
function jf_setCookieInstacne(name, value, path){
	document.cookie = name + "=" + value + "; path="+path+";" ;
}

// 배열인지 아닌지
function jf_isArry(arry){
	if (arry.length == null){
		return false;
	}
	else{
		return true;
	}
}

// 문자열 크기를 초가 했는지..
function jf_isSizeOver(val, maxSize){
	if (jf_strLeng(val) > maxSize){
		return true;
	}
	return false;
}

// 문자열 크기를 초가 했는지..
function jf_isSizeOverMsg(fm, maxSize, msg){
	if (jf_strLeng(fm.value) > maxSize){
		jf_select(fm);
		alert(msg);
		return true;
	}
	return false;
}


//그림 사이즈 고정
function jf_imageSizeFix(objImg, limX, limY) {
	var x;
	var y;

	x = objImg.width;
	y = objImg.height;

	// 가로를 중심으로 맞춘다.
	if (x * limX > y * limY){
		if (objImg.width > limX){
			objImg.width = limX
		}
	}
	// 세로를 중심으로 맞춘다.
	else{
		if (objImg.height > limY){
			objImg.height = limY
		}
	}
}
// 딱 보면 알지요. 무슨 역활인지
function jf_select(obj){
	obj.focus();
	obj.select();
}

// 경고 메세지도 같이
function jf_selectMsg(obj,msg){
	obj.focus();
	obj.select();
	alert(msg);
}

// 팝업창 뛰우기 : DEPRECATED
// 기존 페이지들을 위하여 남겨둠
function jf_openWindow(url, name, resize, scroll, width, height, left, top, isCenter) {
  if (isCenter)
    jf_popupWindowCenter(url, name, width, height, resize, scroll, 0);
  else
    jf_popupWindowEx(url, name, width, height, left, top, resize, scroll, 0);
}

// 팝업창 뛰우기 팝업창 객체를 리턴 값으로 전달 : DEPRECATED
// 게존 페이지들을 위하여 남겨둠
function jf_openWindowRtn(url, name, resize, scroll, width, height, left, top, isCenter) {
  return jf_popupWindowEx(url, name, width, height, left, top, resize, scroll, 0);
}

// 기본적인 크기와 위치 정보만으로 팝업창 띄우기
function jf_popupWindow(url, name, width, height, left, top) {
  return jf_popupWindowEx(url, name, width, height, left, top, 0, 0, 0);
}

// 창의 크기와 위치정보, 옵션들을 반영하여 팝업창 띄우기
function jf_popupWindowEx(url, name, width, height, left, top, isResizable, isScrollable, useStatus) {
  var optArray = new Array();
  var idx = 0;
  if (width)        optArray[idx++] = "width=" + width;
  if (height)       optArray[idx++] = "height=" + height;
  if (left)         optArray[idx++] = "left=" + left;
  if (top)          optArray[idx++] = "top=" + top;
  if (isResizable)  optArray[idx++] = "resizable=" + isResizable;
  if (isScrollable) optArray[idx++] = "scrollbars=" + isScrollable;
  if (useStatus)    optArray[idx++] = "status=" + useStatus;

  var opts = "";
  for (idx = 0; idx < optArray.length; idx++) {
    if (idx > 0)
      opts += ",";
    opts += optArray[idx];
  }

  return window.open(url, name, opts);
}

// 화면 중앙에 팝업창 띄우기
function jf_popupWindowCenter(url, name, width, height, isResizable, isScrollable, useStatus) {
  var x = (screen.availWidth / 2) - (width / 2);
  if (x < 0) x = 0;
  var y = (screen.availHeight / 2) - (height / 2);
  if (y < 0) y = 0;
  return jf_popupWindowEx(url, name, width, height, x, y, isResizable, isScrollable, useStatus);
}

// 입력한 날짜에서 현제 날짜의 차이를 구한다.
// 현제날짜 2003-08-22
// 입력한날짜 2003-08-20
// 결가값	2
function jf_diffDay(in_date, df_date){
	var s 	= in_date.split('-');
	input_d = new Date(s[0], s[1] - 1, s[2]);
	if (df_date == null){
		now_d  	= new Date();
		// 시간을 없에 버린 날짜만
		now_d	= new Date(now_d.getYear(), now_d.getMonth(), now_d.getDate());
	}
	else{
		s 	= df_date.split('-');
		now_d = new Date(s[0], s[1] - 1, s[2]);
	}
	input_s = input_d.getTime();

	dff_day	= (input_s - now_d.getTime()) / (1000*60*60*24);

	return dff_day;
}

// 숫자에 콤마가 들어가 문자열로 표현
function jf_comma(x) {
	var txtNumber = '' + x;
  if (isNaN(txtNumber) || txtNumber == "") {
      return '';
  }
	else {
    var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
    var arrNumber = txtNumber.split('.');
    arrNumber[0] += '.';

    do {
    	arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
    } while (rxSplit.test(arrNumber[0]));

    if (arrNumber.length > 1) {
    	return arrNumber.join('');
    }
    else {
    	return arrNumber[0].split('.')[0];
	  }
 	}
}
// 파일 확장자 체크 .(쩜)포함
function jf_getExt(val) {
	val = val.slice(val.lastIndexOf("\\") + 1);
	ext = val.slice(val.lastIndexOf(".")).toLowerCase();
	return ext;
}

// 체크박스 전체 선택 해제
function jf_checkboxAll(ck, target, desable) {

	var val = false;
	var i;

	if (ck == null)
		return;

	if(ck.checked) {
		val = true;
	}
	else {
		val = false;
	}


	if (target == null)
		return;

	if(target.length== null) {

		target.checked = val;
	}else {
		for(i=0;i<target.length;i++){

			target[i].checked = val;
			if(val == true & desable != null){
				target[i].disabled = true;
			}
			else{
				target[i].disabled = false;
			}
		}
	}
}

// 체크박스 전체 선택 해제
function jf_checkboxAllRange(ck, target, start, end, desable) {
	var val = false;
	var i;

	if (ck == null)
		return;

	if(ck.checked) {
		val = true;
	}
	else {
		val = false;
	}

	if (target == null)
		return;

	for(i=start;i<=end;i++){
		target[i].checked = val;
		if(val == true && desable != null && desable){
			target[i].disabled = true;
		}
		else{
			target[i].disabled = false;
		}
	}
}

// 문자열 변경
function jf_replace( str, old_s, new_s ) {
	str.split(old_s).join(new_s);
	return str;
}

// 아무런 액션을 주고 싶지 않을때 사용
// ex) <a href="javascript:jf_void()">~~~~</a>
function jf_void(){
}

//한글인지 체크
function jf_chkKorea(str) {
	for (i=0 ; i<str.length; i++){
		if (((str.charAt(i) >= "ㅏ") && (str.charAt(i) <= "히")) || ((str.charAt(i) >="ㄱ") && (str.charAt(i) <="ㅎ")))	{
			return false;
		}
	}
}

// 오브제 객체 리턴
// 배열 형태면 안먹힌다. deprecated
// document.all[objectId]의 대체 방법
function jf_getObject(objectId) {
	// checkW3C DOM, then MSIE 4, then NN 4.
	//
	if(document.getElementById && document.getElementById(objectId)) {
		return document.getElementById(objectId);
	}
	else if (document.all && document.all(objectId)) {
		return document.all(objectId);
	}
	else if (document.layers && document.layers[objectId]) {
		return document.layers[objectId];
	} else {
		return false;
	}
}

// URL 체크
// todo 정규식으로 체크 해야됨
function jf_isURL(field, msg){
	if (jf_isEmptyRtnMsg(field, msg) )
		return false;
	return true;
}


// IP 체크
function jf_isIP(field, msg){
	if (jf_isEmptyRtnMsg(field, msg) )
		return false;
	return true;
}

// 다중셀렉트 박스에서 값 이동
function jf_selectBoxMove(fbox, tbox, sortitems) {
	for(var i=0; i<fbox.options.length; i++) {
		if(fbox.options[i].selected && fbox.options[i].value != "") {
			var no = new Option();
			no.value = fbox.options[i].value;
			no.text = fbox.options[i].text;
			tbox.options[tbox.options.length] = no;
			fbox.options[i].value = "";
			fbox.options[i].text = "";
   		}
	}
	jf_selectBoxBumpUp(fbox);
	if (sortitems) jf_selectBoxSortD(tbox);
}

// 내용없는 항목 지우기
function jf_selectBoxBumpUp(box)  {
	for(var i=0; i<box.options.length; i++) {
		if(box.options[i].value == "")  {
			for(var j=i; j<box.options.length-1; j++)  {
				box.options[j].value = box.options[j+1].value;
				box.options[j].text = box.options[j+1].text;
			}
			var ln = i;
			break;
		}
	}
	if(ln < box.options.length)  {
		box.options.length -= 1;
		jf_selectBoxBumpUp(box);
   }
}

// 선택된 항목 지우기
function jf_selectRemvoe(box)  {
	for(var i=0; i<box.options.length; i++) {
		if(box.options[i].selected)  {
			box.options[i].value = "";
			box.options[i].text = "";
		}
	}
	jf_selectBoxBumpUp(box);
}


// 셀렉트 박스 내용 정렬
function jf_selectBoxSortD(box)  {
	var temp_opts = new Array();
	var temp = new Object();
	for(var i=0; i<box.options.length; i++)  {
		temp_opts[i] = box.options[i];
	}
	for(var x=0; x<temp_opts.length-1; x++)  {
		for(var y=(x+1); y<temp_opts.length; y++)  {
			if(temp_opts[x].text > temp_opts[y].text)  {
				temp = temp_opts[x].text;
				temp_opts[x].text = temp_opts[y].text;
				temp_opts[y].text = temp;
      		}
   		}
	}
	for(var i=0; i<box.options.length; i++)  {
		box.options[i].value = temp_opts[i].value;
		box.options[i].text = temp_opts[i].text;
   }
}

// 셀렉트 박스 모두 선택
function jf_selectAll(box)  {
	for(var i=0; i<box.options.length; i++) {
		box.options[i].selected = true;
	}
}

// 셀렉트 박스 항목 선택 해제
function jf_selectAllDe(box)  {
	for(var i=0; i<box.options.length; i++) {
		box.options[i].selected = false;
	}
}

// YYYY-MM-DD로 포맷된 날짜 리턴
function jf_getDate(dd){
	var now
	if(dd==null)
		now = new Date();
	else
		now = dd;

	var nowYear = jf_LPadChar(now.getFullYear().toString(), 4, "0") ;
	var nowMonth = jf_LPadChar((now.getMonth()+1).toString(), 2, "0") ;
	var nowDay = jf_LPadChar(now.getDate().toString(), 2, "0") ;
	d = nowYear + "-" + nowMonth + "-" + nowDay;

	return d;
}

// 셀렉트 박스 체크 여부
function jf_isChoicedSelectBox(sb, msg){
	for(var i=0; i<sb.options.length; i++) {
		if(sb.options[i].selected){
			if(sb.options[i].value == ""){
				alert(msg);
				sb.focus();
				return false;
			}
			else{
				return true;
			}
		}
	}
	return true;
}

// 라디오버튼 체크여부
function jf_isChoicedRadio(rb, msg){

	// 객체 아님
	if(rb == null){
		return false;
	}

	// 배여 아님
	if (rb.length == null){
		if(rb.checked){
			return true;
		}
		else{
			alert(msg);
			rb.focus();
			return false;
		}
	}

	var ck = false;

	// 배열이면
	var i;

	for(i=0; i<rb.length; i++) {
		if(rb[i].checked){
			ck = true;
		}
	}
	if(ck){
		return true;
	}
	else{
		alert(msg);
		rb[0].focus();
		return false;
	}
}

// obj객체 값이 len 이상인지 체크
function jf_isLengOverRtnMsg(obj, len) {
	if (jf_strLeng(obj.value) > len) {
		alert("한글 "+len/2+",영문 "+len+"자 이내로 입력하십시오.");
		obj.focus();
		obj.select();
		return true ;
	}
	else {
		return false ;
	}
}
// 레이어 표시 토글
function jf_layerToggle(obj, disableLayer){
	if (obj.style.display != "none")
		obj.style.display = "none"
	else
		obj.style.display = ""

	// 표시 안하는 레이어
	if(disableLayer != null){
		disableLayer.style.display = "none"
	}
}

// select 박스 선택된 값 리턴
function jf_selectValue(obj){
	for(var i=0; i<obj.options.length; i++) {
		if(obj.options[i].selected) {
			return obj.options[i].value;
 		}
	}

	return "";
}

function jf_numberInput(allowable){
	if (event.keyCode < 45 || event.keyCode > 57)
		event.returnValue = false;
}

// f폼 필드가 size만큼 되었을 nextFocus로 포커스를 이동한다.
// 이런식으로 사용하면 됨 onKeyup="jf_nextFocus(6, this, frm1.tb_Jumin2)"
function jf_nextFocus(size, f, nextFocus){
	if(f.value.length == size){
		nextFocus.focus();
	}
}

// byte 단위로 문자열 자르기
function jf_cutAbsStr(str, len) {
	var s = "";
	if (len > 0) {
		var cnt = 0;
		for (var i=0; i < str.length; i++) {
			var amt = (str.charCodeAt(i) > 255) ? 2 : 1;
			if (cnt + amt > len) {
				s = jf_Trim(s) + '...';
				break;
			}
		  s += str.charAt(i);
			cnt += amt;
		}
	}
	return s;
}

/**
 * SIGNATURE : void jf_swapImage(String imgID, String src);
 *
 * PARAM/imgID : 'id' attribute of an image tag
 * PARAM/src   : image source path
 * RETURN : N/A (Not available)
 *
 * AUTHOR : Kihun Kwon(anchor@idq.co.kr)
 */
function jf_swapImage(imgID, src) {
	document.images[imgID].src = src;
}

/**
 * SIGNATURE : void jf_dumpObject(Object obj);
 *
 * PARAM/obj :
 * RETURN : N/A
 *
 * AUTHOR : Kihun Kwon(anchor@idq.co.kr)
 */
function jf_dumpObject(obj) {
  var text = "";
  var cnt=0;
  for (var item in obj) {
    text += item + ((cnt%5==4) ? "\r\n" : ", ");
    cnt++;
  }
  alert(text);
}

// obj.value 값이 ckValue이면 obj.value 내용을 삭제한다.
// 아이디/비밀번호 입력폼 등에서 많이 사용할 수 있다.
// ex) <input name="tb_MemberIDPK" type="text" class="input" tabindex="1" value="아이디" onfocus="jf_valueClear(this, '아이디')">
function jf_valueClear(obj, ckValue){
	if(obj.value == ckValue){
		obj.value = "";
	}
}

/**
 * SIGNATURE : void jf_dumpObjectAsHTML(Object obj);
 *
 * PARAM/obj : 덤프할 객체
 * RETURN : N/A
 *
 * AUTHOR : Kihun Kwon(anchor@idq.co.kr)
 */
var __STR_FNBODY__pvfn_dumpObjectAsHTML = ""
  + "if (obj == null) {\r\n"
  + "    alert(\"덤프하려는 객체가 null입니다.\\r\\n덤프할 수 없습니다.\");\r\n"
  + "    return ;\r\n"
  + "  }\r\n"
  + "  \r\n"
  + "  var winName = \"JFDumpObjectAsHTML_\" + Math.floor(Math.random() * 1234567890);\r\n"
  + "  var win = window.open(\"\", winName, \"width=700,height=600,resizable=1,scrollbars=1\");\r\n"
  + "  var doc = win.document;\r\n"
  + "  var style = \"\";\r\n"
  + "  \r\n"
  + "  win.pvobj_heldDumpObject = obj;\r\n"
  + "  win.pvstr_FNBODY__pvfn_dumpAsHTML = window.pvstr_FNBODY__pvfn_dumpAsHTML;\r\n"
  + "  win.pvfn_dumpAsHTML = new Function(\"obj\", window.pvstr_FNBODY__pvfn_dumpAsHTML);\r\n"
  + "  win.pvfn_dumpChild = function(nodeName) {\r\n"
  + "    this.pvfn_dumpAsHTML(this.pvobj_heldDumpObject[nodeName]);\r\n"
  + "  };\r\n"
  + "\r\n"
  + "  doc.open();\r\n"
  + "  doc.write(\"<html><head><title>객체 덤프 : \" + obj + \"</title>\\r\\n\");\r\n"
  + "  doc.write(\"<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />\");\r\n"
  + "  \r\n"
  + "  style = \"TD.ObjName { font-family:Courier New; font-size:11pt;\"\r\n"
  + "        + \"  font-weight:bold; background-color:#f0f0f0; }\\r\\n\"\r\n"
  + "        + \"TD.ObjValue { font-family:Courier New; font-size:9pt; }\\r\\n\"\r\n"
  + "        + \"TH { font-family:Courier New; font-size:12pt; \"\r\n"
  + "        + \"  background-color:#e0e0e0; padding-left:5px; }\";\r\n"
  + "  doc.write(\"<style type='text/css'>\" + style + \"</style>\\r\\n\");\r\n"
  + "  doc.write(\"</head>\\r\\n\");\r\n"
  + "  \r\n"
  + "  doc.write(\"<body bgcolor='white'>\\r\\n\");\r\n"
  + "  style = \"font-size:16pt; font-weight:bold; text-align:center; \"\r\n"
  + "        + \"background-color:#f0f0f0; padding:5px;\";\r\n"
  + "  doc.write(\"<div style='\" + style + \"'>객체 덤프 : \" + obj + \"</div>\\r\\n\");\r\n"
  + "  \r\n"
  + "  doc.write(\"<table border='1' cellpadding='3' cellspacing='0' width='100%'>\\r\\n\");\r\n"
  + "  doc.write(\"  <tr><th width='3%'>No.</th>\\r\\n\");\r\n"
  + "  doc.write(\"    <th width='15%'>구성원</th><th width='82%'>값</th></tr>\\r\\n\");\r\n"
  + "  \r\n"
  + "  var i = 0;\r\n"
  + "  var val = '';\r\n"
  + "  var strItem = '';\r\n"
  + "  for (var item in obj) {\r\n"
  + "    strItem = '' + item;\r\n"
  + "    val = '' + obj[strItem];\r\n"
  + "    if (val == '') {\r\n"
  + "      val = '&nbsp;';\r\n"
  + "    }\r\n"
  + "    else {\r\n"
  + "        if (val.length > 300) {\r\n"
  + "          val = val.substring(0, 300) + \" ...\";\r\n"
  + "        }\r\n"
  + "        var idx = 0;\r\n"
  + "        while ((idx = val.indexOf(\"<\", idx)) != -1) {\r\n"
  + "          val = val.replace(\"<\", \"&lt;\");\r\n"
  + "        }\r\n"
  + "        idx = 0;\r\n"
  + "        while ((idx = val.indexOf(\">\", idx)) != -1) {\r\n"
  + "          val = val.replace(\">\", \"&gt;\");\r\n"
  + "        }\r\n"
  + "    }\r\n"
  + "    if (val.substring(0, 7) == \"[object\") {\r\n"
  + "      val = \"<a href=\\\"javascript:window.pvfn_dumpChild('\" + strItem\r\n"
  + "             + \"');\\\">\" + val + \"</a>\";\r\n"
  + "    }\r\n"
  + "    var text = \"  <tr>\\r\\n\"\r\n"
  + "      + \"    <td align='center'>\" + i + \"</td>\\r\\n\"\r\n"
  + "      + \"    <td nowrap class='ObjName'>\" + strItem + \"</td>\\r\\n\"\r\n"
  + "      + \"    <td class='ObjValue'>\" + val + \"</td>\\r\\n\"\r\n"
  + "      + \"  </tr>\\r\\n\";\r\n"
  + "    doc.write(text);\r\n"
  + "    i++;\r\n"
  + "  }\r\n"
  + "  doc.write(\"  <tr bgcolor='#e0e0e0'>\\r\\n\");\r\n"
  + "  doc.write(\"    <th colspan='3' style='text-align:right'>\\r\\n\");\r\n"
  + "  doc.write(\"      총 \" + i + \"개 구성원\\r\\n\");\r\n"
  + "  doc.write(\"    </th>\\r\\n\");\r\n"
  + "  doc.write(\"  </tr>\\r\\n\");\r\n"
  + "  doc.write(\"</table>\\r\\n\");\r\n"
  + "  \r\n"
  + "  doc.write(\"<p align='right'>\\r\\n\");\r\n"
  + "  doc.write(\"  <a href='javascript:window.close();'>[닫기]</a>\\r\\n\");\r\n"
  + "  doc.write(\"</p>\\r\\n\");\r\n"
  + "  doc.write(\"</body></html>\");\r\n"
  + "  \r\n"
  + "  doc.close();\r\n"
  + "  win.focus();\r\n"
  ;
function jf_dumpObjectAsHTML(obj) {
  if (!window.pvstr_FNBODY__jf_dumpAsHTML)
    window.pvstr_FNBODY__pvfn_dumpAsHTML = __STR_FNBODY__pvfn_dumpObjectAsHTML;
  if (!window.pvfn_dumpAsHTML) {
    window.pvfn_dumpAsHTML = new Function("obj", __STR_FNBODY__pvfn_dumpObjectAsHTML);
  }
  window.pvfn_dumpAsHTML(obj);
}

// 페이지 주소에 따라 새로운 윈도우 창을 띄울 것인지 현재 페이지로 이동할 것인지 판다
// select 메뉴에서 많이들 사용.
// 주소에 http:// 문자열이 있으면 새창으로 띄움
// ex) <select name="select" style="width:150px" class="input" onChange="if (this.value!=''){jf_pageMove(this.value)}">
function jf_pageMove(va) {
	if (va.indexOf("http://") != -1 || va.indexOf("https://") != -1){
		window.open(va);
	}
	else{
		location.href=va;
	}
}

// 이미지 토클
function jf_imgToggle(iname, s1, s2){
	var obj;
	obj = document.all[iname];

	if (obj.src.indexOf(s1) != -1)
		obj.src = s2;
	else
		obj.src = s1;
}

// 모달로 창 띄우기
function jf_modalOpen( url, args, width, height )
{
	var env_options = "dialogHeight: " + height + "px; dialogWidth: " + width + "px;  edge: Raised; center: Yes; help: No; scroll: No; resizable: No; status: No;";
	// window.open(url) ;
    return window.showModalDialog( url, args, env_options);
}

// 모달로 창 띄우기
function jf_modalessOpen( url, args, width, height )
{
	var env_options = "dialogHeight: " + height + "px; dialogWidth: " + width + "px;  edge: Raised; center: Yes; unadorned: Yes ; help: No; scroll: No; resizable: No; status: No;";
	return window.showModelessDialog( url, args, env_options);
}

// 모달로 창 뛰우기
function jf_modalOpen_c( url, args, width, height, scroll, resizable, status )
{
	var env_options = "dialogHeight: " + height + "px; dialogWidth: " + width + "px;  edge: Raised; center: Yes; help: No; scroll: "+scroll+"; resizable: "+resizable+"; status: "+status+";";

//jf_openWindow(url, "aaaaa", resizable, scroll, width, height, 1, 1, 1);

 	return window.showModalDialog( url, args, env_options);
}

// 클립보드에 값 복사 하기
function jf_copyClipboard(text)
{
 alert("현재 주소를 복사하였습니다. Ctrl+V를 눌러서 사용할 수 있습니다.");
 window.clipboardData.setData('text', text);
}

// activeX를 동적으로 작성
var JF_OBJECT_TAG ="";
function jf_activeX(){
	document.write(JF_OBJECT_TAG);
	JF_OBJECT_TAG="";
}

// 실시간 글자수 체크
// 이벤트는 onkeyup로
// input : 입력객체
// maxSize : 글자 입력 사이즈 byte단위
// out: 출력객체, 파라미터 전달 안해됨 (<span id="blogInfoSize"></span> 이런식으로 사용하면 된다.)

// <textarea name="blogInfo" onkeyup="jf_inputLimitSize(this, 200, document.all.blogInfoSize);"></textarea>
function jf_inputLimitSize(input, maxSize, out)	{
	var str = input.value;
	var len = jf_strLeng(str);

	if (maxSize < len) {
	  alert("한글 " + (maxSize/2) +"자 이내, 영문 " + maxSize + "자 이내로 입력하세요.");
		input.value = jf_cutAbsStr(str, maxSize);
	}

	if(out != null)
  	out.innerHTML = jf_strLeng(input.value);
}

// 이미지 확장자를 가지면 true, 아니면  false
function jf_isImage(filename){
	var ext = jf_getExt(filename);
	ext = ext.toLowerCase();
	return (ext == ".gif" || ext == ".jpg" || ext == ".jpeg")
}

//기업인 실증인증 사업자번호 체크 스크립트
function jf_businessNumber(yy){
	var x = yy.split("-");
	var xx = x.join("");

  if(xx.length!=10){
  	return false;
  }

 	var sum = 0;
  var getlist = new Array(10);
  var chkvalue =new Array("1","3","7","1","3","7","1","3","5");
  var vencod = xx;
  for(var i=0; i<10; i++){
  	getlist[i] = vencod.substring(i, i+1);
  }
  for(var i=0; i<9; i++){
  	sum += getlist[i]*chkvalue[i];
  }

  sum = sum + parseInt((getlist[8]*5)/10);
  sidliy = sum % 10;
  sidchk = 0;
  if(sidliy != 0){
  	sidchk = 10 - sidliy;
  }
  else{
	 	sidchk = 0;
  }

  if(sidchk != getlist[9]){
    return false;
  }
  else{
    return true;
  }
}


/**
 * SIGNATURE : void jf_setFontSize(Object obj);
 *
 * PARAM/obj :
 * OPTION : magnify:크게보기, reduce:작게보기, restore:원래크기
 * RETURN : N/A
 *
 * AUTHOR : seon-jue(gpearl1004@idq.co.kr)
 * Notice : Only working Internet Explorer..
 */
function jf_setFontSize(param,id) {
	var defaultFontSize = 1;//em
	var minFontSize = 1;//em
	var maxFontSize = 2;//em
	obj = document.getElementById(id);

	switch (param) {
		case "magnify" :		// 크게보기
			a = 1;
			break;
		case "reduce" :			// 작게보기
			a = -1;
			break;
		case "restore" :		// 원래대로
			a = 0;
			break;
		case "initial" :
			break;
		default :						// 불법접근
			alert("불법적인 접근입니다.");
			break;
	}

	var objFontSize = obj.style.fontSize;

	if (!objFontSize) { 
		objFontSize = parseFloat(defaultFontSize)+"em"; 
	}
	
	if (a==0) {
		var checkFontSize = parseFloat(defaultFontSize);
	}
	else {
		var checkFontSize = (Math.round(12*parseFloat(objFontSize))+(a))/12;
	}
	

	if (checkFontSize > maxFontSize) { 
		checkFontSize = maxFontSize; 
		obj.style.fontSize = checkFontSize+"em"; 
		alert("최대사이즈입니다."); 
	}
	else if (checkFontSize < minFontSize) { 
		checkFontSize = minFontSize; 
		obj.style.fontSize = checkFontSize+"em"; 
		alert("최소사이즈입니다."); }
	else { 
		obj.style.fontSize = checkFontSize+"em"; 
	}
}

// 글자수 크기 구하기
function jf_updateChar(length_limit, objContent, objTarget)
{
	var length = jf_calculate_msglen(objContent.value);
   objTarget.innerHTML = length;
   if (length > length_limit) {
       alert("최대 " + length_limit + "byte이므로 초과된 글자수는 자동으로 삭제됩니다.");
       objContent.value = objContent.value.replace(/\r\n$/, "");
       objContent.value = jf_assert_msglen(objContent.value, length_limit, objTarget);
   }
}

//
function jf_calculate_msglen(message)
{
   var nbytes = 0;

   for (i=0; i<message.length; i++) {
       var ch = message.charAt(i);
       if(escape(ch).length > 4) {
           nbytes += 2;
       } else if (ch == '\n') {
           if (message.charAt(i-1) != '\r') {
               nbytes += 1;
           }
       } else if (ch == '<' || ch == '>') {
           nbytes += 4;
       } else {
           nbytes += 1;
       }
   }

   return nbytes;
}

function jf_assert_msglen(message, maximum, objTarget)
{
   var inc = 0;
   var nbytes = 0;
   var msg = "";
   var msglen = message.length;

   for (i=0; i<msglen; i++) {
       var ch = message.charAt(i);
       if (escape(ch).length > 4) {
           inc = 2;
       } else if (ch == '\n') {
           if (message.charAt(i-1) != '\r') {
               inc = 1;
           }
       } else if (ch == '<' || ch == '>') {
           inc = 4;
       } else {
           inc = 1;
       }
       if ((nbytes + inc) > maximum) {
           break;
       }
       nbytes += inc;
       msg += ch;
   }
   objTarget.innerText = nbytes;
   return msg;
}


// 이미지 로테이션 객체
function cls_imageRotation(){
	this.n=0; // 이미지 방번호
	this.imageHolder = new Array; // 로테이션될 이미지 경로가 들어갈 배열
	this.delay=3000; // 딜레이
	this.imageObj; // 이미지 객체 아이디
	this.active = true;;
	this.instance = ""; //인스턴스 이름

	this.rotation = function(){
		if(!this.active){
			setTimeout(this.instance + ".rotation()",this.delay);
			return;
		}
		if(this.n>=this.imageHolder.length){
			this.n =0;
		}
		document.all[this.imageObj].src = this.imageHolder[this.n];
		this.n++;
		setTimeout(this.instance + ".rotation()",this.delay);

	}

	// 시작
	this.start = function(){
		this.rotation();
	}

	// 재시작
	this.play = function(){
		this.active = true;
	}

	// 멈춤
	this.stop = function(){
		this.active = false;
	}

}

// form 값을 배열로 만든다. form == null 이면 0인 배열을 만든다.
function jf_makeArrayForm(form){
	var arrayObj; 
	if(form == null){
		// 0인 배열
		arrayObj == new Array();
	}
	else if (jf_isArry(form)){
		arrayObj = form;
	}
	else{
		arrayObj = new Array(form); 
	}
	return arrayObj;
}

function jf_checkVal(mode){
	var code;
	
	if (window.event) code = window.event.keyCode; // IE
	else code = e.which; //firefox
	
//	alert("code :" + code);
	
	if (mode == "onlyNumber"){
		
		if( (code >=48 && code <=57 ) || (code>=96 && code <=105) || code== 110 || code == 190 || code == 8 
				|| code == 9 || code == 13 || code == 46 ){
			event.returnValue = true;
			return ;
		}
		event.returnValue = false;
		return false;
	}else if (mode == "numberDash"){
			
		if( (code >=48 && code <=57 ) || (code>=96 && code <=105) || code== 110 || code == 190 || code == 8 
				|| code == 9 || code == 13 || code == 37|| code == 39|| code == 45 || code == 46 || code == 109 || code == 189){
				event.returnValue = true;
				return ;
		}
		event.returnValue = false;
		return false;
		
	}
	event.returnValue = false;
	return false;
}

/* ********************************************************
 * 문자열 오른쪽 trim
 ******************************************************** */
function rtrim(str) {
        var s = new String(str);
        if(s.substr(s.length-1,1) == " ")
                return rtrim(s.substring(0, s.length-1))
        else
                return s;
}

/* ********************************************************
 * 비밀번호 체크 로직 
 * 영문, 숫자, 특수문자 1자이상 혼합하여 6~10자 이내  --> 영문, 숫자, 특수문자 2종이상 혼합하여 10자 이상 
 ******************************************************** */
function jf_isValidFormPassword(str) {
	/*
	var check = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/;
	  
	if (!check.test(str))     {
		return false;
	}
	          
	if (str.length < 6 || str.length > 10) {
		return false;
	}
	  
	return true;
	*/
	
	// 2종이상 혼합 10자이상으로 수정
	var num = str.search(/[0-9]/g);
	var eng = str.search(/[a-z]/ig);
	var spe = str.search(/[`~!@@#$%^&*|\\\'\";:\/?]/gi);
		
	if (str.length < 10 || str.length > 99) { // 길이 만족 체크
		return false;
	}
	
	if( (num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0) ) { // 혼합조건 체크, 영문,숫자,특수문자 중 2가지 이상을 혼합
		return false;
	}

	return true;
}


var util = {
	isEmpty: function(obj) {
		if (obj == null || obj == undefined || obj == "" || obj == "null" || obj == "undefined") 
			return true;
		else 
			return false;
	},
	isEmptyRtnMsg: function(obj, msg) {

		var v = obj.value;
		var s = this.trim(v) + "";

		if (this.isEmpty(v)) {
			alert(msg);
			if (obj.focus != null) obj.focus();
			if (obj.select != null) obj.select();
			return true ;
		}
		return false ;
	},
	trim: function(b) {
		var i, startIdx, endIdx;

		if (b == null) return "";

		startIdx = 0;
		endIdx   = b.length;

		for (i=0; i<b.length; i++) {
			if (b.charAt(i) != " ") {
				startIdx = i;
				break;
			}
		}
		
		for (i=b.length; i>=0 ; i--) {
			if (b.charAt(i-1) != " ") {
				endIdx = i;
				break;
			}
		 }
		return b.substring(startIdx, endIdx);
	},
	paddingZero: function(v) {
		if (v < 10) return "0"+v;
		else return ""+v;
	}
}

Date.prototype.format = function(f) {
	if (!this.valueOf()) return "";

	var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	var d = this;
	 
	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
		switch ($1) {
			case "yyyy": return d.getFullYear();
			case "yy": return (d.getFullYear() % 1000).zf(2);
			case "MM": return (d.getMonth() + 1).zf(2);
			case "dd": return d.getDate().zf(2);
			case "E": return weekName[d.getDay()];
			case "HH": return d.getHours().zf(2);
			case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
			case "mm": return d.getMinutes().zf(2);
			case "ss": return d.getSeconds().zf(2);
			case "a/p": return d.getHours() < 12 ? "오전" : "오후";
			default: return $1;
		}
	});
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

/**
 * 숫자 포멧팅 메서드
 * @param c: 소수점 이하 자리수
 * 	d: 소수점 기호
 * 	t: 1000자리 구분 기호
 * @return String
 */
Number.prototype.formatNumber = function(c, d, t) {
	var n = this,
		c = isNaN(c = Math.abs(c)) ? 2 : c, 
		d = d == undefined ? "." : d, 
		t = t == undefined ? "," : t, 
		s = n < 0 ? "-" : "", 
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
		j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
