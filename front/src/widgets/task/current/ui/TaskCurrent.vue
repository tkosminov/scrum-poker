<template>
  <div class="row">
    {{ task_model.current_task?.title }}
  </div>
</template>

<script setup lang="ts">
import { useTaskModel } from '@/entities';

const task_model = useTaskModel()

task_model.$subscribe((_mutation, state) => {
  if (state.current_task) {
    console.log('1')
  }
})
</script>

<style scoped lang="scss"></style>
