import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import scrollBehavior from "@/router/scrollBehavior";
import { createHead } from "@vueuse/head";

// app router
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true,
  scrollBehavior,
});

export const head = createHead({
  titleTemplate: `Wake-on-Lan — %s`,
});

// config router
export function setupRouterAndHead(app: App<Element>) {
  app.use(router);
  app.use(head);
}
