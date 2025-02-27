<script setup lang="ts">
import Card from "@/components/Card.vue";
import HeroBanner from "@/components/HeroBanner.vue";

import axios from "axios";
import { watch, ref, onMounted, reactive } from "vue";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[]; // Array of episode URLs
  url: string;
  created: string; // ISO date string
}

const characters = ref<Character[] | null>(null);

const page = ref(1);

// const response = await axios.get(
//   "https://www.breakingbadapi.com/api/characters?limit=8"
// );
// characters.value = response.data;

const response = await axios.get<{ results: Character[] }>(
  "https://rickandmortyapi.com/api/character"
);
console.log(response);
characters.value = response.data.results;
console.log(characters.value);

watch(page, async () => {
  const res = await axios.get<{ results: Character[] }>(
    `https://rickandmortyapi.com/api/character/?page=${page.value}`
  );
  characters.value = res.data.results;
});
</script>

<template>
  <div>
    <HeroBanner />

    <div class="container">
      <Card
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </div>
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
</style>
