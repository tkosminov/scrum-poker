<template>
  <NavbarWidget />

  <div class="container mt-6">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { NavbarWidget } from '@/widgets'
</script>

<style scoped lang="scss">
@import "@/app/style.scss";
</style>
