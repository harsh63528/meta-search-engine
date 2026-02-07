import axiosInstance from "./axiosInstance.js";

export const searchQuery = (query, type = "all") =>
  axiosInstance.get("/search", {
    params: { q: query, type },
  });
