<template>
  <div class="card">
    <div class="card-body">
      {{ props.task.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { TasksQuery } from '../../api';

const props = defineProps<{ task: TasksQuery['tasks'][0] }>();
</script>

<style scoped lang="scss"></style>
