import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("로그인 요청:", email, password);
      alert("로그인 성공! (API 연동 예정)");
      navigate("/posts");
    } catch (error) {
      alert("로그인 실패!");
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-50 rounded-xl shadow">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">🔐 로그인</h1>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        {/* 이메일 */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">이메일</label>
          <input
            type="email"
            className="border p-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">비밀번호</label>
          <input
            type="password"
            className="border p-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
        >
          로그인
        </button>
      </form>

      {/* 회원가입 링크 */}
      <p className="text-sm text-center mt-4 text-gray-600">
        아직 회원이 아니신가요?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
