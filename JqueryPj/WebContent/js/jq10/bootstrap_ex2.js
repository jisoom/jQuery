/**
 * 회원가입화면 JS
 */

/*
 * [중복검사] 버튼 클릭시 -ID 중복검사
 */
function duplicateId() {
	//ajax
	
	//1. 입력된 값이 있는지 확인, 

	
	
	//2. 입력된 값이 형식에 맞는지
	//-영문 소문자 반드시 포함, 영문 소문자,숫자 조합 4~12글자
	
	//3. DB에서 중복된게 있는지
	var param = {
			userId : $("#userId").val()
			,flag : "CHKID" 
	};
	
	console.log(param);
	
	$.ajax({
		url : "/JqueryPj/MemberServlet"
		,type : "post"
		,data : param
		,dataType : "json"
		,success : function(data) {
			console.log(data);
			if(data.resultCnt == 0) {
				$("#userIdSpan").addClass("text-success");
				$("#userIdSpan").text("사용 가능한 아이디 입니다.");
				
			}else {
				alert("이미 사용중인 아이디입니다.");
				$("#userId").focus();
				$("#userIdSpan").addClass("text-warning");
				$("#userIdSpan").text("이미 사용중인 아이디 입니다.");
			}
		}
		,error : function(xhr) {
			console.log(xhr);
			alert("오류입니다. 관리자에게 문의하세요.");
		}
	});
	
}

/*
 * [저장] 버튼 클릭시 -회원정보 저장
 */
function save() {
	//ajax
}

/*
 * [취소] 버튼 클릭시 -회원목록(이전)화면으로 돌아가기
 */
function cancel() {
	//submit
}

/*
 * 우편번호 모달창 [검색] 버튼 클릭시 -우편번호 목록 조회
 */
function srchAddrList() {
	//ajax
	
}
