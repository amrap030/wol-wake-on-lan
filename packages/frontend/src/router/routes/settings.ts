import { withLayoutDefault } from "@/router/helper/layoutHelper";

const title = "Settings";

export default withLayoutDefault({
  path: "/settings",
  name: title,
  component: () => import("@/views/SettingsView.vue"),
  meta: {
    title,
  },
});
