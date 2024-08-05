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
          @click="openCreateTaskModal"
        ></v-btn>
      </template>

      <v-card>
        <v-card-title>
          {{ $t('features.task.create.create_task') }}
        </v-card-title>

        <v-card-item>
          <v-textarea
            row-height="25"
            rows="3"
            hide-details="auto"
            :label="$t('features.task.create.enter_title')"
            :error-messages="error_messages"
            v-model="title"
          ></v-textarea>
        </v-card-item>

        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="closeCreateTaskModal">
            {{ $t('features.task.create.cancel') }}
          </v-btn>

          <v-btn @click="createTask">
            {{ $t('features.task.create.create') }}
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { useTaskModel, useRoomModel } from '@/entities';

const toast = useToast();
const { t } = useI18n();

const room_model = useRoomModel();
const task_model = useTaskModel()
const title: Ref<string> = ref("")

const dialog: Ref<boolean> = ref(false);
const error_messages: Ref<Array<string>> = ref([]);


function openCreateTaskModal() {
  dialog.value = true
  title.value = ""
  error_messages.value = []
}

function closeCreateTaskModal() {
  dialog.value = false
}

async function createTask() {
  if (!title.value.length) {
    error_messages.value = [t('features.task.create.enter_title')];

    return;
  }

  try {
    await task_model.create({ title: title.value, room_id: room_model.current_room!.id })

    closeCreateTaskModal()
  
    toast.success(t('features.task.create.created'), {
      timeout: 2500,
    });
  } catch (error) {
    toast.error(task_model.mutation_error!, {
      timeout: 2500,
    });
  }
}
</script>

<style scoped lang="scss"></style>
