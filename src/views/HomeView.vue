<script setup lang="ts">
import HeroBanner from "@/components/HeroBanner.vue";
import Characters from "@/components/Characters.vue";
import Locations from "@/components/Locations.vue";
import Episodes from "@/components/Episodes.vue";
import { useRoute } from "vue-router";

import { ref, onMounted, shallowRef } from "vue";
import router from "@/router";

const activeComponent = shallowRef(Characters);
const activeButton = ref("Characters");
const route = useRoute();

onMounted(() => {
  if (route.path.startsWith("/characters")) {
    activeComponent.value = Characters;
    activeButton.value = "Characters";
  } else if (route.path.startsWith("/locations")) {
    activeComponent.value = Locations;
    activeButton.value = "Locations";
  } else if (route.path.startsWith("/episodes")) {
    activeComponent.value = Episodes;
    activeButton.value = "Episodes";
  }
});

function setActiveTab(tab: string) {
  if (tab === "Characters") {
    activeComponent.value = Characters;
    activeButton.value = "Characters";
    router.push("/characters");
  } else if (tab === "Locations") {
    activeComponent.value = Locations;
    activeButton.value = "Locations";
    router.push("/locations");
  } else if (tab === "Episodes") {
    activeComponent.value = Episodes;
    activeButton.value = "Episodes";
    router.push("/episodes");
  }
}
</script>

<template>
  <main>
    <HeroBanner :activeButton="activeButton" @setActiveTab="setActiveTab" />

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
