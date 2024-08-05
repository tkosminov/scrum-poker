<template>
  <v-btn
    icon
    @click="toggleTheme"
    :class="[
      current_theme === ETheme.LIGHT
        ? 'nav-bar-theme-light'
        : 'nav-bar-theme-dark',
    ]"
  >
    <v-icon>mdi-{{ current_theme_icon }}</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { type Ref, ref, onBeforeMount } from 'vue';
import { useTheme } from "vuetify";
import { ETheme } from '@/shared';

const theme = useTheme();

const themes: Ref<ETheme[]> = ref([ETheme.LIGHT, ETheme.DARK])
const current_theme: Ref<ETheme> = ref(ETheme.LIGHT);
const current_theme_icon: Ref<string> = ref("weather-sunny");

onBeforeMount(() => {
  let saved_theme = localStorage.getItem('theme') as ETheme | null;

  if (!saved_theme || !themes.value.includes(saved_theme)) {
    saved_theme = themes.value[0]
  }

  setTheme(saved_theme)
})

function toggleTheme() {
  if (current_theme.value === ETheme.LIGHT) {
    setTheme(ETheme.DARK)
  } else {
    setTheme(ETheme.LIGHT)
  }
}

function setTheme(t: ETheme) {
  if (t === ETheme.LIGHT) {
    current_theme.value = ETheme.LIGHT;
    current_theme_icon.value = "weather-sunny";
  } else {
    current_theme.value = ETheme.DARK;
    current_theme_icon.value = "weather-night";
  }

  localStorage.setItem("theme", current_theme.value);
  theme.global.name.value = current_theme.value;
}
</script>

<style scoped lang="scss"></style>
