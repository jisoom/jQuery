<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%@include file="zipcode.jsp" %>
</head>
<body>
	<div class="form-group">
					<div>
						<label class="control-label col-sm-2" for="memZip">📪 우편번호:</label>
						<div class="col-sm-10 bottom5 form-inline">
							<input type="text" class="form-control" id="memZip"
								placeholder="우편번호를 검색하세요." name="memZip" readonly="readonly">
							<button type="button" class="btn btn-info" data-toggle="modal" data-target="#zipModal" onclick="execDaumPostcode()">번호 검색</button>
							<span id="memZipSpan"></span>
						</div>
					</div>
					<div>
						<label class="control-label col-sm-2" for="memAdd1">✔ 주소:</label>
						<div class="col-sm-10 bottom5">
							<input  type="text" readonly="readonly" class="form-control" id="memAdd1" name="memAdd1">
						</div>
					</div>
					<div>
						<label class="control-label col-sm-2" for="memAdd2">✔ 상세주소:</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="memAdd2"
								placeholder="상세주소를 입력하세요." name="memAdd2">
						</div>
					</div>
				</div>
</body>
</html>