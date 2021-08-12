
function getValueByUrl(strUrl, strKey) {
	strUrl = strUrl.substr(strUrl.lastIndexOf("?") + 1);
	
	var strArr = strUrl.split("&");
	
	var params = [];
	strArr.forEach(function(item) {
		params.push(item.split("="));
	});
	
	var val = "";
	for(var i=0 ; i<params.length ; i++) {
		if(params[i][0] == strKey) {
			val = params[i][1];
			break;
		}
	}
	
	return val;
}

/**
 * 빈 값인지 확인하는 함수
 * @param val 값(문자열)
 * @returns true, false
 * ex) isEmpty("홍길동")
 */
function isEmpty(val) {
	val = val.trim();
	if(val == null || val.length == 0) {
		return true;
	}
	
	return false;
}

/**
 * 필수 입력 항목이 비어 있을 경우 알려주는 함수
 * @param strId 요소 아이디
 * @param strName 입력 항목 이름
 * @returns true, false
 */
function checkValue(strId, strName) {
	var obj = document.getElementById(strId);
	
	if(isEmpty(obj.value)) {
		alert(strName + "은(는) 필수 입력 항목입니다.");
		obj.focus();
		return false;
	}
	
	return true;
}

/**
 * 입력 값의 길이를 확인하는 함수
 * @param strId 요소 아이디
 * @param strName 입력 항목 이름
 * @param minLen 최소 길이
 * @param maxLen 최대 길이
 * @returns true, false
 */
function checkValueLength(strId, strName, minLen, maxLen) {
	var obj = document.getElementById(strId);
	var val = obj.value;
	
	if(val.length < minLen || val.length > maxLen) {
		alert(strName + "은(는) " + minLen + "자 이상, " + maxLen + "자 이하로 입력해야 합니다.");
		obj.focus();
		return false;
	}
	
	return true;
}