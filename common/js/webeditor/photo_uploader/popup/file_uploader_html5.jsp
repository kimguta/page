<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.io.*" %>
<%@ page import="com.idq.egf.common.Config" %>
<%
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Headers", "file-name");

	String UPLOAD_ROOT = Config.ROOT_PHY + Config.getEditorFilePath(); // "c:/tmp/image_attach/yyyy/mm";
	String WEB_ROOT = Config.ROOT_URL + Config.getEditorFilePath();  // "/upload/image_attach/yyyy/mm";
	
	if (!"OPTIONS".equals(request.getMethod().toUpperCase())) {
		String fileName = request.getHeader("file-name");
		String ext = fileName.substring(fileName.lastIndexOf("."));
		//String uploadFileName = fileName.substring(0, fileName.lastIndexOf(".")) + "_" + System.currentTimeMillis() + ext;
		
		// 방화벽문제로 한글파일명 사용안함
		String uploadFileName = "gcms_" + System.currentTimeMillis() + ext;
		
		File uploadDir = new File(UPLOAD_ROOT);
		if (!uploadDir.exists()) {
			uploadDir.mkdir();
		}
		File uploadFile = null;
		InputStream in = null;
		OutputStream outFile = null;
		try {
			uploadFile = new File(uploadDir, uploadFileName);
			in = request.getInputStream();
			outFile = new FileOutputStream(uploadFile);
			
			byte[] buf = new byte[1024 * 2];
			int size = 0;
			while ((size = in.read(buf)) != -1) {
				outFile.write(buf, 0, size);
			}
			
		} catch(IOException ie) {
			out.println("<script> alert('ioException'); </script>");
			out.flush();
		} finally {
			if(out != null) out.close();
			if(in != null) in.close();
		}

		out.print("&bNewLine=true");
		out.print("&sFileName=" + java.net.URLEncoder.encode(uploadFileName,"UTF-8"));
		out.print("&sFileURL="+WEB_ROOT+"/" + java.net.URLEncoder.encode(uploadFileName,"UTF-8"));
	}
%>
