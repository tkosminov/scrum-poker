<template>
  <div class="row">
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="fullName"
        v-model="name"
        :placeholder="$t('features.sign_in.enter_full_name')"
        aria-describedby="full_name_help"
      />
      <label for="fullName">
        {{ $t('features.sign_in.full_name') }}
      </label>
      <div id="full_name_help" class="form-text">
        {{ $t('features.sign_in.enter_full_name') }}
      </div>
    </div>

    <button type="button" class="btn btn-dark" @click="signIn">
      {{ $t('features.sign_in.sign_in') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useUserModel } from '@/entities';

const user_model = useUserModel()

const name: Ref<string> = ref("")

async function signIn() {
  await user_model.signIn(name.value)
}
</script>

<style scoped lang="scss"></style>
