// import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from "vuex";
import characters from "./modules/characters";
import locations from "./modules/locations";
import episodes from "./modules/episodes";

import type { InjectionKey } from "vue";
import type { RootState } from "./types";

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules: {
    characters,
    locations,
    episodes,
  },
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}

export default store;
