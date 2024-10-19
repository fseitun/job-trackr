import axios, { isAxiosError } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
    } else {
      console.error("Non-Axios error:", error);
    }
    return Promise.reject(error);
  }
);

export default api;
