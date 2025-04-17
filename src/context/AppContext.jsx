import { createContext, useContext, useState } from "react";
import jwtDecode from "jwt-decode";

// Appcontent 유저 정보를 담는 전역 저장소 생성
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return {
          email: decoded.sub,
          nickname: decoded.nickname,
          role: decoded.role,
        };
      } catch (err) {
        console.error("유저 정보", err);
        return null;
      }
    }
    return null;
  });

  return (
    // 하위 컴포넌트들에 `user`, `setUser`를 전역으로 제공
    // `children`은 감싸고 있는 하위 컴포넌트들 (즉 `App` 전체)
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useUser = () => useContext(AppContext);
