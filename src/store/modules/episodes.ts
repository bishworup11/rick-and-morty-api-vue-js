import axios from "axios";
import type { Module } from "vuex";
import type { EpisodeState, Episode, RootState, Info } from "../types";

const episodes: Module<EpisodeState, RootState> = {
  namespaced: true,
  state: {
    all: [],
    info: null,
    page: 1,
    loading: false,
    error: null,
  },
  getters: {
    allEpisodes: (state: EpisodeState) => state.all,
    getInfo: (state: EpisodeState) => state.info,
    getCurrentPage: (state: EpisodeState) => state.page,
    isLoading: (state: EpisodeState) => state.loading,
    getError: (state: EpisodeState) => state.error,
  },
  actions: {
    async fetchEpisodes({ commit, state }: any) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const response = await axios.get<{ info: Info; results: Episode[] }>(
          `https://rickandmortyapi.com/api/episode/?page=${state.page}`
        );

        commit("setEpisodes", response.data.results);
        commit("setInfo", response.data.info);
      } catch (error) {
        console.error("Error fetching Episodes:", error);
        commit("setEpisodes", []);
        commit("setInfo", null);
        commit("setError", error);
      } finally {
        commit("setLoading", false);
      }
    },
    setPage({ commit, dispatch }: any, page: number) {
      commit("setPage", page);
      dispatch("fetchEpisodes");
    },
  },
  mutations: {
    setEpisodes(state: EpisodeState, episodes: Episode[]) {
      state.all = episodes;
    },
    setInfo(state: EpisodeState, info: Info | null) {
      state.info = info;
    },
    setPage(state: EpisodeState, page: number) {
      state.page = page;
    },
    setLoading(state: EpisodeState, loading: boolean) {
      state.loading = loading;
    },
    setError(state: EpisodeState, error: string | null) {
      state.error = error;
    },
  },
};

export default episodes;
