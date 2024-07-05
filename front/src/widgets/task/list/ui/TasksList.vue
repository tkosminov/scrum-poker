<template>
  <div
    class="row"
    v-for="task in tasks"
    :key="`${task.id}_${task.title}`"
  >
    <div class="col-12 mb-2">
      <TaskCardWidget :task="task"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { TaskCardWidget } from '@/widgets'
import { useTaskModel, TasksQuery } from '@/entities';

const task_model = useTaskModel()
const tasks: Ref<TasksQuery['tasks'] | undefined> = ref(undefined);

task_model.$subscribe((_mutation, state) => {
  tasks.value = state.tasks;
});
</script>

<style scoped lang="scss"></style>
