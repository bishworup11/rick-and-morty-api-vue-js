// store/modules/auth.ts
import axios from "axios";
import type { Module } from "vuex";
import type { RootState } from "../types";
import router from "@/router";

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const auth: Module<AuthState, RootState> = {
  namespaced: true,

  state: {
    user: null,
    loading: false,
    error: null,
  },

  getters: {
    isAuthenticated: (state: AuthState) => !!state.user,
    getUser: (state: AuthState) => state.user,
    isLoading: (state: AuthState) => state.loading,
    getError: (state: AuthState) => state.error,
  },

  actions: {
    async login(
      { commit },
      credentials: { username: string; password: string }
    ) {
      commit("setLoading", true);
      commit("setError", null);

      try {
        const response = await axios.post(
          "https://dummyjson.com/auth/login",
          {
            username: credentials.username,
            password: credentials.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        commit("setUser", response.data);
        localStorage.setItem("userSession", JSON.stringify(response.data));
        router.push("/");
      } catch (error) {
        console.error("Login failed:", error);
        commit("setError", "Invalid username or password");
      } finally {
        commit("setLoading", false);
      }
    },

    logout({ commit }) {
      commit("setUser", null);
      localStorage.removeItem("userSession");
      router.push("/login");
    },

    initializeAuth({ commit }) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        commit("setUser", JSON.parse(userSession));
      }
    },
  },

  mutations: {
    setUser(state: AuthState, user: any) {
      state.user = user;
    },

    setLoading(state: AuthState, loading: boolean) {
      state.loading = loading;
    },

    setError(state: AuthState, error: string | null) {
      state.error = error;
    },
  },
};

export default auth;
