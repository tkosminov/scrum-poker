<template>
  <v-row>
    <v-col
      v-for="point of POSSIBLE_POINTS"
      :key="point"
      class="d-flex child-flex justify-center"
    >
      <VoteChangeFeature :task_id="props.task.id" :point="point" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { VoteChangeFeature } from '@/features'
import { TasksQuery } from '@/entities';

const props = defineProps<{ task: TasksQuery['tasks'][0] }>();

const POSSIBLE_POINTS = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
</script>

<style scoped lang="scss"></style>
