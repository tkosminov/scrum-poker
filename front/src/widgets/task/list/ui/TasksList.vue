<template>
  <v-list>
    <v-list-item>
      <v-list-item-title>
        {{ $t('widgets.task.list.tasks_list') }}
      </v-list-item-title>

      <template v-slot:append>
        <v-list-item-action end>
          <TaskCreateFeature />
        </v-list-item-action>
      </template>
    </v-list-item>

    <v-list-item
      v-for="task in tasks"
      :key="`${task.id}_${task.title}`"
    >
      <TaskCardWidget :task="task"/>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { TaskCardWidget } from '@/widgets'
import { useTaskModel, TasksQuery } from '@/entities';
import { TaskCreateFeature } from '@/features';

const task_model = useTaskModel()
const tasks: Ref<TasksQuery['tasks'] | undefined> = ref(undefined);

task_model.$subscribe((_mutation, state) => {
  tasks.value = state.tasks;
});
</script>

<style scoped lang="scss"></style>
