<template>
  <template v-if="task.voting_status_id === EVotingStatusId.NotStarted">
    <button
      type="button"
      class="btn btn-dark w-100"
      @click="changeStatus(EVotingStatusId.InProgress)"
    >
      <i class="bi bi-play"></i>
    </button>
  </template>
  <template v-else-if="task.voting_status_id === EVotingStatusId.InProgress">
    <button
      type="button"
      class="btn btn-dark w-100"
      @click="changeStatus(EVotingStatusId.Completed)"
    >
      <i class="bi bi-stop"></i>
    </button>
  </template>
  <template v-else-if="task.voting_status_id === EVotingStatusId.Completed">
    <button
      type="button"
      class="btn btn-dark w-100"
      @click="changeStatus(EVotingStatusId.InProgress)"
    >
      <i class="bi bi-arrow-clockwise"></i>
    </button>
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
