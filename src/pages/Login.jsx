import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: 실제 API 연동 필요
    console.log("로그인 요청:", email, password);
    alert("로그인 시도 (API 연결 예정)");

    // 예시: 로그인 성공 시 토큰 저장
    // localStorage.setItem("token", "JWT-토큰");
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <h1 className="text-2xl font-bold mb-6">🔐 로그인</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="이메일"
          className="border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="비밀번호"
          className="border p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          로그인
        </button>
        {/* 회원가입 링크 - 이메일 바로 아래로 이동 */}
        <button>
          <Link
            to="/register"
            className="block text-right text-sm text-blue-500 hover:underline mt-1"
          >
            회원가입
          </Link>
        </button>
      </form>
    </div>
  );
}
