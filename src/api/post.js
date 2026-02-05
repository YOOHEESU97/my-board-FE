import axios from "./axiosInstance";

/**
 * 게시판(Post) 관련 API 함수 모음
 * - CRUD(생성, 조회, 수정, 삭제) 기능 제공
 */

/**
 * getPosts: 게시글 목록 조회
 */
export const getPosts = () => axios.get("/getPosts");

/**
 * createPost: 새 게시글 작성
 * Object data - 게시글 정보
 * string data.title - 제목
 * string data.content - 내용
 * string data.nickname - 작성자 닉네임
 * string data.email - 작성자 이메일
 */
export const createPost = (data) => axios.post("/create-posts", data);

/**
 * getPostById: 특정 게시글 상세 조회
 * number id - 게시글 ID
 * 게시글 상세 정보
 */
export const getPostById = (id) => axios.get(`/posts/${id}`);

/**
 * updatedPost: 게시글 수정
 * number id - 게시글 ID
 * Object updatedData - 수정할 데이터
 * string updatedData.title - 수정할 제목
 * string updatedData.content - 수정할 내용
 * 수정된 게시글 정보
 */
export const updatedPost = (id, updatedData) =>
  axios.put(`/posts/${id}`, updatedData);

/**
 * deletePostById: 게시글 삭제
 * number id - 삭제할 게시글 ID
 * 삭제 성공 여부
 */
export const deletePostById = (id) => axios.delete(`/posts/${id}`);
