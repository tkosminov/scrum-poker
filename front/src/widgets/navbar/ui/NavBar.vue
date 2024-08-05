<template>
  <v-app-bar>
    <template v-slot:prepend>
      <router-link :to="{ name: 'rooms' }">
        <v-app-bar-nav-icon>
           <v-icon icon="mdi-cards-spade-outline"></v-icon>
        </v-app-bar-nav-icon>
      </router-link>
    </template>

    <v-app-bar-title>
      <v-sheet>
        <router-link :to="{ name: 'rooms' }">
          ScrumPoker
        </router-link>
      </v-sheet>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <I18nSwitchFeature />
    <ThemeSwitchFeature />

    <v-divider vertical class="ml-5 mr-1"></v-divider>

    <v-app-bar-nav-icon @click="openGithub">
      <v-icon icon="mdi-github"></v-icon>
    </v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script setup lang="ts">
import { I18nSwitchFeature, ThemeSwitchFeature } from '@/features'

function openGithub() {
  window.open('https://github.com/tkosminov/scrum-poker', '_blank')
}
</script>

<style scoped lang="scss"></style>
