import axios from "axios";
import type { Module } from "vuex";
import type { LocationState, Location, RootState, Info } from "../types";
import { error } from "naive-ui/es/_utils/naive/warn";

const locations: Module<LocationState, RootState> = {
  namespaced: true,
  state: {
    all: [],
    info: null,
    page: 1,
    loading: false,
    error: null,
  },
  getters: {
    allLocations: (state: LocationState) => state.all,
    getInfo: (state: LocationState) => state.info,
    getCurrentPage: (state: LocationState) => state.page,
    isLoading: (state: LocationState) => state.loading,
    getError: (state: LocationState) => state.error,
  },
  actions: {
    async fetchLocations({ commit }: any) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const page = locations.state.page;

        const response = await axios.get<{ info: Info; results: Location[] }>(
          `https://rickandmortyapi.com/api/location/?page=${page}`
        );
        //console.log(response.data);

        commit("setLocations", response.data.results);
        commit("setInfo", response.data.info);
      } catch (error) {
        console.error("Error fetching Locations:", error);
        commit("setLocations", []);
        commit("setInfo", null);
        commit("setError", error);
      } finally {
        commit("setLoading", false);
      }
    },
    setPage({ commit, dispatch }: any, page: number) {
      commit("setPage", page);
      dispatch("fetchLocations");
    },
  },
  mutations: {
    setLocations(state: LocationState, locations: Location[]) {
      state.all = locations;
    },
    setInfo(state: LocationState, info: Info | null) {
      state.info = info;
    },
    setPage(state: LocationState, page: number) {
      state.page = page;
    },
    setLoading(state: LocationState, loading: boolean) {
      state.loading = loading;
    },

    setError(state: LocationState, error: string | null) {
      state.error = error;
    },
  },
};

const state = locations.state;

export default locations;
