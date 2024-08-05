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
        @click="openUpdateTaskModal"
      ></v-btn>
    </template>

    <v-card>
      <v-card-title>
        {{ $t('features.task.update.update_task') }}
      </v-card-title>

      <v-card-item>
        <v-textarea
          row-height="25"
          rows="3"
          hide-details="auto"
          :label="$t('features.task.update.enter_title')"
          :error-messages="error_messages"
          v-model="title"
        ></v-textarea>
      </v-card-item>

      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="closeUpdateTaskModal">
          {{ $t('features.task.update.cancel') }}
        </v-btn>

        <v-btn @click="updateTask">
          {{ $t('features.task.update.update') }}
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { useTaskModel, TasksQuery } from '@/entities';

const props = defineProps<{ task: TasksQuery['tasks'][0] }>();
const toast = useToast();
const { t } = useI18n();

const task_model = useTaskModel()
const title: Ref<string> = ref(props.task.title)

const dialog: Ref<boolean> = ref(false);
const error_messages: Ref<Array<string>> = ref([]);

function openUpdateTaskModal() {
  dialog.value = true

  title.value = props.task.title;
  error_messages.value = [];
}

function closeUpdateTaskModal() {
  dialog.value = false
}

async function updateTask() {
  if (!title.value.length) {
    error_messages.value = [t('features.task.update.enter_title')];

    return;
  }

  try {
    await task_model.update({ id: props.task.id, title: title.value })

    closeUpdateTaskModal()

    toast.success(t('features.task.update.updated'), {
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
