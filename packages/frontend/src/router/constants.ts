export enum PERMISSION_MODE {
  Default,
  Owner,
}

export enum PAGE_LOADING {
  Default,
  Always,
  Never,
  Manual,
}

export const LAYOUT_DEFAULT = () => import("@/layout/LayoutDefault.vue");
