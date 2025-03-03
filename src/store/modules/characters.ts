// store/modules/characters.ts
import axios from "axios";
import type { Module } from "vuex";
import type { CharactersState, Character, RootState, Info } from "../types";

const characters: Module<CharactersState, RootState> = {
  namespaced: true,

  state: {
    all: [],
    info: null,
    page: 1,
    loading: false,
    error: null,
    filters: {
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
    },
  },

  getters: {
    allCharacters: (state: CharactersState) => state.all,
    getInfo: (state: CharactersState) => state.info,
    getCurrentPage: (state: CharactersState) => state.page,
    isLoading: (state: CharactersState) => state.loading,
    getError: (state: CharactersState) => state.error,
    getFilters: (state: CharactersState) => state.filters,

    getQueryParams: (state: CharactersState) => {
      const params = new URLSearchParams();
      const filters = state.filters;

      if (filters.name) params.append("name", filters.name);
      if (filters.status) params.append("status", filters.status);
      if (filters.species) params.append("species", filters.species);
      if (filters.type) params.append("type", filters.type);
      if (filters.gender) params.append("gender", filters.gender);

      return params;
    },
  },

  actions: {
    async fetchCharacters({ commit, getters }: any) {
      commit("setLoading", true);
      commit("setError", null);

      try {
        const params = getters.getQueryParams;
        const page = getters.getCurrentPage;

        const response = await axios.get<{ info: Info; results: Character[] }>(
          `https://rickandmortyapi.com/api/character/?page=${page}&${params.toString()}`
        );

        commit("setCharacters", response.data.results);
        commit("setInfo", response.data.info);
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching characters:", error);
        commit("setCharacters", []);
        commit("setInfo", null);
        commit("setError", "Failed to fetch characters");
      } finally {
        commit("setLoading", false);
      }
    },

    setPage({ commit, dispatch }: any, page: number) {
      commit("setPage", page);
      dispatch("fetchCharacters");
    },

    setFilter(
      { commit, dispatch }: any,
      { key, value }: { key: string; value: string }
    ) {
      commit("setFilter", { key, value });
      commit("setPage", 1);
      dispatch("fetchCharacters");
    },

    clearFilters({ commit, dispatch }: any) {
      commit("resetFilters");
      commit("setPage", 1);
      dispatch("fetchCharacters");
    },
  },

  mutations: {
    setCharacters(state: CharactersState, characters: Character[]) {
      state.all = characters;
    },

    setInfo(state: CharactersState, info: Info | null) {
      state.info = info;
    },

    setPage(state: CharactersState, page: number) {
      state.page = page;
    },

    setLoading(state: CharactersState, loading: boolean) {
      state.loading = loading;
    },

    setError(state: CharactersState, error: string | null) {
      state.error = error;
    },

    setFilter(
      state: CharactersState,
      { key, value }: { key: string; value: string }
    ) {
      if (key in state.filters) {
        (state.filters as any)[key] = value;
      }
    },

    resetFilters(state: CharactersState) {
      state.filters.name = "";
      state.filters.status = "";
      state.filters.species = "";
      state.filters.type = "";
      state.filters.gender = "";
    },
  },
};

export default characters;
