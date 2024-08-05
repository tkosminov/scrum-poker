<template>
  <v-layout>
    <NavbarWidget />

    <v-container class="mt-6">
      <v-row>
        <CBreadcrumb />
      </v-row>

      <v-row>
        <RouterView />
      </v-row>
    </v-container>
  </v-layout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { RouterView } from "vue-router";
import { CBreadcrumb, existsRefreshToken } from '@/shared'
import { NavbarWidget } from '@/widgets'
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
