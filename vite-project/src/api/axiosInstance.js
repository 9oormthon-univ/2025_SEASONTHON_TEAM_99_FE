import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "/api",

  baseURL: "http://3.38.207.66:8080/",
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
