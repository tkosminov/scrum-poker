<template>
  <template v-if="task.voting_status_id === EVotingStatusId.NotStarted">
    <v-btn
      block
      prepend-icon="mdi-play"
      density="comfortable"
      variant="tonal"
      @click="changeStatus(EVotingStatusId.InProgress)"
    ></v-btn>
  </template>
  <template v-else-if="task.voting_status_id === EVotingStatusId.InProgress">
    <v-btn
      block
      prepend-icon="mdi-stop"
      density="comfortable"
      variant="tonal"
      @click="changeStatus(EVotingStatusId.Completed)"
    ></v-btn>
  </template>
  <template v-else-if="task.voting_status_id === EVotingStatusId.Completed">
    <v-btn
      block
      prepend-icon="mdi-repeat"
      density="comfortable"
      variant="tonal"
      @click="changeStatus(EVotingStatusId.InProgress)"
    ></v-btn>
  </template>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { TasksQuery, EVotingStatusId, useTaskModel } from '@/entities';

const props = defineProps<{ task: TasksQuery['tasks'][0] }>();

const toast = useToast();
const task_model = useTaskModel()

async function changeStatus(voting_status_id: EVotingStatusId) {
  try {
    await task_model.changeStatus({ id: props.task.id, voting_status_id })
  } catch (error) {
    toast.error(task_model.mutation_error!, {
      timeout: 2500,
    });
  }
}
</script>

<style scoped lang="scss"></style>
