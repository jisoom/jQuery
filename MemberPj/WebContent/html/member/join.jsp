<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>회원가입</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<script src="/MemberPj/js/member/joinForm2.js?v=1"></script>
	<link rel="stylesheet" href="/MemberPj/html/member/join.css">
</head>
<body>
	<div class="container">
		<h2 class="text-center">회원가입</h2>
		<br>
		<div>
			<form class="form-horizontal" id="fm">
				<div class="border5">
				<div class="form-group">
					<label class="control-label col-sm-2" for="userId">🔑 아이디:</label>
					<div class="col-sm-10 form-inline">
						<input type="text" class="form-control" id="userId"
							placeholder="아이디를 입력하세요." name="userId">
						<button type="button" onclick="duplicateId()" class="btn btn-info" id="btnUserId">중복검사</button>
						<input type="hidden" name="idDuplication" id="idChk">
						<span id="userIdSpan"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-2" for="userName">👤 이름:</label>
					<div class="col-sm-10 form-inline">
						<input type="text" class="form-control" id="userName"
							placeholder="이름을 입력하세요." name="userName">
							<span id="userNameSpan"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-2" for="birth">📆 생년월일:</label>
					<div class="col-sm-10 form-inline">
						<input type="date" class="form-control" id="birth" name="birth">
						<span id="birthSpan"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-2" for="pwd">🔐 비밀번호:</label>
					<div class="col-sm-10 form-inline">
						<input type="password" class="form-control" id="pwd"
							placeholder="비밀번호를 입력하세요." name="pwd">
							<span id="pwdSpan"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-2" for="pwdChk">🔐 비밀번호 확인:</label>
					<div class="col-sm-10 form-inline">
						<input type="password" class="form-control" id="pwdChk"
							placeholder="비밀번호를 입력하세요." name="pwdChk">
							<span id="pwdChkSpan"></span>
					</div>
				</div>
				<div class="form-group">
					<!-- <label class="control-label col-sm-2" for="hp1">📞 휴대폰 <br>번호:</label> -->
					<label class="control-label col-sm-2" for="hp">📞 휴대폰 <br>번호:</label>
					<div class="col-sm-10 form-inline">
						<input type="text" class="form-control" id="hp" name="hp" placeholder="01012345678">
<!-- 					<input type="text" class="form-control" id="hp1" name="hp1" style="width: 80px;"
						placeholder="010">
						<span>-</span>
						<input type="text" class="form-control" id="hp2" name="hp2" style="width: 80px;"
						placeholder="1234">
						<span>-</span>
						<input type="text" class="form-control" id="hp3" name="hp3" style="width: 80px;"
						placeholder="5678"> -->
						<span id="hpSpan"></span>
					</div>
				</div>
<!-- 				<div class="form-group">
					<label class="control-label col-sm-2" for="parentHp1">📞 보호자 <br>휴대폰 번호:</label>
					<div class="col-sm-10 form-inline">
						<input type="text" class="form-control" id="parentHp1" name="parentHp1" style="width: 80px;"
						placeholder="010">
						<span>-</span>
						<input type="text" class="form-control" id="parentHp2" name="parentHp2" style="width: 80px;"
						placeholder="1234">
						<span>-</span>
						<input type="text" class="form-control" id="parentHp3" name="parentHp3" style="width: 80px;"
						placeholder="5678">
						<span id="parentHpSpan"></span>
					</div>
				</div> -->
				
				<div class="form-group">
					<label class="control-label col-sm-2" for="email">💌 이메일:</label>
					<div class="col-sm-10 form-inline">
						<input type="email" class="form-control" id="email"
							placeholder="abcd123@email.com" name="email">
							<span id="emailSpan"></span>
					</div>
				</div>
				<%@include file="zipcode.jsp" %>
				<div class="form-group lastRow ">
					<div class="btnDiv">
						<button type="button" class="btn btn-primary" onclick="save()">저장</button>
						<button type="button" class="btn btn-info" onclick="resetFm()">초기화</button>
						<button type="button" class="btn btn-info" onclick="cancel()">취소</button>
					</div>
				</div>
				<input type="hidden" name="flag" id="flag">
				</div>
			</form>
			<!-- 로봇이 아닙니다 알림창 -->
			  <div class="recaptcha-wrapper">
                  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                  <div class="g-recaptcha"
                     data-sitekey="6Lcvw_gSAAAAAH3zOofJBJOFLpmjx7Vq3hxnYIRw"></div>
               </div>
		</div>
	</div>
</body>
</html>