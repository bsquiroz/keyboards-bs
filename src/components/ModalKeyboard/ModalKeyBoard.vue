<script setup lang="ts">
import { Transition } from "vue";
import { useStore } from "../../composables/useStore";

const { keyboardSelect, handleShowModalKeyboard, addCart } = useStore();
</script>

<template>
  <Transition>
    <section
      v-if="keyboardSelect"
      class="h-screen fixed w-screen bg-black/80 top-0 left-0 flex justify-center items-center z-50 p-4"
    >
      <section
        class="max-w-lg dark:bg-slate-950 dark:text-white rounded-2xl overflow-hidden relative"
      >
        <div class="absolute right-1 top-1">
          <i
            class="bx bx-x-circle text-3xl text-white"
            @click="() => handleShowModalKeyboard()"
          ></i>
        </div>
        <div class="grid grid-cols-5">
          <figure class="col-span-3">
            <img
              :src="keyboardSelect!.imageModal"
              :alt="keyboardSelect!.name"
            />
          </figure>

          <div class="col-span-2 p-4 self-center">
            <h2 class="uppercase font-extrabold color--primary">
              {{ keyboardSelect!.name }}
            </h2>

            <h3>
              {{ keyboardSelect!.title }} -
              <span class="font-bold">{{ keyboardSelect?.price }}.00 USD</span>
            </h3>
          </div>
        </div>

        <div class="p-5 flex flex-col gap-4">
          <p>{{ keyboardSelect!.description }}</p>

          <div class="flex items-center gap-4">
            <p class="font-extrabold uppercase">
              Unidades disponibles
              <span class="color--primary">{{ keyboardSelect!.stock }}</span>
            </p>
            <button
              v-if="keyboardSelect.stock"
              @click="() => addCart(keyboardSelect!.id)"
            >
              <i class="bx bx-plus-circle text-2xl hover:color--primary"></i>
            </button>
            <span v-else class="text-sm font-extrabold text-red-500">SALE</span>
          </div>
        </div>
      </section>
    </section>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
