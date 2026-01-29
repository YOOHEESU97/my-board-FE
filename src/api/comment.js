import axios from "./axiosInstance";

/**
 * 댓글(Comment) 관련 API 함수 모음
 * - 계층형 댓글 구조 지원 (대댓글, 대대댓글 무한 뎁스)
 */

/**
 * fetchComments: 특정 게시글의 댓글 목록 조회
 * - 계층 구조 데이터 (parentId로 부모-자식 관계 표현)
 * @param {number} postId - 게시글 ID
 * @returns {Promise} 댓글 배열 (flat 구조, parentId 포함)
 */
export const fetchComments = (postId) => axios.get(`/posts/${postId}/comments`);

/**
 * createComment: 댓글 작성 (일반 댓글 + 대댓글)
 * - parentId가 null이면 일반 댓글 (루트 댓글)
 * - parentId가 있으면 해당 댓글의 답글 (대댓글, 대대댓글 등)
 * @param {number} postId - 게시글 ID
 * @param {Object} commentData - 댓글 정보
 * @param {string} commentData.content - 댓글 내용
 * @param {number|null} commentData.parentId - 부모 댓글 ID (없으면 null)
 * @returns {Promise} 생성된 댓글 정보
 */
export const createComment = (postId, { content, parentId = null }) =>
  axios.post(`/posts/${postId}/comments`, { content, parentId });
