import axiosInstance from "./axiosInstance.js";

export const registerUser = (data) =>
  axiosInstance.post("/auth/register", data);

export const loginUser = (data) =>
  axiosInstance.post("/auth/login", data);

export const logoutUser = () =>
  axiosInstance.post("/auth/logout");

export const getProfile = () =>
  axiosInstance.get("/auth/me");

export const updateProfileImage = (formData) =>
  axiosInstance.put("/auth/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
