<script setup>
    import {defineProps} from "vue"

    const {character } = defineProps([
       'character'
    ])
</script>
<template>
  <div class="character-card">
    <div class="character-status" :class="character.status.toLowerCase()">
      <span class="status-indicator"></span>
      {{ character.status }}
    </div>
    
    <div class="character-image">
      <img :src="character.image" :alt="character.name">
    </div>
    
    <div class="character-info">
      <h2 class="character-name">{{ character.name }}</h2>
      
      <div class="character-details">
        <div class="detail-item">
          <span class="detail-label">Species:</span>
          <span class="detail-value">{{ character.species }}</span>
        </div>
        
        <div class="detail-item" v-if="character.type">
          <span class="detail-label">Type:</span>
          <span class="detail-value">{{ character.type || 'Unknown' }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Gender:</span>
          <span class="detail-value">{{ character.gender }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Origin:</span>
          <span class="detail-value">{{ character.origin.name }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Location:</span>
          <span class="detail-value">{{ character.location.name }}</span>
        </div>
      </div>
      
      <div class="character-episodes">
        <h3 class="episodes-title">Episodes</h3>
        <div class="episodes-count">
          <span class="episode-badge">{{ character.episode.length }}</span> appearances
        </div>
      </div>
      
      <div class="character-actions">
        <button class="view-episodes-btn">View Episodes</button>
        <button class="view-profile-btn">Full Profile</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.character-card {
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 600px;
  position: relative;
  display: flex;
  flex-direction: row;
  border: 1px solid #eaeaea;
}

.character-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.character-status {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: white;
  z-index: 10;
}

.character-status.alive {
  background-color: rgba(46, 204, 113, 0.9);
}

.character-status.dead {
  background-color: rgba(231, 76, 60, 0.9);
}

.character-status.unknown {
  background-color: rgba(149, 165, 166, 0.9);
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
  background-color: white;
}

.character-image {
  width: 45%;
  height: 100%;
  overflow: hidden;
  background-color: #244e6b;
}

.character-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.character-card:hover .character-image img {
  transform: scale(1.05);
}

.character-info {
  padding: 1.5rem;
 /* background-color: #244e6b; */
  width: 55%;
}

.character-name {
  margin: 0 0 1rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #333;
  line-height: 1.2;
}

.character-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #95a5a6;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 0.95rem;
  color: #2c3e50;
  font-weight: 500;
}

.character-episodes {
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.episodes-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.episodes-count {
  font-size: 0.875rem;
  color: #7f8c8d;
}

.episode-badge {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.75rem;
}

.character-actions {
  display: flex;
  gap: 12px;
}

.character-actions button {
  padding: 0.7rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  flex: 1;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.view-episodes-btn {
  background-color: #97ce4c; /* Rick and Morty green */
  color: #1e2931;
}

.view-episodes-btn:hover {
  background-color: #86b944;
}

.view-profile-btn {
  background-color: #244e6b; /* Rick and Morty blue */
  color: white;
}

.view-profile-btn:hover {
  background-color: #1d3f56;
}

@media (max-width: 600px) {
  .character-details {
    grid-template-columns: 1fr;
  }
  
  .character-actions {
    flex-direction: column;
  }
}
</style>