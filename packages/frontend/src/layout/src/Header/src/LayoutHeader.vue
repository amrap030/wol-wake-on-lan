<template>
  <header
    class="fixed top-0 left-0 w-full transition-colors duration-200 bg-white mondrian-border-b z-80 dark:bg-neutral-900 drop-shadow-lg"
  >
    <nav
      class="container flex items-center justify-between w-full h-20 max-w-6xl px-4 mx-auto"
    >
      <router-link to="/" class="text-lg font-bold">Wake-on-Lan</router-link>
      <ul class="flex items-center space-x-6 text-sm font-semibold">
        <li v-for="({ icon, url }, index) in routes" :key="index">
          <router-link
            class="transition-colors duration-200 text-neutral-800 dark:text-neutral-200"
            :to="url"
            ><component :is="components[icon]" class="w-6 h-6"
          /></router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { HomeIcon, CogIcon } from "@heroicons/vue/24/solid";
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from "vue";

const components: {
  [key: string]: FunctionalComponent<HTMLAttributes & VNodeProps, {}>;
} = {
  HomeIcon,
  CogIcon,
};

const routes = [
  { icon: "HomeIcon", url: "/" },
  { icon: "CogIcon", url: "/settings" },
];
</script>
