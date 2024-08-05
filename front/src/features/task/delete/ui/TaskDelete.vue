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
        {{ $t('features.task.delete.delete_task') }}
      </v-card-title>

      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="closeDeleteTaskModal">
          {{ $t('features.task.delete.cancel') }}
        </v-btn>

        <v-btn @click="deleteTask">
          {{ $t('features.task.delete.delete') }}
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

const dialog: Ref<boolean> = ref(false);

function closeDeleteTaskModal() {
  dialog.value = false
}

async function deleteTask() {
  try {
    await task_model.delete({ id: props.task.id })

    closeDeleteTaskModal()

    toast.success(t('features.task.delete.deleted'), {
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
