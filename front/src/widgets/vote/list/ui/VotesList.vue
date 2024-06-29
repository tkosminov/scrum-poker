<template>
  <div class="row row-cols-auto">
    <div
      class="col"
      v-for="point of POSSIBLE_POINTS"
      :key="point"
    >
      <VoteChangeFeature :task_id="props.task.id" :point="point" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TasksQuery } from '@/entities';
import { VoteChangeFeature } from '@/features'

const props = defineProps<{ task: TasksQuery['tasks'][0] }>();

const POSSIBLE_POINTS = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
</script>

<style scoped lang="scss"></style>
