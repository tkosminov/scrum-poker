<template>
  <v-breadcrumbs>
    <template
      v-for="(breadcrumb, idx) in breadcrumbs"
      :key="breadcrumb.name"
    >
      <v-breadcrumbs-divider v-if="idx"></v-breadcrumbs-divider>

      <v-breadcrumbs-item>
        <template v-if="breadcrumb.is_current">
          {{ breadcrumb.use_i18n ? $t(breadcrumb.name) : breadcrumb.name }}
        </template>

        <template v-else>
          <router-link
            :to="{ name: breadcrumb.to, params: breadcrumb.params }"
          >
            {{ breadcrumb.use_i18n ? $t(breadcrumb.name) : breadcrumb.name }}
          </router-link>
        </template>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useBreadcrumbModel, type IBreadcrumb } from '../model'

const breadcrumb_model = useBreadcrumbModel()
const breadcrumbs: Ref<IBreadcrumb[]> = ref([])

breadcrumb_model.$subscribe((_mutation, state) => {
  breadcrumbs.value = state.breadcrumbs;
});
</script>

<style scoped lang="scss"></style>
