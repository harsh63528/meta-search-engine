import axiosInstance from "./axiosInstance.js";

//  Register
export const registerUser = (data) => {
  return axiosInstance.post("/auth/register", data);
};

//  Login
export const loginUser = (data) => {
  return axiosInstance.post("/auth/login", data);
};

//  Logout
export const logoutUser = () => {
  return axiosInstance.post("/auth/logout");
};

//  Get Logged-in User
export const getProfile = () => {
  return axiosInstance.get("/auth/me");
};

//  Update Profile Image
export const updateProfileImage = (formData) => {
  return axiosInstance.put("/auth/profile-image", formData);
};
