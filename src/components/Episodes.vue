// EpisodeList.vue
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import EpisodeCard from "./EpisodeCard.vue";
import { NPagination } from "naive-ui";

interface EpisodeInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

interface EpisodeResponse {
  info: EpisodeInfo;
  results: Episode[];
}

const episodes = ref<EpisodeResponse | null>(null);
const page = ref(1);

const response = await axios.get<EpisodeResponse>(
  "https://rickandmortyapi.com/api/episode"
);
console.log(response);
episodes.value = response.data;

watch(page, async () => {
  const res = await axios.get<EpisodeResponse>(
    `https://rickandmortyapi.com/api/episode/?page=${page.value}`
  );
  episodes.value = res.data;
});
</script>

<template>
  <div class="container">
    <EpisodeCard
      v-for="episode in episodes?.results"
      :key="episode.id"
      :episode="episode"
    />
  </div>
  <div class="pagination">
    <n-pagination
      v-model:page="page"
      :page-count="episodes?.info?.pages || 1"
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

.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  /* background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem; */
}
</style>
