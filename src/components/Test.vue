<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "../store";

const store = useStore();

const characters = computed(() => store.getters["characters/allCharacters"]);
const isLoading = computed(() => store.getters["characters/isLoading"]);

function fetchCharacters() {
  store.dispatch("characters/fetchCharacters");
}

console.log(characters);
onMounted(() => {
  fetchCharacters();
});
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-for="character in characters" :key="character.id">
        {{ character.name }}
      </div>
    </div>
  </div>
</template>



