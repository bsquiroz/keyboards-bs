<script setup lang="ts">
import { ref, computed } from "vue";
const isOpenCart = ref(false);

const stylesCart = computed(() => ({
  "translate-x-[0%]": isOpenCart.value,
}));
</script>

<template>
  <i
    class="bx bx-cart text-4xl text-white fixed top-4 right-4 z-40"
    @click="isOpenCart = true"
  ></i>

  <section
    class="w-full md:w-[400px] h-screen dark:bg-slate-950 fixed top-0 right-0 z-40 translate-x-[100%] transition-transform p-4"
    :class="stylesCart"
  >
    <div class="text-end">
      <i
        class="bx bx-x-circle text-3xl text-white"
        @click="isOpenCart = false"
      ></i>
    </div>
  </section>
</template>
