import type { RouteRecordRaw } from "vue-router";

import HomeRoute from "@/router/routes/home";
import SettingsRoute from "@/router/routes/settings";

const routeModuleList = [HomeRoute, SettingsRoute];

export default [
  // PAGE_NOT_FOUND_ROUTE,
  ...routeModuleList,
] as unknown as RouteRecordRaw[];
