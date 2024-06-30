<template>
  <div class="card">
    <div class="card-body">
      <h5>
        {{ props.task.title }}
        <template v-if="props.task.closest_point">
          <span
            class="badge text-bg-secondary cursor-help"
            data-bs-toggle="tooltip"
            data-bs-placement="top" 
            :title="$t('widgets.task.card.rounded_value')"
          >
            <i class="bi bi-wrench-adjustable-circle"></i>
            {{ props.task.closest_point }}
          </span>
        </template>
      </h5>
    </div>

    <div class="card-body">
      <div class="d-flex justify-content-start gap-1">
        <TaskSetCurrentFeature :task="props.task" />
        <TaskUpdateFeature :task="props.task" />
        <TaskDeleteFeature :task="props.task" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TasksQuery } from '@/entities';
import { TaskUpdateFeature, TaskDeleteFeature, TaskSetCurrentFeature } from '@/features';

const props = defineProps<{ task: TasksQuery['tasks'][0] }>();
</script>

<style scoped lang="scss">
.cursor-help {
  cursor: help;
}
</style>
