import { createContext, useContext, useState } from "react";
import jwtDecode from "jwt-decode";

/**
 * AppContext: 애플리케이션 전역에서 사용자 인증 정보를 관리하는 Context
 * - JWT 토큰 기반 인증 시스템
 * - localStorage에 저장된 accessToken을 디코딩하여 사용자 정보 추출
 */
const AppContext = createContext();

/**
 * AppProvider: Context Provider 컴포넌트
 * - 앱 초기 로드 시 localStorage에서 accessToken을 읽어 사용자 정보 복원
 * - 로그인/로그아웃 시 전역적으로 사용자 상태 관리
 * @param {React.ReactNode} children - 하위 컴포넌트
 */
export const AppProvider = ({ children }) => {
  // 초기 state: localStorage의 토큰에서 사용자 정보 추출
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        // JWT 토큰 디코딩 (payload에서 사용자 정보 추출)
        const decoded = jwtDecode(token);
        return {
          email: decoded.sub, // JWT의 subject 필드 (이메일)
          nickname: decoded.nickname, // 닉네임
          role: decoded.role, // 사용자 권한 (예: USER, ADMIN)
        };
      } catch (err) {
        console.error("토큰 디코딩 실패:", err);
        return null;
      }
    }
    return null;
  });

  return (
    

    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * useUser: user와 setUser를 반환하는 커스텀 훅
 * - 컴포넌트에서 사용자 정보에 쉽게 접근하기 위한 헬퍼 훅
 * @returns {{ user: Object | null, setUser: Function }}
 */
export const useUser = () => useContext(AppContext);
