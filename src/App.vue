<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import FooterView from "./components/Footer.vue";
import log1 from "./assets/log1.png";
import log2 from "./assets/log2.png";
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="logo">
        <img :src="log1" alt="log1" />
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />

  <FooterView />
</template>

<style scoped>
header {
  background-color: #2c3e50;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

img {
  width: 70px;
  height: 45px;
}

.cards {
  height: 700px;
  background-color: rgb(27, 26, 26);
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  padding-right: 1rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

nav a:hover {
  color: #ffffff;
}

nav a.router-link-active {
  color: #ffffff;
}

nav a.router-link-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #41b883;
}

@media (max-width: 768px) {
  .wrapper {
    flex-direction: column;
    gap: 1rem;
  }

  nav {
    width: 100%;
    justify-content: center;
  }
}
</style>
