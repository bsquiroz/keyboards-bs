<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Keyboard from "./Keyboard.vue";

import dataKeyboards from "../../assets/keyboard.json";
import { IKeyboard } from "../../interfaces";

const keyboards = ref<IKeyboard[]>([]);

onMounted(() => {
  keyboards.value = dataKeyboards;
});
</script>

<template>
  <section class="p-5">
    <h2 class="color--primary text-2xl font-bold text-center">
      Teclados en stock
    </h2>

    <section class="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
      <Keyboard
        v-for="keyboard in keyboards"
        :key="keyboard.id"
        :id="keyboard.id"
        :name="keyboard.name"
        :imageList="keyboard.imageList"
        :price="keyboard.price"
      />
    </section>
  </section>
</template>

<style lang="scss" scoped></style>
