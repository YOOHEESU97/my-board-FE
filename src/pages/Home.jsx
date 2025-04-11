import { useNavigate } from "react-router-dom";
import { useUser } from "../context/AppContext";

export default function Home() {
  const nav = useNavigate();
  const { user } = useUser();
  return (
    <div className="h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="w-full max-w-md p-6 bg-gray-50 rounded-xl shadow">
        <header className="mb-6">
          <div
            className="text-xl font-bold text-[#FF9C00] cursor-pointer"
            onClick={() => nav("/home")}
          >
            HOME
          </div>
        </header>

        {/* 환영 메시지 */}
        <main>
          <h2 className="text-lg font-semibold">
            {user.nickname} 님, 환영합니다.
          </h2>
        </main>
      </div>
    </div>
  );
}
