<script setup lang="ts">
interface Props {
  id: number;
  name: string;
  imageList: string;
  price: number;
}
defineProps<Props>();
</script>
<template>
  <div class="p-4 group rounded-md">
    <img
      class="group-hover:-translate-y-5 transition-transform dark:bg-slate-950"
      :src="imageList"
      :alt="name"
    />
    <div class="p-4 dark:bg-slate-900">
      <h3 class="text-2xl">{{ name }}</h3>
      <p class="color--primary font-extrabold text-xl">{{ price }}.00 USD</p>
      <div class="flex gap-4 justify-between">
        <button class="underline hover:color--primary">Ver mas</button>
        <button>
          <i class="bx bx-plus-circle text-2xl hover:color--primary"></i>
        </button>
      </div>
    </div>
  </div>
</template>
