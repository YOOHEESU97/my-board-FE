import jwtDecode from "jwt-decode";

/**
 * userUpdater: Context 외부에서 user 상태를 업데이트하기 위한 유틸리티
 * - axiosInstance의 인터셉터에서 토큰 갱신 시 user 정보도 동기화하기 위해 사용
 * - Context의 setUser 함수를 외부 모듈에서도 호출할 수 있도록 중개
 */

// Context의 setUser 함수를 저장할 변수
let externalSetUser = null;

/**
 * setUserSetter: Context의 setUser 함수를 등록
 * - App.jsx에서 useEffect로 초기화 시 호출
 * @param {Function} fn - Context의 setUser 함수
 */
export const setUserSetter = (fn) => {
  externalSetUser = fn;
};

/**
 * updateUserFromToken: JWT 토큰에서 사용자 정보를 추출하여 Context 업데이트
 * - accessToken 갱신 시 자동으로 user 정보 동기화
 * @param {string} token - 새로 발급받은 JWT accessToken
 */
export const updateUserFromToken = (token) => {
  if (!externalSetUser) return;
  
  // JWT 토큰 디코딩
  const decoded = jwtDecode(token);
  
  // Context의 user 상태 업데이트
  externalSetUser({
    email: decoded.sub,
    nickname: decoded.nickname,
    role: decoded.role,
  });
};
