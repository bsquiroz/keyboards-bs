<script setup lang="ts">
import { useStore } from "../../composables/useStore";

interface Props {
  id: number;
  name: string;
  imageList: string;
  price: number;
  stock: number;
}
defineProps<Props>();

const { addCart, handleShowModalKeyboard } = useStore();
</script>
<template>
  <div class="p-4 group rounded-md">
    <figure class="relative">
      <img
        class="group-hover:-translate-y-5 transition-transform dark:bg-slate-950"
        :src="imageList"
        :alt="name"
      />
      <div class="absolute left-3 bottom-3 font-extrabold color--primary">
        <span>en stock {{ stock }}</span>
      </div>
    </figure>
    <div class="p-4 dark:bg-slate-900">
      <h3 class="text-2xl">{{ name }}</h3>
      <p class="color--primary font-extrabold text-xl">{{ price }}.00 USD</p>
      <div class="flex gap-4 justify-between">
        <button
          class="underline hover:color--primary"
          @click="() => handleShowModalKeyboard(id)"
        >
          Ver mas
        </button>
        <button v-if="stock" @click="() => addCart(id)">
          <i class="bx bx-plus-circle text-2xl hover:color--primary"></i>
        </button>
        <span v-else class="text-sm font-extrabold text-red-500">SALE</span>
      </div>
    </div>
  </div>
</template>
