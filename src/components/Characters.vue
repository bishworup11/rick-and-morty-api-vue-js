<script setup lang="ts">
import Card from "@/components/Card.vue";
import { computed, onMounted } from "vue";
import { NPagination, NSpin } from "naive-ui";
import store, { useStore } from "../store";

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

const clearFilters = () => {
  store.dispatch("characters/clearFilters");
};

onMounted(() => {
  fetchCharacters();
});
</script>

<template>
  <div v-if="isLoading"><NSpin size="large" /></div>

  <div v-else>
    <div class="filters-row">
      <!-- Name filter -->
      <div class="filter-item">
        <label for="name">Name</label>
        <input
          id="name"
          :value="filters.name"
          @input="
            updateFilter('name', ($event.target as HTMLInputElement).value)
          "
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
        <button class="clear-button" @click="clearFilters">
          Clear Filters
        </button>
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
