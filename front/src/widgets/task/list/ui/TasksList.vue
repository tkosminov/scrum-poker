<template>
  <div
    class="row"
    v-for="task in tasks"
    :key="task.id"
  >
    <div class="col-12 mb-2 p-0">
      <TaskCard :task="task"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskModel, TasksQuery, TaskCard } from '@/entities';

import { Ref, ref } from 'vue';

const task_model = useTaskModel()
const tasks: Ref<TasksQuery['tasks'] | undefined> = ref(undefined);

task_model.$subscribe((_mutation, state) => {
  tasks.value = state.tasks;
});
</script>

<style scoped lang="scss"></style>
