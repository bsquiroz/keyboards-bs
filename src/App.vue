<script setup lang="ts">
import Layout from "./components/Layout/Layout.vue";
import Banner from "./components/Banner/Banner.vue";
import Keyboards from "./components/Keyboards/Keyboards.vue";
import Cart from "./components/Cart/Cart.vue";
import ModalKeyBoard from "./components/ModalKeyboard/ModalKeyBoard.vue";
</script>

<template>
  <Cart />
  <Banner />
  <Layout>
    <Keyboards />
  </Layout>
  <ModalKeyBoard />
</template>
