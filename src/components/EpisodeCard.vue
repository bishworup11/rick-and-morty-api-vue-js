// EpisodeCard.vue
<script setup lang="ts">
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

const props = defineProps<{ episode: Episode }>();
</script>

<template>
  <div class="episode-card">
    <div class="episode-header">
      <h2 class="episode-name">{{ episode.name }}</h2>
      <div class="episode-code">{{ episode.episode }}</div>
    </div>

    <div class="episode-body">
      <div class="info-item">
        <span class="info-label">Air Date:</span>
        <span class="info-value">{{ episode.air_date }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Characters:</span>
        <span class="info-value">{{ episode.characters.length }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.episode-card {
  width: 100%;
  max-width: 340px;
  background-color: #3c3e44;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1.5rem;
}

.episode-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.episode-header {
  /* background-color: #ff9800; */
  background-color: #3498db;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.episode-name {
  margin: 0;
  font-size: 1.5rem;
  color: #1f2937;
  font-weight: 700;
}

.episode-code {
  background-color: #1f2937;
  /* color: #ff9800; */
  color:#f5f5f5;
  border-radius: 20px;
  padding: 3px 10px;
  font-weight: bold;
  font-size: 0.85rem;
}

.episode-body {
  padding: 20px;
  color: #f5f5f5;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-label {
  font-weight: 600;
  color: #b0b0b0;
}

.info-value {
  font-weight: 500;
  color: #ffffff;
}
</style>
