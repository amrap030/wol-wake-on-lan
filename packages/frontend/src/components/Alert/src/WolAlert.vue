<template>
  <div class="w-full rounded-md shadow-xl">
    <div
      v-if="modelValue"
      class="flex items-start justify-start w-full p-4 space-x-4"
    >
      <div class="flex-shrink-0">
        <slot name="icon"
          ><component
            class="w-6 h-6"
            :class="[
              variant === 'success' && 'text-green-400',
              variant === 'error' && 'text-red-400',
            ]"
            :is="IconByVariant[variant]"
        /></slot>
      </div>
      <div class="flex-1 space-y-0.5">
        <div v-if="title">
          <h4 class="font-semibold">{{ title }}</h4>
        </div>
        <div>
          <div class="line-clamp-6">
            <slot />
          </div>

          <span class="block text-xs" v-if="variant === 'error' && report">
            If you need any further assistance
            <a class="underline">report this incident</a>
            and we will reach out to you.
          </span>
        </div>
      </div>
      <div class="flex-shrink-0 text-neutral-900 dark:text-neutral-50">
        <button @click="emit('update:modelValue', false)">
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as () => "success" | "error" | "info",
    default: "error",
  },
  title: {
    type: String,
    default: null,
  },
  report: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(["update:modelValue"]);

const IconByVariant = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  info: InformationCircleIcon,
};
</script>
