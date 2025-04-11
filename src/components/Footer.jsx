import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  const navItems = [
    { to: "/home", label: "홈", emoji: "🏠" },
    { to: "/posts", label: "게시판", emoji: "📋" },
    { to: "/mypage", label: "마이페이지", emoji: "🧍" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-inner z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-14">
        {navItems.map((item) => (
          <Link
            to={item.to}
            key={item.to}
            className={`text-center text-sm flex flex-col items-center justify-center transition ${
              pathname === item.to
                ? "text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            <span className="text-lg">{item.emoji}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
