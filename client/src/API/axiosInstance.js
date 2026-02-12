import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://meta-search-engine-2.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
