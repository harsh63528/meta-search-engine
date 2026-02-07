import axios from "./axiosInstance.js";

export const getHistory = () =>
  axios.get("/history");

export const trackClick = (data) =>
  axios.post("/history/click", data);
