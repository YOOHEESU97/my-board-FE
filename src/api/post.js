// src/api/post.js
import axios from "./axiosInstance";

export const getPosts = () => axios.get("/getPosts");
export const createPost = (data) => axios.post("/create-posts", data);
export const getPostById = (id) => axios.get(`/posts/${id}`);
export const updatedPost = (id, updatedData) =>
  axios.put(`/posts/${id}`, updatedData);
export const deletePostById = (id) => axios.delete(`/posts/${id}`);
