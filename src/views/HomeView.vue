<script setup lang="ts">
import HeroBanner from "@/components/HeroBanner.vue";
import Characters from "@/components/Characters.vue";
import Locations from "@/components/Locations.vue";

import axios from "axios";
import { watch, ref, onMounted, reactive } from "vue";

const activeComponent = ref(Characters);
function setActiveTab(tab: string) {
  if (tab === "Characters") activeComponent.value = Characters;
  else if (tab === "Locations") activeComponent.value = Locations;
  // else if (tab === "Episodes") activeComponent.value = Episodes;
}
</script>

<template>
  <main>
    <HeroBanner @setActiveTab="setActiveTab" />

    <Suspense>
      <template #default>
        <KeepAlive>
          <Component :is="activeComponent" />
        </KeepAlive>
      </template>

      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </main>
</template>

<style scoped></style>
