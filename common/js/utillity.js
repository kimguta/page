
var _JF_LIBRARY_IDENTIFIER__UTIL_JS_ = "UTIL.JS 2005-11-14 23:20:00";

     /*******************************************/
     /*******************************************/
     /*       DATE  VALIDATION  CHECK           */
     /*******************************************/
     /*******************************************/
var JF_montharrAY= new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var JF_PADDASH   = new Array(" ", ",");
var JF_ALPHABET  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

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
