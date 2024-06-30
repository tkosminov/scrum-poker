<template>
  <div class="row">
    <div class="col-12">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li
            v-for="breadcrumb in breadcrumbs"
            :key="breadcrumb.name"
            class="breadcrumb-item"
            :class="[breadcrumb.is_current ? 'active' : '']"
            :ariaCurrent="[breadcrumb.is_current ? 'page' : '']"
          >
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
          </li>
        </ol>
      </nav>
    </div>
  </div>
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
