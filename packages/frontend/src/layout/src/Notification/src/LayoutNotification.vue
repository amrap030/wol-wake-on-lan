<template>
  <NotificationGroup group="app">
    <ul
      class="fixed bottom-0 flex flex-col w-full max-w-sm p-4 space-y-4 pointer-events-none sm:max-w-md lg:px-8 lg:py-12"
    >
      <Notification
        v-slot="{ notifications, close }"
        enter="transform ease-out duration-300"
        enter-from="opacity-0 translate-y-4"
        enter-to="translate-y-0 opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
        move="duration-500"
        move-delay="delay-300"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="relative pointer-events-auto delay-0"
        >
          <WolAlert
            :variant="notification.type"
            :title="notification.title"
            :model-value="true"
            :report="notification.report"
            @update:modelValue="close(notification.id)"
          >
            <p>
              <span v-if="notification.text"> {{ notification.text }} </span>
            </p>
          </WolAlert>
        </div>
      </Notification>
    </ul>
  </NotificationGroup>
</template>

<script setup lang="ts">
import { WolAlert } from "@/components/Alert";
</script>
