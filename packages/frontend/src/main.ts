import { createApp } from "vue";
import App from "./App.vue";
import { router, setupRouterAndHead } from "./router";
import "./tailwind.css";
import { setupStore } from "@/store";
import { setupRouterGuard } from "@/router/guard";
import Notifications from "notiwind";

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // Configure routing and head setup
  setupRouterAndHead(app);
  setupRouterGuard(router);

  app.use(Notifications);
  app.mount("#app");
}

bootstrap();
