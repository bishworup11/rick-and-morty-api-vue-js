// router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/characters" },
    {
      path: "/",
      component: () => import("../views/HomeView.vue"),
      children: [
        {
          path: "characters",
          component: () => import("../components/Characters.vue"),
        },
        {
          path: "locations",
          component: () => import("../components/Locations.vue"),
        },
        {
          path: "episodes",
          component: () => import("../components/Episodes.vue"),
        },
      ],
      meta: { requiresAuth: true },
    },
    {
      path: "/characters",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { hideForAuth: true },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (to.meta.hideForAuth && isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
