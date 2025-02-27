<script setup lang="ts">
import LocationCard from "./LocationCard.vue";

import axios from "axios";
import { watch, ref, onMounted, reactive } from "vue";
import { NPagination } from "naive-ui";

interface LocationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // Array of resident URLs
  url: string;
  created: string; // ISO date string
}

interface LocationResponse {
  info: LocationInfo;
  results: Location[];
}

const locations = ref<LocationResponse | null>(null);

const page = ref(1);

const response = await axios.get<LocationResponse>(
  "https://rickandmortyapi.com/api/location"
);
console.log(response);
locations.value = response.data;

watch(page, async () => {
  const res = await axios.get<LocationResponse>(
    `https://rickandmortyapi.com/api/location/?page=${page.value}`
  );
  locations.value = res.data;
});
</script>

<template>
  <div class="container">
    <LocationCard
      v-for="location in locations?.results"
      :key="location.id"
      :location="location"
    />
  </div>
  <div class="pagination">
    <n-pagination
      v-model:page="page"
      :page-count="locations?.info?.pages || 1"
      show-quick-jumper
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem 2rem;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
}

/* Pagination Styling */
.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  /* background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem; */
}
</style>
