// store/types.ts - Define your state interfaces

import Episodes from "@/components/Episodes.vue";

// for Character
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharactersState {
  all: Character[];
  info: Info | null;
  page: number;
  loading: boolean;
  error: string | null;
  filters: {
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
  };
}
// for locations

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // Array of resident URLs
  url: string;
  created: string; // ISO date string
}
export interface LocationState {
  all: Location[];
  info: Info | null;
  page: number;
  loading: boolean;
  error: string | null;
}

// for episodes
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface EpisodeState {
  all: Episode[];
  info: Info | null;
  page: number;
  loading: boolean;
  error: string | null;
}
// for auth

export interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

// Root state
export interface RootState {
  characters: CharactersState;
  locations: LocationState;
  episodes: Episode[];
  auth: AuthState;
}
