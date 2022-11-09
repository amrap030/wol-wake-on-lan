import { LAYOUT_DEFAULT } from "@/router/constants";
import type { RouteRecordRaw } from "vue-router";

const withLayout = (
  record: RouteRecordRaw,
  layoutComponent: RouteRecordRaw["component"]
) => ({
  ...record,
  name: `Layout${String(record.name)}`,
  component: layoutComponent,
  children: [{ ...record }],
});

export const withLayoutDefault = (record: RouteRecordRaw) =>
  withLayout(record, LAYOUT_DEFAULT);
