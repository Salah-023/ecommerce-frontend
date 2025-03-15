import axios from "axios";
import { useAuthStore } from "@/stores/authStore"; 
  
// Create an authenticated Axios instance
const axiosAuthenticated = axios.create({
  baseURL: "http://localhost:80/", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to Attach Token
axiosAuthenticated.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.getToken; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to Handle Unauthorized Errors
axiosAuthenticated.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      window.location.href = "/login"; // Redirect user if unauthorized
    }
    return Promise.reject(error);
  }
);

export default axiosAuthenticated;
