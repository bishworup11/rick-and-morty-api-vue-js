<script setup lang="ts">
import Card from "@/components/Card.vue";
import Test from "./Test.vue";
import { watch, ref, reactive, computed, onMounted } from "vue";
import { NPagination } from "naive-ui";
import store, { useStore } from "../store";

// interface Character {
//   id: number;
//   name: string;
//   status: string;
//   species: string;
//   type: string;
//   gender: string;
//   origin: { name: string; url: string };
//   location: { name: string; url: string };
//   image: string;
//   episode: string[];
//   url: string;
//   created: string;
// }

// const characters = ref<Character[]>([]);
// const info = ref<{ pages: number } | null>(null);
// const page = ref(1);

// const filters = reactive({
//   name: "",
//   status: "",
//   species: "",
//   type: "",
//   gender: "",
// });

// // Computed property to construct API query parameters
// const queryParams = computed(() => {
//   const params = new URLSearchParams();
//   // params.append("page", page.value.toString());
//   if (filters.name) params.append("name", filters.name);
//   if (filters.status) params.append("status", filters.status);
//   if (filters.species) params.append("species", filters.species);
//   if (filters.type) params.append("type", filters.type);
//   if (filters.gender) params.append("gender", filters.gender);
//   return params.toString();
// });

// // Function to fetch characters based on query parameters
// const fetchCharacters = async () => {
//   try {
//     const response = await axios.get<{
//       info: { pages: number };
//       results: Character[];
//     }>(
//       `https://rickandmortyapi.com/api/character/?page=${page.value}${
//         queryParams.value ? "&" + queryParams.value : ""
//       }`
//     );
//     characters.value = response.data.results;
//     info.value = response.data.info;
//   } catch (error) {
//     console.error("Error fetching characters:", error);
//     characters.value = [];
//   }
// };
// watch(filters, () => {
//   page.value = 1;
// });

// // Watchers to trigger API call when filters or page changes

// watch([queryParams, page], fetchCharacters, { immediate: true });

// // Function to reset filters and go back to page 1
// const clearFilters = () => {
//   Object.assign(filters, {
//     name: "",
//     status: "",
//     species: "",
//     type: "",
//     gender: "",
//   });
//   page.value = 1;
// };

const characters = computed(() => store.getters["characters/allCharacters"]);
const isLoading = computed(() => store.getters["characters/isLoading"]);
const info = computed(() => store.getters["characters/getInfo"]);
const page = computed(() => store.getters["characters/getCurrentPage"]);
const filters = computed(() => store.getters["characters/getFilters"]);
function fetchCharacters() {
  store.dispatch("characters/fetchCharacters");
}

const handlePageChange = (newPage: number) => {
  store.dispatch("characters/setPage", newPage);
};

const updateFilter = (key: string, value: string) => {
  //console.log(key, value);
  store.dispatch("characters/setFilter", { key, value });
};

const clearFilters = () => {store.dispatch("characters/clearFilters"); };

onMounted(() => {
  fetchCharacters();
});
</script>

<template>
  <div class="filters-row">
    <!-- Name filter -->
    <div class="filter-item">
      <label for="name">Name</label>
      <input
        id="name"
        :value="filters.name"
        @input="updateFilter('name', ($event.target as HTMLInputElement).value)"
        type="text"
        placeholder="Filter by name"
      />
    </div>

    <!-- Status filter -->
    <div class="filter-item">
      <label for="status">Status</label>
      <select
        id="status"
        :value="filters.status"
        @input="
          updateFilter('status', ($event.target as HTMLSelectElement).value)
        "
      >
        <option value="">Any</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>

    <!-- Species filter -->
    <div class="filter-item">
      <label for="species">Species</label>
      <input
        id="species"
        :value="filters.species"
        @input="
          updateFilter('species', ($event.target as HTMLSelectElement).value)
        "
        type="text"
        placeholder="Filter by species"
      />
    </div>

    <!-- Gender filter -->
    <div class="filter-item">
      <label for="gender">Gender</label>
      <select
        id="gender"
        :value="filters.gender"
        @input="
          updateFilter('gender', ($event.target as HTMLSelectElement).value)
        "
      >
        <option value="">Any</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>

    <!-- Clear filters button -->
    <div class="filter-actions">
      <button class="clear-button" @click="clearFilters">Clear Filters</button>
    </div>
  </div>

  <div class="container">
    <Card
      v-for="character in characters"
      :key="character.id"
      :character="character"
    />
  </div>

  <!-- Naive UI Pagination -->
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

/* Filters Styling */
.filters-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.filter-item {
  display: flex;
  flex-direction: column;
  min-width: 150px;
  flex: 1;
}

.filter-item label {
  color: #131212;
  margin-bottom: 8px;
  margin-left: 4px;
  font-size: large;
}

.filter-item input,
.filter-item select {
  padding: 10px 12px;
  border: 1px solid #4a4d53;
  border-radius: 6px;
  background-color: #bbcedb;
  color: rgb(12, 12, 12);
  font-size: 0.95rem;
}

.clear-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.clear-button:hover {
  background-color: #c0392b;
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
