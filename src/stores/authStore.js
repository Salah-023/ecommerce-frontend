import { defineStore } from "pinia";
import axios from "../api/axios-auth"; // Our custom Axios instance

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || null,
    user_id: localStorage.getItem("user_id"),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,  // Ensure boolean value
    getToken: (state) => state.token,
    getRole: (state) => state.role,
    getUserId: (state) => state.user_id,
  },
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post("users/login", credentials);
        this.token = response.data.token;
        this.role = response.data.role;
        this.user_id = response.data.user_id

        localStorage.setItem("token", this.token);
        localStorage.setItem("role", this.role);
        localStorage.setItem("user_id", this.user_id);
      } catch (error) {
        throw new Error("Login failed. Please check your credentials.");
      }
    },
    logout() {
      this.token = "";
      this.role = null;
      this.user_id = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user_id");
    }
  }
});
