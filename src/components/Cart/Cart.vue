<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "../../composables/useStore";
import CartItem from "./CartItem.vue";

const { cart, infoCart } = useStore();

const isOpenCart = ref(false);

const stylesCart = computed(() => ({
  "translate-x-[0]": isOpenCart.value,
  "translate-x-[100%]": !isOpenCart.value,
}));
</script>

<template>
  <div class="fixed top-4 right-4 z-40 text-white">
    <i class="bx bx-cart text-4xl" @click="isOpenCart = true"></i>
    <span class="font-bold relative top-2 right-1">{{
      infoCart.totalItem
    }}</span>
  </div>

  <section
    class="w-full md:w-[400px] h-screen p-4 dark:bg-slate-950 dark:text-white fixed top-0 right-0 z-40 transition-transform"
    :class="stylesCart"
  >
    <div class="text-end">
      <i
        class="bx bx-x-circle text-3xl text-white"
        @click="isOpenCart = false"
      ></i>
    </div>

    <section v-if="cart.length" class="h-screen">
      <div class="flex flex-col h-[15%]">
        <div class="flex justify-between">
          <p>{{ infoCart.totalPrice }}.00 USD Precio total</p>
          <p>
            {{ infoCart.totalItem }}
            {{ infoCart.totalItem === 1 ? "Articulo" : "Articulos" }}
          </p>
        </div>
        <button class="bg--primary p-5 rounded-md font-bold text-2xl">
          Comprar
        </button>
      </div>

      <div class="flex gap-5 flex-col overflow-y-auto h-[85%]">
        <CartItem
          v-for="cartItem in cart"
          :key="cartItem.id"
          v-bind="cartItem"
        />
      </div>
    </section>
    <div v-else>
      <p>No hay productos</p>
    </div>
  </section>
</template>
