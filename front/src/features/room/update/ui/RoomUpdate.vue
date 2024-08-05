<template>
  <v-dialog
    max-width="400"
    v-model="dialog"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        icon="mdi-pencil"
        variant="flat"
        size="small"
        v-bind="activatorProps"
        @click="openUpdateRoomModal"
      ></v-btn>
    </template>

    <v-card>
      <v-card-title>
        {{ $t('features.room.update.update_room') }}
      </v-card-title>

      <v-card-item>
        <v-text-field
          hide-details="auto"
          :label="$t('features.room.update.enter_title')"
          :error-messages="error_messages"
          v-model="title"
        ></v-text-field>
      </v-card-item>

      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="closeUpdateRoomModal">
          {{ $t('features.room.update.cancel') }}
        </v-btn>

        <v-btn @click="updateRoom">
          {{ $t('features.room.update.update') }}
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { CurrentRoomQuery, useRoomModel } from '@/entities';

const props = defineProps<{ room: CurrentRoomQuery['rooms'][0] }>();
const toast = useToast();
const { t } = useI18n();

const room_model = useRoomModel()
const title: Ref<string | null> = ref(props.room.title)

const dialog: Ref<boolean> = ref(false);
const error_messages: Ref<Array<string>> = ref([]);

function openUpdateRoomModal() {
  dialog.value = true

  title.value = props.room.title;
  error_messages.value = [];
}

function closeUpdateRoomModal() {
  dialog.value = false
}

async function updateRoom() {
  if (!title.value?.length) {
    error_messages.value = [t('features.room.update.enter_title')];

    return;
  }

  try {
    await room_model.update({ id: props.room.id, title: title.value })

    closeUpdateRoomModal()

    toast.success(t('features.room.update.updated'), {
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
