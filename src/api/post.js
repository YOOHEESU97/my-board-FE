// src/api/post.js
import axios from "./axiosInstance";

export const getPosts = () => axios.get("/getPosts");
export const createPost = (data) => axios.post("/create-posts", data);
export const getPostById = (id) => axios.get(`/posts/${id}`);
