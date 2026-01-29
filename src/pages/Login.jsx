import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { loginUser } from "../api/user";
import { useUser } from "../context/AppContext";

/**
 * Login: 로그인 페이지 컴포넌트
 * - 이메일/비밀번호 입력 폼
 * - JWT 토큰 기반 인증
 * - 로그인 성공 시:
 *   1. accessToken, refreshToken을 localStorage에 저장
 *   2. accessToken 디코딩하여 Context의 user 상태 업데이트
 *   3. /home으로 리다이렉트
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const nav = useNavigate();
  const { setUser } = useUser();

  /**
   * handleLogin: 로그인 처리
   * - 백엔드에 로그인 요청
   * - 성공 시 토큰 저장 및 사용자 정보 Context에 저장
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return; // 중복 제출 방지
    
    try {
      setIsSubmitting(true);
      
      // 로그인 API 호출
      const res = await loginUser({ email, password });
      
      // 토큰을 localStorage에 저장
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      
      // JWT 토큰 디코딩하여 사용자 정보 추출
      const decoded = jwtDecode(res.data.accessToken);
      
      // Context에 사용자 정보 저장
      setUser({
        email: decoded.sub,
        nickname: decoded.nickname,
        role: decoded.role,
      });
      
      // 홈 페이지로 이동
      nav("/home");
    } catch (error) {
      alert("로그인 실패! 이메일과 비밀번호를 확인해주세요.");
      console.error("로그인 에러:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-50 rounded-xl shadow">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">🔐 로그인</h1>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        {/* 이메일 입력 */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">이메일</label>
          <input
            type="email"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">비밀번호</label>
          <input
            type="password"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
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
