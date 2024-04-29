<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useStore } from "../../composables/useStore";
import CartItem from "./CartItem.vue";

const { cart } = useStore();

const isOpenCart = ref(false);

const stylesCart = computed(() => ({
  "translate-x-[0]": isOpenCart.value,
}));

watchEffect(() => {
  console.log(isOpenCart.value);
});
</script>

<template>
  <i
    class="bx bx-cart text-4xl text-white fixed top-4 right-4 z-40"
    @click="isOpenCart = true"
  ></i>

  <section
    class="w-full md:w-[400px] h-screen p-4 dark:bg-slate-950 dark:text-white fixed top-0 right-0 z-40 translate-x-[100%] transition-transform"
    :class="stylesCart"
  >
    <div class="text-end">
      <i
        class="bx bx-x-circle text-3xl text-white"
        @click="isOpenCart = false"
      ></i>
    </div>

    <div class="flex gap-5 flex-col">
      <CartItem v-for="cartItem in cart" :key="cartItem.id" v-bind="cartItem" />
    </div>
  </section>
</template>
