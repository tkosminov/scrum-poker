<template>
  <template v-if="task_model.current_task">
    <div class="row">
      <div class="col-12">
        <h4>{{ task_model.current_task.title }}</h4>
      </div>
    </div>
  
    <div class="row">
      <div class="col-12">
        <TaskChangeStatusFeature :task="task_model.current_task" />
      </div>
    </div>

    <template v-if="task_model.current_task.voting_status_id === EVotingStatusId.InProgress">
      <CHr title="Голосование"/>
    </template>
  
    <template v-if="task_model.current_task.voting_status_id === EVotingStatusId.Completed">
      <CHr title="Результат голосования"/>
    
      <div class="row">
        <div class="col-6">
          <i class="bi bi-align-middle"></i> {{ task_model.current_task.avg_point }}
        </div>
        <div class="col-6">
          <i class="bi bi-wrench-adjustable-circle"></i> {{ task_model.current_task.closest_point }}
        </div>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useTaskModel, EVotingStatusId } from '@/entities';
import { TaskChangeStatusFeature } from '@/features';
import { CHr } from '@/shared'

const task_model = useTaskModel()

task_model.$subscribe((_mutation, state) => {
  if (state.current_task) {
    console.log('1')
  }
})
</script>

<style scoped lang="scss"></style>
