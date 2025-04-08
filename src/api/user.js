import axios from "./axiosInstance";

export const registerUser = (userData) => {
  return axios.post("/users/register", userData);
};

export const loginUser = (loginData) => {
  return axios.post("/users/login", loginData);
};
