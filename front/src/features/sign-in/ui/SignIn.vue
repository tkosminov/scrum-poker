<template>
  <div class="row">
    <div class="mb-3">
      <label for="full_name" class="form-label">ФИО</label>
      <input type="text" class="form-control" id="full_name" aria-describedby="full_name_help" v-model="name" />
      <div id="full_name_help" class="form-text">Введите ФИО пользователя</div>
    </div>

    <button type="button" class="btn btn-dark" @click="signIn">Войти</button>
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
