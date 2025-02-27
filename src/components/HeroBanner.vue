<script setup>
import { ref, defineEmits } from "vue";

const activeButton = ref("Characters");

const emit = defineEmits(["setActiveTab"]);

function setActiveTab(tab) {
  activeButton.value = tab;
  emit("setActiveTab", tab);
  // console.log(activeButton.value);
}
</script>

<template>
  <section class="hero-wrapper">
    <div class="hero-content">
      <h1 class="hero-title">Rick and Morty</h1>
      <p class="hero-subtitle">
        Explore the multiverse with your favorite characters!
      </p>
      <div class="hero-cta">
        <button
          :class="[
            activeButton === 'Characters' ? 'primary-btn' : 'secondary-btn',
          ]"
          @click="setActiveTab('Characters')"
        >
          Characters
        </button>
        <button
          :class="[
            activeButton === 'Locations' ? 'primary-btn' : 'secondary-btn',
          ]"
          @click="setActiveTab('Locations')"
        >
          Locations
        </button>
        <button
          :class="[
            activeButton === 'Episodes' ? 'primary-btn' : 'secondary-btn',
          ]"
          @click="setActiveTab('Episodes')"
        >
          Episodes
        </button>
      </div>
    </div>
    <div class="hero-image"></div>
    <div class="hero-overlay"></div>
  </section>
</template>

<style scoped>
.hero-wrapper {
  display: flex;
  flex-direction: column;
  height: 40vh;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.hero-content {
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
  animation: fadeIn 1s ease-out;
}

.hero-image {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  animation: float 6s ease-in-out infinite;
}

.hero-image svg {
  width: 100%;
  height: 100%;
  /* fill: var(--whitesmoke); */
  fill: whitesmoke;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: linear-gradient(to bottom, rgba(218, 182, 182, 0.2) 0%, rgba(255,255,255,0.8) 100%); */
  z-index: 1;
}

.hero-title {
  margin: 0 0 1rem;
  color: var(--backBlack);
  font-weight: 900;
  font-size: 90px;
  line-height: 1.1;
  letter-spacing: -2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 24px;
  color: #546e7a;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.primary-btn,
.secondary-btn {
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-btn {
  background-color: #3498db;
  color: white;
  border: none;
}

.primary-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.secondary-btn {
  background-color: transparent;
  color: #3498db;
  border: 2px solid #3498db;
}

.secondary-btn:hover {
  background-color: rgba(52, 152, 219, 0.1);
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 60px;
  }

  .hero-subtitle {
    font-size: 20px;
  }

  .hero-cta {
    flex-direction: column;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 50px;
  }

  .hero-subtitle {
    font-size: 18px;
  }

  .hero-wrapper {
    height: 70vh;
  }
}
</style>
