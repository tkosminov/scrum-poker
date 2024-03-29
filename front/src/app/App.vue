<template>
  <CNavbar />

  <div class="container mt-6">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { CNavbar } from '@/shared'
</script>

<style scoped lang="scss">
@import "@/app/style.scss";
</style>
