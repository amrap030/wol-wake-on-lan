// import { createApp } from "vue";
// import { createPinia } from "pinia";
// import "./tailwind.css";
// import App from "./App.vue";
// import router from "./router";

// const app = createApp(App);

// app.use(createPinia());
// app.use(router);

// app.mount("#app");
import { createApp } from "vue";
import App from "./App.vue";
import { router, setupRouterAndHead } from "./router";
import "./tailwind.css";
import { setupStore } from "@/store";
import { setupRouterGuard } from "@/router/guard";

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // Configure routing and head setup
  setupRouterAndHead(app);
  setupRouterGuard(router);

  app.mount("#app");
}

bootstrap();
