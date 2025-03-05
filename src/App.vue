<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { computed, onMounted } from "vue";
import { NNotificationProvider } from "naive-ui";
import { useStore } from "@/store";
import FooterView from "@/components/Footer.vue";
import log1 from "@/assets/log1.png";

const store = useStore();
const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);

const logout = () => {
  store.dispatch("auth/logout");
};

onMounted(() => {
  store.dispatch("auth/initializeAuth");
});
</script>

<template>
  <n-notification-provider>
    <header v-if="isAuthenticated">
      <div class="wrapper">
        <div class="logo">
          <img :src="log1" alt="log1" />
        </div>
        <nav>
          <RouterLink to="/characters">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <button @click="logout">Logout</button>
        </nav>
      </div>
    </header>

    <RouterView />

    <FooterView v-if="isAuthenticated" />
  </n-notification-provider>
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
  align-items: center;
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

button {
  background: none;
  border: none;
  color: #94a3b8;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
}

button:hover {
  color: #ffffff;
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
