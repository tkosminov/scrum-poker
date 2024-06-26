<template>
  <CNavbar />

  <div class="container mt-6">
    <CBreadcrumb />

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { RouterView } from "vue-router";
import { CNavbar, CBreadcrumb, existsRefreshToken } from '@/shared'
import { useUserModel } from '@/entities'

const user_model = useUserModel()

onBeforeMount(async () => {
  if (existsRefreshToken()) {
    await user_model.refreshToken();
  }
})
</script>

<style scoped lang="scss">
@import "@/app/style.scss";
</style>
