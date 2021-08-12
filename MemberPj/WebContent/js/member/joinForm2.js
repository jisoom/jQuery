/**
 * 회원가입화면 JS
 */

//[중복검사] 버튼 클릭시 -ID 중복검사

function duplicateId() {
	//ajax

	//아이디 검사
	var obj = $("#userId");
	var objSpan = $("#userIdSpan");
	//입력 값 있는지 확인
	if(checkValueEmpty(obj,objSpan, "아이디")) {
		return;
	}
	//입력 값 길이 확인
	if(!checkValueLength(obj,objSpan, "아이디", 4, 12)) {
		return;
	}
	//유효성 확인
	if(!checkValueRegExp(obj, objSpan, "아이디", /^[a-z0-9]{4,12}$/ , "아이디(4~12자)는 영문(소문자)으로 시작하며, 영문(소문자)와 숫자로만 구성되어야합니다.")){
		return;
	}
	
	chkOverlap(obj);
	
	$("#userName").focus();

}

//DB 아이디 중복 검사
function chkOverlap(obj) {
	var param = {
			userId : obj.val()
			,flag : "CHKID" 
	};
		
	$.ajax({
		url : "/MemberPj/MemberServlet"
		,type : "post"
		,data : param
		,dataType : "json"
		,success : function(data) {
			console.log(data);
			if(data.resultCnt == 0) {
				$("#userIdSpan").removeClass("text-warning");
				$("#userIdSpan").addClass("text-success");
				$("#userIdSpan").text("'" + $("#userId").val() +"'" + "은 사용 가능한 아이디 입니다.");
				$("#idChk").val($("#userId").val());
			}else {
				$("#userId").focus();
				$("#userIdSpan").removeClass("text-success");
				$("#userIdSpan").addClass("text-warning");
				$("#userIdSpan").text("'" + $("#userId").val() +"'" + "은 이미 사용중인 아이디 입니다.");
				$("#idChk").val("");
			}
		}
		,error : function(xhr) {
			console.log(xhr);
			alert("오류입니다. 관리자에게 문의하세요.");
		}
	});
}


/************************* <시작> 유효성 체크 부분(공통)********************************/

//유효성 검사
function checkValueRegExp(obj, objSpan, strName, regExp, strErr) {
	 var val = obj.val().trim();
	 
	if(!val.match(regExp)) {
		objSpan.addClass("text-warning");
		objSpan.text(strErr); 
		 obj.focus();
		 return false; //정규식이 맞지 않아요
	 }
	objSpan.text("");
	return true; //정규식이 맞아요
}

/*//휴대폰 유효성 검사
function checkValuePhoneRegExp(obj, objSpan, strName, regExp, strErr) {
	 var val = obj.trim();
	 
	if(!val.match(regExp)) {
		objSpan.addClass("text-warning");
		objSpan.text(strErr); 
		 return false; //정규식이 맞지 않아요
	 }
	objSpan.text("");
	return true; //정규식이 맞아요
}*/

/*//휴대폰 빈값 검사
function checkValuePhoneEmpty(hp1, hp2, hp3, objSpan, strName) {
	var val1 = hp1.val().trim();
	var val2 = hp2.val().trim();
	var val3 = hp3.val().trim();
	if(val1 == null || val1.length == 0 || val1 =="") {
		objSpan.addClass("text-warning");
		objSpan.text(strName + "을(를) 입력해주세요."); 
		hp1.focus();
		return true; //빈값이에요
	}
	if(val2 == null || val2.length == 0 || val2 =="") {
		objSpan.addClass("text-warning");
		objSpan.text(strName + "을(를) 입력해주세요."); 
		hp2.focus();
		return true; //빈값이에요
	}
	if(val3 == null || val3.length == 0 || val3 =="") {
		objSpan.addClass("text-warning");
		objSpan.text(strName + "을(를) 입력해주세요."); 
		hp3.focus();
		return true; //빈값이에요
	}
	objSpan.text("");
	return false; //빈값이 아니에요
}*/

//빈값 검사
function checkValueEmpty(obj, objSpan, strName) {
	var val = obj.val().trim();
	
	if(val == null || val.length == 0 || val =="") {
		objSpan.addClass("text-warning");
		objSpan.text(strName + "을(를) 입력해주세요."); 
		obj.focus();
		return true; //빈값이에요
	}
	objSpan.text("");
	return false; //빈값이 아니에요
}

//길이 검사
function checkValueLength(obj, objSpan, strName, min, max) {
	var val = obj.val().trim();
	
	if(val.length < min || val.length > max) {
		objSpan.addClass("text-warning");
		objSpan.text(strName+ "은(는) " + min + "자 이상, " + max + "자 이하로 입력 가능합니다."); 
		obj.focus();
		return false; //길이가 안맞아요
	}
	objSpan.text("");
	return true; //길이가 맞아요
}
/************************* <끝> 유효성 체크 부분(공통)********************************/
//생년월일 검사
function birthChk() {
	
	//입력한 생일 정보 가져오기
	var birYear = parseInt($("#birth").val().substr(0,4));
	var age = 10;
	
	var currYear = new Date().getFullYear();
	
	if((currYear - birYear) +1 < age) {
		alert("10살 미만의 회원은 가입 할 수 없습니다.");
		$("#birthSpan").addClass("text-warning");
		$("#birthSpan").text("10살 미만의 회원은 가입 할 수 없습니다.");
		$("#birth").focus();
		return false;
	}	
	
	return true;
}

//[저장] 버튼 클릭시 -회원정보 저장
function save() {
	//ajax

	if(!validate()) {
		return;
	}
	console.log(1);
	if(!confirm("저장하시겠습니까?")) {
		alert("취소하셨습니다.");
		//cancel();
		return;
	}
	
	//회원등록된 목록 보여주기
	$("#flag").val("C"); //form에 있는 hidden input까지 데이터로 감
	$.ajax ({
		url : "/MemberPj/MemberServlet"
		,type : "post"
		,data : $("#fm").serialize()
		,dataType : "json"
		,success : function(data) {
			// data = {resultCnt : 1}
			//저장 성공인 경우
			if(data.resultCnt == 1) {
				alert("저장되었습니다.");
				location.href = "http://localhost/MemberPj/html/member/memberList.html"; //목록화면으로				
			}else {
				alert("저장되지 않았습니다. 관리자에게 문의하세요.");
			}
		}
		,error : function(xhr) {
			console.log(xhr);
			alert("오류입니다. 관리자에게 문의하세요.");
		}
		
	});
	
	
}
//[저장] 버튼 클릭시 - 유효성 검사
function validate() {
	//아이디 검사
	var obj = $("#userId");
	var objSpan = $("#userIdSpan");
	if(checkValueEmpty(obj,objSpan, "아이디")) {
		return false;
	}
	if(!checkValueLength(obj,objSpan, "아이디", 4, 12)) {
		return false;
	}
	if(!checkValueRegExp(obj, objSpan, "아이디", /^[a-z]{1}[a-z0-9]{3,11}$/ , "아이디(5~10자)는 영문(소문자)으로 시작하며, 영문(소문자)와 숫자로만 구성되어야합니다.")){
		return false;
	}
	if(obj.val() != $("#idChk").val()) {
		alert("아이디 중복 검사를 해야합니다.");
		obj.focus();
		return false;
	}
	
	//이름 검사
	obj = $("#userName");
	objSpan = $("#userNameSpan");
	if(checkValueEmpty(obj, objSpan, "이름")) {
		return false;
	}
	if(!checkValueLength(obj, objSpan, "이름", 2, 5)) {
		return false;
	}
	if(!checkValueRegExp(obj, objSpan, "이름", /^[가-힣]{2,5}$/ , "이름은 한글(2~5자)로 구성되어야 합니다.")){
		return false;
	}
	
	//생년월일 검사
	obj = $("#birth");
	objSpan = $("#birthSpan");
	if(checkValueEmpty(obj, objSpan, "생년월일")) {
		return false;
	}
	
	if(!checkValueRegExp(obj, objSpan, "생년월일", /^\d{4}-\d{2}-\d{2}$/ , "생년월일은 년도(4),월(2),일(2)로 구성되어야 합니다. ex)YYYY-MM-DD")){
		return false;
	}
	if(!birthChk()) {
		return false;
	}
	
	//비밀번호 검사
	obj = $("#pwd");
	objSpan = $("#pwdSpan");
	if(checkValueEmpty(obj, objSpan, "비밀번호")) {
		return false;
	}
	if(!checkValueLength(obj, objSpan, "비밀번호", 8, 20)) {
		return false;
	}
	if(!checkValueRegExp(obj, objSpan, "비밀번호", /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/ , "비밀번호(8~20자)는 영문(소,대문자), 숫자, 특수문자가 반드시 포함되어야합니다.")){
		return false;
	}
	
	//비밀번호 검사
	obj = $("#pwdChk");
	objSpan = $("#pwdChkSpan");
	if(checkValueEmpty(obj, objSpan, "비밀번호")) {
		return false;
	}
	if($("#pwd").val().trim() != $("#pwdChk").val().trim()) {
		objSpan.text("비밀번호가 일치하지 않습니다.");
		return false;
	}

	//휴대폰 번호 검사
	obj = $("#hp");
	objSpan = $("#hpSpan");
	if(checkValueEmpty(obj, objSpan, "휴대폰 번호")) {
		return false;
	}
	if(!checkValueRegExp(obj, objSpan, "휴대폰 번호", /^(?:(010\d{4})|(01[1|[6-9]\d{3,4}))(\d{4})$/ , "휴대폰번호는 숫자만 포함된 휴대폰 형식이어야합니다.")){
		return false;
	}
	
/*	//휴대폰 번호 검사
	var hp1 = $("#hp1");
	var hp2 = $("#hp2");
	var hp3 = $("#hp3");
	obj = $("#hp1").val() + $("#hp2").val() + $("#hp3").val();
	objSpan = $("#hpSpan");
	if(checkValuePhoneEmpty(hp1, hp2, hp3, objSpan, "휴대폰번호")) {
		return false;
	}
	if(!checkValuePhoneRegExp(obj, objSpan, "휴대폰번호", /^(?:(010\d{4})|(01[1|[6-9]\d{3,4}))(\d{4})$/ , "휴대폰번호는 숫자만 포함된 휴대폰 형식이어야합니다.")){
		return false;
	}

	//보호자 휴대폰 번호 검사
	hp1 = $("#parentHp1");
	hp2 = $("#parentHp2");
	hp3 = $("#parentHp3");
	obj = $("#parentHp1").val() + $("#parentHp2").val() + $("#parentHp3").val();
	objSpan = $("#parentHpSpan");
	if(checkValuePhoneEmpty(hp1, hp2, hp3, objSpan, "보호자 휴대폰번호")) {
		return false;
	}
	if(!checkValuePhoneRegExp(obj, objSpan, "보호자 휴대폰번호", /^(?:(010\d{4})|(01[1|[6-9]\d{3,4}))(\d{4})$/ , "휴대폰번호는 숫자만 포함된 휴대폰 형식이어야합니다.")){
		return false;
	}*/
	

	//이메일 검사
	obj = $("#email");
	objSpan = $("#emailSpan");
	if(checkValueEmpty(obj, objSpan, "이메일")) {
		return false;
	}
	if(!checkValueRegExp(obj, objSpan, "이메일", /^[0-9a-zA-z]([-_.]?[0-9a-zA-z])*@[0-9a-zA-z]([-_.]?[0-9a-zA-Z])*\.[a-zA-z]{2,3}$/ , "이메일은 @를 포함된 이메일 형식이어야합니다.")){
		return false;
	}
	
	//우편번호 검사
	obj = $("#memZip");
	objSpan = $("#memZipSpan");
	if(checkValueEmpty(obj, objSpan, "우편번호")) {
		return false;
	}
	
	//주소 검사
	obj = $("#memAdd1");
	objSpan = $("#memZipSpan");
	if(checkValueEmpty(obj, objSpan, "주소")) {
		return false;
	}
	
	//상세주소 검사
	obj = $("#memAdd2");
	objSpan = $("#memZipSpan");
	if(checkValueEmpty(obj, objSpan, "상세주소")) {
		return false;
	}
	
	return true;
}

//[취소] 버튼 클릭시 -회원목록(이전)화면으로 돌아가기
function cancel() {
	//submit
	
	if(!confirm("취소하시겠습니까?")) {
		//cancel();
		return;
	}
	var fm = document.getElementById("fm");
	
	fm.method = "post"; 
	fm.action = "http://localhost/MemberPj/html/member/memberList.html"; 
	fm.submit();
}

//[초기화] 버튼 클릭시 - 내용 다 사라지기
function resetFm() {
	
	if(!confirm("초기화하시겠습니까?")) {
		//cancel();
		return;
	}
	$("input").val("");
	$("span").text("");
}
