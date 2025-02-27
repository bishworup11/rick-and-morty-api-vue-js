<template>
  <div class="location-card">
    <div class="location-header">
      <h2 class="location-name">{{ location.name }}</h2>
      <div class="location-id">#{{ location.id }}</div>
    </div>

    <div class="location-body">
      <div class="location-info">
        <div class="info-item">
          <span class="info-label">Type:</span>
          <span class="info-value">{{ location.type }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Dimension:</span>
          <span class="info-value">{{ location.dimension }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Residents:</span>
          <span class="info-value">{{ location.residents.length }}</span>
        </div>
      </div>
    </div>

    <div class="location-footer">
      <span class="created-date"
        >Created: {{ formatDate(location.created) }}</span
      >
      <button class="view-button" @click="viewDetails">View Details</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

const props = defineProps<{
  location: Location;
}>();

const emit = defineEmits(["view-details"]);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const viewDetails = () => {
  emit("view-details", props.location.id);
};
</script>

<style scoped>
.location-card {
  width: 100%;
  max-width: 340px;
  background-color: #3c3e44;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1.5rem;
}

.location-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.location-header {
  /* background-color: #ff9800; */
  background-color: #3498db;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.location-name {
  margin: 0;
  font-size: 1.5rem;
  color: #1f2937;
  font-weight: 700;
}

.location-id {
  background-color: #1f2937;
  /* color: #ff9800; */
  color: #f5f5f5;
  border-radius: 20px;
  padding: 3px 10px;
  font-weight: bold;
  font-size: 0.85rem;
}

.location-body {
  padding: 20px;
  color: #f5f5f5;
}

.location-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
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

.location-footer {
  padding: 15px 20px;
  background-color: #2a2c31;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.created-date {
  font-size: 0.8rem;
  color: #b0b0b0;
}

.view-button {
  /* background-color: #ff9800; */
  /* background-color: #3498db; */
  color: #1f2937;
  border: none;
  border-radius: 6px;
  padding: 8px 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.view-button:hover {
  background-color: #ffb74d;
}

@media (max-width: 768px) {
  .location-card {
    max-width: 100%;
  }
}
</style>
