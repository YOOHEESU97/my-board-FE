import { toast } from "react-toastify";
import SessionExpiredToast from "./SessionExpiredToast.jsx";

/**
 * ToastManager: 토스트 알림 관리 유틸리티
 * - react-toastify를 사용한 전역 알림 시스템
 * - 세션 만료 토스트 표시 함수 제공
 */

/**
 * showSessionExpiredToast: 세션 만료 알림 토스트 표시
 * - JWT 토큰 만료 시 axiosInstance에서 호출
 * - 자동으로 닫히지 않음 (사용자가 직접 로그인 페이지로 이동해야 함)
 * - SessionExpiredToast 컴포넌트를 토스트로 표시
 */
export function showSessionExpiredToast() {
  toast(<SessionExpiredToast />, {
    autoClose: false, // 자동으로 닫히지 않음
    closeOnClick: false, // 클릭으로 닫히지 않음
    draggable: false, // 드래그 불가
    pauseOnHover: false, // 호버 시 일시정지 안 함
    hideProgressBar: true, // 프로그레스바 숨김
    position: "top-center", // 화면 상단 중앙
  });
}
