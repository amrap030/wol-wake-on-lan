<template>
  <div
    class="w-full max-w-sm p-4 bg-white rounded-lg shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700"
  >
    <h5
      class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white"
    >
      Activate 2FA
    </h5>
    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
      Use OTP token to activate two factor authentication with your desired
      provider.
    </p>
    <ul class="my-4 space-y-3">
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
    </ul>
    <button
      type="submit"
      @click.prevent="activate()"
      class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Activate
    </button>
  </div>
  <LayoutNotification />
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { ref } from "vue";
import { useFocus } from "@vueuse/core";
import { notify } from "notiwind";
import { LayoutNotification } from "@/layout/src/Notification";

useHead({
  title: "Settings",
});

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

const activate = async () => {
  try {
    const data = await fetch("http://localhost:3000/v1/totp/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
    if (!(await data.ok)) throw new Error();
    notify(
      {
        group: "app",
        title: "Success",
        type: "success",
        text: "2 factor authentication enabled!",
      },
      4000
    );
  } catch (e: any) {
    notify(
      {
        group: "app",
        title: "Error",
        type: "error",
        text: "Wrong token!",
      },
      4000
    );
  }
};
</script>
