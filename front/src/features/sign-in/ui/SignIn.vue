<template>
  <v-card>
    <v-card-title>
      {{ $t('features.sign_in.title') }}
    </v-card-title>

    <v-card-item>
      <v-text-field
        hide-details="auto"
        :label="$t('features.sign_in.enter_full_name')"
        :error-messages="error_messages"
        v-model="name"
      ></v-text-field>
    </v-card-item>

    <template v-slot:actions>
      <v-spacer></v-spacer>

      <v-btn @click="signIn">
        {{ $t('features.sign_in.sign_in') }}
      </v-btn>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useUserModel } from '@/entities';

const { t } = useI18n();
const user_model = useUserModel()

const name: Ref<string> = ref("")
const error_messages: Ref<Array<string>> = ref([]);

async function signIn() {
  if (!name.value.length) {
    error_messages.value = [t('features.sign_in.enter_full_name')];

    return;
  }

  await user_model.signIn(name.value)
}
</script>

<style scoped lang="scss"></style>
