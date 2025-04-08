// src/api/post.js
import axios from "./axiosInstance";

export const getPosts = () => axios.get("/posts");
export const createPost = (data) => axios.post("/posts", data);
export const getPostById = (id) => axios.get(`/posts/${id}`);
