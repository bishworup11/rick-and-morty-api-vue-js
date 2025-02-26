<script setup lang="ts">
import Card from "@/components/Card.vue";
import HeroBanner from "@/components/HeroBanner.vue";

import axios from "axios";
import { watch, ref, onMounted } from "vue";

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

onMounted(async () => {
  const response = await axios.get<{ results: Character[] }>(
    "https://rickandmortyapi.com/api/character"
  );
  console.log(response);
  characters.value = response.data.results;
  console.log( characters.value );
});

watch(page, async () => {
  const res = await axios.get<{ results: Character[] }>(
    `https://rickandmortyapi.com/api/character/?page=${page.value}`
  );
  characters.value = res.data.results;
});
</script>

<template>
  <main>
    <HeroBanner />

    <div class="container">
      <Card v-for="character in characters" :key="character.id" :character="character" />
    </div>
    
  </main>
</template>

<style scoped>

   .container{
     display: flex;
     flex-wrap: wrap;
    justify-content: space-between;

   }
</style>
