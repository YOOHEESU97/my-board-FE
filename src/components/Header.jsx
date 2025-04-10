// src/components/Header.jsx
import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  const getTitle = () => {
    if (pathname.startsWith("/posts/write")) return "글쓰기";
    if (pathname.startsWith("/posts")) return "게시판";
    if (pathname === "/login") return "로그인";
    if (pathname === "/register") return "회원가입";
    if (pathname === "/mypage") return "마이페이지";
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
