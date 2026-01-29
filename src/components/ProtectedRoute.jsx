import { Navigate } from "react-router-dom";
import { useUser } from "../context/AppContext";

/**
 * ProtectedRoute: 인증이 필요한 라우트 보호 컴포넌트
 * - 로그인하지 않은 사용자가 접근 시 로그인 페이지로 리다이렉트
 * - Context의 user 상태로 인증 여부 확인
 * 
 * React.ReactNode children - 보호할 컴포넌트
 */
export default function ProtectedRoute({ children }) {
  const { user } = useUser();

  // 토큰이 없는 경우 로그인 페이지로 리다이렉트
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 로그인한 경우 원래 컴포넌트 렌더링
  return children;
}
