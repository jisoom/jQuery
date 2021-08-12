<%@page import="kr.or.ddit.member.vo.MemberVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
int resultCount = (Integer) request.getAttribute("resultCount");  
%>
{"resultCnt" : <%=resultCount %>}
