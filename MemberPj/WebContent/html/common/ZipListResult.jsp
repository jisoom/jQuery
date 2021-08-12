<%@page import="kr.or.ddit.common.vo.ZipVO"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
[
<%
List<ZipVO> list = (List<ZipVO>) request.getAttribute("list");
for(int i=0 ; i<list.size() ; i++){
	if(i>0) {
		%>,<%
	}
	ZipVO vo = list.get(i);
	
	
	String zipcode = vo.getZipcode();
	String sido = vo.getSido();
	String gugun = vo.getGugun();
	String dong = vo.getDong();
	String ri = vo.getRi();
	String bldg = vo.getBldg();
	String bunji = vo.getBunji();
	
	if(vo.getGugun() == null) {
		gugun = "";
	}
	if(vo.getDong() == null) {
		dong = "";
	}
	if(vo.getRi() == null) {
		ri = "";
	}
	if(vo.getBldg() == null) {
		bldg = "";
	}
	if(vo.getBunji() == null) {
		bunji = "";
	}

	%>
	{
		"zipcode" : "<%=zipcode %>"
		,"sido" : "<%=sido %>"
		,"gugun" : "<%=gugun %>"
		,"dong" : "<%=dong %>"
		,"ri" : "<%=ri %>"
		,"bldg" : "<%=bldg %>"
		,"bunji" : "<%=bunji %>"
	}
	<%
	
}
%>
]
