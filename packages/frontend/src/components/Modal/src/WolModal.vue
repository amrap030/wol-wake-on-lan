<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="$emit('close')" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex items-center justify-center min-h-full p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md p-6 space-y-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Boot {{ selected.name }}
              </DialogTitle>
              <div class="relative w-full h-full max-w-md md:h-auto">
                <form class="space-y-6" action="#">
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Password</label
                    >
                    <input
                      type="password"
                      name="password"
                      id="password"
                      v-model="password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >OTP</label
                    >
                    <div class="grid grid-cols-6 gap-2">
                      <input
                        type="number"
                        name="otp1"
                        ref="input1"
                        pattern="\d*"
                        v-model="otp1"
                        class="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        @input="focusNext(1)"
                      />
                      <input
                        type="number"
                        name="otp2"
                        ref="input2"
                        pattern="\d*"
                        v-model="otp2"
                        class="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        @input="focusNext(2)"
                      />
                      <input
                        type="number"
                        name="otp3"
                        ref="input3"
                        pattern="\d*"
                        v-model="otp3"
                        class="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        @input="focusNext(3)"
                      />
                      <input
                        type="number"
                        name="otp4"
                        ref="input4"
                        pattern="\d*"
                        v-model="otp4"
                        class="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        @input="focusNext(4)"
                      />
                      <input
                        type="number"
                        name="otp5"
                        ref="input5"
                        pattern="\d*"
                        v-model="otp5"
                        class="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        @input="focusNext(5)"
                      />
                      <input
                        type="number"
                        name="otp6"
                        ref="input6"
                        pattern="\d*"
                        v-model="otp6"
                        class="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        @input="focusNext(6)"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    @click.prevent="wakeonlan()"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login to your account
                  </button>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { useFocus } from "@vueuse/core";
import { ref } from "vue";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  selected: {
    type: Object,
    required: true,
  },
});

defineEmits(["close"]);

const password = ref();
const input1 = ref();
const input2 = ref();
const input3 = ref();
const input4 = ref();
const input5 = ref();
const input6 = ref();
const otp1 = ref();
const otp2 = ref();
const otp3 = ref();
const otp4 = ref();
const otp5 = ref();
const otp6 = ref();
const { focused: input2Focus } = useFocus(input2);
const { focused: input3Focus } = useFocus(input3);
const { focused: input4Focus } = useFocus(input4);
const { focused: input5Focus } = useFocus(input5);
const { focused: input6Focus } = useFocus(input6);

const focusNext = (index: number) => {
  switch (index) {
    case 1:
      input2Focus.value = true;
      break;
    case 2:
      input3Focus.value = true;
      break;
    case 3:
      input4Focus.value = true;
      break;
    case 4:
      input5Focus.value = true;
      break;
    case 5:
      input6Focus.value = true;
      break;
  }
};

const wakeonlan = async () => {
  try {
    await fetch("http://localhost:3000/v1/servers/wakeonlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        macAddress: "d0:50:99:c0:e7:52",
        password: password.value,
        token: [
          otp1.value,
          otp2.value,
          otp3.value,
          otp4.value,
          otp5.value,
          otp6.value,
        ].join(""),
      }),
    });
  } catch (e: any) {
    console.log(e);
  }
};
</script>
