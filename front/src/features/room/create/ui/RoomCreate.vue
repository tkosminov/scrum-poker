<template>
  <v-dialog
    max-width="400"
    v-model="dialog"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        icon="mdi-plus"
        variant="tonal"
        size="small"
        v-bind="activatorProps"
        @click="openCreateRoomModal"
      ></v-btn>
    </template>

    <v-card>
      <v-card-title>
        {{ $t('features.room.create.create_room') }}
      </v-card-title>

      <v-card-item>
        <v-text-field
          hide-details="auto"
          :label="$t('features.room.create.enter_title')"
          :error-messages="error_messages"
          v-model="title"
        ></v-text-field>
      </v-card-item>

      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="closeCreateRoomModal">
          {{ $t('features.room.create.cancel') }}
        </v-btn>

        <v-btn @click="createRoom">
          {{ $t('features.room.create.create') }}
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { useRoomModel } from '@/entities';
import { EI18nLang, toStrDate } from '@/shared'

const toast = useToast();
const { t } = useI18n();

const room_model = useRoomModel()
const title: Ref<string> = ref("")

const dialog: Ref<boolean> = ref(false);
const error_messages: Ref<Array<string>> = ref([]);

function openCreateRoomModal() {
  dialog.value = true

  const current_date = new Date()
  const lang = localStorage.getItem('lang') as EI18nLang;

  let value = ""

  if (lang === EI18nLang.RU) {
    value = `Груминг ${toStrDate(current_date)}`
  } else {
    value = `Grooming ${toStrDate(current_date)}`
  }

  title.value = value;
  error_messages.value = [];
}

function closeCreateRoomModal() {
  dialog.value = false
}

async function createRoom() {
  if (!title.value.length) {
    error_messages.value = [t('features.room.create.enter_title')];

    return;
  }

  try {
    await room_model.create({ title: title.value })

    closeCreateRoomModal()

    toast.success(t('features.room.create.created'), {
      timeout: 2500,
    });
  } catch (error) {
    toast.error(room_model.mutation_error!, {
      timeout: 2500,
    });
  }
}
</script>

<style scoped lang="scss"></style>
