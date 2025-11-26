import axios from "./axiosInstance";

// 댓글 목록 조회
export const fetchComments = (postId) => axios.get(`/posts/${postId}/comments`);

// 댓글 작성
export const createComment = (postId, { content, parentId = null }) =>
  axios.post(`/posts/${postId}/comments`, { content, parentId });
