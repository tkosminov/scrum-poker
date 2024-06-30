<template>
  <template v-if="user_model.loading">
    <CPreloader />
  </template>

  <div class="row">
    <div class="col-3 d-none d-sm-none d-md-block"></div>

    <div class="col-xs-12 col-sm-12 col-md-6">
      <h1>{{ $t('pages.sign_in.title') }}</h1>
    </div>

    <div class="col-3 d-none d-sm-none d-md-block"></div>
  </div>

  <div class="row">
    <div class="col-3 d-none d-sm-none d-md-block"></div>

    <div class="col-xs-12 col-sm-12 col-md-6">
      <SignInFeature />
    </div>

    <div class="col-3 d-none d-sm-none d-md-block"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from 'vue-router'
import { useToast } from "vue-toastification";

import { CPreloader, useBreadcrumbModel } from '@/shared'
import { SignInFeature } from '@/features'
import { useUserModel } from '@/entities';

const { t } = useI18n();
const user_model = useUserModel()
const breadcrumb_model = useBreadcrumbModel()
const router = useRouter()
const route = useRoute()
const toast = useToast();

onBeforeMount(() => {
  breadcrumb_model.set([
    {
      name: 'pages.sign_in.title',
      use_i18n: true,
      is_current: true
    },
  ])
})

user_model.$subscribe((_mutation, state) => {
  if (state.current_user) {
    toast.success(t('pages.sign_in.successful'), {
      timeout: 2500,
    });

    router.push((route.query as { redirect_to: string }).redirect_to)
  }
})

</script>

<style scoped lang="scss"></style>
