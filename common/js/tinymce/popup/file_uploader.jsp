<%@ page contentType="text/html;charset=utf-8"%>
<%@ page import="javax.servlet.http.HttpServletRequest" %>
<%@ page import="javax.servlet.http.HttpServletRequestWrapper" %>
<%@ page import="org.springframework.web.multipart.MultipartHttpServletRequest" %>
<%@ page import="org.springframework.web.multipart.MultipartFile" %>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*" %>
<%@ page import="com.idq.toolkit.commons.util.LangUtil" %>
<%@ page import="com.idq.egf.common.Config" %>
<%@ page import="org.apache.tika.Tika" %>
<%@ page import="egovframework.com.cmm.service.EgovProperties" %>
<%
	String UPLOAD_ROOT = Config.ROOT_PHY + Config.getEditorFilePath();
	String WEB_ROOT = Config.ROOT_URL + Config.getEditorFilePath();

	String filename = "";
	String saveFolder = WEB_ROOT;
	String encType = "utf-8";

	// 파일 크기 제한 설정 (10MB)
	int maxSize = 10 * 1024 * 1024;

	// 래퍼 해제 로직 (이전 코드와 동일하게 originalRequest를 얻음)
	HttpServletRequest currentRequest = (HttpServletRequest) request;
	HttpServletRequest originalRequest = currentRequest;

	while (originalRequest instanceof HttpServletRequestWrapper) {
		originalRequest = (HttpServletRequest) ((HttpServletRequestWrapper) originalRequest).getRequest();

		if (originalRequest instanceof MultipartHttpServletRequest) {
			break;
		}
		if (originalRequest == currentRequest) break;
	}

	try {
		// originalRequest가 Spring의 MultipartHttpServletRequest인지 확인
		if (!(originalRequest instanceof MultipartHttpServletRequest)) {
			throw new Exception("MultipartHttpServletRequest 타입이 아닙니다. Spring Multipart 설정 확인 필요.");
		}

		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) originalRequest;

		// 1. Form 파라미터 목록 가져오기 (multi.getParameterNames() 대체)
		Enumeration<String> paramNames = multipartRequest.getParameterNames();
		while (paramNames.hasMoreElements()) {
			String name = paramNames.nextElement();
			String value = multipartRequest.getParameter(name);
			// out.println("파라미터: " + name + " = " + value + "<br>");
		}

		// 2. 파일 정보 가져오기 (multi.getFileNames() 대체)
		Iterator<String> fileNames = multipartRequest.getFileNames();

		while (fileNames.hasNext()) {
			String name = fileNames.next(); // input 태그의 name 속성값
			MultipartFile mFile = multipartRequest.getFile(name);

			if (mFile != null && !mFile.isEmpty()) {

				long fileSize = mFile.getSize();
				if (fileSize > maxSize) {
					// 파일 크기가 제한을 초과하면 에러 메시지 출력 후 처리 중단
					out.print(LangUtil.getErrMessage("파일 크기가 " + (maxSize / 1024 / 1024) + "MB를 초과합니다."));
					return;
				}

				// 전송전 원래의 파일 이름 (original)
				String original = mFile.getOriginalFilename();

				// 파일 저장 경로 및 이름 생성 (DefaultFileRenamePolicy 대신 수동 처리)
				filename = original;
				File targetFile = new File(UPLOAD_ROOT, filename);

				// 파일 시스템에 저장 (mFile.transferTo() 대체)
				mFile.transferTo(targetFile);

				// EgovFramework 권한 설정 로직
				if (EgovProperties.getProperty("Gcms.OsType").equals("UNIX")) {
					targetFile.setExecutable(true, false);
					targetFile.setReadable(true, false);
					targetFile.setWritable(true, false);
				}

				// 파일 형식 검사 (Tika 로직 유지)
				Tika tika = new Tika();
				String mimeType = tika.detect(targetFile);
				String imgType[] = mimeType.split("/");
				if (!imgType[0].equals("image")) {
					out.print(LangUtil.getErrMessage("잘못된 파일 형식입니다(" + mimeType + ")."));
					targetFile.delete(); // 잘못된 형식 파일 삭제
					return;
				}

				// 3. 리다이렉션 (multi.getParameter("callback") 대체)
				response.sendRedirect(multipartRequest.getParameter("callback")
						+ "?callback_func=" + multipartRequest.getParameter("callback_func")
						+ "&bNewLine=true&sFileName=" + java.net.URLEncoder.encode(filename, encType).replace("+", " ")
						+ "&sFileURL=" + saveFolder + "/" + java.net.URLEncoder.encode(filename, encType).replace("+", " "));
			}
		}

	} catch (ArrayIndexOutOfBoundsException e) {
		out.println("<script>alert('file upload fail');</script>");
		out.flush();
	} catch (IOException e) {
		out.println("<script>alert('file upload fail');</script>");
		out.flush();
	} catch (Exception e) {
		out.println("<script>alert('file upload fail');</script>");
		out.flush();
	}
%>