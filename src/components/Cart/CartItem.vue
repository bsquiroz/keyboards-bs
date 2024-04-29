<script setup lang="ts">
import { IKeyboard } from "../../interfaces";

defineProps<IKeyboard>();
</script>

<template>
  <article
    class="grid grid-cols-3 dark:bg-slate-800 rounded-md p-2 items-center gap-4"
  >
    <div class="col-span-1 bg-slate-900 rounded-md">
      <img :src="imageList" :alt="name" />
    </div>

    <div class="col-span-2">
      <p>{{ name }}</p>
      <p>{{ price }}.00 USD | Total: 100</p>
      <p class="flex gap-2 items-center">
        <i class="bx bx-minus"></i>
        <span>{{ amount }}</span>
        <i class="bx bx-plus"></i>
        <i class="bx bx-trash"></i>
      </p>
    </div>
  </article>
</template>
