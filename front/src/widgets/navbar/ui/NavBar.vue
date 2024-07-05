<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <router-link :to="{ name: 'rooms' }" class="navbar-brand">
        <i class="bi bi-suit-spade"></i>
        ScrumPoker
      </router-link>
      <div class="d-flex">
        <I18nSwitchFeature />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { I18nSwitchFeature } from '@/features'
</script>

<style scoped lang="scss"></style>
