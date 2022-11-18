<template>
  <div
    class="w-full max-w-sm p-4 bg-white rounded-lg shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700"
  >
    <h5
      class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white"
    >
      Select machine
    </h5>
    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
      Boot one of the following machines via wake on lan.
    </p>
    <ul class="my-4 space-y-3">
      <li v-for="(server, index) in servers" :key="index">
        <a
          href="#"
          @click.prevent="
            () => {
              selected = server;
              isOpen = true;
            }
          "
          class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
        >
          <ServerIcon class="w-5 h-5 text-green-400" />
          <span class="flex-1 ml-3 whitespace-nowrap">{{ server?.name }}</span>
          <span class="relative flex w-3 h-3">
            <span
              class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping"
              :class="server.isAlive ? 'bg-green-400' : 'bg-red-500'"
            ></span>
            <span
              class="relative inline-flex w-3 h-3 rounded-full"
              :class="server.isAlive ? 'bg-green-400' : 'bg-red-500'"
            ></span>
          </span>
        </a>
      </li>
    </ul>
    <div>
      <router-link
        to="/settings"
        class="inline-flex items-center space-x-1 text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
      >
        <CogIcon class="w-4 h-4" />
        <p>Configure settings</p></router-link
      >
    </div>
  </div>
  <WolModal
    :isOpen="isOpen"
    :selected="selected"
    @close="isOpen = false"
    @boot="
      (success) => {
        isOpen = false;
        prompt(success);
      }
    "
  />
  <LayoutNotification />
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { CogIcon, ServerIcon } from "@heroicons/vue/24/solid";
import { WolModal } from "@/components/Modal";
import { onMounted, ref } from "vue";
import { LayoutNotification } from "@/layout/src/Notification";
import { notify } from "notiwind";

useHead({
  title: "Home",
});

console.log(import.meta.env.VITE_PORT);

const isOpen = ref<boolean>(false);
const servers = ref<{ isAlive: boolean; name: string; id: number }[]>([]);
const selected = ref<{ isAlive: boolean; name: string; id: number } | {}>({});

onMounted(async () => {
  const data = await fetch(
    `${import.meta.env.VITE_API || "http://localhost:3000"}/v1/servers`
  );
  servers.value = await data.json();
});

setInterval(async () => {
  servers.value.forEach(async (server) => {
    const data = await fetch(
      `${import.meta.env.VITE_API || "http://localhost:3000"}/v1/servers/ping/${
        server.id
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          host: "192.168.1.194",
        }),
      }
    );
    server.isAlive = await data.json();
  });
}, 5000);

const prompt = (success: boolean) => {
  notify(
    {
      group: "app",
      title: success ? "Success" : "Error",
      type: success ? "success" : "error",
      text: success ? "Server will boot soon!" : "Something went wrong!",
    },
    4000
  );
};
</script>
