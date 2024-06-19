<template>
  <div class="card">
    <div class="card-body">
      {{ props.task.title }}
    </div>

    <div class="card-body">
      <button type="button" class="card-link">
        <i class="bi bi-check2"></i>
      </button>

      <button type="button" class="card-link">
        <i class="bi bi-pencil"></i>
      </button>

      <button type="button" class="card-link">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TasksQuery } from '@/entities';

const props = defineProps<{ task: TasksQuery['tasks'][0] }>();
</script>

<style scoped lang="scss"></style>
