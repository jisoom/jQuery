package kr.or.ddit.member.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;

import kr.or.ddit.member.service.MemberService;
import kr.or.ddit.member.vo.MemberVO;

@WebServlet("/MemberServlet")
public class MemberServlet extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		response.getWriter().append("Served at: ").append(request.getContextPath());
		doPost(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String url = "";
		
		String flag = request.getParameter("flag");
		//String이랑 null비교 => 가능, null이랑 String비교 => 에러
		//flag.equals("CHKID") ==> flag가 null인 경우 에러 발생
		if("CHKID".equals(flag)) { 
			//아이디 중복 검사
			checkUserId(request);
			url = "html/member/memberResult.jsp";
			
		}else if("C".equals(flag)) {
			//회원 정보 등록
			insertUserId(request);
			url = "html/member/resultCount.jsp";
			
		}else if("U".equals(flag)) {
			//회원정보 변경
		}else if("D".equals(flag)) {
			//회원정보 삭제
		}else if("R".equals(flag)) {
			//회원정보 상세 조회
		}else {
			retrieveMemberList(request);
			url = "html/member/memberListResult.jsp";
		}
		
		
		RequestDispatcher disp = request.getRequestDispatcher(url); // 결과를 받을 URL을 세팅
		disp.forward(request, response);
		
	}
	
	private void insertUserId(HttpServletRequest request) {
		
		//BeanUtils사용 ==> name이랑 vo이름이랑 같아야 사용할 수 있음 get, set 자동으로 해줌
		/*MemberVO memberVO = new MemberVO();
		BeanUtils.populate(memberVO, request.getParameterMap());*/
		
		String memId = request.getParameter("userId");
		String memName = request.getParameter("userName");
		String birth = request.getParameter("birth");
		String pwd = request.getParameter("pwd");
/*		String hp1 = request.getParameter("hp1");
		String hp2 = request.getParameter("hp2");
		String hp3 = request.getParameter("hp3");
		String hp = hp1 + hp2 + hp3;*/
		String hp = request.getParameter("hp");
/*		String parentHp1 = request.getParameter("parentHp1");
		String parentHp2 = request.getParameter("parentHp2");
		String parentHp3 = request.getParameter("parentHp3");
		String parentHp = parentHp1 + parentHp2 + parentHp3;*/
		String email = request.getParameter("email");
		String memZip = request.getParameter("memZip");
		memZip =memZip.replace("-", "");
		String memAdd1 = request.getParameter("memAdd1");
		String memAdd2 = request.getParameter("memAdd2");
		
		MemberVO memberVO = new MemberVO();
		memberVO.setMemId(memId);
		memberVO.setMemName(memName);
		memberVO.setMemBir(birth);
		memberVO.setMemPass(pwd);
		memberVO.setMemHp(hp);
		//memberVO.setMemParentHp(parentHp);
		memberVO.setMemMail(email);
		memberVO.setMemZip(memZip);
		memberVO.setMemAdd1(memAdd1);
		memberVO.setMemAdd2(memAdd2);
		
		MemberService service = new MemberService();
		int cnt = 0;
		try {
			cnt = service.insertMember(memberVO);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		request.setAttribute("resultCount", cnt);
		
	}

	private void checkUserId(HttpServletRequest request) {
		
		String memId = request.getParameter("userId");
		
		MemberService service = new MemberService();
		
		MemberVO memberVO = null;
		try {
			memberVO = service.retrieveMemberByMemId(memId);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		request.setAttribute("vo", memberVO);
	}

	private void retrieveMemberList(HttpServletRequest request) {
		// 회원목록조회
		String memId = request.getParameter("memId");
		String memName = request.getParameter("memName");

		MemberVO memberVO = new MemberVO();
		memberVO.setMemId(memId);
		memberVO.setMemName(memName);

		MemberService service = new MemberService();
		List<MemberVO> list = service.retrieveMemberList(memberVO);

		// 브라우저에 전달할 내용(결과)를 request의 Attribute에 담아주기
		// 브라우저에서는 request의 Attribute에 꺼내서 사용할 수 있음
		request.setAttribute("list", list);
	}
}
