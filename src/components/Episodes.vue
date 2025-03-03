<script setup lang="ts">
import EpisodeCard from "./EpisodeCard.vue";
import { computed, onMounted } from "vue";
import { NPagination } from "naive-ui";
import store from "../store";

const episodes = computed(() => store.getters["episodes/allEpisodes"]);
const page = computed(() => store.getters["episodes/getCurrentPage"]);
const info = computed(() => store.getters["episodes/getInfo"]);
const isLoading = computed(() => store.getters["episodes/isLoading"]);

function fetchEpisodes() {
  store.dispatch("episodes/fetchEpisodes");
}

function handlePageChange(newPage: number) {
  store.dispatch("episodes/setPage", newPage);
}

onMounted(() => {
  fetchEpisodes();
});
</script>

<template>
  <div class="container">
    <EpisodeCard
      v-for="episode in episodes"
      :key="episode.id"
      :episode="episode"
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

.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>
