<script setup lang="ts">
import Card from "@/components/Card.vue";
import HeroBanner from "@/components/HeroBanner.vue";

import axios from "axios";
import { watch, ref, onMounted, computed, reactive } from "vue";

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
const info = ref(null);

const page = ref(1);

const response = await axios.get<{ info: any; results: Character[] }>(
  "https://rickandmortyapi.com/api/character"
);
console.log(response);
characters.value = response.data.results;
info.value = response.data.info;
console.log(info.value, characters.value);

watch(page, async () => {
  const res = await axios.get<{ results: Character[] }>(
    `https://rickandmortyapi.com/api/character/?page=${page.value}`
  );
  characters.value = res.data.results;
});

const filters = reactive({
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
});

const emit = defineEmits(["filter-change"]);

// Generate URL query string based on active filters
const getQueryString = () => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  return params.toString();
};

// Compute if there are any active filters
const hasActiveFilters = computed(() => {
  return Object.values(filters).some((value) => value !== "");
});

// Get only the active filters
const activeFilters = computed(() => {
  return Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== "")
  );
});

// Apply filters and emit event with query string
const applyFilters = () => {
  const queryString = getQueryString();
  emit("filter-change", queryString, { ...filters });
};

// Clear all filters
const clearFilters = () => {
  Object.keys(filters).forEach((key) => {
    filters[key] = "";
  });
  applyFilters();
};

// Remove a specific filter
const removeFilter = (key: any) => {
  filters[key] = "";
  applyFilters();
};
</script>

<template>
  <div class="filters-row">
    <!-- Name filter -->
    <div class="filter-item">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="filters.name"
        type="text"
        placeholder="Filter by name"
        @input="applyFilters"
      />
    </div>

    <!-- Status filter -->
    <div class="filter-item">
      <label for="status">Status</label>
      <select id="status" v-model="filters.status" @change="applyFilters">
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
        v-model="filters.species"
        type="text"
        placeholder="Filter by species"
        @input="applyFilters"
      />
    </div>

    <!-- Type filter
    <div class="filter-item">
      <label for="type">Type</label>
      <input
        id="type"
        v-model="filters.type"
        type="text"
        placeholder="Filter by type"
        @input="applyFilters"
      />
    </div> -->

    <!-- Gender filter -->
    <div class="filter-item">
      <label for="gender">Gender</label>
      <select id="gender" v-model="filters.gender" @change="applyFilters">
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
/* filter style */

.filters-container {
  width: 100%;
  background-color: #3c3e44;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.filters-title {
  color: #ffffff;
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.2rem;
}

.filters-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.filter-item {
  display: flex;
  flex-direction: column;
  min-width: 150px;
  flex: 1;
  justify-content: center;
  /* align-items: center; */
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

.filter-item input:focus,
.filter-item select:focus {
  outline: none;
  border-color: #ff9800;
}

.filter-item input::placeholder {
  color: #6d6d6d;
}

.filter-actions {
  display: flex;
  align-items: flex-end;
  padding-bottom: 2px;
}

.clear-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  margin-top: 1.8rem;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.clear-button:hover {
  background-color: #c0392b;
}

.active-filters {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.active-filters-label {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.active-filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-tag {
  background-color: #2196f3;
  color: white;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
}

.remove-filter {
  background: none;
  border: none;
  color: white;
  margin-left: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 0.8;
  padding: 2px;
}

.remove-filter:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .filters-row {
    flex-direction: column;
    gap: 12px;
  }

  .filter-item {
    width: 100%;
  }

  .filter-actions {
    width: 100%;
    margin-top: 5px;
  }

  .clear-button {
    width: 100%;
  }
}
</style>
