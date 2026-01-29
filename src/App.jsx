import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "./Router";
import { setUserSetter } from "./utils/userUpdater";
import { useUser } from "./context/AppContext";

/**
 * App: 애플리케이션의 최상위 컴포넌트
 * - 라우팅 설정 (BrowserRouter)
 * - 토스트 알림 컨테이너 (세션 만료, 에러 메시지 등)
 * - userUpdater 초기화 (토큰 갱신 시 Context 업데이트)
 */
function App() {
  const { setUser } = useUser();
  
  /**
   * userUpdater에 setUser 함수 등록
   * - axiosInstance의 인터셉터에서 토큰 갱신 시 Context도 함께 업데이트하기 위함
   */
  useEffect(() => {
    setUserSetter(setUser);
  }, [setUser]); // dependency 추가 (최적화)

  return (
    <BrowserRouter>
      {/* 라우팅 설정 */}
      <Router />
      
      {/* 전역 토스트 알림 컨테이너 */}
      <ToastContainer
        position="top-center"
        autoClose={false} // 수동으로 닫기 (세션 만료 알림은 자동 닫힘 방지)
        closeOnClick={false}
        draggable={false}
        hideProgressBar
        toastClassName="!w-full !flex !justify-center !items-center"
        bodyClassName="text-center"
      />
    </BrowserRouter>
  );
}

export default App;
