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
        <div class="col-6 border-end">
          <h4
            class="text-center cursor-help"
            data-bs-toggle="tooltip"
            data-bs-placement="top" 
            title="Среднее значение"
          >
            <i class="bi bi-align-middle"></i>  <br />
            <span class="badge text-bg-secondary">{{ task_model.current_task.avg_point }}</span>
          </h4>
        </div>
        <div class="col-6">
          <h4
            class="text-center cursor-help"
            data-bs-toggle="tooltip"
            data-bs-placement="top" 
            title="Округленное значение"
          >
            <i class="bi bi-wrench-adjustable-circle"></i> <br />
            <span class="badge text-bg-secondary">{{ task_model.current_task.closest_point }}</span>
          </h4>
        </div>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useTaskModel, EVotingStatusId, useRoomModel } from '@/entities';
import { TaskChangeStatusFeature } from '@/features';
import { CHr } from '@/shared'

const room_model = useRoomModel()
const task_model = useTaskModel()

task_model.$subscribe((_mutation, state) => {
  room_model.changeCurrentTaskId(state.current_task_id);
})
</script>

<style scoped lang="scss">
.cursor-help {
  cursor: help;
}
</style>
