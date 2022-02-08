var od_platform = "html5";

/// ############################## common.js ############################## ///
function ecatalog(docu, kd, dir, resize){
	var ax = screen.width;
	var ay = screen.height;
	var wname = "ecatalog";

	if(kd == "fixed"){
		ax = 1024;
		ay = 768;
		wname = "fixed_ecatalog";
	}

	ax = ax - 10;
	ay = (navigator.userAgent.indexOf("Chrome") == -1) ? ay - 58 : ay - 88;
	if(resize == undefined || resize == "") resize = "yes";

	var property = "toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=" + resize + ",scrollbars=no,copyhistory=no,";
	property += "width=" + ax + ",height=" + ay + ",left=" + 0 + ",top=" + 0;

	var fname = (od_platform == "html5") ? "ecatalog5.jsp" : "ecatalog.jsp";
	if(docu.substr(0,1) == "*"){
		fname = "ecatalog5.jsp";
		docu = docu.substr(1);
	}

	if(docu == "/") docu = "";
	ecawin = window.open(docu+"/"+fname+"?Dir="+dir, wname, property);
}
function get_divHtml(w, h, vars, alternate, surl){
	var s = "";
	var addvars = "&stgw="+w+"&stgh="+h;
	var classid = "";

	s = "<object id=\"cataSwf\" type=\"application/x-shockwave-flash\" data=\""+surl+"\">\n";
	s += "<param name=\"movie\" value=\""+surl+"\">\n";
	s += "<param name=\"FlashVars\" value=\""+vars+addvars+"\">\n";
	s += "<param name=\"quality\" value=\"high\">\n";
	s += "<param name=\"bgcolor\" value=\"#FFFFFF\">\n";
	s += "<param name=\"allowScriptAccess\" value=\"always\">\n";
	s += "<param name=\"allowFullScreen\" value=\"true\">\n";
	s += alternate;
	s += "</object>\n";
	return s;
}
function get_divHtml2(w, h, vars, alternate, surl){			// for cd
	var s = "";
	var addvars = "&stgw="+w+"&stgh="+h;
	var classid = "";

	if(navigator.appName.indexOf("Microsoft") != -1){
		var ver = getInternetExplorerVersion();
		if(ver < 10) classid = "classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\"";
	}

	s = "<object id=\"cataSwf\" "+classid+" type=\"application/x-shockwave-flash\" data=\""+surl+"main.swf\" standby=\"catalog\" width=\"100%\" height=\"100%\">\n";
	s += "<param name=\"movie\" value=\""+surl+"main.swf\">\n";
	s += "<param name=\"FlashVars\" value=\""+vars+addvars+"\">\n";
	s += "<param name=\"quality\" value=\"high\">\n";
	s += "<param name=\"bgcolor\" value=\"#FFFFFF\">\n";
	s += "<param name=\"allowScriptAccess\" value=\"always\">\n";
	s += "<param name=\"allowFullScreen\" value=\"true\">\n";
	s += alternate;
	s += "</object>\n";
	return s;
}
function getInternetExplorerVersion() {
	var rv = -1;
	if(navigator.appName == 'Microsoft Internet Explorer'){
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if(re.exec(ua) != null)
		rv = parseFloat(RegExp.$1);
	}
	return rv;
} 
function newWindow(winSet,docu,width,height,left,top,winname){
	if(winSet == 1)
	    property = "toolbar=yes,location=no,directories=no,status=yes,menubar=no,resizable=no,scrollbars=yes,copyhistory=no,";
	else if(winSet == 2)
		property = "toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,scrollbars=no,copyhistory=no,";
	else if(winSet == 3)
		property = "toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,scrollbars=yes,copyhistory=no,";

	property += "width=" + width +",height=" + height + ",left=" + left + ",top=" + top;
	return window.open(docu,winname,property);
}
function newLink(winSet, width, height, docu){
	var property;
	if(winSet == 1){
		property = "toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,scrollbars=no,copyhistory=no,";
		property += "width=" + width +", height=" + height + ", left=1, top=1";
		window.open(docu, '', property);
	}
	else{	
		property = "toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,scrollbars=yes,copyhistory=no,";
		property += "width=" + width +", height=" + height + ", left=1, top=1";
		window.open(docu, '', property);
	}
}
function simpleLink(docu, kd){
	if(kd == 1) window.location = docu;
	else if(kd == 2) parent.location = docu;
	else if(kd == 3) window.open(docu, '');
	else if(kd == 4) opener.location = docu;
}
function trimVal(str){
	if(str == "") return "";

	var strsum = "";
	var len = str.length;
	for(var i = 0;i < len;i++){
		var Temp = str.charAt(i);
		if(Temp != ' ' && Temp != '\n' && Temp != '\r')
			strsum += Temp;
	}

	return strsum;
}
function isNotnum(str){
	var len = str.length;
	for(var i = 0;i < len;i++){
		var Jstr = str.charAt(i);
		if(Jstr < "0" || Jstr > "9") return true;
	}
	return false;
}
function numberFormat(num) {
	var pattern = /(-?[0-9]+)([0-9]{3})/;
	while(pattern.test(num)) {
		num = num.replace(pattern,"$1,$2");
	}
	return num;
}

function support_html5(){
	if(navigator.appVersion.indexOf("MSIE") != -1) return false;
	if(!document.createElement("canvas").getContext) return false;
	return true;
}
function support_svg(){
	var support = false
	var img = document.createElement("img");
	img.setAttribute("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzUiIGhlaWdodD0iMjc1Ij48L3N2Zz4%3D");
	if(img.complete){
		img.style.visibility = "hidden";
		img.style.position = "absolute";
		document.body.appendChild(img);
		window.setTimeout(function(){
			document.body.removeChild(img);
			if(img.width >= 100) support = true;
		}, 1);
	}
	return support;
}

function check_mobile(){
	var arm = get_machine();
	if(arm[1] == "s" || arm[1] == "t") return true;
	return false;
}
function check_tablet(){
	var arm = get_machine();
	if(arm[1] == "s") return false;
	return true;
}
function get_machine(){
	var armachine;
	if(navigator.userAgent.indexOf("iPad") != -1) armachine = ["i-Pad","t"];
	else if(navigator.userAgent.indexOf("SHW-M18") != -1) armachine = ["Galaxy Tab","t"]; 		// galaxy Tab 7.0(180S/K/L/W)
	else if(navigator.userAgent.indexOf("SHW-M38") != -1) armachine = ["Galaxy Tab 10.1","t"]; 	// galaxy Tab 10.1(380S/K/W)
	else if(navigator.userAgent.indexOf("SHV-E14") != -1) armachine = ["Galaxy Tab 8.9","t"]; 	// galaxy Tab 8.9(140S/K/L)
	else if(navigator.userAgent.indexOf("SHV-E15") != -1) armachine = ["Galaxy Tab 7.7","t"]; 	// galaxy Tab 7.7(150S)
	else if(navigator.userAgent.indexOf("SM-T") != -1) armachine = ["Galaxy Tab3 8.0","t"];		// galaxy Tab3 8.0
	else if(navigator.userAgent.indexOf("SHV-E23") != -1 || navigator.userAgent.indexOf("SHW-M48") != -1 || navigator.userAgent.indexOf("SM-P60") != -1){
		armachine = ["Galaxy Note 10.1","t"];
	}
	else if(navigator.userAgent.indexOf("SHW-M50") != -1) armachine = ["Galaxy Note 8.0","t"];
	else if(navigator.userAgent.indexOf("MSIE") != -1 && navigator.userAgent.indexOf("Touch") != -1) armachine = ["MS Surface","t"];
	else if(navigator.userAgent.indexOf("iPhone") != -1) armachine = ["i-Phone","s"];
	else if(navigator.userAgent.indexOf("Android") != -1) armachine = ["Android","s"];
	else armachine = ["","d"];

	return armachine;
}
function memberzone(n){

}
