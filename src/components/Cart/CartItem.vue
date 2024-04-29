<script setup lang="ts">
import { useStore } from "../../composables/useStore";
import { IKeyboard } from "../../interfaces";

defineProps<IKeyboard>();

const { addCart, restCart, deleteCart } = useStore();
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
      <p>{{ price }} USD - Total: {{ price * amount! }} USD</p>
      <p class="flex gap-2 items-center">
        <i class="bx bx-minus" @click="() => restCart(id)"></i>
        <span>{{ amount }}</span>
        <i class="bx bx-plus" @click="() => addCart(id)"></i>
        <i class="bx bx-trash" @click="() => deleteCart(id)"></i>
      </p>
    </div>
  </article>
</template>
