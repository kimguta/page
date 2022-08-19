<%@ page contentType="text/html;charset=utf-8" errorPage="/common/error/error.jsp" %>
<%@ page import="org.apache.catalina.util.URLEncoder" %>
<%@ page import="com.oreilly.servlet.MultipartRequest" %>
<%@ page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy" %>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*" %>
<%@ page import="com.idq.toolkit.commons.util.LangUtil" %>
<%@ page import="com.idq.egf.common.Config" %>
<%@ page import="egovframework.com.cmm.service.EgovProperties" %>
<%

	String UPLOAD_ROOT = Config.ROOT_PHY + Config.getEditorFilePath();
	String WEB_ROOT = Config.ROOT_URL + Config.getEditorFilePath();

	String filename = "";
	//파일이 업로드되는 폴더를 지정한다
	String saveFolder = WEB_ROOT; //"/upload/smarteditor/";
	String encType = "utf-8";//인코딩 타입
	int maxSize = 10 * 1024 * 1024;//최대 업로드 될 파일크기 10Mb
	ServletContext context = getServletContext();
	//현재 jsp페이지의 웹 어플리케이션상의 절대경로를 구한다
	//String realFolder = context.getRealPath(saveFolder);//웹 어플리케이션의 절대경로
	//out.println("the realpath is :" + realFolder + "<br>"); 
	try {
		MultipartRequest multi = null;
		//전송을 담당할 콤포넌트를 생성하고 그 파일을 전송한다
		//전송할 파일명을 가지고 있는 객체, 서버상의 절대경로, 최대업로드될 파일 크기, 분자코드,기본보안 적용
		multi = new MultipartRequest(request, UPLOAD_ROOT, maxSize, encType, new DefaultFileRenamePolicy());
		//Form의 파라미터 목록을 가져온다
		Enumeration params = multi.getParameterNames();
		//파라미터를 출력한다
		while (params.hasMoreElements()) {
			String name = (String) params.nextElement();//전송되는 파라미터 이름
			String value = multi.getParameter(name);//전송되는 파라미터값
		}
		//out.print(multi.getParameter("htImageInfo"));
		//전송되는 파일 정보를 가져와 출력한다
		Enumeration files = multi.getFileNames();
		//파일 정보가 있다면
		while (files.hasMoreElements()) {
			//input 태그의 속성이 file 인 태그의 name 속성값 : 파라미터 이름
			String name = (String) files.nextElement();
			//서버에 저장된 파일 이름
			filename = multi.getFilesystemName(name);
			//전송전 원래의 파일 이름
			String original = multi.getOriginalFileName(name);
			
			//전송된 파일 속성이 file 인 태그의 name 속성값을 이용해 파일의 객체 생성
			File file = multi.getFile(name);
			
			if (EgovProperties.getProperty("Gcms.OsType").equals("UNIX")) {
				file.setExecutable(true, false);
				file.setReadable(true, false);
				file.setWritable(true, false);
			}
			
			//전송된 파일의 내용 타입
			String type = multi.getContentType(name);
			//타입이 image인것만 업로드 가능 
			String imgType[] = type.split("/");
			if(!imgType[0].equals("image")){
				out.print(LangUtil.getErrMessage("잘못된 파일 형식입니다."));
				return;
			}
			
			response.sendRedirect(multi.getParameter("callback") + "?callback_func=" + multi.getParameter("callback_func")
					+ "&bNewLine=true&sFileName=" + java.net.URLEncoder.encode(filename,encType).replace("+", " ") + "&sFileURL="+ saveFolder + "/" + java.net.URLEncoder.encode(filename,encType).replace("+", " "));
			
		}
	} catch (IOException e) {
		out.println("<script>alert('file upload fail');</script>");
		out.flush();
	}
%>