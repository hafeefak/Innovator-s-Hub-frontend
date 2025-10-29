import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "https://localhost:7244",
});

// ✅ Automatically add Authorization header with token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user")); // ✅ get full user object
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized: clearing user session");
      localStorage.removeItem("user"); // ✅ remove correct key
      window.location.href = "/login"; // optional: redirect automatically
    }
    return Promise.reject(error);
  }
);

export default api;