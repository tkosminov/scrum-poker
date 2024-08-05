<template>
  <v-card variant="tonal">
    <v-list-item>
      <template v-slot:prepend>
        <v-list-item-action start>
          <TaskSetCurrentFeature :task="props.task" />
        </v-list-item-action>
      </template>

      <v-card-text>
        {{ props.task.title }}
        
        <template v-if="props.task.closest_point">
          <v-chip color="primary" variant="flat" size="small">
            <v-icon icon="mdi-wrench"></v-icon>
            {{ props.task.closest_point }}
    
            <v-tooltip
              activator="parent"
              location="top"
            >
              {{ $t('widgets.task.card.rounded_value') }}
            </v-tooltip>
          </v-chip>
        </template>
      </v-card-text>

      <template v-slot:append>
        <v-list-item-action end>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props" size="small" variant="flat"></v-btn>
            </template>

            <v-list>
              <v-list-item>
                <TaskUpdateFeature :task="props.task" />
              </v-list-item>
              <v-list-item>
                <TaskDeleteFeature :task="props.task" />
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-card>
</template>

<script setup lang="ts">
import { TaskUpdateFeature, TaskDeleteFeature, TaskSetCurrentFeature } from '@/features';
import { TasksQuery } from '@/entities';

const props = defineProps<{ task: TasksQuery['tasks'][0] }>();
</script>

<style scoped lang="scss">
.cursor-help {
  cursor: help;
}
</style>
