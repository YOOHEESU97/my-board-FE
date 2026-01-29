import axios from "./axiosInstance";

/**
 * 사용자 인증 관련 API 함수 모음
 * - 회원가입, 로그인, 닉네임 중복 확인 기능
 */

/**
 * registerUser: 회원가입 API 호출
 * Object userData - 회원가입 정보
 * string userData.email - 이메일 (아이디로 사용)
 * string userData.password - 비밀번호 (8자 이상)
 * string userData.nickname - 닉네임
 * returns {romise axios 응답 Promise
 */
export const registerUser = (userData) => {
  return axios.post("/users/register", userData);
};

/**
 * loginUser: 로그인 API 호출
 * Object loginData - 로그인 정보
 * string loginData.email - 이메일
 * string loginData.password - 비밀번호
 * Promise axios 응답에 accessToken, refreshToken 포함
 */
export const loginUser = (loginData) => {
  return axios.post("/users/login", loginData);
};

/**
 * checkNickname: 닉네임 중복 확인 API 호출
 * - 회원가입 시 닉네임 사용 가능 여부 확인
 * string nickname - 확인할 닉네임
 * Promise axios 응답 사용 가능하면 200, 중복이면 에러 응답
 */
export const checkNickname = (nickname) => {
  return axios.get(`/users/check-nickname?nickname=${nickname}`);
};
