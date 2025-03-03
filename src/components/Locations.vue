<script setup lang="ts">
import LocationCard from "./LocationCard.vue";
import axios from "axios";
import { watch, ref, onMounted, reactive, computed } from "vue";
import { NPagination } from "naive-ui";
import store, { useStore } from "../store";

const locations = computed(() => store.getters["locations/allLocations"]);
const page = computed(() => store.getters["locations/getCurrentPage"]);
const info = computed(() => store.getters["locations/getInfo"]);
const isLoading = computed(() => store.getters["locations/isLoading"]);

function fetchLocation() {
  store.dispatch("locations/fetchLocations");
}
function handlePageChange(page: number) {
  store.dispatch("locations/setPage", page);
}
onMounted(() => {
  fetchLocation();
});
</script>

<template>
  <div class="container">
    <LocationCard
      v-for="location in locations"
      :key="location.id"
      :location="location"
    />
  </div>
  <div class="pagination">
    <n-pagination
      :page="page"
      :page-count="info?.pages || 1"
      show-quick-jumper
      @update:page="handlePageChange"
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
