import { Link, useLocation } from "react-router-dom";

/**
 * Footer: 하단 네비게이션 바 컴포넌트
 * - 모바일 앱 스타일의 고정 하단 탭 바
 * - 4개의 주요 메뉴: 홈, 게시판, 배송조회, 마이페이지(아직 구상중)
 * - 현재 활성화된 탭 하이라이트 표시
 */
const Footer = () => {
  const { pathname } = useLocation();

  // 네비게이션 메뉴 항목 정의
  const navItems = [
    { to: "/home", label: "홈", emoji: "🏠" },
    { to: "/posts", label: "게시판", emoji: "📋" },
    { to: "/trackDelivery", label: "배송조회", emoji: "📦" },
    { to: "/mypage", label: "마이페이지", emoji: "🧍" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-200 shadow-lg z-[100]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            to={item.to}
            key={item.to}
            className={`text-center text-xs flex flex-col items-center justify-center transition-colors px-3 py-2 ${
              pathname.startsWith(item.to)
                ? "text-blue-600 font-bold" // 활성 탭: 파란색 + 볼드
                : "text-gray-600" // 비활성 탭: 회색
            }`}
          >
            <span className="text-2xl mb-1">{item.emoji}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
