import axios from "./axiosInstance";

/**
 * 게시판(Post) 관련 API 함수 모음
 * - CRUD(생성, 조회, 수정, 삭제) 기능 제공
 */

/**
 * getPosts: 게시글 목록 조회
 * @returns {Promise} 전체 게시글 배열
 */
export const getPosts = () => axios.get("/getPosts");

/**
 * createPost: 새 게시글 작성
 * @param {Object} data - 게시글 정보
 * @param {string} data.title - 제목
 * @param {string} data.content - 내용
 * @param {string} data.nickname - 작성자 닉네임
 * @param {string} data.email - 작성자 이메일
 * @returns {Promise} 생성된 게시글 정보
 */
export const createPost = (data) => axios.post("/create-posts", data);

/**
 * getPostById: 특정 게시글 상세 조회
 * @param {number} id - 게시글 ID
 * @returns {Promise} 게시글 상세 정보
 */
export const getPostById = (id) => axios.get(`/posts/${id}`);

/**
 * updatedPost: 게시글 수정
 * @param {number} id - 게시글 ID
 * @param {Object} updatedData - 수정할 데이터
 * @param {string} updatedData.title - 수정할 제목
 * @param {string} updatedData.content - 수정할 내용
 * @returns {Promise} 수정된 게시글 정보
 */
export const updatedPost = (id, updatedData) =>
  axios.put(`/posts/${id}`, updatedData);

/**
 * deletePostById: 게시글 삭제
 * @param {number} id - 삭제할 게시글 ID
 * @returns {Promise} 삭제 성공 여부
 */
export const deletePostById = (id) => axios.delete(`/posts/${id}`);

/**
 * getTrackingDelivery: 배송 추적 정보 조회
 * - 백엔드를 거쳐 외부 배송 조회 API 호출
 * @param {Object} selectedCarrier - 택배사 및 운송장 정보
 * @param {string} selectedCarrier.carrier - 택배사 코드 (예: "04" = CJ대한통운)
 * @param {string} selectedCarrier.invoice - 운송장 번호
 * @returns {Promise} 배송 추적 상세 정보
 */
export const getTrackingDelivery = (selectedCarrier) =>
  axios.post("/getTrackingDelivery", selectedCarrier);
