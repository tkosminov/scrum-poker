<template>
  <div class="card">
    <div class="card-body">
      {{ props.task.title }}
    </div>

    <div class="card-body">
      <div class="d-flex justify-content-start gap-1">
        <button type="button" class="btn btn-dark">
          <i class="bi bi-check2-circle"></i>
        </button>
  
        <TaskUpdateFeature :task="props.task" />
        <TaskDeleteFeature :task="props.task" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TasksQuery } from '@/entities';
import { TaskUpdateFeature, TaskDeleteFeature } from '@/features';

const props = defineProps<{ task: TasksQuery['tasks'][0] }>();
</script>

<style scoped lang="scss"></style>
