import { useLocation } from "react-router-dom";

/**
 * Header: 상단 헤더 컴포넌트 (현재 미사용)
 * - 현재 경로에 따라 페이지 제목 표시
 * - 모바일 앱 스타일의 고정 헤더
 * - Layout.jsx에서 주석 처리되어 있음 (필요시 활성화)
 */
export default function Header() {
  const { pathname } = useLocation();

  /**
   * getTitle: 현재 경로에 따른 헤더 제목 반환
   * - 경로 패턴 매칭으로 적절한 제목 표시
   */
  const getTitle = () => {
    if (pathname.startsWith("/posts/write")) return "글쓰기";
    if (pathname.startsWith("/posts")) return "게시판";
    if (pathname === "/login") return "로그인";
    if (pathname === "/register") return "회원가입";
    if (pathname === "/mypage") return "마이페이지";
    if (pathname === "/trackDelivery") return "배송 조회";
    return "홈";
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b shadow z-50">
      <div className="max-w-md mx-auto h-14 flex items-center justify-center font-bold text-lg">
        {getTitle()}
      </div>
    </div>
  );
}
