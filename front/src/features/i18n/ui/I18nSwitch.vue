<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <img style="width: 20px;" :src="`/langs/${current_lang}.svg`" />
        {{ current_lang }}
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="lang in langs"
        :key="lang"
        @click="setCurrentLang(lang)"
      >
        <v-list-item-title>
          <img style="width: 20px;" :src="`/langs/${lang}.svg`" />
          {{ lang }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { Ref, ref, onBeforeMount } from 'vue';
import { useI18n } from "vue-i18n";
import { EI18nLang } from '@/shared'

const langs: Ref<EI18nLang[]> = ref([EI18nLang.RU, EI18nLang.EN])
const current_lang: Ref<EI18nLang> = ref(EI18nLang.RU)

const i18n = useI18n();

onBeforeMount(() => {
  let lang = localStorage.getItem('lang') as EI18nLang | null;

  if (!lang || !langs.value.includes(lang)) {
    lang = langs.value[0]

    localStorage.setItem('lang', lang)
  }

  current_lang.value = lang;

  i18n.locale.value = current_lang.value;
})

function setCurrentLang(lang: EI18nLang) {
  current_lang.value = lang;
  localStorage.setItem('lang', lang);

  i18n.locale.value = current_lang.value;
}
</script>

<style scoped lang="scss">
.cursor-pointer {
  cursor: pointer !important;
}
</style>