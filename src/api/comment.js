import axios from "./axiosInstance";

/** 댓글(Comment) 관련 API 함수 모음 */
/**
 * fetchComments: 특정 게시글의 댓글 목록 조회
 * number postId - 게시글 ID
 */
export const fetchComments = (postId) => axios.get(`/posts/${postId}/comments`);

/**
 * createComment: 댓글 작성 (일반 댓글 + 대댓글)
 * - parentId가 null이면 일반 댓글 (루트 댓글)
 * - parentId가 있으면 해당 댓글의 답글 (대댓글, 대대댓글 등)
 * number postId - 게시글 ID
 * Object commentData - 댓글 정보
 * string commentData.content - 댓글 내용
 * number|null commentData.parentId - 부모 댓글 ID (없으면 null)
 */
export const createComment = (postId, { content, parentId = null }) =>
  axios.post(`/posts/${postId}/comments`, { content, parentId });

/**
 * deleteComment: 댓글 삭제 (soft delete)
 * - 실제로 삭제하지 않고 deleted 필드를 true로 변경
 * - 삭제된 댓글은 "삭제 처리된 댓글입니다."로 표시
 * number postId - 게시글 ID
 * number commentId - 댓글 ID
 */
export const deleteComment = (postId, commentId) =>
  axios.delete(`/posts/${postId}/comments/${commentId}`);
