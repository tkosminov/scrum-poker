<template>
  <v-dialog
    max-width="400"
    v-model="dialog"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        icon="mdi-delete"
        variant="flat"
        size="small"
        v-bind="activatorProps"
      ></v-btn>
    </template>

    <v-card>
      <v-card-title>
        {{ $t('features.room.delete.delete_room') }}
      </v-card-title>

      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="closeDeleteRoomModal">
          {{ $t('features.room.delete.cancel') }}
        </v-btn>

        <v-btn @click="deleteRoom">
          {{ $t('features.room.delete.delete') }}
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

const dialog: Ref<boolean> = ref(false);

const room_model = useRoomModel()

function closeDeleteRoomModal() {
  dialog.value = false
}

async function deleteRoom() {
  try {
    await room_model.delete({ id: props.room.id })

    closeDeleteRoomModal()

    toast.success(t('features.room.delete.deleted'), {
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
