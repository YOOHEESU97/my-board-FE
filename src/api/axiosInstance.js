import axios from "axios";
import { showSessionExpiredToast } from "../components/ToastManager.jsx";
import { updateUserFromToken } from "../utils/userUpdater";

/**
 * axiosInstance: JWT 토큰 기반 인증을 자동으로 처리하는 Axios 인스턴스
 * - 모든 API 요청에 자동으로 accessToken을 헤더에 추가
 * - 401/403 에러 발생 시 refreshToken으로 accessToken 자동 갱신
 * - 토큰 갱신 실패 시 세션 만료 토스트 표시 후 로그아웃 처리
 */
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // 백엔드 API 서버 주소 (로컬)
  withCredentials: true, // 쿠키 포함
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 요청 인터셉터: 모든 API 요청에 Authorization 헤더 자동 추가
 * - localStorage에서 accessToken을 읽어 Bearer 토큰 형식으로 추가
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 응답 인터셉터: 401/403 에러 발생 시 토큰 재발급 시도
 * - 401 Unauthorized: accessToken 만료 (구글참고)
 * - 403 Forbidden: 권한 없음 (토큰 만료로도 발생 가능) (구글참고)
 * - refreshToken으로 새 accessToken 발급 후 원래 요청 재시도
 * - 재발급 실패 시 세션 만료 처리 (로그아웃)
 */
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 401/403 에러이고, 아직 재시도하지 않았으며, refreshToken이 있는 경우
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true; // 무한 루프 방지 플래그

      try {
        // refreshToken으로 새 accessToken 발급 요청
        const res = await axios.post(
          "http://localhost:8080/api/users/reissue",
          {
            accessToken: localStorage.getItem("accessToken"),
            refreshToken: localStorage.getItem("refreshToken"),
          }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        
        // 원래 요청의 Authorization 헤더 업데이트
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        
        // Context의 user 정보도 업데이트
        updateUserFromToken(newAccessToken);

        // 새 토큰으로 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 토큰 재발급 실패 (refreshToken도 만료된 경우)
        console.error("토큰 재발급 실패:", refreshError);
        
        // 세션 만료 안내 토스트 표시
        showSessionExpiredToast();
        
        // 로컬 스토리지에서 토큰 제거 (로그아웃 처리)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
